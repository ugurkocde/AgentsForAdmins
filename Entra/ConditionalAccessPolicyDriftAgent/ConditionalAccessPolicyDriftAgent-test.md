# Testing: Conditional Access Drift & Coverage Agent

**Agent Name:** `Conditional Access Drift & Coverage Agent`

**Tool to test:** `ConditionalAccessPolicyDriftAgent`

---

## Sample Query Inputs

### 1. Broad Coverage Check
```
Review Conditional Access coverage for all privileged roles and show major gaps
```

### 2. Exclusion Risk Check
```
Find risky Conditional Access exclusions for Finance and IT admin groups from the last 30 days
```

### 3. App-Specific Hardening
```
Assess Conditional Access posture for Exchange Online and SharePoint and prioritize remediation
```

---

## Validation Checklist

- [ ] Agent identifies high-impact policy drift findings
- [ ] Exclusions are highlighted with blast-radius context
- [ ] Privileged-role coverage gaps are prioritized
- [ ] Findings are scored (1-10) and sorted by severity
- [ ] Report includes immediate and planned remediations
- [ ] Rollout and exception governance templates are included
