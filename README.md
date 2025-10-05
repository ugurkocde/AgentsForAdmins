# Security Copilot Hub

[![Visit SecurityCopilotHub.com](https://img.shields.io/badge/Website-SecurityCopilotHub.com-0078D4?style=for-the-badge&logo=microsoft)](https://securitycopilothub.com)
[![LinkedIn Community](https://img.shields.io/badge/Join-LinkedIn%20Community-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/groups/15356022/)
[![Agents Available](https://img.shields.io/badge/Agents-7-success?style=for-the-badge&logo=shield)](#repository-layout)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-44c767?style=for-the-badge&logo=github)](#contributing)

Security Copilot Hub is a community-driven catalog of ready-to-use agents for the Microsoft Security Copilot portal. Each agent is packaged so security teams can quickly import proven workflows into their tenant or contribute new ones for others to use.

---

## What You Can Do

- Browse product-focused agent collections for Microsoft Defender, Entra, and Intune scenarios.
- Import the YAML definitions directly into https://securitycopilot.microsoft.com to light up automated investigations, posture assessments, and governance reports.
- Review each agent's YAML to understand required inputs, skillsets, and workflow steps before running it in your tenant.
- Fork the project, add your own agents, and help expand the community directory on https://securitycopilothub.com.

> 💡 **Learn more:** The live catalog with screenshots and walk-throughs is available at [SecurityCopilotHub.com](https://securitycopilothub.com).

---

## Quick Start: Importing an Agent

1. Pick an agent folder (for example `Defender/ThreatHuntingAgent`).
2. Inspect the agent's `.yaml` file to confirm it matches your scenario and that all referenced skills are available in your environment.
3. Sign in to the Security Copilot portal and choose **Agents → Import**.
4. Upload the agent's `.yaml` file. If the folder includes an icon (`.png`), you can add it during import.
5. Save the agent and run it with a representative query to validate the end-to-end flow.

---

## Repository Layout

| Path        | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `Defender/` | Agents that orchestrate Microsoft Defender XDR and related threat-intel skills.                |
| `Entra/`    | Agents focused on identity governance, access reviews, and risk management in Microsoft Entra. |
| `Intune/`   | Agents targeting endpoint hygiene, compliance, and lifecycle tasks powered by Intune.          |

Each agent folder contains at minimum:

- `*.yaml` – The importable agent definition for Security Copilot (required).
- `*.png` – Optional icon shown inside the Security Copilot portal gallery.

---

## Creating a New Agent

1. Fork this repository.
2. Choose the product area (`Defender/`, `Entra/`, or `Intune/`).
3. Inside that folder, create a new subfolder named after your agent (for example `Defender/MyNewAgent`).
4. Add your agent's `.yaml` file to the new folder. Name the file to match the agent (for example `MyNewAgent.yaml`).
5. Import the YAML into your own tenant and confirm the workflow runs as expected before opening a pull request.

> Optional: Include an icon (`.png`) in the same folder to brighten the gallery tile. No other supporting files are required for contributions.

---

## Validation Checklist

- [ ] YAML imports without errors in the Security Copilot portal.
- [ ] Agent executes successfully with a realistic test query.
- [ ] Description and inputs in the YAML clearly state any prerequisites or required skillsets.
- [ ] Optional icon displays correctly in the portal tile preview.

---

## Contributing

Community contributions are welcome! To add a new agent:

1. Fork the repository and work from a feature branch.
2. Create a new folder under the appropriate service directory and place your agent's `.yaml` file inside it.
3. (Optional) Add an icon (`.png`) to the same folder.
4. Verify the agent imports and runs in your tenant.
5. Submit a pull request describing the scenario and how you validated it.

Please avoid modifying shared metadata files or adding prompt/test templates—this project focuses solely on import-ready agent packages.

If you want your agent showcased on [SecurityCopilotHub.com](https://securitycopilothub.com), mention it in your PR or contact the site maintainers after merge.

---

## Resources

- [Security Copilot documentation](https://learn.microsoft.com/security-copilot/)
- [Security Copilot community forum](https://learn.microsoft.com/answers/tags/339/security-copilot)
- [Microsoft Defender XDR documentation](https://learn.microsoft.com/defender-xdr/)
- [Microsoft Entra documentation](https://learn.microsoft.com/entra/)
- [Microsoft Intune documentation](https://learn.microsoft.com/intune/)

Stay updated as new agents are added—star or watch this repository to follow along.
