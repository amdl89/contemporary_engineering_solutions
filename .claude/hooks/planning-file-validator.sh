#!/bin/bash
# Planning File Validator Hook
# Validates that planning files are created in the correct location
# Auto-creates claude-files/plans/current/ if it doesn't exist

# Get the file path from the tool call
FILE_PATH="$TOOL_ARGS"

# Check if this is a planning file
if [[ "$FILE_PATH" =~ (task_plan|findings|progress)\.md$ ]]; then
    # Check if it's being created in the correct location
    if [[ "$FILE_PATH" =~ claude-files/plans/current/ ]]; then
        # Correct location - ensure directory exists
        PLAN_DIR="claude-files/plans/current"
        if [[ ! -d "$PLAN_DIR" ]]; then
            mkdir -p "$PLAN_DIR" 2>/dev/null
            cat << EOF
{
  "status": "success",
  "message": "✅ Created planning directory: $PLAN_DIR"
}
EOF
        fi
        exit 0
    fi

    # Wrong location - check if it's in project root or other wrong location
    if [[ ! "$FILE_PATH" =~ claude-files/plans/ ]]; then
        # Ensure correct directory exists
        PLAN_DIR="claude-files/plans/current"
        mkdir -p "$PLAN_DIR" 2>/dev/null

        cat << EOF
{
  "status": "error",
  "message": "⚠️  Planning File Location Error

Detected: Creating planning file in wrong location
File: $FILE_PATH

Planning files MUST go in: claude-files/plans/current/

✅ Correct locations:
  • claude-files/plans/current/task_plan.md
  • claude-files/plans/current/findings.md
  • claude-files/plans/current/progress.md

❌ Wrong locations:
  • task_plan.md (project root)
  • current/task_plan.md (wrong parent directory)

📁 I've created the claude-files/plans/current/ directory for you.
Please update your file path to use the correct location.
"
}
EOF
        exit 1
    fi
fi

# File is not a planning file - allow it
exit 0
