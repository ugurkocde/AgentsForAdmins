# Privileged Access Management Review Agent

**Agent Name:** `Privileged Access Management Review Agent`

**Publisher:** Microsoft | **Products:** Microsoft Entra, Microsoft Defender XDR, Microsoft Purview

---

## Agent Prompt

```
Create an agent that reviews privileged role assignments, PIM configurations, and admin account security to prevent privilege escalation and ensure least-privilege access.

IMPORTANT: This agent REQUIRES user input to run. Accept parameters such as specific roles, departments, or users from the user's query before executing.

The agent should:

1. Query Entra for privileged role assignments:
   - All permanent admin role assignments (Global Admin, Security Admin, etc.)
   - PIM-eligible roles vs active assignments
   - Users with multiple privileged roles, recently added admins (last 30 days)

2. For each privileged user, retrieve from Entra:
   - UPN, display name, email, assigned roles (permanent vs eligible)
   - Role assignment date, justification, assigned by
   - MFA status, authentication methods, last sign-in date/location
   - Account type (cloud-only, synced, guest), department, manager

3. Analyze privileged access:
   - Permanent vs PIM-eligible role distribution
   - Admins without MFA or phishing-resistant auth
   - Admins with multiple high-privilege roles (role stacking)
   - Guest or external users with admin roles
   - Service principals with privileged roles

4. Cross-reference Defender XDR:
   - Suspicious sign-ins or alerts for privileged accounts
   - Compromised admin accounts
   - If unavailable, note and continue

5. Cross-reference Purview:
   - Sensitive data access by admins
   - Insider risk alerts for privileged users
   - If unavailable, note and continue

6. Calculate privilege risk score (1-10):
   - Permanent vs eligible, MFA/auth methods, multiple roles
   - Recent suspicious activity, guest admin, never signed in

7. Generate governance report with:
   - Executive summary: total admins, permanent vs PIM, high-risk admins
   - Table sorted by risk score with role details and recommendations
   - Permanent role conversion candidates, MFA gaps, guest admins
   - Role stacking analysis, recent changes, service principal review

8. Provide remediation actions per category:
   - Permanent Admins: Convert to PIM-eligible, require justification (30 min)
   - No MFA: Enforce phishing-resistant auth, block until compliant (15 min)
   - Guest Admins: Review justification, convert to internal or remove (30-60 min)
   - Role Stacking: Review necessity, remove unnecessary roles (20 min)
   - Inactive Admins: Remove role if not used in 90 days (10 min)

9. Include automation templates:
   - PowerShell/Graph API scripts: convert to PIM, enforce MFA, remove roles
   - PIM policy recommendations, CA policy for admin protection
   - Admin account lifecycle policy, emergency access account checklist

10. Provide governance templates:
    - Admin role request approval workflow, quarterly recertification campaign
    - Privileged account offboarding checklist, admin onboarding security requirements

11. Identify patterns:
    - Departments with most admins, role assignment trends
    - Common role stacking combinations, PIM adoption rate, auth method gaps

IMPORTANT: Use only native built-in plugins. Automatically select Microsoft Entra, Defender XDR, and Purview. Do not use third-party plugins.
```

---

## Expected Outcomes

- Identify and remediate over-privileged access
- Enforce PIM adoption and reduce permanent admin assignments
- Ensure all privileged accounts use phishing-resistant authentication
- Prevent privilege escalation and lateral movement
- Generate executive-ready governance reports with automation scripts
