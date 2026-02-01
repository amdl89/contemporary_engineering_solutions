# Plan Command

You are creating a strategic implementation plan using the **planning-with-files** pattern.

## File Location & Organization

**IMPORTANT**: Planning files follow a **one active task at a time** pattern!

### Directory Structure

```
claude-files/plans/
├── current/                    ← ONE active task only
│   ├── task_plan.md
│   ├── findings.md
│   └── progress.md
└── archive/                    ← Completed tasks
    ├── 2026-01-15-user-auth/
    │   ├── task_plan.md
    │   ├── findings.md
    │   └── progress.md
    ├── 2026-01-18-dashboard/
    └── 2026-01-20-bugfix-login/
```

### Setup Process

1. **First**: Ensure directories exist:

   ```bash
   mkdir -p claude-files/plans/current claude-files/plans/archive
   ```

2. **Check for existing active plan**:
   - If `claude-files/plans/current/task_plan.md` exists → Ask user if they want to:
     - Archive it (completed)
     - Continue it (resume)
     - Replace it (abandon)

3. **Archive completed plan** (if needed):

   ```bash
   # Move current plan to archive with descriptive name
   mv claude-files/plans/current claude-files/plans/archive/YYYY-MM-DD-feature-name
   mkdir -p claude-files/plans/current
   ```

4. **Create new plan** in `claude-files/plans/current/`:
   - `claude-files/plans/current/task_plan.md`
   - `claude-files/plans/current/findings.md` (when first discovery made)
   - `claude-files/plans/current/progress.md` (when session ends)

### Naming Convention for Archives

When archiving, use format: `YYYY-MM-DD-short-description`

Examples:

- `2026-01-20-user-authentication`
- `2026-01-22-api-performance`
- `2026-01-25-bugfix-login-timeout`
- `2026-01-28-refactor-database`

### Why One Active Task?

The planning-with-files pattern enforces **focus**:

- ✅ One phase in_progress at a time
- ✅ Clear context for Claude (no confusion)
- ✅ Prevents context switching
- ✅ Makes /update-context and /clear work correctly

If you need to switch tasks mid-work:

1. Run `/update-context` to save current state
2. Archive current plan: `mv claude-files/plans/current claude-files/plans/archive/YYYY-MM-DD-task-name`
3. Run `/plan` for new task
4. To resume old task: `mv claude-files/plans/archive/YYYY-MM-DD-task-name claude-files/plans/current`

## Instructions

Create a file called `claude-files/plans/current/task_plan.md` with the following structure:

```markdown
# [Project/Feature Name]

## Goal

[One clear sentence describing what we're building and why]

## Success Criteria

- [ ] [Specific, measurable outcome 1]
- [ ] [Specific, measurable outcome 2]
- [ ] [Specific, measurable outcome 3]

## Context

[Brief explanation of current state and what needs to change]

## Technical Approach

[High-level architecture and key technical decisions]

## Implementation Phases

### Phase 1: [Name]

**Goal**: [What this phase achieves]
**Tasks**:

- [ ] Task 1
- [ ] Task 2
      **Success Test**: [How to verify this phase is complete]

### Phase 2: [Name]

**Goal**: [What this phase achieves]
**Tasks**:

- [ ] Task 1
- [ ] Task 2
      **Success Test**: [How to verify this phase is complete]

[Additional phases as needed]

## Risks & Mitigations

- **Risk**: [Potential issue] → **Mitigation**: [How to address it]

## Out of Scope

[Explicitly list what we're NOT doing to prevent scope creep]

## Notes

[Any additional context, dependencies, or considerations]
```

## Guidelines

1. **Keep it focused**: Each phase should be completable in one work session
2. **Be specific**: "Add user authentication" not "improve security"
3. **Include success tests**: How will you know when a phase is done?
4. **List out-of-scope items**: Prevent scope creep by being explicit
5. **Stay under 200 lines**: If longer, the scope is too large

## After Creating the Plan

1. Read the plan back to verify it's complete
2. Ask user if they want to proceed with Phase 1
3. As you work, update the task checkboxes in `claude-files/plans/current/task_plan.md`
4. Create `claude-files/plans/current/findings.md` to track discoveries (planning-with-files pattern)

## Planning-with-Files Pattern

This command implements the Manus pattern:

- **claude-files/plans/current/task_plan.md**: The plan (strategic, updated rarely)
- **claude-files/plans/current/findings.md**: Discoveries made while working (updated frequently)
- **claude-files/plans/current/progress.md**: Current status (updated after each work session)

After every 2 view/browser operations or significant discovery, update `claude-files/plans/current/findings.md`.

## File Organization

```
claude-files/plans/
├── current/              ← Active task (ONE at a time)
│   ├── task_plan.md      ← Strategic plan
│   ├── findings.md       ← Knowledge base
│   └── progress.md       ← Session log
└── archive/              ← Completed tasks
    ├── 2026-01-20-auth/
    ├── 2026-01-22-dashboard/
    └── 2026-01-25-bugfix/
```

This organization:

- Keeps project root clean
- Enforces focus (one active task)
- Preserves history (archive)
- Makes context management work correctly

## Important

- Do NOT start coding until the plan is approved
- Do NOT create a plan longer than 200 lines
- DO include specific success criteria for each phase
- DO make phases incremental (each delivers value)
