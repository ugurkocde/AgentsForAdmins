# Testing: Sensitivity Label & Information Protection Governance Agent

**Agent Name:** `Sensitivity Label & Information Protection Governance Agent`

**Tool to test:** `SensitivityLabelGovernanceAgent`

---

## Sample Query Inputs

### 1. Basic Test
```
Show me all unlabeled files containing sensitive information
```

**Expected Output:** List of unlabeled files with sensitive info types detected, including owner, location, and detected content types.

---

### 2. Comprehensive Test
```
Analyze label compliance for the entire organization over the last 30 days and provide remediation recommendations
```

**Expected Output:** Complete governance report with risk scores (1-10), label coverage analysis, shadow sensitive data inventory, auto-labeling recommendations, and remediation workflows.

---

### 3. Department-Specific Test
```
Identify all unlabeled sensitive files in the Finance department created in the last 90 days
```

**Expected Output:** Filtered report showing only Finance department content, sorted by risk score with department-specific context and owner details.

---

### 4. External Sharing Risk Test
```
Find all externally shared documents with no sensitivity label that contain PII or PHI
```

**Expected Output:** High-priority report showing external-shared unlabeled content with PII/PHI, immediate actions required, and owner notification templates.

---

### 5. Label Downgrade Test
```
Show me files where Confidential or Highly Confidential labels were removed or downgraded in the last 30 days
```

**Expected Output:** Report showing label downgrade events, users who performed downgrades, justifications provided, and policy override analysis.

---

### 6. Shadow Sensitive Data Test
```
Identify files containing credit card numbers, SSNs, or bank account information that have no protection labels
```

**Expected Output:** Critical data exposure report sorted by risk score, showing unprotected financial/PII content with urgent remediation actions.

---

### 7. Auto-Labeling Gap Analysis Test
```
Analyze auto-labeling policy effectiveness and recommend new rules based on unlabeled content patterns
```

**Expected Output:** Auto-labeling effectiveness report, common unprotected sensitive info types, suggested new auto-label rules with estimated coverage improvement.

---

### 8. User Labeling Hygiene Test
```
Identify users with the most labeling violations and poor labeling practices
```

**Expected Output:** User hygiene report showing repeat offenders, violation counts, high-volume violators, users needing training, and training recommendations.

---

### 9. Compliance-Focused Test
```
Generate a GDPR compliance report showing all unlabeled personal data and required remediation steps
```

**Expected Output:** Compliance-focused report with GDPR-specific personal data exposure, breach risk assessment, regulatory impact, and audit trail requirements.

---

### 10. Site-Specific Test
```
Analyze label compliance for the Executive SharePoint site and identify high-risk unlabeled content
```

**Expected Output:** Site-filtered report showing unlabeled content in specific location, prioritized by risk with privileged user context if applicable.

---

## Validation Checklist

- [ ] Agent retrieves unlabeled and improperly labeled content from Purview
- [ ] Sensitive info types are correctly detected (SSN, credit cards, PHI, PII)
- [ ] Current vs. recommended labels are identified
- [ ] Sharing scope is analyzed (internal, external, public links)
- [ ] Owner details include UPN, department, manager, job title
- [ ] DLP policy matches and past violations are cross-referenced
- [ ] User risk scores from Insider Risk Management are included
- [ ] Entra user context is enriched (sign-ins, risk level, MFA status)
- [ ] Defender XDR security context is cross-referenced (if available)
- [ ] Label compliance score (1-10) is calculated for each item
- [ ] Label adoption rates by department, site, user group are analyzed
- [ ] Auto-labeling vs. manual labeling effectiveness is compared
- [ ] Label downgrade attempts and overrides are identified
- [ ] Remediation workflows include PowerShell/Graph API scripts
- [ ] Owner notification templates are provided
- [ ] Policy gap analysis identifies missing policies
- [ ] Report is sorted by risk score (highest first)
- [ ] Immediate actions (score 8-10) are highlighted
- [ ] Compliance impact (GDPR/HIPAA/PCI) is assessed
- [ ] Trend analysis shows labeling improvement/degradation over time
- [ ] Report includes executive summary with key metrics
- [ ] Only native Microsoft plugins are used

---

## Expected Risk Score Calculation

| Factor | Impact on Score |
|--------|----------------|
| Highly sensitive content (SSN, credit cards, PHI) + no label + externally shared | Score = 10 |
| Sensitive content + no label + public link | Score = 9-10 |
| Mandatory label missing + external sharing | Score = 8-9 |
| PII/PHI unprotected + repeat offender owner | Score = 8-9 |
| Sensitive content + insufficient label (Public instead of Confidential) | Score = 7-8 |
| Label downgrade from Confidential to lower level | Score = 7-8 |
| Privileged user ownership of unlabeled sensitive content | +2 to score |
| High-risk department (Finance, Legal, HR) | +1 to score |
| Content age > 90 days unprotected | +1 to score |
| Large volume of similar violations by same owner | +1 to score |
| Internal-only sharing with no label | Score = 4-6 |
| Test/non-production content | -2 (lower urgency) |

---

## Common False Positives to Watch For

- Test documents with sample data (should be in test sites)
- Public marketing materials incorrectly detected as sensitive
- Templates with placeholder sensitive info (not real data)
- Archived content that predates labeling policies
- System-generated files or logs with incidental PII
- Legacy documents in inactive sites (low priority)
- Content in personal OneDrive folders for legitimate personal use

---

## Success Criteria

✅ **Agent successfully identifies unlabeled sensitive content**
✅ **Shadow sensitive data (PII/PHI/PCI) is inventoried**
✅ **External sharing risks are prioritized**
✅ **Label coverage analysis shows adoption gaps**
✅ **Risk scores accurately reflect exposure level**
✅ **User labeling hygiene identifies repeat offenders**
✅ **Auto-labeling recommendations are actionable and data-driven**
✅ **Cross-product correlation works (Entra, Defender XDR)**
✅ **Remediation workflows include bulk scripts and templates**
✅ **Compliance impact is clearly articulated (GDPR/HIPAA/PCI)**
✅ **Policy gap analysis identifies missing protection**
✅ **Trend analysis shows improvement/degradation over time**
✅ **Report is executive-ready with clear metrics and recommendations**
✅ **Immediate actions (score 8-10) are clearly flagged**

---

## Sample Expected Outputs

### Executive Summary Example
```
Label Compliance Report - Last 30 Days

Total Files Analyzed: 12,458
Unlabeled Sensitive Files: 347 (2.8%)
Critical Exposures (Score 8-10): 23
At-Risk Departments: Finance (89 files), Legal (56 files), HR (34 files)
Overall Compliance: 97.2%

Immediate Actions Required: 23 items with external sharing or highly sensitive content
Recommended Auto-Label Rules: 5 new policies (estimated 78% reduction in violations)
```

### Risk-Sorted Table Example
```
| Item | Owner | Location | Detected Sensitivity | Current Label | Recommended | Sharing | Risk | Age |
|------|-------|----------|---------------------|---------------|-------------|---------|------|-----|
| Q4_Financials.xlsx | jane@contoso.com | /sites/finance | SSN, Credit Cards | None | Highly Confidential | External | 10 | 45d |
| Employee_SSNs.docx | bob@contoso.com | /personal/bob | SSN, DOB | None | Confidential | Public Link | 10 | 12d |
| Budget_2024.xlsx | alice@contoso.com | /sites/exec | Financial Data | None | Confidential | Internal | 7 | 8d |
```

---

## Notes

- This agent is designed for **proactive governance** (prevention) vs. reactive incident response
- Can be run on a scheduled basis (weekly/monthly) for continuous compliance monitoring
- Complements the DLP Incident Response Agent by preventing violations before they occur
- Focus on helping organizations achieve systematic data protection controls
