# Planning File Location Fix

**Date**: 2026-01-23
**Applied From**: mare-api project fix

## Problem

Planning files (`task_plan.md`, `findings.md`, `progress.md`) could be created in the wrong location:

❌ **Wrong**: Project root
✅ **Correct**: `claude-files/plans/current/`

## Why This Matters

The planning-with-files pattern requires specific organization:
- **Context recovery**: `/clear` command expects files in `claude-files/plans/`
- **One active task**: Pattern enforces focus with single `current/` directory
- **Clean repository**: Keeps planning files separate from code
- **Archive history**: Completed work preserved in `archive/` with descriptive names

## Solution Implemented

### 1. Validation Hook ✅

**File**: `.claude/hooks/planning-file-validator.sh`

What it does:
- Runs before EVERY `Write` operation
- Detects planning files by name pattern
- Checks if path includes `claude-files/plans/`
- **Blocks** creation if wrong location
- Shows helpful error with correct paths

### 2. Settings Update ✅

**File**: `.claude/settings.json`

Added `PreToolUse` hook:
```json
{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "./.claude/hooks/planning-file-validator.sh",
    "description": "Validates planning files are created in claude-files/plans/"
  }]
}
```

### 3. Documentation ✅

**File**: `.claude/PLANNING_FILES_GUIDE.md`

Comprehensive guide with:
- Visual examples of correct vs wrong locations
- Usage patterns
- Protection mechanisms
- Archive naming conventions
- Benefits of the pattern

## How It Works

### Before (No Protection)

```bash
# Could accidentally create in wrong location
task_plan.md           ❌ Created in project root
findings.md            ❌ Created in project root
progress.md            ❌ Created in project root
```

### After (Protected)

```bash
# Hook validates location before creation
task_plan.md           ⚠️  BLOCKED with error message
findings.md            ⚠️  BLOCKED with error message
progress.md            ⚠️  BLOCKED with error message

# Only correct location allowed
claude-files/plans/current/task_plan.md    ✅ Allowed
claude-files/plans/current/findings.md     ✅ Allowed
claude-files/plans/current/progress.md     ✅ Allowed
```

## Prevention Strategy

### Hook Error Message

When attempting wrong location:

```
⚠️  Planning File Location Error

Detected: Creating planning file in wrong location
File: /path/to/task_plan.md

Planning files MUST go in: claude-files/plans/current/

Correct locations:
  ✅ claude-files/plans/current/task_plan.md
  ✅ claude-files/plans/current/findings.md
  ✅ claude-files/plans/current/progress.md
  ❌ task_plan.md (project root)

Please use the /plan command.
```

### Always Use `/plan` Command

The `/plan` command automatically:
1. Creates `claude-files/plans/current/` if needed
2. Checks for existing active plans
3. Creates files in correct location
4. Follows proper archiving pattern

## File Organization

```
claude-files/plans/
├── current/                          ← ONE active task only
│   ├── task_plan.md                 ← Strategic roadmap
│   ├── findings.md                  ← Discoveries & insights
│   └── progress.md                  ← Session log
└── archive/                          ← Completed tasks
    ├── 2026-01-20-feature-a/
    ├── 2026-01-22-feature-b/
    └── 2026-01-23-feature-c/
```

## Benefits

1. ✅ **Prevents mistakes**: Hook blocks wrong file creation
2. ✅ **Clear guidance**: Error messages show correct paths
3. ✅ **Automatic**: No manual intervention needed
4. ✅ **Fast**: Zero performance impact (regex check only)
5. ✅ **Focused**: Only validates planning files
6. ✅ **Documented**: Complete usage guide included

## Verification

### Hook Created
```bash
$ ls -la .claude/hooks/planning-file-validator.sh
-rwxr-xr-x 1 user user 968 Jan 23 planning-file-validator.sh ✅
```

### Settings Updated
```bash
$ grep -A5 "PreToolUse" .claude/settings.json
"PreToolUse": [
  {
    "matcher": "Write",
    "hooks": [
      {
        "type": "command",
        "command": "./.claude/hooks/planning-file-validator.sh"
      }
    ]
  }
] ✅
```

### Documentation Available
```bash
$ ls .claude/PLANNING_FILES_GUIDE.md
.claude/PLANNING_FILES_GUIDE.md ✅
```

## Usage

### Starting Work

```bash
/plan
# Creates files in claude-files/plans/current/ automatically
```

### Completing Work

```bash
# Archive completed work
mv claude-files/plans/current \
   claude-files/plans/archive/2026-01-23-descriptive-name
```

### Resuming Work

```bash
# Move archived work back to current
mv claude-files/plans/archive/2026-01-23-feature \
   claude-files/plans/current
```

## Status

✅ **Hook**: Created and executable
✅ **Settings**: Updated with PreToolUse hook
✅ **Documentation**: Complete guide available
✅ **Protection**: Active and validating

**Ready to use the planning-with-files pattern correctly!**
