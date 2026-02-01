---
name: pattern-guide
description: Guidance on choosing and applying Claude Code patterns (Vanilla, Planning-with-Files, SuperClaude). Use when users ask about workflow approaches, best practices, or are starting complex tasks without structure. Helps match task complexity with the right pattern and provides step-by-step guidance.
---

# Pattern Guide

Choose the right Claude Code pattern for your task.

## Complexity Ladder

Match pattern to task complexity:

| Pattern                  | Tool Calls | Duration  | Files | Use Case                           |
| ------------------------ | ---------- | --------- | ----- | ---------------------------------- |
| **Vanilla**              | <5         | <30 min   | 1-2   | Simple, well-defined tasks         |
| **Planning-with-Files**  | 5-50       | 1-4 hours | 3-10  | Multi-step features, exploration   |
| **SuperClaude Commands** | 50-100     | 1-2 days  | 10-20 | Complex analysis, specialized work |
| **Full SuperClaude**     | 100+       | Multi-day | 20+   | Enterprise-scale projects          |

## Vanilla Claude Code

**Use for**:

- Well-defined, small scope
- Know exactly what to do
- Low risk, quick changes

**Examples**:

- Fix a bug
- Add a single function
- Update documentation
- Simple refactor

**How**:

```bash
# Just describe the task
# Use /review before committing
```

## Planning-with-Files

**Use for**:

- Medium complexity
- Multiple steps/phases
- Need to explore first
- Risk of context loss (50+ tool calls)

**Examples**:

- Implement new feature (multi-file)
- Debug complex issue
- Research then implement

**How**:

```bash
# 1. Create plan
/plan

# 2. Work through phases (one at a time)
# Update findings.md after every 2 read operations (2-Action Rule)

# 3. Before running out of context (~50 tool calls)
/update-context
/clear

# 4. Review before committing
/review
```

**The 3-File System**:

- `claude-files/plans/current/task_plan.md` - Strategic roadmap (WHAT, WHERE)
- `claude-files/plans/current/findings.md` - Knowledge base (WHY, HOW)
- `claude-files/plans/current/progress.md` - Session log (WHEN, DONE)

**Critical Rules**:

- 2-Action Rule: Update findings.md after every 2 read operations
- One phase in_progress at a time
- Re-read task_plan.md before major decisions
- Never repeat failures: Change approach on 3rd failed attempt

## SuperClaude Commands

**Use for**:

- Complex, specialized tasks
- Need multiple specialized agents
- Requires deep analysis

**Examples**:

- Optimize performance across entire app
- Security audit
- Refactor authentication system

**How**:

```bash
# Use specialized commands
/sc:implement [feature]   # Full implementation workflow
/sc:analyze              # Deep code analysis
/sc:research [topic]     # Deep research with citations
/sc:troubleshoot         # Systematic debugging
```

## Full SuperClaude Framework

**Use for**:

- Enterprise-scale projects
- Large codebase (20+ repos)
- Team coordination
- Weeks of work

**How**:

```bash
# 1. Index repository (94% token reduction)
/sc:index-repo

# 2. Use specialized agents
# 16 agents available: security, frontend, backend, performance, etc.

# 3. Cross-session continuation
/sc:save     # Save complete state
/clear       # Free context
/sc:load     # Resume exactly where you left off
```

## Decision Framework

Ask these questions:

**1. How many tool calls?**

- <5 → Vanilla
- 5-50 → Planning-with-Files
- 50+ → SuperClaude

**2. How long will it take?**

- <30 min → Vanilla
- 1-4 hours → Planning-with-Files
- Multi-day → SuperClaude

**3. Do you know how to do it?**

- Yes, clear path → Vanilla
- Need to explore → Planning-with-Files
- Need specialized expertise → SuperClaude

**4. What's the risk?**

- Low → Vanilla
- Medium → Planning-with-Files (document decisions)
- High/Production → SuperClaude (comprehensive review)

## Common Scenarios

**"Add a logout button"**
→ Vanilla (simple, 1-2 files)

**"Implement user authentication"**
→ Planning-with-Files (medium, 5-10 files, security implications)

**"Optimize database queries across the app"**
→ SuperClaude Commands (`/sc:analyze` + `/sc:implement`)

**"Refactor entire auth system across microservices"**
→ Full SuperClaude Framework (enterprise scale, weeks of work)

## Progressive Disclosure

Start simple, scale up when needed:

1. Try Vanilla first for most tasks
2. Switch to Planning-with-Files if you hit ~20 tool calls
3. Use SuperClaude for truly complex work
4. Don't over-engineer simple tasks

## Quick Reference

**When in doubt**:

- Simple task? → Just do it (Vanilla)
- Will take >1 hour? → `/plan` (Planning-with-Files)
- Need specialized analysis? → `/sc:*` (SuperClaude)
- Working on huge project? → Full SuperClaude Framework

**Learn more**: Run `/guide` for interactive pattern recommendation with detailed instructions.
