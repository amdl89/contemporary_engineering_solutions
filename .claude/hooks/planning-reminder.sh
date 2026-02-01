#!/bin/bash
# Planning Reminder Hook
#
# This hook enforces the planning-with-files pattern by reminding users
# to create a plan before implementing non-trivial features.
#
# Hook type: UserPromptSubmit
# When: Before Claude processes the user's message
# Purpose: Remind user to create task_plan.md for implementation tasks

# Read user's prompt from stdin
PROMPT=$(cat)

# Check if task_plan.md exists
PLAN_EXISTS=false
if [ -f "task_plan.md" ]; then
    PLAN_EXISTS=true
fi

# Keywords that suggest user wants to implement something
IMPLEMENTATION_KEYWORDS=(
    "implement"
    "create"
    "build"
    "add feature"
    "develop"
    "write code"
    "add new"
    "make a"
    "build a"
    "set up"
)

# Keywords that suggest user is just asking questions or doing research
RESEARCH_KEYWORDS=(
    "how"
    "what"
    "why"
    "explain"
    "show me"
    "find"
    "search"
    "look for"
    "where is"
    "read"
)

# Check if prompt suggests implementation
SUGGESTS_IMPLEMENTATION=false
for kw in "${IMPLEMENTATION_KEYWORDS[@]}"; do
    if echo "$PROMPT" | grep -qi "$kw"; then
        SUGGESTS_IMPLEMENTATION=true
        break
    fi
done

# Check if prompt suggests research (overrides implementation)
SUGGESTS_RESEARCH=false
for kw in "${RESEARCH_KEYWORDS[@]}"; do
    if echo "$PROMPT" | grep -qi "$kw"; then
        SUGGESTS_RESEARCH=true
        break
    fi
done

# If user wants to implement something and no plan exists, remind them
if [ "$SUGGESTS_IMPLEMENTATION" = true ] && [ "$SUGGESTS_RESEARCH" = false ] && [ "$PLAN_EXISTS" = false ]; then
    echo ""
    echo "📋 Planning Reminder"
    echo ""
    echo "You're about to start implementation work without a plan."
    echo ""
    echo "Consider creating a strategic plan first:"
    echo "  /plan"
    echo ""
    echo "Benefits of planning:"
    echo "  • Breaks work into manageable phases"
    echo "  • Defines clear success criteria"
    echo "  • Prevents scope creep"
    echo "  • Makes it easier to resume after /clear"
    echo ""
    echo "Skip this for:"
    echo "  • Quick fixes (< 3 files changed)"
    echo "  • Trivial changes"
    echo "  • Research/exploration"
    echo ""
fi

# Always exit 0 (reminder only, never block)
exit 0
