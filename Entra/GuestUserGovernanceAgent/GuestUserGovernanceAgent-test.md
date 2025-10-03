# Testing: Guest User Access Review & Governance Agent

**Agent Name:** `Guest User Access Review & Governance Agent`

**Tool to test:** `GuestUserGovernanceAgent`

---

## Sample Query Inputs

### 1. Basic Test
```
Show me all guest users that haven't signed in for more than 90 days
```

**Expected Output:** List of stale guest accounts with last sign-in dates, sorted by inactivity.

---

### 2. Comprehensive Test
```
Review all guest users and provide governance recommendations with risk scores
```

**Expected Output:** Complete guest governance report with risk scores (1-10), categorized by risk level, with cleanup recommendations.

---

### 3. Never Signed In Test
```
Identify guest users who were invited but never signed in
```

**Expected Output:** List of guests with pending/expired invitations, invitation date, invited by user, recommendation to resend or delete.

---

### 4. Privileged Guest Test
```
Show me guest users with privileged roles (Global Admin, Security Admin, etc.)
```

**Expected Output:** High-priority report of guests with admin roles, including justification review requirements.

---

### 5. External Domain Analysis Test
```
Analyze guest users by external organization/domain
```

**Expected Output:** Breakdown of guest count by external email domain, identifying which external organizations have the most access.

---

### 6. Sensitive Data Access Test
```
Show guest users with access to sensitive files or data
```

**Expected Output:** Report showing guests accessing sensitive SharePoint/Teams content, with DLP policy matches if available.

---

### 7. Sponsor Review Test
```
List all guest users invited by john.doe@company.com
```

**Expected Output:** All guests invited by specific user, with their current status and access levels for sponsor review.

---

## Validation Checklist

- [ ] Agent retrieves all guest users from Entra
- [ ] Last sign-in dates are accurately captured
- [ ] Never-signed-in guests are identified
- [ ] Privileged role assignments are flagged
- [ ] Group memberships are listed
- [ ] Internal sponsor (invited by) is tracked
- [ ] External email domains are analyzed
- [ ] Guest risk score (1-10) is calculated
- [ ] Defender XDR suspicious activity is checked (if available)
- [ ] Purview sensitive data access is checked (if available)
- [ ] Remediation actions include time estimates
- [ ] Report is sorted by risk score (highest first)
- [ ] PowerShell/Graph API cleanup scripts are provided
- [ ] Communication templates for sponsors are included
- [ ] External organization patterns are identified
- [ ] Only native Microsoft plugins are used
- [ ] Report includes executive summary

---

## Expected Risk Score Calculation

| Factor | Impact on Score |
|--------|----------------|
| Privileged guest role | Score = 9-10 |
| 180+ days inactive | Score = 8-9 |
| 90-180 days inactive | Score = 6-7 |
| Never signed in (90+ days old invite) | Score = 7-8 |
| Access to sensitive data + inactive | Score = 8-9 |
| Suspicious Defender activity | Score = 9-10 |
| Active + no suspicious activity | Score = 1-3 |
| Never signed in (< 30 days) | Score = 2-3 (low priority) |

---

## Common Scenarios to Watch For

- **Contractor offboarding:** Guests should be removed when external contract ends
- **Partner transitions:** When partnerships end, guest access should be revoked
- **Trial/POC accounts:** Test accounts from evaluations may remain indefinitely
- **M&A scenarios:** Acquired company guests may need reclassification
- **Vendor access:** Ensure vendor guests have least-privilege access only

---

## Success Criteria

✅ **Agent successfully identifies stale guests (90+ days)**
✅ **Privileged guests are highlighted for immediate review**
✅ **Never-signed-in guests are tracked with invitation age**
✅ **Risk scores accurately reflect threat/governance risk**
✅ **External organization patterns are clear**
✅ **Sponsorship tracking enables accountability**
✅ **Remediation scripts are provided for bulk cleanup**
✅ **Guest lifecycle governance recommendations are actionable**

---

## Compliance Benefits

This agent helps with:
- **SOC 2 compliance:** Regular access reviews for external parties
- **ISO 27001:** Guest user lifecycle management
- **GDPR:** External data processor access control
- **Zero Trust:** Verify and validate all guest access continuously
- **Least Privilege:** Identify over-permissioned external users
