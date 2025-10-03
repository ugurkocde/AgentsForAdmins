# Testing: Privileged Access Management Review Agent

**Agent Name:** `Privileged Access Management Review Agent`

**Tool to test:** `PrivilegedAccessManagementAgent`

---

## Sample Query Inputs

### 1. Basic Test
```
Show me all users with permanent admin role assignments
```

**Expected Output:** List of all users with permanent (non-PIM) admin roles, sorted by role privilege level.

---

### 2. Comprehensive Test
```
Review all privileged role assignments and provide governance recommendations with risk scores
```

**Expected Output:** Complete privileged access report with risk scores (1-10), categorized by risk level, with PIM conversion and MFA recommendations.

---

### 3. PIM Adoption Test
```
Compare permanent vs PIM-eligible admin role assignments
```

**Expected Output:** Report showing PIM adoption rate, permanent roles that should be converted to PIM-eligible, with conversion scripts.

---

### 4. MFA Gap Test
```
Identify privileged users without phishing-resistant authentication
```

**Expected Output:** High-priority report of admins lacking MFA or using legacy auth methods, with enforcement recommendations.

---

### 5. Guest Admin Test
```
Show me guest or external users with administrative roles
```

**Expected Output:** Critical report of guest accounts with admin roles, with justification review requirements and removal recommendations.

---

### 6. Role Stacking Test
```
Identify users with multiple privileged roles (role stacking)
```

**Expected Output:** Report showing users assigned to multiple high-privilege roles, with least-privilege recommendations.

---

### 7. Recent Changes Test
```
Show admin role assignments added in the last 30 days
```

**Expected Output:** Audit report of recent role assignments, including who assigned them, justification, and whether they should be permanent or PIM.

---

## Validation Checklist

- [ ] Agent retrieves all admin role assignments from Entra
- [ ] Permanent vs PIM-eligible roles are distinguished
- [ ] Role assignment dates and assigned-by users are captured
- [ ] MFA status and authentication methods are verified
- [ ] Guest and external admin accounts are flagged
- [ ] Role stacking (multiple roles per user) is identified
- [ ] Defender XDR suspicious activity is checked (if available)
- [ ] Purview insider risk data is included (if available)
- [ ] Privilege risk score (1-10) is calculated
- [ ] Remediation actions include time estimates
- [ ] Report is sorted by risk score (highest first)
- [ ] PowerShell/Graph API scripts for PIM conversion provided
- [ ] PIM policy and CA policy recommendations included
- [ ] Only native Microsoft plugins are used
- [ ] Report includes executive summary

---

## Expected Risk Score Calculation

| Factor | Impact on Score |
|--------|----------------|
| Permanent Global Admin | Score = 9-10 |
| Permanent admin + no MFA | Score = 10 |
| Guest with admin role | Score = 9-10 |
| Multiple privileged roles (3+) | Score = 8-9 |
| Admin inactive 90+ days | Score = 7-8 |
| Suspicious Defender activity + admin | Score = 10 |
| PIM-eligible + MFA + active | Score = 2-4 |
| Admin assigned in last 7 days | +1 (needs review) |

---

## Common Scenarios to Watch For

- **Emergency access accounts:** Should be excluded from MFA enforcement (but monitored)
- **Service accounts with admin roles:** Should use managed identities instead
- **Break-glass accounts:** Should be permanent but highly monitored and audited
- **Recently departed admins:** Roles should be revoked immediately upon offboarding
- **Temporary project admins:** Should be PIM time-bound, not permanent

---

## Success Criteria

✅ **Agent successfully identifies all permanent admin assignments**
✅ **PIM-eligible roles are compared against permanent assignments**
✅ **MFA gaps for privileged accounts are highlighted**
✅ **Guest admins are flagged for immediate review**
✅ **Role stacking is identified with least-privilege guidance**
✅ **Risk scores accurately reflect privilege escalation risk**
✅ **PIM conversion scripts are provided for automation**
✅ **Governance recommendations are actionable and time-estimated**

---

## Compliance Benefits

This agent helps with:
- **Zero Trust:** Verify explicitly, use least privilege, assume breach
- **SOC 2 compliance:** Regular privileged access reviews
- **PCI-DSS:** Restrict admin access, enforce MFA for privileged accounts
- **ISO 27001:** Privileged access management and monitoring
- **NIST 800-53:** Least privilege (AC-6) and separation of duties
