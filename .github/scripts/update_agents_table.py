#!/usr/bin/env python3
"""
Script to scan service folders for agents and update README with a table of available agents.
"""

import os
import yaml
from pathlib import Path
import re

# Service directories to scan
SERVICE_DIRS = ['Defender', 'Entra', 'Intune', 'Purview']

def find_agent_yamls():
    """Find all agent YAML files in service directories."""
    agents = []

    for service in SERVICE_DIRS:
        service_path = Path(service)
        if not service_path.exists():
            continue

        # Find all YAML files in subdirectories
        for yaml_file in service_path.glob('**/*.yaml'):
            agents.append({
                'service': service,
                'path': yaml_file,
                'folder': yaml_file.parent.name
            })

        for yaml_file in service_path.glob('**/*.yml'):
            agents.append({
                'service': service,
                'path': yaml_file,
                'folder': yaml_file.parent.name
            })

    return sorted(agents, key=lambda x: (x['service'], x['folder']))

def extract_agent_info(yaml_path):
    """Extract agent information from YAML file."""
    try:
        with open(yaml_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        if not data:
            return None

        # Extract from Descriptor section
        descriptor = data.get('Descriptor', {})

        return {
            'name': descriptor.get('Name', 'Unknown'),
            'display_name': descriptor.get('DisplayName', 'Unknown'),
            'description': descriptor.get('Description', 'No description available').strip()
        }
    except Exception as e:
        print(f"Error reading {yaml_path}: {e}")
        return None

def generate_agents_table(agents_data):
    """Generate markdown table for agents."""
    if not agents_data:
        return "No agents found."

    # Start with the table header
    lines = [
        "## Available Agents",
        "",
        "| Service | Agent Name | Description |",
        "| ------- | ---------- | ----------- |"
    ]

    for agent in agents_data:
        # Truncate description if too long
        desc = agent['description']
        if len(desc) > 200:
            desc = desc[:197] + "..."

        # Clean up description - remove newlines and excessive spaces
        desc = re.sub(r'\s+', ' ', desc)

        # Create link to agent folder
        folder_link = f"`{agent['service']}/{agent['folder']}`"

        lines.append(f"| **{agent['service']}** | [{agent['display_name']}]({agent['service']}/{agent['folder']}) | {desc} |")

    lines.append("")
    lines.append(f"*Total Agents: {len(agents_data)}*")
    lines.append("")

    return "\n".join(lines)

def update_readme(table_content):
    """Update README.md with the agents table."""
    readme_path = Path('README.md')

    if not readme_path.exists():
        print("README.md not found!")
        return False

    with open(readme_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define markers for where to insert/update the table
    start_marker = "<!-- AGENTS-TABLE-START -->"
    end_marker = "<!-- AGENTS-TABLE-END -->"

    # Check if markers exist
    if start_marker in content and end_marker in content:
        # Replace existing table
        pattern = re.compile(
            re.escape(start_marker) + r'.*?' + re.escape(end_marker),
            re.DOTALL
        )
        new_content = pattern.sub(
            f"{start_marker}\n{table_content}\n{end_marker}",
            content
        )
    else:
        # Find where to insert the table (after Repository Layout section)
        insert_point = content.find("## Creating a New Agent")

        if insert_point == -1:
            # If section not found, add at the end
            new_content = content.rstrip() + "\n\n" + f"{start_marker}\n{table_content}\n{end_marker}\n"
        else:
            # Insert before "Creating a New Agent" section
            new_content = (
                content[:insert_point] +
                f"{start_marker}\n{table_content}\n{end_marker}\n\n" +
                content[insert_point:]
            )

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    """Main function to orchestrate the table generation."""
    print("Scanning for agents...")

    # Find all agent YAML files
    agent_files = find_agent_yamls()
    print(f"Found {len(agent_files)} agent files")

    # Extract information from each YAML
    agents_data = []
    for agent_file in agent_files:
        info = extract_agent_info(agent_file['path'])
        if info:
            agents_data.append({
                'service': agent_file['service'],
                'folder': agent_file['folder'],
                'name': info['name'],
                'display_name': info['display_name'],
                'description': info['description']
            })

    print(f"Successfully extracted information for {len(agents_data)} agents")

    # Generate the table
    table_content = generate_agents_table(agents_data)

    # Update README
    if update_readme(table_content):
        print("README.md updated successfully!")
    else:
        print("Failed to update README.md")
        return 1

    return 0

if __name__ == "__main__":
    exit(main())