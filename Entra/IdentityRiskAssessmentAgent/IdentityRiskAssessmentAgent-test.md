# Testing: Identity Risk Assessment Agent

**Agent Name:** `Identity Risk Assessment Agent`

**Tool to test:** `IdentityRiskAssessmentAgent`

---

## Sample Query Inputs

### 1. Basic Test
```
Show me all users with high identity risk
```

**Expected Output:** List of users with high risk level, including risk detections and basic user info.

---

### 2. Comprehensive Test
```
Identify all risky users from the last 30 days and provide remediation recommendations with risk scores
```

**Expected Output:** Complete risk assessment report with risk scores (1-10), categorized by severity, with detailed remediation steps.

---

### 3. Privileged Account Focus Test
```
Show me privileged accounts (Global Admin, Security Admin) that are currently at risk
```

**Expected Output:** High-priority report focusing only on admin accounts with risk, sorted by severity with urgent remediation actions.

---

### 4. Confirmed Compromise Test
```
Identify users with confirmed compromised accounts and provide immediate response actions
```

**Expected Output:** Critical incident report with confirmed compromises, including emergency remediation scripts and communication templates.

---

### 5. Department-Specific Test
```
Analyze identity risks for users in the Finance department
```

**Expected Output:** Filtered report showing only Finance department users at risk, with risk scores and department-specific context.

---

### 6. Risk Detection Type Test
```
Show me users with impossible travel or anonymous IP detections in the last 14 days
```

**Expected Output:** Targeted report showing users with specific risk detection types, including geographic analysis.

---

### 7. MFA Gap Analysis Test
```
Identify high-risk users without MFA enrollment
```

**Expected Output:** Report showing risky users lacking MFA, prioritized by risk level with MFA enrollment instructions.

---

## Validation Checklist

- [ ] Agent retrieves risky users from Entra ID Protection
- [ ] Risk level and risk state are correctly identified
- [ ] Risk detection types are detailed (leaked credentials, impossible travel, etc.)
- [ ] User details include roles, MFA status, department, manager
- [ ] Privileged accounts are flagged and prioritized
- [ ] Defender XDR alerts are cross-referenced (if available)
- [ ] Purview DLP/insider risk data is included (if available)
- [ ] Identity risk score (1-10) is calculated for each user
- [ ] Remediation actions are specific and include time estimates
- [ ] Report is sorted by risk score (highest first)
- [ ] PowerShell/Graph API remediation scripts are provided
- [ ] Communication templates are included
- [ ] Pattern analysis identifies trends and gaps
- [ ] Only native Microsoft plugins are used
- [ ] Report includes executive summary

---

## Expected Risk Score Calculation

| Factor | Impact on Score |
|--------|----------------|
| Confirmed compromised | Score = 10 |
| High risk + privileged role | Score = 9-10 |
| High risk + no MFA | Score = 8-9 |
| Medium risk + privileged role | Score = 7-8 |
| High risk + active Defender alert | Score = 9-10 |
| Multiple risk detections | +1-2 per additional detection |
| Disabled account | -2 (lower urgency) |
| No recent sign-in activity | -1 (lower urgency) |

---

## Common False Positives to Watch For

- VPN users flagged for "anonymous IP" (may need dismissal)
- Frequent travelers flagged for "impossible travel" (may be legitimate)
- Shared accounts with multiple geographic locations (policy issue)
- Test accounts with intentional risky behavior (should be excluded)

---

## Success Criteria

✅ **Agent successfully identifies high-risk users**
✅ **Privileged accounts are prioritized**
✅ **Remediation steps are actionable and specific**
✅ **Risk scores accurately reflect threat level**
✅ **Cross-product correlation works (Defender XDR, Purview)**
✅ **Report is executive-ready with clear recommendations**
✅ **Automation scripts are provided for bulk remediation**
