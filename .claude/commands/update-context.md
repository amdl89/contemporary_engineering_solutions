# Update Context Command

You are preparing to run `/clear` to free up context. Save all critical information to files first.

## Context Management Strategy

After ~50 tool calls, language models begin to "forget" earlier context (the "lost in the middle" problem). The `/clear` command removes conversation history but preserves files, so we save state to the filesystem.

## File Locations

**IMPORTANT**: Planning files use the **one active task** pattern!

- `claude-files/plans/current/task_plan.md` - Strategic plan for current task
- `claude-files/plans/current/findings.md` - Discoveries and learnings
- `claude-files/plans/current/progress.md` - Current status
- `.recovery.md` - Temporary recovery instructions (project root is OK)

Directory structure:

```
claude-files/plans/
├── current/       ← ONE active task
└── archive/       ← Completed tasks
```

Ensure `claude-files/plans/current/` directory exists before creating files.

## What to Save

### 1. Current Work State

Create or update `claude-files/plans/current/progress.md`:

```markdown
# Progress Update - [Date/Time]

## What We're Working On

[Current task or feature]

## What's Completed

- [x] [Completed item 1]
- [x] [Completed item 2]

## What's In Progress

- [ ] [Current task]
  - Status: [Describe current state]
  - Next step: [What to do next]

## Blockers/Issues

[Any problems encountered]

## Key Decisions Made

- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]

## Context for Next Session

[Anything important to remember after /clear]
```

### 2. Important Discoveries

Update `claude-files/plans/current/findings.md` (if using planning-with-files pattern):

```markdown
# Findings - [Date/Time]

## New Discoveries

- [Important insight 1]
- [Important insight 2]

## Technical Learnings

- [How something works]
- [Why we chose approach X]

## Gotchas/Warnings

- [Thing to watch out for]
```

### 3. Recovery Instructions

Create `.recovery.md` (temporary file for post-/clear recovery):

```markdown
# Recovery Instructions

## Resume Work By:

1. Read `claude-files/plans/current/task_plan.md` (if exists) to understand the overall goal
2. Read `claude-files/plans/current/progress.md` to see what's completed and what's next
3. Read `claude-files/plans/current/findings.md` to review important discoveries
4. [Specific file to read]: [Why it's important]
5. Next action: [Exact next step to take]

## Files to Read First

- `file1.ts` - [Why important]
- `file2.ts` - [Why important]

## Current Phase

Phase [N]: [Phase name]
Next task: [Specific task]

## Important Context

[Anything critical that's not in the files above]

DELETE THIS FILE after reading it in the new session.
```

## Process

1. **Ensure directory exists**: Run `mkdir -p claude-files/plans/current` if needed
2. **Analyze current state**: What have we done? What's next?
3. **Update claude-files/plans/current/progress.md**: Save completed work and current status
4. **Update claude-files/plans/current/findings.md**: Save any important discoveries
5. **Create .recovery.md**: Specific instructions for resuming work (at project root)
6. **Verify files are saved**: Quick check that all files exist
7. **Inform user**: Tell them it's safe to run `/clear`

## After /Clear

When starting a new session after `/clear`:

1. Look for `.recovery.md` - read it first
2. Read the files mentioned in recovery instructions
3. Delete `.recovery.md` (no longer needed)
4. Resume work from the exact point indicated

## Important Notes

- **Save to FILES, not conversation**: Everything in files persists, conversation doesn't
- **Be specific in recovery instructions**: "Read UserService.ts" not "check the code"
- **Include line numbers if relevant**: "Check UserService.ts:142 for auth logic"
- **Explain WHY to read files**: Context helps prioritize what to read first
- **Keep recovery instructions under 50 lines**: Must be quick to read

## When to Use This Command

- Every ~50 tool calls (the context-check hook will remind you)
- Before switching to a major new task
- When context is getting "foggy" (you're re-reading the same files)
- Before ending a long work session

## Planning-with-Files Integration

If using the planning-with-files pattern, all files are in `claude-files/plans/current/`:

- `claude-files/plans/current/task_plan.md` - Strategic plan (rarely changes)
- `claude-files/plans/current/findings.md` - Discoveries (updated frequently per 2-Action Rule)
- `claude-files/plans/current/progress.md` - Current status (updated before /clear)
- `.recovery.md` - Temporary recovery instructions (project root)

The combination of these three files + .recovery.md ensures perfect continuity across sessions.

## File Organization

```
claude-files/plans/
├── current/              ← ONE active task
│   ├── task_plan.md      ← Strategic plan
│   ├── findings.md       ← Knowledge base
│   └── progress.md       ← Session log
└── archive/              ← Completed tasks
    ├── 2026-01-20-auth/
    ├── 2026-01-22-dashboard/
    └── 2026-01-25-bugfix/
.recovery.md              ← Temporary (delete after reading)
```

This organization:

- Enforces focus (one active task at a time)
- Preserves history (archive completed plans)
- Keeps project root clean
- Makes context management work correctly

## Archiving Completed Plans

When you finish a task:

```bash
# Archive with descriptive name
mv claude-files/plans/current claude-files/plans/archive/$(date +%Y-%m-%d)-feature-name

# Create fresh current directory for next task
mkdir -p claude-files/plans/current
```
