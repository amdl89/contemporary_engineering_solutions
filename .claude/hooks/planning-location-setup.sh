#!/bin/bash
# Planning Location Setup Hook
# Ensures claude-files/plans/current/ exists before planning-with-files skill runs

PLAN_DIR="claude-files/plans/current"

# Create the directory if it doesn't exist
if [[ ! -d "$PLAN_DIR" ]]; then
    mkdir -p "$PLAN_DIR"
    cat << EOF
{
  "status": "success",
  "message": "📁 Planning Directory Setup

Created: $PLAN_DIR

Planning files will be created in this location:
  • task_plan.md
  • findings.md
  • progress.md
"
}
EOF
else
    # Directory exists - silent success
    cat << EOF
{
  "status": "success",
  "message": "📁 Planning directory ready: $PLAN_DIR"
}
EOF
fi

exit 0
