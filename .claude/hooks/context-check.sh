#!/bin/bash
# Context Check Hook
#
# This hook monitors tool call count and suggests /update-context when
# Claude might be approaching context limits (the "lost in the middle" problem).
#
# Hook type: UserPromptSubmit
# When: Before Claude processes the user's message
# Purpose: Suggest /update-context to save state before context gets too full

# File to track tool call count
COUNTER_FILE=".claude/.tool-call-counter"

# Thresholds
WARN_THRESHOLD=50   # Suggest /update-context
CRITICAL_THRESHOLD=75  # Strongly suggest /update-context

# Ensure counter file exists
if [ ! -f "$COUNTER_FILE" ]; then
    echo "0" > "$COUNTER_FILE"
fi

# Read current count
CURRENT_COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")

# Increment counter
NEW_COUNT=$((CURRENT_COUNT + 1))
echo "$NEW_COUNT" > "$COUNTER_FILE"

# Check if user is running /update-context or /clear
PROMPT=$(cat)
if echo "$PROMPT" | grep -qi "update-context\|/clear"; then
    # Reset counter
    echo "0" > "$COUNTER_FILE"
    exit 0
fi

# Check thresholds and provide appropriate message
if [ "$NEW_COUNT" -ge "$CRITICAL_THRESHOLD" ]; then
    echo ""
    echo "⚠️  Context Warning (Tool calls: $NEW_COUNT)"
    echo ""
    echo "You're at risk of the 'lost in the middle' problem where"
    echo "Claude may start forgetting earlier context."
    echo ""
    echo "STRONGLY RECOMMENDED:"
    echo "  1. Run: /update-context"
    echo "  2. Then run: /clear"
    echo ""
    echo "This will save your current state and free up context."
    echo ""
elif [ "$NEW_COUNT" -ge "$WARN_THRESHOLD" ]; then
    echo ""
    echo "💡 Context Suggestion (Tool calls: $NEW_COUNT)"
    echo ""
    echo "Consider running /update-context soon to save your progress."
    echo "Then use /clear to free up context for continued work."
    echo ""
fi

# Always exit 0 (suggestion only, never block)
exit 0
