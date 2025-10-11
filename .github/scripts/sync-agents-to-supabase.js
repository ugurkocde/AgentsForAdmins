#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const yaml = require('js-yaml');
const fs = require('fs').promises;
const path = require('path');

// Configuration from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'ugurkocde/SecurityCopilotHub';
const GITHUB_SHA = process.env.GITHUB_SHA;
const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
const GITHUB_RUN_NUMBER = process.env.GITHUB_RUN_NUMBER;
const CHANGED_FILES = process.env.CHANGED_FILES ? JSON.parse(process.env.CHANGED_FILES) : null;
const FORCE_FULL_SYNC = process.env.FORCE_FULL_SYNC === 'true';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Services to scan (including new Purview service)
const SERVICES = ['Defender', 'Entra', 'Intune', 'Purview'];

// Repository base path (two levels up from scripts directory)
const REPO_BASE = path.resolve(__dirname, '..', '..');

// Sync result tracking
const syncResult = {
  success: true,
  synced: 0,
  failed: 0,
  errors: [],
  timestamp: new Date().toISOString(),
  githubSha: GITHUB_SHA,
  githubRunId: GITHUB_RUN_ID,
  githubRunNumber: GITHUB_RUN_NUMBER
};

/**
 * Create a unique agent ID from path
 */
function createAgentId(filePath) {
  // Extract service and agent name from path
  // e.g., "Defender/ThreatHuntingAgent/ThreatHuntingAgent.yaml" -> "defender-threat-hunting-agent"
  const parts = filePath.split('/');
  if (parts.length >= 2) {
    const service = parts[0].toLowerCase();
    const agentFolder = parts[1];
    // Convert CamelCase to kebab-case
    const agentName = agentFolder
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
    return `${service}-${agentName}`;
  }
  return filePath.replace(/\.(yaml|yml)$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * Parse version from changelog
 */
function parseVersionFromChangelog(changelog) {
  if (!changelog) {
    return { version: '1.0.0', date: new Date().toISOString().split('T')[0] };
  }

  // Look for version pattern: ## [1.2.3] or ## Version 1.2.3
  const versionMatch = /##\s*(?:\[)?(?:Version\s+)?(\d+\.\d+\.\d+)(?:\])?/i.exec(changelog);

  if (versionMatch) {
    // Try to find date after version
    const dateMatch = /##\s*(?:\[)?\d+\.\d+\.\d+(?:\])?\s*[-–]\s*(\d{4}-\d{2}-\d{2})/i.exec(changelog);
    return {
      version: versionMatch[1],
      date: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
    };
  }

  // Fallback: look for any semver pattern
  const semverMatch = /(\d+\.\d+\.\d+)/.exec(changelog);
  if (semverMatch) {
    return {
      version: semverMatch[1],
      date: new Date().toISOString().split('T')[0],
    };
  }

  return { version: '1.0.0', date: new Date().toISOString().split('T')[0] };
}

/**
 * Extract categories based on agent metadata
 */
function extractCategories(yamlData, service) {
  const categories = [];

  const descriptor = yamlData.Descriptor || {};
  const agentDef = yamlData.AgentDefinitions?.[0] || {};
  const description = (descriptor.Description || agentDef.Description || '').toLowerCase();
  const product = (agentDef.Product || '').toLowerCase();

  // Service-based categories
  if (service.toLowerCase() === 'defender') {
    categories.push('threat-detection');
  }
  if (service.toLowerCase() === 'entra') {
    categories.push('identity-management');
  }
  if (service.toLowerCase() === 'intune') {
    categories.push('device-management');
  }
  if (service.toLowerCase() === 'purview') {
    categories.push('data-governance', 'compliance');
  }

  // Description-based categories
  if (description.includes('compliance') || product.includes('compliance')) {
    categories.push('compliance');
  }
  if (description.includes('investigation') || description.includes('hunting')) {
    categories.push('threat-investigation');
  }
  if (description.includes('risk')) {
    categories.push('risk-management');
  }
  if (description.includes('governance')) {
    categories.push('governance');
  }
  if (description.includes('dlp') || description.includes('data loss')) {
    categories.push('data-protection');
  }

  // Remove duplicates
  return [...new Set(categories)];
}

/**
 * Extract tags from agent metadata
 */
function extractTags(yamlData) {
  const tags = [];
  const skillsets = yamlData.AgentDefinitions?.[0]?.RequiredSkillsets || [];

  // Add skillsets as tags
  tags.push(...skillsets.map(s => s.toLowerCase()));

  // Add some keyword-based tags
  const description = (yamlData.Descriptor?.Description || '').toLowerCase();
  if (description.includes('automated')) tags.push('automation');
  if (description.includes('report')) tags.push('reporting');
  if (description.includes('alert')) tags.push('alerting');
  if (description.includes('remediation')) tags.push('remediation');
  if (description.includes('assessment')) tags.push('assessment');

  // Remove duplicates
  return [...new Set(tags)];
}

/**
 * Transform YAML content to agent data for Supabase
 */
function transformYamlToAgent(yamlContent, filePath, service, changelog) {
  try {
    const yamlData = yaml.load(yamlContent);

    const descriptor = yamlData.Descriptor || {};
    const agentDef = yamlData.AgentDefinitions?.[0] || {};
    const { version, date } = parseVersionFromChangelog(changelog);

    // Get GitHub URLs
    const [owner, repo] = GITHUB_REPOSITORY.split('/');
    const githubPath = filePath;
    const htmlUrl = `https://github.com/${GITHUB_REPOSITORY}/tree/main/${filePath}`;
    const downloadUrl = `https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/main/${filePath}`;

    const agentData = {
      id: createAgentId(filePath),
      name: descriptor.DisplayName || descriptor.Name || 'Unknown Agent',
      description: descriptor.Description || null,
      long_description: agentDef.Description || null,
      category: extractCategories(yamlData, service),
      tags: extractTags(yamlData),
      repository_url: `https://github.com/${GITHUB_REPOSITORY}`,
      repository_type: 'github',
      download_url: downloadUrl,
      html_url: htmlUrl,
      github_path: githubPath,
      service: service.toLowerCase(),
      author_name: agentDef.Publisher || 'Microsoft',
      author_github: null,
      author_twitter: null,
      author_website: null,
      latest_version: version,
      last_updated: date,
      stars: 0,
      featured: false,
      status: 'active',
      icon: descriptor.Icon || null,
      screenshots: [],
      video_demo: null,
      requirements: {
        skillsets: agentDef.RequiredSkillsets || [],
        product: agentDef.Product || null
      },
      installation: {
        steps: [
          'Download the YAML file',
          'Sign in to Security Copilot portal',
          'Navigate to Agents → Import',
          'Upload the YAML file',
          'Save and test the agent'
        ]
      },
      usage: {
        inputs: yamlData.SkillGroups?.[0]?.Skills?.[0]?.Inputs || []
      },
      documentation: null,
      license: 'MIT',
      pricing: 'free',
      yaml_content: yamlContent,
      changelog: changelog || null,
      sync_status: 'synced',
      last_synced_at: new Date().toISOString()
    };

    return agentData;
  } catch (error) {
    console.error(`Error transforming YAML for ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Read file from repository
 */
async function readFile(filePath) {
  try {
    const fullPath = path.join(REPO_BASE, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Get all agent files from repository
 */
async function getAllAgentFiles() {
  const agentFiles = [];

  for (const service of SERVICES) {
    const servicePath = path.join(REPO_BASE, service);

    try {
      // Check if service directory exists
      await fs.access(servicePath);

      // Read all subdirectories in the service folder
      const entries = await fs.readdir(servicePath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const agentPath = path.join(service, entry.name);
          const agentFullPath = path.join(REPO_BASE, agentPath);

          // Look for YAML files in the agent directory
          const files = await fs.readdir(agentFullPath);

          const yamlFile = files.find(f => f.endsWith('.yaml') || f.endsWith('.yml'));
          const changelogFile = files.find(f => f.toLowerCase() === 'changelog.md');

          if (yamlFile) {
            agentFiles.push({
              yamlPath: path.join(agentPath, yamlFile),
              changelogPath: changelogFile ? path.join(agentPath, changelogFile) : null,
              service
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Service directory ${service} not found or not accessible:`, error.message);
      continue;
    }
  }

  return agentFiles;
}

/**
 * Get agent files to sync based on changed files or full sync
 */
async function getAgentFilesToSync() {
  if (FORCE_FULL_SYNC || !CHANGED_FILES || CHANGED_FILES.length === 0) {
    console.log('Performing full sync of all agents...');
    return getAllAgentFiles();
  }

  console.log(`Syncing ${CHANGED_FILES.length} changed file(s)...`);
  const agentFiles = [];

  for (const changedFile of CHANGED_FILES) {
    // Extract service and agent folder from path
    const parts = changedFile.split('/');
    if (parts.length >= 2) {
      const service = parts[0];
      const agentFolder = parts[1];

      // Check if this is a valid service
      if (SERVICES.includes(service)) {
        const agentPath = path.join(service, agentFolder);
        const agentFullPath = path.join(REPO_BASE, agentPath);

        try {
          const files = await fs.readdir(agentFullPath);
          const yamlFile = files.find(f => f.endsWith('.yaml') || f.endsWith('.yml'));
          const changelogFile = files.find(f => f.toLowerCase() === 'changelog.md');

          if (yamlFile) {
            // Check if we already have this agent in the list
            const existingAgent = agentFiles.find(a => a.yamlPath === path.join(agentPath, yamlFile));
            if (!existingAgent) {
              agentFiles.push({
                yamlPath: path.join(agentPath, yamlFile),
                changelogPath: changelogFile ? path.join(agentPath, changelogFile) : null,
                service
              });
            }
          }
        } catch (error) {
          console.warn(`Could not process agent folder ${agentPath}:`, error.message);
        }
      }
    }
  }

  return agentFiles;
}

/**
 * Sync a single agent to Supabase
 */
async function syncAgent(agentFile) {
  const { yamlPath, changelogPath, service } = agentFile;

  try {
    console.log(`Syncing ${yamlPath}...`);

    // Read YAML content
    const yamlContent = await readFile(yamlPath);
    if (!yamlContent) {
      throw new Error(`YAML file not found: ${yamlPath}`);
    }

    // Read changelog if available
    let changelog = null;
    if (changelogPath) {
      changelog = await readFile(changelogPath);
    }

    // Transform to agent data
    const agentData = transformYamlToAgent(yamlContent, yamlPath, service, changelog);

    // Upsert to Supabase
    const { data, error } = await supabase
      .from('agents')
      .upsert(agentData, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log(`✓ Synced: ${agentData.name} (${agentData.id})`);
    syncResult.synced++;

    return { success: true, agent: data };
  } catch (error) {
    console.error(`✗ Failed to sync ${yamlPath}:`, error.message);
    syncResult.failed++;
    syncResult.errors.push({
      agentId: yamlPath,
      error: error.message
    });
    return { success: false, error: error.message };
  }
}

/**
 * Create sync log entry in Supabase
 */
async function createSyncLog(status, metadata = {}) {
  try {
    const { data, error } = await supabase
      .from('sync_logs')
      .insert({
        sync_type: FORCE_FULL_SYNC ? 'github_action_full' : 'github_action_incremental',
        status: status,
        agents_synced: syncResult.synced,
        agents_failed: syncResult.failed,
        completed_at: status === 'in_progress' ? null : new Date().toISOString(),
        error_message: syncResult.errors.length > 0 ? 'Some agents failed to sync' : null,
        metadata: {
          ...metadata,
          github_sha: GITHUB_SHA,
          github_run_id: GITHUB_RUN_ID,
          github_run_number: GITHUB_RUN_NUMBER,
          errors: syncResult.errors
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create sync log:', error);
    }

    return data;
  } catch (error) {
    console.error('Error creating sync log:', error);
    return null;
  }
}

/**
 * Main sync function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Security Copilot Hub - Agent Sync to Supabase');
  console.log('='.repeat(60));
  console.log(`Repository: ${GITHUB_REPOSITORY}`);
  console.log(`Commit: ${GITHUB_SHA}`);
  console.log(`Run: #${GITHUB_RUN_NUMBER} (${GITHUB_RUN_ID})`);
  console.log(`Mode: ${FORCE_FULL_SYNC ? 'Full Sync' : 'Incremental Sync'}`);
  console.log('='.repeat(60));

  // Validate configuration
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set');
    process.exit(1);
  }

  try {
    // Create initial sync log
    const syncLog = await createSyncLog('in_progress');
    const syncLogId = syncLog?.id;

    // Get agent files to sync
    const agentFiles = await getAgentFilesToSync();

    if (agentFiles.length === 0) {
      console.log('No agent files to sync.');
      await createSyncLog('completed', {
        message: 'No agent files to sync'
      });
      return;
    }

    console.log(`Found ${agentFiles.length} agent(s) to sync\n`);

    // Sync each agent
    for (const agentFile of agentFiles) {
      await syncAgent(agentFile);
    }

    // Update final sync log
    const finalStatus = syncResult.failed === 0 ? 'completed' : 'completed_with_errors';
    if (syncLogId) {
      await supabase
        .from('sync_logs')
        .update({
          status: finalStatus,
          agents_synced: syncResult.synced,
          agents_failed: syncResult.failed,
          completed_at: new Date().toISOString(),
          error_message: syncResult.errors.length > 0 ? 'Some agents failed to sync' : null,
          metadata: {
            github_sha: GITHUB_SHA,
            github_run_id: GITHUB_RUN_ID,
            github_run_number: GITHUB_RUN_NUMBER,
            errors: syncResult.errors
          }
        })
        .eq('id', syncLogId);
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('SYNC SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Successfully synced: ${syncResult.synced} agent(s)`);
    if (syncResult.failed > 0) {
      console.log(`✗ Failed to sync: ${syncResult.failed} agent(s)`);
      console.log('\nErrors:');
      syncResult.errors.forEach(err => {
        console.log(`  - ${err.agentId}: ${err.error}`);
      });
    }
    console.log('='.repeat(60));

    // Write sync log to file for artifact upload
    await fs.writeFile(
      path.join(__dirname, 'sync-log.json'),
      JSON.stringify(syncResult, null, 2)
    );

    // Exit with error if any syncs failed
    if (syncResult.failed > 0) {
      process.exit(1);
    }

  } catch (error) {
    console.error('Fatal error during sync:', error);

    // Try to update sync log
    await createSyncLog('failed', {
      error: error.message,
      stack: error.stack
    });

    // Write error to sync log file
    syncResult.success = false;
    syncResult.errors.push({
      agentId: 'FATAL',
      error: error.message
    });

    await fs.writeFile(
      path.join(__dirname, 'sync-log.json'),
      JSON.stringify(syncResult, null, 2)
    );

    process.exit(1);
  }
}

// Run the sync
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});