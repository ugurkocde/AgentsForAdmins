# Workload Identity Secret & Permission Hygiene Agent

**Agent Name:** `Workload Identity Secret & Permission Hygiene Agent`

**Publisher:** Microsoft | **Products:** Microsoft Entra

---

## Agent Prompt

```
Create an agent that assesses workload identity security posture for Entra app registrations and service principals.

IMPORTANT: This agent REQUIRES user input to run. Accept scope parameters such as environment, app names, departments, secret/certificate expiry window, and permission focus.

The agent should:

1. Inventory app registrations and service principals in scope.
2. Enrich each workload identity with:
   - Owners and ownership gaps
   - Credential state (expired/expiring secrets and certificates)
   - Granted API/application permissions
   - Activity status (active vs stale/unused)
3. Identify key risks:
   - High-privilege permissions not justified by usage
   - Missing owners or orphaned apps
   - Expired/expiring credentials
   - Risky or unusual workload identity behavior
4. Assign a risk score (1-10) to each identity.
5. Generate a risk-ranked governance report with:
   - Executive summary and trend indicators
   - Findings table sorted by risk score
   - Immediate actions (credential expiry, excessive permissions)
   - Planned actions (rightsizing, retirement)
6. Provide automation templates for:
   - Credential rotation reminders
   - Permission recertification campaigns
   - Stale app decommission workflow

Use only native Microsoft skillsets.
```

---

## Expected Outcomes

- Reduced workload identity attack surface
- Better credential hygiene and ownership accountability
- Faster remediation of over-privileged and stale service principals
