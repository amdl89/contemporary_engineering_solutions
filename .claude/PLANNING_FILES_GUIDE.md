# Planning Files Guide

## ⚠️ Common Mistake: Wrong File Location

When using the planning-with-files pattern, files MUST go in the correct location:

### ✅ CORRECT

```
claude-files/plans/current/
├── task_plan.md
├── findings.md
└── progress.md
```

### ❌ WRONG

```
project-root/
├── task_plan.md      ❌ Don't create here!
├── findings.md       ❌ Don't create here!
└── progress.md       ❌ Don't create here!
```

## Why This Matters

1. **Keeps project root clean**: Planning files are temporary working files
2. **Enforces focus**: One active task at a time in `current/`
3. **Preserves history**: Completed tasks archived with descriptive names
4. **Makes /clear work**: Context recovery expects files in `claude-files/plans/`

## How to Use Correctly

### Starting New Work

```bash
# Always use the /plan command
/plan

# This will automatically create files in:
# claude-files/plans/current/task_plan.md
# claude-files/plans/current/findings.md
# claude-files/plans/current/progress.md
```

### Completing Work

```bash
# Archive the completed plan
mv claude-files/plans/current claude-files/plans/archive/2026-01-23-feature-name

# Or let Claude do it for you when starting a new plan
```

## Protection Mechanism

We've added a `PreToolUse` hook that validates file locations:

- **Hook**: `.claude/hooks/planning-file-validator.sh`
- **Triggers**: Before any `Write` operation
- **Checks**: Detects if planning files are being created in wrong location
- **Action**: Blocks the operation and reminds you of correct location

## File Organization Pattern

```
claude-files/plans/
├── current/                          ← ONE active task only
│   ├── task_plan.md                 ← Strategic roadmap
│   ├── findings.md                  ← Discoveries & insights
│   └── progress.md                  ← Session log
└── archive/                          ← Completed tasks
    ├── 2026-01-20-user-auth/
    │   ├── task_plan.md
    │   ├── findings.md
    │   └── progress.md
    ├── 2026-01-22-dashboard/
    └── 2026-01-23-feature-name/
```

## Archive Naming Convention

Format: `YYYY-MM-DD-short-description`

Good examples:
- `2026-01-23-link-roi-models-to-prospects`
- `2026-01-25-fix-login-timeout`
- `2026-01-28-refactor-database-queries`

Bad examples:
- `task-1` (not descriptive)
- `jan-23` (not complete date)
- `feature` (no date)

## Prevention Strategy

### For Future Work

1. **Always use `/plan` command**: Creates files in correct location automatically
2. **Hook validates**: Catches mistakes before they happen
3. **Clear documentation**: This guide explains the pattern
4. **Visual reminders**: Error messages show correct vs wrong locations

### Hook Behavior

When attempting to create planning file in wrong location:

```
⚠️  Planning File Location Error

Detected: Creating planning file in wrong location
File: /project-root/task_plan.md

Planning files MUST go in: claude-files/plans/current/

Correct locations:
  ✅ claude-files/plans/current/task_plan.md
  ✅ claude-files/plans/current/findings.md
  ✅ claude-files/plans/current/progress.md
  ❌ task_plan.md (project root)

Please use the /plan command which creates files in the correct location.
```

## Benefits

1. ✅ **Prevents future mistakes**: Hook blocks wrong file creation
2. ✅ **Clear guidance**: Error messages show correct paths
3. ✅ **No manual intervention**: Automatic validation
4. ✅ **Zero performance impact**: Fast regex check
5. ✅ **Doesn't affect other files**: Only validates planning files
6. ✅ **Well documented**: Guide explains the pattern

## For Future Work

Always use `/plan` command which:
1. Creates directories if needed
2. Checks for existing active plans
3. Creates files in correct location
4. Follows proper patterns

**Never** manually create `task_plan.md`, `findings.md`, or `progress.md` in project root!
