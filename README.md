# Agents for Admins

<p align="center">
  <a href="https://agentsforadmins.com"><img src="https://img.shields.io/badge/Hub-AgentsForAdmins.com-0078D4?style=for-the-badge&logo=microsoft" alt="Visit AgentsForAdmins.com"></a>
  <a href="https://www.linkedin.com/groups/15356022/"><img src="https://img.shields.io/badge/Join-LinkedIn%20Community-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn Community"></a>
  <a href="#repository-layout"><img src="https://img.shields.io/badge/Agents-Available-success?style=for-the-badge&logo=shield" alt="Agents Available"></a>
  <a href="#contributing"><img src="https://img.shields.io/badge/Contributions-Welcome-44c767?style=for-the-badge&logo=github" alt="Contributions Welcome"></a>
</p>

Agents for Admins is a community-driven catalog of ready-to-use agents for the Microsoft Security Copilot portal. Each agent is packaged so security teams can quickly import proven workflows into their tenant or contribute new ones for others to use.

## What You Can Do

- Browse product-focused agent collections for Microsoft Defender, Entra, Intune, and Purview scenarios.
- Import the YAML definitions directly into https://securitycopilot.microsoft.com to light up automated investigations, posture assessments, and governance reports.
- Review each agent's YAML to understand required inputs, skillsets, and workflow steps before running it in your tenant.
- Fork the project, add your own agents, and help expand the community directory on https://agentsforadmins.com.

> 💡 **Learn more:** The live catalog with screenshots and walk-throughs is available at [AgentsForAdmins.com](https://agentsforadmins.com).

## Quick Start: Importing an Agent

1. Pick an agent folder (for example `Defender/ThreatHuntingAgent`).
2. Inspect the agent's `.yaml` file to confirm it matches your scenario and that all referenced skills are available in your environment.
3. Sign in to the Security Copilot portal and choose **Agents → Import**.
4. Upload the agent's `.yaml` file. If the folder includes an icon (`.png`), you can add it during import.
5. Save the agent and run it with a representative query to validate the end-to-end flow.

## Repository Layout

| Path        | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `Defender/` | Agents that orchestrate Microsoft Defender XDR and related threat-intel skills.                |
| `Entra/`    | Agents focused on identity governance, access reviews, and risk management in Microsoft Entra. |
| `Intune/`   | Agents targeting endpoint hygiene, compliance, and lifecycle tasks powered by Intune.          |
| `Purview/`  | Agents for data loss prevention, insider risk, and compliance management in Microsoft Purview. |

Each agent folder contains at minimum:

- `*.yaml` – The importable agent definition for Security Copilot (required).

<!-- AGENTS-TABLE-START -->

## Available Agents

| Service      | Agent Name                                                                                             | Description                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Defender** | [CVE Briefing](Defender/CVEBriefing)                                                                   | Generates a report listing newly published CVEs that are relevant to the specified environment, including severity and affected products.                                                                |
| **Defender** | [Threat Hunting & Investigation Agent](Defender/ThreatHuntingAgent)                                    | Hunts for threats across Defender XDR workloads (endpoints, email, identity, cloud apps), correlates incidents and alerts, maps MITRE ATT&CK techniques, and provides investigation playbooks with co... |
| **Entra**    | [Guest User Access Review & Governance Agent](Entra/GuestUserGovernanceAgent)                          | Automates guest user access review, risk scoring, permissions analysis, and governance reporting for external guests using Entra, Defender XDR, and Purview. Accepts user parameters for inactivity t... |
| **Entra**    | [Identity Risk Assessment Agent](Entra/IdentityRiskAssessmentAgent)                                    | Identifies and triages identity risks from Entra ID Protection, cross-references with Defender XDR and Purview, calculates risk scores, and provides prioritized remediation and automation templates.   |
| **Entra**    | [Privileged Access Management Review Agent](Entra/PrivilegedAccessManagementAgent)                     | Reviews privileged role assignments, PIM configurations, and admin account security to identify and remediate over-privileged access, enforce PIM adoption, and generate governance reports with reme... |
| **Entra**    | [Conditional Access Drift & Coverage Agent](Entra/ConditionalAccessPolicyDriftAgent)                   | Assesses Conditional Access policy coverage, detects drift and risky exclusions, correlates recent sign-in risk signals, and provides prioritized remediation and governance templates.                  |
| **Entra**    | [Workload Identity Secret & Permission Hygiene Agent](Entra/WorkloadIdentitySecurityAgent)             | Reviews Entra applications and service principals for excessive permissions, stale credentials, risky workload identities, and unused app exposure.                                                      |
| **Intune**   | [Endpoint Security & Compliance Posture Agent](Intune/EndpointSecurityCompliancePostureAgent)          | Automates the monitoring and reporting of endpoint security and compliance posture, correlating device, alert, vulnerability, and user data to generate actionable compliance reports with risk scori... |
| **Intune**   | [Inactive Device Cleanup Agent](Intune/InactiveDeviceCleanupAgent)                                     | Automates the identification and cleanup of inactive, stale, or duplicate Intune device enrollments, correlates user and security data from Entra and Defender XDR, and generates prioritized remedia... |
| **Purview**  | [Data Loss Prevention Incident Response Agent](Purview/DLPIncidentResponseAgent)                       | Automates DLP policy violation monitoring, triaging, and response by correlating incidents with user risk scores, data sensitivity, and insider risk indicators. Generates investigation workflows, c... |
| **Purview**  | [Sensitivity Label & Information Protection Governance Agent](Purview/SensitivityLabelGovernanceAgent) | Proactively identifies labeling gaps, shadow sensitive data, and information protection policy violations across Microsoft 365. Analyzes unlabeled content, calculates risk scores, and provides reme... |

_Total Agents: 11_

<!-- AGENTS-TABLE-END -->

## Creating a New Agent

1. Fork this repository.
2. Choose the product area (`Defender/`, `Entra/`, `Intune/`, or `Purview/`).
3. Inside that folder, create a new subfolder named after your agent (for example `Defender/MyNewAgent`).
4. Add your agent's `.yaml` file to the new folder. Name the file to match the agent (for example `MyNewAgent.yaml`).
5. Import the YAML into your own tenant and confirm the workflow runs as expected before opening a pull request.

## Validation Checklist

- [ ] YAML imports without errors in the Security Copilot portal.
- [ ] Agent executes successfully with a realistic test query.
- [ ] Description and inputs in the YAML clearly state any prerequisites or required skillsets.

## Contributing

Community contributions are welcome! To add a new agent:

1. Fork the repository and work from a feature branch.
2. Create a new folder under the appropriate service directory and place your agent's `.yaml` file inside it.
3. (Optional) Add an icon (`.png`) to the same folder.
4. Verify the agent imports and runs in your tenant.
5. Submit a pull request describing the scenario and how you validated it.

Please avoid modifying shared metadata files or adding prompt/test templates—this project focuses solely on import-ready agent packages.
