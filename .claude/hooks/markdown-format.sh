#!/bin/bash
# Markdown Format Hook
#
# This hook formats markdown files after Claude makes changes
# to ensure consistent formatting across documentation.
#
# Hook type: Stop (after Edit or Write operations)
# When: After Claude finishes a response that included markdown file edits
# Purpose: Ensure markdown files follow consistent formatting

# Change to project directory
cd "$CLAUDE_PROJECT_DIR" || exit 0

# Get the modified file from environment variable (if available)
# This is passed by Claude Code when the hook runs
MODIFIED_FILE="${CLAUDE_MODIFIED_FILE:-}"

# If no specific file was passed, check git for modified markdown files
if [ -z "$MODIFIED_FILE" ]; then
    # Find all modified markdown files
    MODIFIED_FILES=$(git diff --name-only --diff-filter=M 2>/dev/null | grep '\.md$' || true)

    # Also check for untracked markdown files
    UNTRACKED_FILES=$(git ls-files --others --exclude-standard 2>/dev/null | grep '\.md$' || true)

    ALL_FILES="$MODIFIED_FILES $UNTRACKED_FILES"

    # Exit if no markdown files were modified
    if [ -z "$(echo $ALL_FILES | tr -d ' ')" ]; then
        exit 0
    fi
else
    # Check if the modified file is a markdown file
    if [[ ! "$MODIFIED_FILE" =~ \.md$ ]]; then
        exit 0
    fi
    ALL_FILES="$MODIFIED_FILE"
fi

# Check for available formatters
FORMATTER=""
FORMATTER_NAME=""

# Check for prettier (most common)
if command -v prettier &> /dev/null; then
    FORMATTER="prettier"
    FORMATTER_NAME="Prettier"
elif command -v npx &> /dev/null && [ -f "node_modules/.bin/prettier" ]; then
    FORMATTER="npx prettier"
    FORMATTER_NAME="Prettier (via npx)"
elif command -v markdownlint &> /dev/null; then
    FORMATTER="markdownlint"
    FORMATTER_NAME="markdownlint"
elif command -v npx &> /dev/null && [ -f "node_modules/.bin/markdownlint" ]; then
    FORMATTER="npx markdownlint"
    FORMATTER_NAME="markdownlint (via npx)"
fi

# If no formatter is available, skip silently
if [ -z "$FORMATTER" ]; then
    exit 0
fi

echo "📝 Formatting markdown files with $FORMATTER_NAME..."
echo ""

# Format each file
FORMAT_ERRORS=0
for file in $ALL_FILES; do
    # Skip if file doesn't exist (may have been deleted)
    [ ! -f "$file" ] && continue

    echo "  Formatting: $file"

    # Format based on which formatter we're using
    if [[ "$FORMATTER" == *"prettier"* ]]; then
        # Prettier: write changes in place
        if $FORMATTER --write --print-width 80 --prose-wrap always "$file" 2>&1 | grep -v "^$file"; then
            :  # Success
        else
            FORMAT_ERRORS=$((FORMAT_ERRORS + 1))
        fi
    elif [[ "$FORMATTER" == *"markdownlint"* ]]; then
        # markdownlint: fix issues in place
        if $FORMATTER --fix "$file" 2>&1 | grep -v "^$file"; then
            :  # Success
        else
            FORMAT_ERRORS=$((FORMAT_ERRORS + 1))
        fi
    fi
done

echo ""

if [ $FORMAT_ERRORS -ne 0 ]; then
    echo "⚠️  Some files had formatting errors"
    echo ""
    echo "Files have been formatted, but please review the changes."
    echo ""
    # Don't block with exit 2, just warn
    exit 0
else
    echo "✅ Markdown files formatted successfully"
    echo ""
fi

# Exit 0 = formatting done, allow response to be shown
exit 0
