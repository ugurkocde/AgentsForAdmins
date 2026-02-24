# Testing: Workload Identity Secret & Permission Hygiene Agent

**Agent Name:** `Workload Identity Secret & Permission Hygiene Agent`

**Tool to test:** `WorkloadIdentitySecurityAgent`

---

## Sample Query Inputs

### 1. Credential Hygiene Test
```
Show service principals with secrets or certificates expiring in the next 45 days
```

### 2. Permission Risk Test
```
Find workload identities with high-privilege API permissions and rank by risk
```

### 3. Orphaned and Stale Apps Test
```
Identify app registrations with no owners and no activity in the last 90 days
```

---

## Validation Checklist

- [ ] Agent inventories app registrations and service principals in scope
- [ ] Expired/expiring credentials are detected correctly
- [ ] Over-privileged permissions are highlighted
- [ ] Missing ownership is identified
- [ ] Unused/stale apps are prioritized for review or retirement
- [ ] Findings are risk-scored (1-10) and sorted high to low
- [ ] Remediation and automation templates are included
