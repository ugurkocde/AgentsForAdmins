# Testing: Threat Hunting & Investigation Agent

**Agent Name:** `Threat Hunting & Investigation Agent`

**Tool to test:** `ThreatHuntingAgent`

---

## Sample Query Inputs

### 1. Basic Test
```
Show me all high-severity security incidents from the last 7 days
```

**Expected Output:** List of high-severity incidents with affected entities, attack timeline, and current status.

---

### 2. Comprehensive Test
```
Hunt for active threats and provide investigation workflows with threat scores
```

**Expected Output:** Complete threat hunting report with threat scores (1-10), MITRE ATT&CK mapping, investigation playbooks, and containment actions.

---

### 3. Ransomware Hunt Test
```
Hunt for ransomware indicators and suspicious file encryption activity
```

**Expected Output:** Targeted report showing ransomware detections, file modification patterns, C2 communication, with isolation and recovery recommendations.

---

### 4. Phishing Campaign Test
```
Investigate phishing campaigns and compromised email accounts from the last 14 days
```

**Expected Output:** Phishing campaign analysis with malicious email details, affected users, credential theft indicators, password reset recommendations.

---

### 5. Lateral Movement Test
```
Identify lateral movement and privilege escalation attempts
```

**Expected Output:** Report showing suspicious authentication patterns, privilege changes, remote access, with MITRE T1078/T1068 mapping and containment steps.

---

### 6. IOC Hunt Test
```
Hunt for threats related to IP 203.0.113.45 or domain evil.example.com
```

**Expected Output:** Cross-product correlation showing all activity related to specified IOCs, affected entities, and blocking recommendations.

---

### 7. Insider Threat Test
```
Investigate potential insider threats with data exfiltration indicators
```

**Expected Output:** Report correlating Defender alerts with Purview DLP violations and Entra risky sign-ins, identifying suspicious data access patterns.

---

## Validation Checklist

- [ ] Agent retrieves incidents and alerts from Defender XDR
- [ ] Incident severity, category, and status are captured
- [ ] Affected users, devices, and apps are identified
- [ ] Attack timeline and progression are detailed
- [ ] MITRE ATT&CK techniques are mapped
- [ ] IOCs (IPs, domains, hashes) are extracted
- [ ] Entra sign-in logs are cross-referenced (if available)
- [ ] Purview DLP/insider risk data is included (if available)
- [ ] Threat severity score (1-10) is calculated
- [ ] Investigation playbooks match threat type
- [ ] Containment actions include time estimates
- [ ] Report is sorted by threat score (highest first)
- [ ] KQL queries for advanced hunting are provided
- [ ] Automated response scripts are included
- [ ] Only native Microsoft plugins are used
- [ ] Report includes executive summary

---

## Expected Threat Score Calculation

| Factor | Impact on Score |
|--------|----------------|
| Critical incident + active | Score = 10 |
| High severity + privileged account | Score = 9-10 |
| Ransomware/confirmed breach | Score = 10 |
| Lateral movement detected | Score = 8-9 |
| Data exfiltration + DLP alert | Score = 9-10 |
| Phishing + credential theft | Score = 7-8 |
| Medium severity + resolved | Score = 4-6 |
| Low severity + false positive | Score = 1-3 |
| Multiple MITRE techniques | +1-2 per technique |

---

## Common Threat Scenarios to Watch For

- **Business Email Compromise (BEC):** Compromised executive accounts, wire fraud attempts
- **Ransomware:** File encryption, shadow copy deletion, C2 beaconing
- **Credential Harvesting:** Phishing kits, keyloggers, OAuth abuse
- **Supply Chain Attacks:** Compromised third-party apps, malicious updates
- **Insider Threats:** Abnormal data access, exfiltration to personal accounts

---

## Success Criteria

✅ **Agent successfully hunts threats across all Defender workloads**
✅ **Incidents are correlated with affected entities and IOCs**
✅ **MITRE ATT&CK techniques are accurately mapped**
✅ **Investigation playbooks are specific to threat type**
✅ **Containment actions are actionable with time estimates**
✅ **Cross-product correlation works (Entra, Purview)**
✅ **KQL queries enable advanced hunting**
✅ **Threat patterns and trends are identified**

---

## MITRE ATT&CK Coverage

This agent should detect and map:
- **Initial Access:** T1566 (Phishing), T1078 (Valid Accounts)
- **Execution:** T1204 (User Execution), T1059 (Command/Scripting)
- **Persistence:** T1098 (Account Manipulation), T1136 (Create Account)
- **Privilege Escalation:** T1068 (Exploitation), T1484 (Group Policy)
- **Defense Evasion:** T1562 (Impair Defenses), T1070 (Indicator Removal)
- **Credential Access:** T1110 (Brute Force), T1003 (Credential Dumping)
- **Lateral Movement:** T1021 (Remote Services), T1550 (Token Theft)
- **Exfiltration:** T1567 (Cloud Storage), T1048 (Exfil over C2)

---

## Compliance Benefits

This agent helps with:
- **NIST Cybersecurity Framework:** Detect, Respond, Recover functions
- **ISO 27001:** Security incident management and forensics
- **SOC 2:** Incident detection and response procedures
- **GDPR:** Data breach detection and notification
- **Cyber Insurance:** Evidence of active threat hunting and detection
