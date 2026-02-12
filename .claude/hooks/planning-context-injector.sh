#!/bin/bash
# Planning Context Injector Hook
#
# This hook injects additional context when planning-with-files pattern is invoked.
# It reminds Claude to check the PLANNING_FILES_GUIDE.md for conventions.
#
# Hook type: UserPromptSubmit
# When: Before Claude processes the user's message
# Purpose: Inject planning file conventions reminder

# Read user's prompt from stdin
PROMPT=$(cat)

# Detect if planning-with-files skill is being invoked
if echo "$PROMPT" | grep -qiE "(planning.with.files|/plan|task_plan\.md|use.*plan.*skill)"; then
    echo ""
    echo "📋 Planning Pattern Detected"
    echo ""
    echo "IMPORTANT: Follow planning file conventions from .claude/PLANNING_FILES_GUIDE.md"
    echo ""
    echo "Key reminders:"
    echo "  ✅ Files go in: claude-files/plans/current/"
    echo "  ❌ NOT in project root"
    echo "  📦 Archive to: claude-files/plans/archive/YYYY-MM-DD-description/"
    echo ""
fi

# Always exit 0 (never block)
exit 0
