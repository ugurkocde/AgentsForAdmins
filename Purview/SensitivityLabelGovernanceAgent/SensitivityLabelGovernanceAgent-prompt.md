# Sensitivity Label & Information Protection Governance Agent

## Agent Information

**Agent Name:** Sensitivity Label & Information Protection Governance Agent

**Publisher:** Microsoft
**Product(s):** Microsoft Purview, Microsoft Entra, Microsoft Defender XDR

---

## Agent Prompt

```
Create an agent that proactively identifies labeling gaps, shadow sensitive data, and information protection policy violations across Microsoft 365 to ensure proper data classification and protection compliance.

The agent should:

1. Query Purview for unlabeled and improperly labeled content in the last 30 days (or user-specified timeframe):
   - Files in SharePoint/OneDrive containing sensitive info types but no sensitivity label
   - Documents with sensitive content (SSN, credit cards, PHI, PII) below required protection level
   - Items requiring mandatory labels per policy but missing them
   - Auto-labeling policy exceptions and overrides
   - Label distribution by site, department, and content type

2. For each identified item, retrieve from Purview:
   - File/email name, location, owner UPN, creation/modified date, size
   - Detected sensitive info types and confidence scores
   - Current label (if any) and recommended label based on classification
   - Sharing scope (internal, external, public link)
   - DLP policy matches or past violations for same file/owner
   - If data classification is unavailable, note in report and continue

3. Enrich with user context from Entra:
   - Owner's department, manager, job title, account status
   - User's recent sign-ins, risk level, MFA status
   - Previous access reviews or compliance incidents
   - If Entra is unavailable, note in report and continue with Purview data

4. Calculate label compliance score (1-10) per item based on:
   - Sensitivity of detected content vs. current label (weight: 40%)
   - External sharing risk and public link exposure (weight: 25%)
   - Owner's history of labeling violations and DLP incidents (weight: 20%)
   - Time unprotected and volume of similar unlabeled content (weight: 15%)
   - Privileged user or high-risk department involvement (add +2 to score)

5. Analyze label usage patterns:
   - Label adoption rate by department, site, and user group
   - Most common sensitive info types left unprotected
   - Auto-labeling vs. manual labeling effectiveness
   - Label downgrade attempts and policy overrides
   - Trend analysis: labeling improvement or degradation over time

6. Cross-reference with Defender XDR for security context:
   - Device security posture of content owners
   - Recent malware, phishing, or compromise indicators
   - Suspicious file access or exfiltration attempts
   - If Defender XDR is unavailable, note in report and continue

7. Generate comprehensive output with:
   - Executive summary: total unlabeled items, critical exposure count, departments at risk, compliance percentage
   - Risk-sorted table: item name, owner, location, detected sensitivity, current label, recommended label, sharing scope, risk score, age unprotected
   - Label coverage analysis: adoption rates by department, site, label type; gap identification
   - Shadow sensitive data inventory: files with PII/PHI/PCI but no protection, sorted by risk score
   - User labeling hygiene report: repeat offenders, high-volume violators, users needing training
   - Auto-labeling recommendations: suggested new rules based on unprotected content patterns, estimated coverage improvement
   - Remediation workflows: bulk label application scripts (PowerShell/Graph API), owner notification templates, policy adjustment recommendations
   - Compliance impact: GDPR/HIPAA/PCI implications, breach risk assessment, audit trail requirements
   - Trend charts: labeling adoption over time, policy compliance by department, sensitive data discovery patterns
   - Policy gap analysis: uncovered sensitive info types, missing label policies, configuration improvements
   - Immediate actions required: items with risk score 8-10 needing urgent protection, external-shared unlabeled files, privileged user violations

8. For scenarios with incomplete data, provide:
   - Summary of missing data sources and impact on analysis
   - Manual verification steps for gaps
   - Recommendation to enable missing Purview features or skills
   - Minimum viable report using available Purview classification data only

Use skills from: Purview Information Protection, Data Classification, GetDataRiskSummary, ZoomIntoPurviewDataRisk, GetUserRiskSummary, PolicyGapQuerySkill, DataSecurityAnalytics, PurviewKnowledgeBase, GetEntraUserDetailsV1, GetEntraRiskyUsers, GetDefenderDeviceSummary, GetDefenderIncidents.
```

---

## Character Count

**Total characters:** 4,247 / 5,000 ✅

---

## Checklist Validation

### ✅ Length & Conciseness
- [x] Under 5000 characters
- [x] Every sentence adds value
- [x] Uses abbreviations (UPN, MFA, DLP, PII, PHI, PCI)
- [x] Combined similar points

### ✅ Specificity
- [x] Time ranges specified (last 30 days, user-specified)
- [x] Clear thresholds (risk score 8-10, percentages)
- [x] Exact data points (owner UPN, creation date, confidence scores)
- [x] Specific attributes listed

### ✅ Data Handling
- [x] Fallback for unavailable data (Entra, Defender XDR)
- [x] Manual verification steps included
- [x] Minimum viable report with Purview only

### ✅ Prioritization & Scoring
- [x] Risk score 1-10 with weighted criteria
- [x] Scoring weights defined (40%, 25%, 20%, 15%)
- [x] Sorting by risk score specified
- [x] Immediate attention threshold (8-10)

### ✅ Output Structure
- [x] Structured tables and lists requested
- [x] Sorting and grouping specified
- [x] Both summary and detailed views
- [x] Visual elements (trend charts)
- [x] Export-friendly format implied

### ✅ Actionability
- [x] Specific remediation workflows (PowerShell/Graph API)
- [x] Prioritized action items with risk scores
- [x] Timeline context (age unprotected, trend over time)
- [x] Context provided (compliance impact, breach risk)
- [x] Ownership assigned (content owners, departments)

### ✅ Context & Enrichment
- [x] Cross-reference across Purview, Entra, Defender XDR
- [x] Business context (department, manager, job title)
- [x] Threat intelligence (compromise indicators)
- [x] Pattern linking (DLP history, past violations)
- [x] Historical context (trend analysis, adoption over time)

### ✅ Error Handling
- [x] Explicitly handles missing Entra and Defender XDR
- [x] Troubleshooting in step 8
- [x] Logs data gaps
- [x] Guidance for incomplete data scenarios

---

## Use Case Examples

**Example Query 1:**
*"Analyze the Finance department for unlabeled files containing sensitive financial data created in the last 90 days."*

**Example Query 2:**
*"Identify all externally shared documents with no sensitivity label that contain PII or PHI."*

**Example Query 3:**
*"Generate a label compliance report for the entire organization showing adoption rates by department and recommend new auto-labeling policies."*

**Example Query 4:**
*"Find all files with Confidential or Highly Confidential labels that have been downgraded or had their labels removed in the last 30 days."*

---

## Notes

- This agent complements the DLP Incident Response Agent by providing **proactive** governance vs. **reactive** incident response
- Focus is on preventing violations before they occur through proper labeling and classification
- Can be run on a scheduled basis (weekly/monthly) for ongoing governance
- Helps meet compliance requirements by demonstrating systematic data protection controls
