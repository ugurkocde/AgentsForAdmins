# Guest User Access Review & Governance Agent

**Agent Name:** `Guest User Access Review & Governance Agent`

**Publisher:** Microsoft | **Products:** Microsoft Entra, Microsoft Defender XDR, Microsoft Purview

---

## Agent Prompt

```
Create an agent that reviews external guest users, identifies stale or risky guest accounts, analyzes permissions, and provides governance recommendations.

IMPORTANT: This agent REQUIRES user input to run. Accept parameters such as inactivity threshold (days), specific domains, or departments from the user's query before executing.

The agent should:

1. Query Entra for all guest users (last 90 days):
   - Guests inactive 90+ days, never signed in, or with pending/expired invitations
   - Guests from specific external domains or with privileged roles

2. For each guest, retrieve from Entra:
   - UPN, email, external domain, creation/invitation/last sign-in dates
   - Account status, invitation state, assigned roles (flag privileged)
   - Group/team memberships, invited by (sponsor), licenses

3. Analyze guest permissions:
   - SharePoint/OneDrive/Teams access, app permissions, PIM roles
   - Conditional Access coverage

4. Cross-reference Defender XDR:
   - Suspicious sign-ins, email threats, compromised accounts
   - If unavailable, note and continue

5. Cross-reference Purview:
   - Sensitive file access, unusual sharing/exfiltration
   - If unavailable, note and continue

6. Calculate guest risk score (1-10):
   - Days inactive, never signed in, privileged roles, sensitive data access
   - Suspicious activity, external domain reputation

7. Generate governance report with:
   - Executive summary: total/stale/never-signed-in/privileged guests
   - Table sorted by risk score, high-priority privileged guests
   - Stale (90+ days) removal candidates, never-signed-in resend/delete recommendations
   - Sensitive data access, external domain analysis, sponsorship tracking, CA gaps

8. Provide remediation actions per category:
   - Stale (90+ days): Contact sponsor, verify need, remove (15 min)
   - Never Signed In: Resend invite or delete (5 min)
   - Privileged: Immediate review, remove if unjustified, require PIM (30-60 min)
   - Risky: Investigate, reset credentials, block if compromised (30 min)
   - Over-Permissioned: Review memberships, reduce to least privilege (15 min)

9. Include automation templates:
   - PowerShell/Graph API scripts: bulk remove, resend invites, delete pending
   - CA policy template for guest restrictions, lifecycle policy, access review config

10. Provide governance templates:
    - Sponsor emails, offboarding checklist, access request workflow, recertification campaign, collaboration policy

11. Identify patterns:
    - Departments/external orgs with most guests, over-permissions, invitation trends, privileged assignment patterns

IMPORTANT: Use only native built-in plugins. Automatically select Microsoft Entra, Defender XDR, and Purview. Do not use third-party plugins.
```

---

## Expected Outcomes

- Identify and prioritize risky or stale guest users
- Reduce guest account sprawl and improve security posture
- Ensure privileged guest access is justified and monitored
- Track external collaboration patterns and risks
- Generate executive-ready governance reports
- Automate guest lifecycle management with scripts
