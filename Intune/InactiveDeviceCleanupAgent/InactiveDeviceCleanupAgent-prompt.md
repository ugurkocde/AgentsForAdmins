# Intune Inactive Device Cleanup Agent

**Agent Name:** `Intune Inactive Device Cleanup Agent`

**Publisher:** Microsoft | **Products:** Microsoft Intune, Microsoft Entra, Microsoft Defender XDR

---

## Agent Prompt

```
Create an agent that identifies inactive and stale Intune device enrollments and provides cleanup recommendations.

IMPORTANT: This agent REQUIRES user input to run. The agent should accept parameters such as inactivity threshold (days), specific departments, user names, or device types from the user's query before executing.

The agent should:

1. Query Intune for potentially inactive devices using these criteria:
   - Devices that haven't checked in for 30-60 days (warning category)
   - Devices that haven't checked in for 60-90 days (action needed category)
   - Devices that haven't checked in for more than 90 days (critical removal category)
   - Devices with "Unknown" or "Not Applicable" compliance status
   - Duplicate device enrollments for the same user
   - Devices enrolled but never reported compliance data

2. For each inactive device, retrieve from Intune:
   - Device name, serial number, OS type, OS version, device model
   - Last check-in date and enrollment date
   - Primary user assignment and management state
   - Compliance state and managed app count
   - Enrollment type (user, device, auto-enrollment)

3. Retrieve user information from Entra for each device owner including:
   - User principal name, display name, email address
   - User account status (active, disabled, deleted)
   - Department, manager information, last sign-in date
   - If user account is deleted or disabled, flag device for immediate removal

4. Cross-reference with Defender XDR to check:
   - Any active alerts or threats on inactive devices in the last 90 days
   - Last seen date in Defender (may differ from Intune check-in)
   - If Defender shows recent activity but Intune shows inactive, flag as sync issue
   - If Defender XDR data is unavailable, note this and recommend manual verification

5. Calculate a cleanup priority score (1-10) for each device based on:
   - Days since last check-in (more days = higher priority)
   - User account status (deleted/disabled user = highest priority)
   - Duplicate enrollments (duplicates = higher priority)
   - Device age and enrollment type (old test devices = higher priority)
   - Active security threats (active threats = lower priority, investigate first)

6. Generate a comprehensive inactive device report with:
   - Executive summary: total inactive devices, devices recommended for immediate deletion, estimated license reclaim value
   - Summary table sorted by cleanup priority score (highest first)
   - Devices categorized by inactivity: 30-60 days (warning), 60-90 days (action needed), 90+ days (remove)
   - Devices with disabled or deleted user accounts (immediate removal candidates)
   - Duplicate device enrollments per user with recommendation to keep most recent
   - Devices enrolled but never compliant or never checked in
   - User communication templates for each category

7. For each device category, provide specific remediation actions:
   - Immediate Deletion (90+ days, deleted users): deletion process, no communication needed
   - Action Needed (60-90 days): email template, 7-day warning before removal, reactivation instructions
   - Warning (30-60 days): notification to user, check-in reminder, troubleshooting steps
   - Duplicates: identify which to keep, safe removal process
   - Sync Issues: troubleshooting when Intune and Defender data conflict

8. For devices with active security alerts despite being inactive:
   - Create separate high-priority investigation list
   - Do NOT recommend deletion until threats are investigated
   - Provide alert details and escalation procedures

IMPORTANT: Use only native built-in plugins. Automatically select and enable the relevant Microsoft plugins needed for this task, including: Microsoft Intune, Microsoft Entra, and Microsoft Defender XDR. Do not use any third-party or custom plugins.
```

---

## Expected Outcomes

- Maintain clean device inventory
- Reclaim licenses from inactive devices
- Identify and remove stale enrollments
- Detect duplicate device registrations
- Reduce security risks from abandoned devices
- Improve compliance reporting accuracy
