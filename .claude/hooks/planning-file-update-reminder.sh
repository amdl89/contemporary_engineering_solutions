#!/bin/bash
# Planning File Update Reminder Hook
# Reminds to update planning files after code changes

# Get the file path from the tool call context
FILE_PATH="${TOOL_ARGS:-unknown}"

# Only check for source code changes (not test files, not planning files themselves)
if [[ ! "$FILE_PATH" =~ \.(py|js|ts|tsx|jsx)$ ]] ||
   [[ "$FILE_PATH" =~ test_ ]] ||
   [[ "$FILE_PATH" =~ _test\. ]] ||
   [[ "$FILE_PATH" =~ claude-files/plans/ ]]; then
    exit 0
fi

# Check if planning files exist
PLANNING_DIR="claude-files/plans/current"
TASK_PLAN="$PLANNING_DIR/task_plan.md"
FINDINGS="$PLANNING_DIR/findings.md"
PROGRESS="$PLANNING_DIR/progress.md"

if [[ -f "$TASK_PLAN" ]] || [[ -f "$FINDINGS" ]] || [[ -f "$PROGRESS" ]]; then
    cat << EOF
{
  "status": "reminder",
  "message": "📝 Planning Files Update Reminder

Modified: $FILE_PATH

Planning files exist in this project. After code changes, remember to update:

$(if [[ -f "$TASK_PLAN" ]]; then echo "  • task_plan.md - Mark phases complete, update status"; fi)
$(if [[ -f "$FINDINGS" ]]; then echo "  • findings.md - Document new technical discoveries"; fi)
$(if [[ -f "$PROGRESS" ]]; then echo "  • progress.md - Log implementation details and timeline"; fi)

This keeps documentation synchronized with code changes.
"
}
EOF
fi

exit 0
