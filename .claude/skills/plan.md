# Project Planning

Use Manus planning-with-files pattern with project-specific conventions.

## When to Use

When starting any complex multi-step task that requires:
- Research and exploration
- Multiple phases or steps
- Tracking progress across sessions
- Decision logging

## Instructions

**IMPORTANT:** Before creating any planning files, read `.claude/PLANNING_FILES_GUIDE.md` for file location conventions and best practices.

### File Locations (Critical!)

Planning files MUST go in:
```
claude-files/plans/current/
├── task_plan.md
├── findings.md
└── progress.md
```

**NEVER** create planning files in project root!

### Invoke Planning Pattern

Now invoke the planning-with-files plugin skill:

```
Use the planning-with-files pattern as documented.

IMPORTANT: Follow the file location conventions from .claude/PLANNING_FILES_GUIDE.md
```

### Task Description

{task_description}
