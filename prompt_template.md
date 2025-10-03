# Security Copilot Agent Prompt Template

Use this template to create effective, detailed agent prompts for Microsoft Security Copilot.

**IMPORTANT: Agent prompts have a maximum limit of 5000 characters. Keep prompts concise while maintaining clarity and completeness.**

---

## Agent Information

**Agent Name:** `[Descriptive Agent Name]`

**Publisher:** [Publisher Name - e.g., Microsoft, Third-party vendor]
**Product(s):** [List all products/skills used - e.g., Microsoft Defender XDR, Microsoft Sentinel, Microsoft Entra]

---

## Agent Prompt Structure

```
Create an agent that [high-level purpose/objective].

The agent should:

1. [Data Collection Step 1] - Query [Skillset/Product] for [specific data]:
   - [Specific criteria 1 with time range if applicable]
   - [Specific criteria 2 with filters]
   - [Specific criteria 3 with thresholds]
   - [Additional context or constraints]

2. [Data Enrichment Step 2] - For each [entity], retrieve from [Skillset/Product]:
   - [Specific data point 1]
   - [Specific data point 2]
   - [Specific data point 3]
   - If [data source] is unavailable, [fallback action or note]

3. [Context Gathering Step 3] - Retrieve [contextual information] from [Skillset/Product] including:
   - [Key attribute 1]
   - [Key attribute 2]
   - [Key attribute 3]
   - [Risk or status indicators]

4. [Analysis/Scoring Step 4] - [Calculate/Assign/Determine] [metric/score] based on:
   - [Criteria 1 with weighting or priority]
   - [Criteria 2 with weighting or priority]
   - [Criteria 3 with weighting or priority]
   - [Additional factors]

5. [Output Generation Step 5] - Generate a [comprehensive/summary] [report/alert/analysis] with:
   - [Output component 1 with sorting/filtering]
   - [Output component 2 with specific details]
   - [Output component 3 with context]
   - [Recommendations prioritized by X]
   - [Timeline or next steps]
   - [Items requiring immediate attention with criteria]

6. [Optional: Troubleshooting Step] - For [scenarios with missing data], provide [specific actions].

Use skills from: [List all skillsets by name].
```

---

## Best Practices Checklist

### ✅ Length & Conciseness
- [ ] Prompt is under 5000 characters (MANDATORY - Security Copilot limit)
- [ ] Every sentence adds value - remove redundant explanations
- [ ] Use abbreviations where clear (UPN, MFA, DLP, etc.)
- [ ] Combine similar points into single bullet items

### ✅ Specificity
- [ ] Include specific time ranges (e.g., "last 7 days", "more than 30 days")
- [ ] Define clear thresholds (e.g., "severity high or critical", "risk score > 7")
- [ ] Specify exact data points needed (not just "get information about")
- [ ] List specific attributes to retrieve (e.g., "user principal name, department, manager")

### ✅ Data Handling
- [ ] Address what to do when data is unavailable
- [ ] Include fallback actions or manual verification steps
- [ ] Specify how to handle missing or incomplete information
- [ ] Define data validation or quality checks

### ✅ Prioritization & Scoring
- [ ] Include a clear prioritization method (risk score, severity, time-based)
- [ ] Define scoring criteria and weights
- [ ] Specify sorting order (highest risk first, most recent, etc.)
- [ ] Identify "immediate attention" thresholds

### ✅ Output Structure
- [ ] Request structured output format (tables, lists, summaries)
- [ ] Specify sorting and grouping requirements
- [ ] Ask for both summary and detailed views
- [ ] Include visual elements where appropriate (charts, graphs)
- [ ] Request export-friendly formats

### ✅ Actionability
- [ ] Request specific remediation recommendations
- [ ] Ask for prioritized action items
- [ ] Include estimated timelines for remediation
- [ ] Provide context for why actions are needed
- [ ] Assign ownership or accountability where possible

### ✅ Context & Enrichment
- [ ] Cross-reference data across multiple skillsets
- [ ] Enrich technical data with business context (users, departments, managers)
- [ ] Include threat intelligence or external context
- [ ] Link related incidents or patterns
- [ ] Provide historical context when relevant

### ✅ Error Handling
- [ ] Explicitly state how to handle missing data sources
- [ ] Include troubleshooting steps for common issues
- [ ] Request logging of data gaps or failures
- [ ] Provide guidance when API limits are reached

---

## Example Use Cases

### 1. Investigation & Triage Agents
**Focus on:** Data collection → Enrichment → Correlation → Prioritization → Recommendations

**Key Elements:**
- Retrieve incidents/alerts with severity filters and time ranges
- Enrich with threat intelligence, user context, device information
- Correlate across multiple data sources
- Assign risk scores based on multiple factors
- Generate prioritized investigation steps

---

### 2. Compliance & Posture Agents
**Focus on:** Assessment → Gap identification → Risk scoring → Remediation planning

**Key Elements:**
- Query for compliance status, policy violations, configuration gaps
- Identify specific policy failures and deviations
- Calculate risk scores based on severity and duration
- Provide remediation steps with timelines
- Track accountability (owners, managers)

---

### 3. Threat Hunting Agents
**Focus on:** Pattern detection → Indicator enrichment → Scope analysis → Hunt queries

**Key Elements:**
- Search across logs and telemetry for specific patterns
- Enrich IOCs with threat intelligence
- Generate KQL/hunting queries for broader searches
- Identify affected entities and scope
- Provide MITRE ATT&CK context

---

### 4. Reporting & Analytics Agents
**Focus on:** Data aggregation → Trend analysis → Visualization → Insights

**Key Elements:**
- Collect metrics over defined time periods
- Calculate trends and changes
- Generate visual representations
- Provide executive summaries
- Identify patterns and anomalies

---

## Template Variables Reference

Use these placeholders when creating new prompts:

| Variable | Description | Example |
|----------|-------------|---------|
| `[Skillset/Product]` | Microsoft product or third-party skill | Microsoft Defender XDR, Splunk |
| `[time range]` | Specific duration | last 24 hours, more than 7 days |
| `[severity level]` | Alert/incident severity | high, critical, medium or above |
| `[entity]` | Object being analyzed | device, user, incident, alert |
| `[metric/score]` | Calculated value | risk score, compliance percentage |
| `[threshold]` | Numeric limit or boundary | > 7, more than 5 failures |
| `[criteria]` | Evaluation factors | time in state, severity, user risk |
| `[action]` | Recommended step | investigate, remediate, escalate |

---

## Common Pitfalls to Avoid

❌ **Over 5000 characters:** Verbose explanations and redundant details
✅ **Concise and complete:** Combine points, use abbreviations, focus on essential instructions

❌ **Too vague:** "Get information about devices"
✅ **Specific:** "Retrieve devices non-compliant for more than 7 days with specific policy failures"

❌ **No time bounds:** "Get all incidents"
✅ **Time-bound:** "Retrieve high-severity incidents from the last 24 hours"

❌ **No fallback:** Assumes all data will be available
✅ **Fallback handling:** "If Defender XDR data is unavailable, note this and recommend manual verification"

❌ **Generic output:** "Provide a report"
✅ **Structured output:** "Generate a summary table sorted by risk score with specific columns for device name, failures, owner, and recommended actions"

❌ **No prioritization:** Lists all findings equally
✅ **Prioritized:** "Sort by risk score, highlight items requiring immediate attention (score 8-10)"

---

## Quick Start Workflow

1. **Define the objective:** What security problem are you solving?
2. **Identify data sources:** Which skillsets contain the data you need?
3. **Map the flow:** Collection → Enrichment → Analysis → Output
4. **Draft the prompt:** Write out all steps and requirements
5. **Check character count:** Must be under 5000 characters - condense if needed
6. **Add specificity:** Time ranges, filters, thresholds, attributes
7. **Include context:** User info, threat intel, historical data
8. **Structure output:** Tables, priorities, recommendations, timelines
9. **Handle gaps:** What if data is missing? Add fallback steps
10. **Review checklist:** Ensure all best practices are covered, verify character count

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2025-10-03 | Added 5000 character limit constraint and condensing best practices |
| 1.0 | 2025-10-03 | Initial template based on Endpoint Security & Compliance Posture Agent improvements |

---

## Notes

- Always test your prompts with sample data first
- Iterate based on actual agent output
- Document what works well for your environment
- Share successful patterns with your team
- Keep time ranges and thresholds aligned with your SLAs
