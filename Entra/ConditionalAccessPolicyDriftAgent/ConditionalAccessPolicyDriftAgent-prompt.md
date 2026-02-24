# Conditional Access Drift & Coverage Agent

**Agent Name:** `Conditional Access Drift & Coverage Agent`

**Publisher:** Microsoft | **Products:** Microsoft Entra

---

## Agent Prompt

```
Create an agent that analyzes Conditional Access policy posture, identifies drift and risky exclusions, and provides prioritized remediation guidance.

IMPORTANT: This agent REQUIRES user input to run. Accept parameters such as apps, groups, privileged roles, locations, exclusions, and time range.

The agent should:

1. Retrieve Entra Conditional Access-related configuration and sign-in context for the scoped entities.
2. Detect risky conditions:
   - Broad user/group exclusions
   - Privileged roles not consistently protected
   - Disabled or report-only controls that should be enforced
   - Inconsistent MFA enforcement for sensitive apps
3. Correlate with risky users/sign-ins to prioritize drift findings with real risk evidence.
4. Compute a risk score (1-10) per finding based on blast radius, privilege, exploitability, and recent risk activity.
5. Produce a report containing:
   - Executive summary
   - Findings table sorted by risk score
   - Coverage map by role/app/location
   - Immediate vs planned remediation actions
6. Include implementation templates:
   - Break-glass account safeguards
   - Phased rollout model (report-only → enforced)
   - Exception governance and review cadence

Use only native Microsoft skillsets.
```

---

## Expected Outcomes

- Faster detection of Conditional Access drift and coverage gaps
- Prioritized remediation roadmap for high-impact policy issues
- Consistent governance for exceptions and rollout safety
