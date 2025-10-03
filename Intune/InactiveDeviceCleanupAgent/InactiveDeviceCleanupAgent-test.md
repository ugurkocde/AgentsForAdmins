# Testing: Intune Inactive Device Cleanup Agent

**Agent Name:** `Intune Inactive Device Cleanup Agent`

**Tool to test:** `IntuneInactiveDeviceCleanupAgent`

---

## Sample Query Inputs

### 1. Basic Test
```
Show me all devices that haven't checked in for more than 90 days
```

**Expected Output:** List of devices inactive for 90+ days, categorized for immediate removal.

---

### 2. Comprehensive Test
```
Identify all inactive devices and provide cleanup recommendations with priority scores
```

**Expected Output:** Full inactive device inventory with cleanup priority scores (1-10), categorized by inactivity period (30-60, 60-90, 90+ days).

---

### 3. User Account Test
```
Find devices enrolled by disabled or deleted user accounts
```

**Expected Output:** Devices associated with deleted/disabled Entra user accounts, flagged for immediate removal.

---

### 4. Duplicate Detection Test
```
Show me duplicate device enrollments per user and recommend which to keep
```

**Expected Output:** List of users with multiple device enrollments, with recommendation on which device to keep (most recent).

---

### 5. License Reclaim Test
```
Calculate potential license savings from removing devices inactive for 60+ days
```

**Expected Output:** Summary showing number of devices, estimated license reclaim value, and cost savings analysis.

---

## Validation Checklist

- [ ] Agent retrieves device check-in dates from Intune
- [ ] Devices are categorized by inactivity (30-60, 60-90, 90+ days)
- [ ] User account status is checked (active/disabled/deleted)
- [ ] Cleanup priority score (1-10) is calculated
- [ ] Duplicate enrollments are identified per user
- [ ] Defender XDR alerts are checked for security concerns
- [ ] Remediation actions are provided per category
- [ ] Communication templates are included
- [ ] Only native Microsoft plugins are used
