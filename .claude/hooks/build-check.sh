#!/bin/bash
# Build Check Hook
#
# This hook runs the project's build command after Claude makes code changes
# to catch breaking changes immediately.
#
# Hook type: Stop (after Edit or Write operations)
# When: After Claude finishes a response that included file edits
# Purpose: Ensure code changes don't break the build

# Change to project directory
cd "$CLAUDE_PROJECT_DIR" || exit 0

# Only run if package.json exists and has a build script
if [ ! -f "package.json" ]; then
    exit 0
fi

# Check if build script exists
if ! grep -q '"build"' package.json; then
    exit 0
fi

# Determine package manager
if [ -f "package-lock.json" ]; then
    PKG_MANAGER="npm"
elif [ -f "yarn.lock" ]; then
    PKG_MANAGER="yarn"
elif [ -f "pnpm-lock.yaml" ]; then
    PKG_MANAGER="pnpm"
elif [ -f "bun.lockb" ]; then
    PKG_MANAGER="bun"
else
    PKG_MANAGER="npm"
fi

# Run build
echo "🔨 Running build check..."
echo ""

# Capture output and exit code
BUILD_OUTPUT=$($PKG_MANAGER run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -ne 0 ]; then
    echo "❌ BUILD FAILED"
    echo ""
    echo "$BUILD_OUTPUT"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "The build is broken. Please fix the errors above."
    echo ""
    echo "Common causes:"
    echo "  • TypeScript type errors"
    echo "  • Missing imports"
    echo "  • Syntax errors"
    echo "  • Missing dependencies"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Exit code 2 blocks Claude's response from being shown to user
    # This ensures user sees the build errors immediately
    exit 2
else
    echo "✅ Build successful"
    echo ""
fi

# Exit 0 = build passed, allow response to be shown
exit 0
