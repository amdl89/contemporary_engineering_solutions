#!/bin/bash
# Skill Auto-Activation Hook
#
# This hook suggests relevant skills based on keywords in the user's prompt.
# It helps users discover and use the right skills for their task.
#
# Hook type: UserPromptSubmit
# When: Before Claude processes the user's message
# Purpose: Suggest relevant skills to activate

# Read user's prompt from stdin
PROMPT=$(cat)

# Path to skill rules configuration
RULES_FILE=".claude/skills/skill-rules.json"

# Exit silently if no rules file exists
[ ! -f "$RULES_FILE" ] && exit 0

# Check if jq is available for JSON parsing
if ! command -v jq &> /dev/null; then
    # jq not installed, skip skill suggestions
    exit 0
fi

# Track matched skills
MATCHED=""

# Check each skill for keyword matches
while IFS= read -r skill; do
    # Get keywords for this skill
    keywords=$(jq -r ".\"$skill\".promptTriggers.keywords[]?" "$RULES_FILE" 2>/dev/null)

    # Check if any keyword appears in the prompt (case-insensitive)
    for kw in $keywords; do
        if echo "$PROMPT" | grep -qi "$kw"; then
            MATCHED="$MATCHED $skill"
            break
        fi
    done
done < <(jq -r 'keys[]' "$RULES_FILE" 2>/dev/null)

# If any skills matched, suggest them to the user
if [ -n "$(echo $MATCHED | tr -d ' ')" ]; then
    echo ""
    echo "🎯 Relevant skills detected:$MATCHED"
    echo ""
    echo "These skills will be automatically considered. To explicitly use one:"
    echo "\"Use the [skill-name] skill for this task\""
    echo ""
fi

# Always exit 0 (suggestions only, never block)
exit 0
