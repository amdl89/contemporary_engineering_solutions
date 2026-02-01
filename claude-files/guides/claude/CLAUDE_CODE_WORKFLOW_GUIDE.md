# Claude Code: Comprehensive Workflow Guide

> Unified guide covering vanilla Claude Code, planning-with-files plugin, and SuperClaude framework.

**Last Updated**: 2026-01-20

---

## Table of Contents

### FOUNDATIONS

1. [Core Principles](#1-core-principles)
2. [Setup & Structure](#2-setup--structure)
3. [Framework Selection](#3-framework-selection)

### CORE SYSTEMS

4. [Commands](#4-commands)
5. [Skills & Hooks](#5-skills--hooks)
6. [Subagents & MCP](#6-subagents--mcp)

### PLANNING & CONTEXT

7. [Planning-with-Files (3-File Pattern)](#7-planning-with-files-3-file-pattern)
8. [Context Management](#8-context-management)
9. [Phase-Based Development](#9-phase-based-development)

### SUPERCLAUDE

10. [Agents & Modes](#10-agents--modes)
11. [Advanced Commands](#11-advanced-commands)

### WORKFLOWS

12. [Common Workflows](#12-common-workflows)
13. [Best Practices](#13-best-practices)
14. [Quick Reference](#14-quick-reference)

### SETUP GUIDE

15. [Interactive Setup](#15-interactive-setup)

### APPENDICES

A. [Complete Command Templates](#appendix-a-complete-command-templates)
B. [Complete Hook Scripts](#appendix-b-complete-hook-scripts)
C. [Complete Skill Examples](#appendix-c-complete-skill-examples)
D. [Complete Configuration Files](#appendix-d-complete-configuration-files)

---

# 1. Core Principles

## The Five Universal Principles

**1. Minimal Sufficiency** - Only give Claude what it needs

- CLAUDE.md: <100 lines (<1000 tokens)
- Skills: <500 lines each
- Context: Files over memory

**2. Semantic Continuity** - Preserve meaning, not data

- Document decisions and intent
- Phase files capture "why" not "what"

**3. Filesystem as External Memory**

```
Context Window = RAM (volatile)  →  Filesystem = Disk (persistent)
```

- After ~50 tool calls, re-read files to refresh goals (attention manipulation)
- Files persist across sessions and `/clear`

**4. Never Repeat Failures**

```python
if action_failed:
    next_action != same_action  # MUST mutate approach
```

**3-Strike Protocol**: Diagnose → Alternate → Rethink → Escalate

**5. Progressive Disclosure** - Load info only as needed

- grep/glob → find → read specific files
- Reference by path, not content

## Context Engineering (Manus Pattern)

**Problem**: After ~50 tool calls, models forget original goals ("lost in the middle")

**Solution**: Re-read `task_plan.md` before decisions

```
[Start: Original goal - far away]
... 50 tool calls ...
[End: Just read plan - MAXIMUM ATTENTION!]
```

**Result**: Meta acquired Manus for $2B using this pattern.

---

# 2. Setup & Structure

## Quick Setup

```bash
# 1. Create structure
mkdir -p .claude/{commands,skills,agents,hooks}

# 2. Essential files
touch CLAUDE.md .claude/settings.json

# 3. Planning files (optional, for complex tasks)
touch task_plan.md findings.md progress.md

# 4. Make hooks executable
chmod +x .claude/hooks/*.sh

# 5. .gitignore
echo ".claude/settings.local.json" >> .gitignore

# 6. MCP servers (SuperClaude)
superclaude mcp --servers sequential-thinking context7 playwright
```

## Directory Structure

```
project/
├── CLAUDE.md                    ← <100 lines
├── task_plan.md                 ← Strategic roadmap (planning-with-files)
├── findings.md                  ← Knowledge base (planning-with-files)
├── progress.md                  ← Session log (planning-with-files)
├── .mcp.json                    ← MCP config
└── .claude/
    ├── settings.json            ← Permissions & hooks
    ├── commands/*.md            → /commands
    ├── skills/*/SKILL.md        → Guidelines
    ├── skills/skill-rules.json  → Auto-activation
    ├── agents/*.md              → Subagents
    └── hooks/*.sh               → Hook scripts
```

## What Claude Reads Automatically

| File                    | Auto-Read?              | Purpose              |
| ----------------------- | ----------------------- | -------------------- |
| `CLAUDE.md`             | ✅ Always               | Project instructions |
| `.claude/commands/*.md` | ✅ Always               | Slash commands       |
| `.claude/settings.json` | ✅ Always               | Permissions, hooks   |
| `.claude/skills/`       | ⚠️ Sees, won't auto-use | Require activation   |
| `.claude/agents/`       | ⚠️ Available            | Must invoke          |
| `task_plan.md`          | ⚠️ When using plugin    | Roadmap              |

## CLAUDE.md Template

```markdown
# Project Name

## Commands

- `npm run build` - Build
- `npm test` - Tests
- `npm run dev` - Dev server

## Structure

- `/src/api` - Backend
- `/src/components` - React

## Tech Stack

Next.js 14, TypeScript, Prisma, PostgreSQL

## Rules

- Server components by default
- DB access through `/src/lib/db`
- Zod for validation
```

---

# 3. Framework Selection

## Decision Matrix

```
Project Complexity?
│
├─ Simple (1 file, <100 lines)
│  → Vanilla Claude Code
│
├─ Medium (multi-file, clear requirements)
│  → Vanilla + phase-based dev
│
├─ Complex (research, >5 tool calls)
│  → + planning-with-files
│
└─ Enterprise (large codebase, team)
   → + SuperClaude
```

## Feature Comparison

| Feature                                        | Vanilla | + Planning | + SuperClaude |
| ---------------------------------------------- | ------- | ---------- | ------------- |
| CLAUDE.md, commands, skills                    | ✅      | ✅         | ✅            |
| Phase-based development                        | ✅      | ✅         | ✅            |
| 3-file pattern (task_plan, findings, progress) | ❌      | ✅         | ✅            |
| 2-Action Rule enforcement                      | ❌      | ✅         | ✅            |
| Session recovery                               | ❌      | ✅         | ✅            |
| 16 specialized agents                          | ❌      | ❌         | ✅            |
| Behavioral modes (6)                           | ❌      | ❌         | ✅            |
| 30+ advanced commands                          | ❌      | ❌         | ✅            |
| ReflexionMemory                                | ❌      | ❌         | ✅            |
| Expert panels                                  | ❌      | ❌         | ✅            |

---

# 4. Commands

## Essential Vanilla Commands

### `/plan` - Strategic Plan

```markdown
Create plan.md:

## Problem: [One sentence]

## Core Features (MVP): [Essential only]

## Future Features: [NOT building now]

## Tech Stack: [Specific versions]

## Phases: [High-level breakdown]
```

### `/implementation` - Break Into Phases

```markdown
For each phase:

- **Deliverable**: What works
- **Success Test**: How to verify
- **Tasks**: Steps
- **Files**: Affected files
```

### `/complete-phase` - Finish & Transition

```markdown
1. Run success test
2. Mark phase Complete
3. Create next phase OR ask "What next?"
```

### `/update-context` - Before /clear

```markdown
1. Find active docs
2. Update: decisions, files, state, next steps
3. Confirm: "Safe to /clear"
```

### `/review` - Code Review

```markdown
Review for:

1. Bugs, logic errors
2. Security (injection, XSS, secrets)
3. Performance (N+1 queries)
4. Consistency

Output: 🔴 Critical | 🟡 Warning | 🟢 Suggestions
```

## SuperClaude Commands (30+)

**Meta**: `/sc:pm` (always active) | `/sc:spawn` | `/sc:task` | `/sc:workflow`
**Discovery**: `/sc:brainstorm` | `/sc:research`
**Build**: `/sc:implement` | `/sc:design`
**Quality**: `/sc:analyze` | `/sc:troubleshoot` | `/sc:test` | `/sc:build`
**Improve**: `/sc:improve` | `/sc:cleanup`
**Docs**: `/sc:document` | `/sc:explain` | `/sc:index-repo`
**Panels**: `/sc:spec-panel` | `/sc:business-panel`
**Utils**: `/sc:save` | `/sc:load` | `/sc:reflect`

**Command Comparison**:
| Need | Command | Output |
|------|---------|--------|
| Decompose | `/sc:spawn` | Task hierarchy |
| Multi-domain | `/sc:task` | Finished code |
| Single domain | `/sc:implement` | Code files |

---

# 5. Skills & Hooks

## Skills System

**Structure**:

```
.claude/skills/
├── [skill-name]/SKILL.md    ← <500 lines
└── skill-rules.json         ← Auto-activation
```

**SKILL.md Template**:

```markdown
---
description: Brief description
---

# Skill Name

## When to Use

## Quick Reference

### Patterns
```

**skill-rules.json**:

```json
{
  "backend-guidelines": {
    "promptTriggers": {
      "keywords": ["backend", "api", "controller"],
      "intentPatterns": ["(create|add).*?(endpoint|controller)"]
    },
    "fileTriggers": {
      "pathPatterns": ["src/controllers/**"],
      "contentPatterns": ["router\\."]
    }
  }
}
```

## Hooks System

**Types**: `UserPromptSubmit` | `PreToolUse` | `PostToolUse` | `Stop`

**Essential Hook: Skill Activation** (`.claude/hooks/skill-activation.sh`):

```bash
#!/bin/bash
PROMPT=$(cat)
RULES_FILE=".claude/skills/skill-rules.json"
[ ! -f "$RULES_FILE" ] && exit 0

MATCHED=""
while IFS= read -r skill; do
  keywords=$(jq -r ".\"$skill\".promptTriggers.keywords[]?" "$RULES_FILE" 2>/dev/null)
  for kw in $keywords; do
    if echo "$PROMPT" | grep -qi "$kw"; then
      MATCHED="$MATCHED $skill"
      break
    fi
  done
done < <(jq -r 'keys[]' "$RULES_FILE")

[ -n "$(echo $MATCHED | tr -d ' ')" ] && echo "🎯 Consider: $MATCHED"
exit 0
```

**Essential Hook: Build Check** (`.claude/hooks/build-check.sh`):

```bash
#!/bin/bash
npm run build 2>&1
[ $? -ne 0 ] && echo "Build failed!" && exit 2
exit 0
```

**Configuration** (`.claude/settings.json`):

```json
{
  "permissions": {
    "allow": ["Bash(npm *)", "Bash(git *)", "Edit", "Write", "Read"],
    "deny": ["Bash(rm -rf /)", "Bash(sudo *)"]
  },
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/skill-activation.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "./.claude/hooks/build-check.sh" }
        ]
      }
    ]
  }
}
```

---

# 6. Subagents & MCP

## Subagents

**Template** (`.claude/agents/code-reviewer.md`):

```markdown
---
name: code-reviewer
description: Reviews for bugs, security, patterns
model: sonnet
---

# Code Reviewer

Review for:

- **Bugs**: Edge cases, null checks
- **Security**: Injection, XSS, secrets
- **Performance**: N+1 queries

## Output

### 🔴 Critical | 🟡 Warning | 🟢 Suggestions

## Rules

- NO style nitpicks
- Explain WHY
- Suggest fixes
```

**Usage**: `"Use code-reviewer agent to review changes"`

## MCP Servers (5 Free, No API Keys)

| Server                  | Purpose                | Trigger             |
| ----------------------- | ---------------------- | ------------------- |
| **sequential-thinking** | Multi-step reasoning   | Complex analysis    |
| **context7**            | Official docs          | Framework questions |
| **playwright**          | Browser automation     | E2E testing         |
| **serena**              | Semantic code analysis | Large codebases     |
| **chrome-devtools**     | Performance profiling  | Performance issues  |

**Install**:

```bash
superclaude mcp --servers sequential-thinking context7 playwright
```

**Recommended**: Essential trio (sequential-thinking + context7 + playwright)

---

# 7. Planning-with-Files (3-File Pattern)

## When to Use

**✅ Use for**: Multi-step (3+), research, >5 tool calls, cross-session work
**❌ Skip for**: Simple questions, single-file edits, trivial changes

## The 3 Files

### task_plan.md - Strategic Roadmap

```markdown
# Task Plan: [Description]

## Goal

[One sentence end state]

## Current Phase

Phase X

## Phases

### Phase 1: Requirements & Discovery

- [ ] Understand intent
- [ ] Document in findings.md
- **Status:** complete

### Phase 2: Planning & Structure

- [ ] Define approach
- **Status:** in_progress

### Phase 3-5: [Similar structure]

- **Status:** pending

## Decisions Made

| Decision | Rationale |
| -------- | --------- |

## Errors Encountered

| Error | Attempt | Resolution |
| ----- | ------- | ---------- |
```

**Update when**: Starting, phase complete, decision made, error occurs, before major operation

### findings.md - Knowledge Base

```markdown
# Findings & Decisions

## Requirements

## Research Findings

## Technical Decisions

## Issues Encountered

## Resources

## Visual/Browser Findings

<!-- CRITICAL: Update after every 2 view/browser operations -->
```

**Update when**: Discovery, **after 2 view/browser ops (2-Action Rule!)**, decision, resource found

### progress.md - Session Log

```markdown
# Progress Log

## Session: 2026-01-20

### Phase 1: [Title]

- **Status:** complete
- **Started:** 10:00
- **Completed:** 10:30
- Actions taken: [list]
- Files created/modified: [list]

## Test Results

## Error Log

## 5-Question Reboot Check

| Where am I? | Where going? | Goal? | Learned? | Done? |
```

## The 2-Action Rule (CRITICAL)

**Rule**: After every 2 view/browser/search operations → UPDATE findings.md

**What counts**: WebSearch, WebFetch, Browser tools, Images, PDFs
**Doesn't count**: Read (text), Edit, Write, Bash

**Example**:

```
✅ CORRECT:
1. WebSearch → 2. WebFetch → UPDATE findings.md
3. Read code → 4. Grep → (don't count)
5. WebSearch → 6. WebFetch → UPDATE findings.md

❌ WRONG:
1-6. Multiple searches → No updates → Lost info!
```

## The 5-Phase Workflow

1. **Requirements & Discovery** - Understand, explore, document
2. **Planning & Structure** - Approach, tech choices, decisions
3. **Implementation** - Execute, test, log
4. **Testing & Verification** - Test, verify, fix
5. **Delivery** - Review, document, deliver

## The Work Loop

```
1. READ task_plan.md (refresh goals)
2. PERFORM WORK
3. UPDATE FILES (findings, progress, task_plan)
4. CHECK PHASE COMPLETION
5. HANDLE ERRORS (log, mutate approach)
6. REPEAT → All complete? DELIVER
```

---

# 8. Context Management

## The Problem

Context fills → Quality drops (after ~20 interactions or ~50 tool calls)

## The Solution

```bash
/clear   # Every 20 iterations (HARD RULE)
```

## Preserving Progress

**Method 1: Phase-Based** (Recommended)

```bash
/plan → /implementation → code → /complete-phase
# After /clear: "Read implementation/phase-2-implementation.md and continue"
```

**Method 2: Update-Context**

```bash
/update-context → /clear → "Read [context-file] and continue"
```

**Method 3: Planning-with-Files**

```bash
# Work with planning files
/planning-with-files  # After /clear (session recovery)
```

**Method 4: SuperClaude**

```bash
/sc:save "completed auth" → /clear → /sc:load project-name
```

## Rules

1. Reset every 20 iterations
2. CLAUDE.md <100 lines
3. Skills <500 lines each
4. Use phase files to externalize state
5. Delegate to subagents
6. Use MCP strategically (overhead)

---

# 9. Phase-Based Development

## Principles

1. **Incremental Delivery** - Every phase works
2. **Clear Success Criteria** - Explicit tests
3. **Bounded Scope** - One session per phase
4. **Context Preservation** - Documents enable /clear

## Structure

```
Phase N: [Name]
├── Deliverable: What works
├── Success Test: Specific steps to verify
├── Tasks: Implementation steps
└── Files: What changes
```

## Example: Todo App

```markdown
## Phase 1: Static UI

- **Deliverable**: Page shows 3 hardcoded todos
- **Success Test**: Open localhost:3000, see 3 items

## Phase 2: Add Functionality

- **Deliverable**: User can add via input
- **Success Test**: Type "Buy milk", Enter, see in list

## Phase 3: Mark Complete

- **Deliverable**: Checkbox works
- **Success Test**: Click checkbox, strikethrough appears
```

## Best Practices

- Start simple, add complexity
- 1-4 hours per phase
- Name by deliverable, not activity (✅ "Registration Works" vs ❌ "Implement Registration")
- Specific success tests (exact steps)
- Never skip success test

---

# 10. Agents & Modes

_Available with SuperClaude framework_

## 16 Specialized Agents

**Architecture**: system-architect | backend-architect | frontend-architect | devops-architect
**Quality**: security-engineer | performance-engineer | root-cause-analyst | quality-engineer
**Dev**: python-expert | refactoring-expert | requirements-analyst
**Comms**: technical-writer | learning-guide
**Meta**: pm-agent | deep-research-agent

**Auto-Activation**:

```bash
"JWT authentication security" → security-engineer + backend-architect
"responsive dashboard" → frontend-architect + learning-guide
"slow API" → performance-engineer + root-cause-analyst
```

**Manual**: `@agent-security "review auth"`

## 6 Behavioral Modes

**🤔 Brainstorming** - Vague → structured requirements
**🧠 Introspection** - Expose reasoning
**🔬 Deep Research** - Systematic investigation
**📋 Task Management** - Hierarchical coordination
**🎯 Orchestration** - Tool optimization, parallel execution
**⚡ Token Efficiency** - 30-50% compression

**Control**:

```bash
/sc:implement "feature" --brainstorm  # Force mode
/sc:analyze "code" --no-uc            # Disable compression
```

---

# 11. Advanced Commands

_SuperClaude framework_

## Key Commands

**`/sc:brainstorm`** - Requirements discovery (Socratic dialogue)
**`/sc:research`** - Web research → `docs/research/topic_[timestamp].md`
**`/sc:design`** - Architecture, APIs, schemas
**`/sc:implement`** - Code with tests: `--with-tests --framework react --safe`
**`/sc:analyze`** - Code analysis: `--focus security --chrome --ultrathink`
**`/sc:troubleshoot`** - Root cause: `--trace`
**`/sc:test`** - Testing: `--type all --coverage --play`
**`/sc:improve`** - Refactor: `--type maintainability --safe`
**`/sc:cleanup`** - Dead code: `--type all --interactive`
**`/sc:index-repo`** - Project index (94% reduction: 58KB→3KB)
**`/sc:spec-panel`** - Expert review (Fowler, Newman, Nygard)
**`/sc:business-panel`** - Business analysis (Porter, Christensen, Taleb)

## Memory System

**ReflexionMemory**: Auto-learns from errors

```bash
cat docs/memory/reflexion.jsonl | jq  # View learnings
# Result: <10% error recurrence, 75-95% token savings
```

**Session Persistence** (Serena):

```bash
/sc:save "auth with JWT and refresh tokens"
/sc:load project-name  # Restore context
/sc:reflect --scope project  # Assess progress
```

---

# 12. Common Workflows

## 1. New Feature Development

```bash
/sc:brainstorm "real-time chat" → /sc:design chat-system --type architecture →
/sc:workflow chat-system → /sc:implement "WebSocket server" --with-tests →
/sc:test --coverage → /sc:analyze chat-system/ --focus security
```

## 2. Bug Investigation

```bash
/sc:troubleshoot "login fails" --trace → /sc:implement "fix auth validation" →
/sc:test auth/ --coverage → /sc:analyze auth/ --focus security
```

## 3. Code Refactoring

```bash
/sc:analyze legacy/ --focus quality → /sc:improve legacy/ --type maintainability --safe →
/sc:cleanup legacy/ --type all --interactive → /sc:test --coverage
```

## 4. Research-Driven Development

```bash
/sc:research "React Server Components 2026" --depth deep →
/sc:design app-architecture → /sc:implement "server components" --c7
```

## 5. Phase-Based Feature (Vanilla)

```bash
/plan → /implementation → [work on phase 1] → /complete-phase →
[work on phase 2] → /complete-phase → repeat
```

## 6. Cross-Session Continuation

```bash
# Session 1: Work → context fills
/update-context OR let planning-with-files track → /clear

# Session 2: Resume
/planning-with-files OR "Read implementation/phase-2.md" OR /sc:load project
```

## 7. Security Audit

```bash
/sc:analyze . --focus security --think-hard → /sc:implement "fix vulns" --safe →
@agent-security "comprehensive review" → /sc:spec-panel @security-spec.md
```

---

# 13. Best Practices

## Universal

✅ **Plan everything** - `/plan` or `/sc:brainstorm` before coding
✅ **Clear often** - Every 20 iterations (hard rule)
✅ **Verify functionality** - Run success tests, not code review
✅ **Document decisions** - In CLAUDE.md, phase files, or `/sc:save`
✅ **Never repeat failures** - Log errors, mutate approach (3-strike)
✅ **Right tool** - Simple→direct, component→`/sc:implement`, multi-domain→`/sc:task`, unclear→`/sc:spawn`
✅ **Test throughout** - `--with-tests`, `--coverage`, `--type e2e`
✅ **Security first** - `--safe`, `@agent-security`, `--focus security`
✅ **Small files** - CLAUDE.md <100, Skills <500
✅ **Progressive disclosure** - grep/glob → read specific

## Planning-with-Files

✅ Create plan FIRST (all 3 files)
✅ **2-Action Rule** (CRITICAL) - Update findings.md after 2 view/browser ops
✅ Read before decide - Refresh goals
✅ Update after act - Mark phases complete
✅ One phase at a time - Only one `in_progress`
✅ Session recovery - Use after `/clear`

## SuperClaude

✅ Start simple, scale up - Don't over-engineer
✅ Use agents - Auto-activate or manual
✅ Leverage modes - Auto or force when needed
✅ MCP strategic - Essential trio for most work
✅ Utilize memory - Trust PM agent, check `reflexion.jsonl`

## Anti-Patterns

❌ Starting without plan
❌ Stuffing CLAUDE.md (>100 lines)
❌ Ignoring context limits (>20 iterations)
❌ Vague prompts
❌ Skipping success tests
❌ Over-engineering
❌ Hiding errors
❌ Repeating failed actions
❌ Using `/compact` too much (use phase files + `/clear`)
❌ Not using subagents (context pressure)

---

# 14. Quick Reference

## Essential Commands

```bash
# VANILLA
/plan /implementation /complete-phase /update-context /review

# BUILT-IN
/clear /compact /init /vim /memory /bashes

# PLANNING-WITH-FILES
/planning-with-files

# SUPERCLAUDE (30+ total, key ones)
/sc:brainstorm /sc:research /sc:design /sc:implement /sc:workflow
/sc:analyze /sc:troubleshoot /sc:test /sc:improve /sc:cleanup
/sc:document /sc:explain /sc:index-repo
/sc:spec-panel /sc:business-panel
/sc:save /sc:load /sc:reflect
```

## Critical Rules

```
✅ CLAUDE.md < 100 lines
✅ /clear every 20 iterations
✅ Plan before code
✅ One phase at a time
✅ Test functionality, not code
✅ Log ALL errors
✅ Never repeat failures
✅ 2-Action Rule (planning-with-files)
✅ Use skills + hooks
```

## Decision Framework

```
Complexity?
├─ Simple → Vanilla
├─ Medium → Vanilla + phases
├─ Complex (research, >5 tools) → + planning-with-files
└─ Enterprise → + SuperClaude

Need?
├─ Plan → /plan OR /sc:brainstorm → /sc:workflow
├─ Implement → /sc:implement OR /sc:task OR /sc:spawn
├─ Quality → /review OR code-reviewer OR /sc:analyze OR /sc:spec-panel
└─ Debug → /sc:troubleshoot
```

## Keyboard Shortcuts

```
Escape       → Stop
Escape × 2   → Go back
Tab          → Toggle thinking
Shift+Tab    → Cycle modes
Ctrl+V       → Paste images
?            → Show shortcuts
```

## Agent Keywords

```
Security → security-engineer | Performance → performance-engineer
Frontend/UI → frontend-architect | Backend/API → backend-architect
Testing → quality-engineer | Refactor → refactoring-expert
```

## Troubleshooting

**Hooks not running**: `chmod +x .claude/hooks/*.sh`, check `settings.json`
**Skills not activating**: Check `skill-rules.json`, test hook manually
**Context lost**: `/update-context` or `/planning-with-files` or `/sc:load`
**MCP issues**: Check Node.js 18+, `claude mcp list`, restart session
**Agent not activating**: Use keywords, or manual `@agent-name`
**Context fills fast**: `--uc`, `/sc:index-repo`, `/clear` more often

## File Structure Quick Ref

```
project/
├── CLAUDE.md (<100 lines)
├── task_plan.md, findings.md, progress.md (planning-with-files)
├── .mcp.json
└── .claude/
    ├── settings.json
    ├── commands/*.md → /commands
    ├── skills/*/SKILL.md + skill-rules.json
    ├── agents/*.md
    └── hooks/*.sh
```

## Token Optimization

- CLAUDE.md <100 lines (<1000 tokens)
- Use project indexing: `/sc:index-repo` (94% reduction)
- Clear every 20 iterations
- Reference by path, not content
- Disable unused MCP servers
- Use `--uc` for compression
- Batch related questions
- Subagents for isolation

## Workflow Quick Picks

```bash
# Feature
/sc:brainstorm → /sc:design → /sc:implement --with-tests → /sc:test

# Bug
/sc:troubleshoot --trace → /sc:implement "fix" → /sc:test

# Refactor
/sc:analyze --focus quality → /sc:improve --safe → /sc:cleanup → /sc:test

# Research
/sc:research --depth deep → /sc:design → /sc:implement --c7

# Vanilla phase-based
/plan → /implementation → work → /complete-phase → repeat

# Cross-session
/update-context → /clear → /planning-with-files OR "Read phase-X.md" OR /sc:load
```

---

# 15. Interactive Setup

## Claude's Setup Workflow

When a user requests setup, Claude should:

### Step 1: Assess Project

Ask user:

```
1. What type of project? (web app, CLI tool, API, library, etc.)
2. Tech stack? (languages, frameworks)
3. Project complexity? (simple/medium/complex/enterprise)
4. Team size? (solo/small team/large team)
5. Existing codebase or new project?
```

### Step 2: Recommend Framework

Based on answers:

- **Simple/solo** → Vanilla (CLAUDE.md + 2-3 commands)
- **Medium/small team** → Vanilla + phase-based dev
- **Complex/research needed** → + planning-with-files
- **Enterprise/large team** → + SuperClaude

### Step 3: Create Structure

```bash
# Always create
mkdir -p .claude/{commands,skills,agents,hooks}
```

### Step 4: Create Files Based on Framework

**Vanilla (always)**:

- CLAUDE.md (use Appendix D template)
- .claude/settings.json (use Appendix D)
- .claude/commands/plan.md (use Appendix A)
- .claude/commands/review.md (use Appendix A)
- .gitignore entry

**+ Phase-based**:

- .claude/commands/implementation.md (use Appendix A)
- .claude/commands/complete-phase.md (use Appendix A)
- .claude/commands/update-context.md (use Appendix A)

**+ Skills (if applicable)**:

- Based on tech stack, create 1-2 skills (use Appendix C)
- .claude/skills/skill-rules.json (use Appendix C)
- .claude/hooks/skill-activation.sh (use Appendix B)

**+ Subagents**:

- .claude/agents/code-reviewer.md (use Appendix C)

**+ Hooks**:

- .claude/hooks/build-check.sh (if has build process) (use Appendix B)

### Step 5: Make Executable

```bash
chmod +x .claude/hooks/*.sh
```

### Step 6: Guide First Use

Show user:

```
✅ Setup complete! Try these commands:

# View your setup
cat CLAUDE.md

# Start a new feature
/plan

# Review code
/review

# Clear context (use often!)
/clear
```

### Decision Tree for Setup

```python
def setup_claude_folder(project_info):
    # Always create base
    create_structure()
    create_claude_md(project_info)
    create_settings_json()
    create_gitignore_entry()

    # Essential commands (always)
    create_command("plan")
    create_command("review")

    # Based on complexity
    if project_info.complexity in ["medium", "complex", "enterprise"]:
        create_command("implementation")
        create_command("complete-phase")
        create_command("update-context")

    # Based on tech stack
    if project_info.has_backend:
        create_skill("backend-guidelines")
    if project_info.has_frontend:
        create_skill("frontend-guidelines")

    # Based on project type
    if project_info.has_build_process:
        create_hook("build-check")

    # Always helpful
    create_agent("code-reviewer")

    # Skill activation if skills exist
    if skills_created:
        create_hook("skill-activation")
        create_file("skill-rules.json")

    make_hooks_executable()
    show_next_steps()
```

---

# Appendix A: Complete Command Templates

## /plan Command

**.claude/commands/plan.md**:

```markdown
You are creating a strategic plan for the project.

## Instructions

Create a file called `plan.md` in the project root with the following structure:

# [Project Name]

## Problem

[One sentence describing the problem this solves]

## Core Features (MVP)

[List only essential features needed for minimum viable product]

1. Feature 1
2. Feature 2
3. Feature 3

## Future Features (Post-MVP)

[List features that are NOT being built now - prevents scope creep]

- Feature A
- Feature B

## Tech Stack

[Be specific with versions where possible]

- Frontend: [e.g., React 18.2, TypeScript 5.0]
- Backend: [e.g., Node.js 20, Express 4.18]
- Database: [e.g., PostgreSQL 15]
- Other: [e.g., Redis, Docker]

## Phases

[High-level breakdown of implementation phases]

1. Phase 1: [Name] - [Brief description]
2. Phase 2: [Name] - [Brief description]
3. Phase 3: [Name] - [Brief description]

## Important Notes

[Any critical information, constraints, or dependencies]

---

## Rules

- Do NOT start coding yet
- Keep it under 100 lines
- Focus on WHAT to build, not HOW
- Be specific about what's in/out of scope
- Ask clarifying questions if requirements unclear
```

## /implementation Command

**.claude/commands/implementation.md**:

```markdown
You are creating a detailed implementation plan from plan.md.

## Instructions

1. Read plan.md
2. Create directory: `mkdir -p implementation`
3. Create `implementation/implementation.md` with ALL phases
4. Create `implementation/phase-1-implementation.md` with detailed first phase

## implementation.md Structure

# Implementation Plan: [Project Name]

## Phase 1: [Name]

- **Status:** [ ] Not Started | [x] In Progress | [x] Complete
- **Deliverable:** [What works after this phase - be specific]
- **Success Test:** [Exact steps to verify it works]
- **Estimated Effort:** [e.g., 2-4 hours]

### Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Files

- `path/to/file.ts` - [Purpose]
- `path/to/test.ts` - [Test coverage]

## Phase 2: [Name]

[Same structure]

## Phase 3: [Name]

[Same structure]

---

## phase-1-implementation.md Structure

# Phase 1: [Name] - Detailed Plan

## Deliverable

[What works after this phase]

## Success Test

1. [Exact step 1]
2. [Exact step 2]
3. [Expected result]

## Prerequisites

- [What must exist before starting]

## Detailed Tasks

### Task 1: [Name]

- **What:** [Description]
- **Why:** [Rationale]
- **How:** [Implementation approach]
- **Files:** [Affected files]
- **Tests:** [Test requirements]

### Task 2: [Name]

[Same structure]

## Decisions to Make

1. [Decision point] - Options: A, B, C
2. [Decision point] - Options: X, Y

## Risks & Mitigations

| Risk   | Mitigation      |
| ------ | --------------- |
| [Risk] | [How to handle] |

---

## Rules

- Every phase must have specific, testable deliverable
- Success tests must have exact steps
- Break phases into 1-4 hour chunks
- Don't start implementation yet - just create the plan
```

## /complete-phase Command

**.claude/commands/complete-phase.md**:

```markdown
You are completing the current phase and transitioning to the next.

## Instructions

### Step 1: Run Success Test

1. Find current phase in `implementation/implementation.md`
2. Find the **Success Test** for that phase
3. Execute the success test exactly as written
4. Document results

### Step 2: Verify Completion

Check that:

- [ ] All tasks in phase are complete
- [ ] Success test passes
- [ ] Files are created/modified as planned
- [ ] No errors or warnings

### Step 3: Update implementation.md

1. Change current phase status from `[x] In Progress` to `[x] Complete`
2. Add completion timestamp
3. Document any deviations from plan

### Step 4: Transition

**If more phases exist:**

1. Identify next phase number
2. Create `implementation/phase-[N]-implementation.md` with detailed plan
3. Change next phase status to `[x] In Progress`
4. Begin work on next phase

**If all phases complete:**

1. Ask user: "All phases complete! What would you like to do next?"
2. Options: Add new feature, refactor, optimize, deploy, etc.

### Step 5: Context Update

Update any relevant tracking:

- Mark todos complete
- Update progress.md (if using planning-with-files)
- Document lessons learned

---

## Rules

- NEVER skip the success test
- NEVER move to next phase if current phase fails
- Document all issues encountered
- Keep implementation.md up to date
```

## /update-context Command

**.claude/commands/update-context.md**:

```markdown
You are saving context before a /clear command.

## Instructions

This command prepares the session for a context reset while preserving critical information.

### Step 1: Locate Active Documentation

Find the primary context files:

- `implementation/` directory (if exists)
- `plan.md` (if exists)
- Active phase file (e.g., `phase-2-implementation.md`)
- `task_plan.md` (if using planning-with-files)

### Step 2: Identify Current State

Determine:

- Which phase are you on?
- What tasks are in-progress vs complete?
- What files have been modified?
- What decisions have been made?
- What errors have been encountered?

### Step 3: Update Context Files

**If using implementation/ (phase-based):**

- Update `implementation/implementation.md` with current phase status
- Document any in-progress work
- Note next steps

**If using planning-with-files:**

- Update `task_plan.md` - Current Phase, Decisions, Errors
- Update `findings.md` - Recent discoveries
- Update `progress.md` - Actions taken, files modified

**If using neither:**

- Create a `context.md` file with:
  - Current state
  - Files modified
  - Next steps
  - Important decisions

### Step 4: Create Recovery Instructions

Add a "Resume Instructions" section:

## Resume Instructions (After /clear)

**Current Phase:** Phase X - [Name]
**Status:** [Describe current state]
**Last Action:** [What was just completed]
**Next Step:** [What to do next]

**To Resume:**

1. Read this file
2. Read [specific phase file or task_plan.md]
3. Continue with: [specific task]

**Modified Files:**

- `path/file1.ts` - [what changed]
- `path/file2.ts` - [what changed]

### Step 5: Confirm Safety

Output message:
```

✅ Context updated and saved to [file locations]
✅ Safe to run /clear
✅ To resume: "Read [primary context file] and continue"

```

---

## Rules

- Always save state before suggesting /clear
- Be specific about resume instructions
- Include file paths and current state
- Make resumption seamless
```

## /review Command

**.claude/commands/review.md**:

```markdown
You are performing a comprehensive code review.

## Instructions

Review the codebase or specified files for issues across multiple dimensions.

### Review Checklist

#### 1. Bugs & Logic Errors

- [ ] Edge cases handled (null, undefined, empty arrays)
- [ ] Loop bounds correct
- [ ] Async/await used properly
- [ ] Error handling present
- [ ] Race conditions avoided
- [ ] Off-by-one errors
- [ ] Type conversions safe

#### 2. Security Issues

- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Input validation present
- [ ] Output encoding applied
- [ ] No hardcoded secrets/credentials
- [ ] Authentication checks in place
- [ ] Authorization properly enforced
- [ ] CSRF protection (where applicable)
- [ ] Sensitive data not logged

#### 3. Performance Issues

- [ ] No N+1 query problems
- [ ] Database queries optimized
- [ ] Proper indexing used
- [ ] No unnecessary computations in loops
- [ ] Memory leaks avoided
- [ ] Large data sets handled efficiently
- [ ] Caching used where appropriate

#### 4. Code Quality & Patterns

- [ ] Follows project conventions
- [ ] Consistent with existing code
- [ ] Properly modular
- [ ] Functions are focused (single responsibility)
- [ ] DRY principle followed
- [ ] No code duplication
- [ ] Clear naming conventions

#### 5. Testing

- [ ] Critical paths tested
- [ ] Edge cases tested
- [ ] Error conditions tested
- [ ] Test coverage adequate

---

## Output Format

### 🔴 Critical Issues (Must Fix Before Commit)

**Issue:** [Description]
**Location:** `file.ts:42`
**Why:** [Explanation of impact]
**Fix:** [Specific solution]

### 🟡 Warnings (Should Fix Soon)

**Issue:** [Description]
**Location:** `file.ts:100`
**Why:** [Explanation]
**Suggestion:** [How to improve]

### 🟢 Suggestions (Nice to Have)

**Suggestion:** [Description]
**Location:** `file.ts:200`
**Benefit:** [Why this would help]

---

## Rules

- NO style nitpicks (formatting, naming preferences)
- Focus on functionality and correctness
- Explain WHY each issue matters
- Provide specific, actionable fixes
- Prioritize security and bugs over optimizations
- If no issues found, say so explicitly
```

---

# Appendix B: Complete Hook Scripts

## skill-activation.sh

**.claude/hooks/skill-activation.sh**:

```bash
#!/bin/bash
# Skill Auto-Activation Hook
# Suggests skills based on prompt keywords

PROMPT=$(cat)
RULES_FILE=".claude/skills/skill-rules.json"

# Exit if no rules file
[ ! -f "$RULES_FILE" ] && exit 0

# Check if jq is available
if ! command -v jq &> /dev/null; then
    exit 0
fi

MATCHED=""

# Check each skill for keyword matches
while IFS= read -r skill; do
    keywords=$(jq -r ".\"$skill\".promptTriggers.keywords[]?" "$RULES_FILE" 2>/dev/null)

    for kw in $keywords; do
        if echo "$PROMPT" | grep -qi "$kw"; then
            MATCHED="$MATCHED $skill"
            break
        fi
    done
done < <(jq -r 'keys[]' "$RULES_FILE")

# Output suggestions if matches found
if [ -n "$(echo $MATCHED | tr -d ' ')" ]; then
    echo ""
    echo "🎯 Relevant skills detected:$MATCHED"
    echo ""
    echo "To activate a skill, include in your prompt:"
    echo "\"Use the [skill-name] skill for this task\""
    echo ""
fi

exit 0
```

## build-check.sh

**.claude/hooks/build-check.sh**:

```bash
#!/bin/bash
# Build Check Hook
# Runs after Claude's response to ensure build still works

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Check if package.json exists and has build script
if [ -f "package.json" ]; then
    if grep -q '"build"' package.json; then
        echo "🔨 Running build check..."

        # Run build
        npm run build 2>&1
        BUILD_EXIT=$?

        if [ $BUILD_EXIT -ne 0 ]; then
            echo ""
            echo "❌ BUILD FAILED!"
            echo ""
            echo "The build is broken. Please fix the errors above before continuing."
            echo ""
            exit 2  # Exit code 2 blocks Claude's response
        else
            echo "✅ Build successful"
        fi
    fi
fi

exit 0
```

## test-check.sh (Optional)

**.claude/hooks/test-check.sh**:

```bash
#!/bin/bash
# Test Check Hook
# Runs tests after code changes

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Check if tests exist
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    # Only run if files were modified
    if [ -n "$CLAUDE_FILE_PATHS" ]; then
        echo "🧪 Running tests..."

        # Run tests
        npm test 2>&1
        TEST_EXIT=$?

        if [ $TEST_EXIT -ne 0 ]; then
            echo ""
            echo "⚠️  TESTS FAILED"
            echo ""
            echo "Some tests are failing. Review and fix if needed."
            echo "(Not blocking - you can continue, but tests should pass before commit)"
            echo ""
        else
            echo "✅ All tests passing"
        fi
    fi
fi

exit 0
```

## format-check.sh (Optional)

**.claude/hooks/format-check.sh**:

```bash
#!/bin/bash
# Format Check Hook
# Runs formatter/linter after changes

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Check for prettier
if [ -f "package.json" ] && grep -q '"prettier"' package.json; then
    if [ -n "$CLAUDE_FILE_PATHS" ]; then
        echo "💅 Running formatter..."
        npx prettier --write $CLAUDE_FILE_PATHS 2>&1
    fi
fi

# Check for eslint
if [ -f "package.json" ] && grep -q '"eslint"' package.json; then
    if [ -n "$CLAUDE_FILE_PATHS" ]; then
        echo "🔍 Running linter..."
        npx eslint --fix $CLAUDE_FILE_PATHS 2>&1
    fi
fi

exit 0
```

---

# Appendix C: Complete Skill Examples

## Backend Guidelines Skill

**.claude/skills/backend-guidelines/SKILL.md**:

```markdown
---
description: Backend development patterns for Node.js/Express APIs
---

# Backend Guidelines

## When to Use

Activate this skill when:

- Creating API endpoints
- Writing database operations
- Implementing backend services
- Working with authentication/authorization
- Building RESTful APIs

## Architecture Pattern
```

Request → Router → Controller → Service → Repository → Database
↓ ↓ ↓ ↓
Validation Business Data SQL/ORM
Middleware Logic Access

````

## File Locations

- **Controllers**: `/src/controllers/*.controller.ts`
- **Services**: `/src/services/*.service.ts`
- **Repositories**: `/src/repositories/*.repository.ts`
- **Routes**: `/src/routes/*.routes.ts`
- **Middleware**: `/src/middleware/*.middleware.ts`
- **Models**: `/src/models/*.model.ts`

## Key Patterns

### 1. Controller Pattern

```typescript
// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { AppError } from '../utils/errors';

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await userService.create(userData);

      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}
````

### 2. Service Pattern

```typescript
// src/services/user.service.ts
import { userRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/crypto";
import { AppError } from "../utils/errors";

export class UserService {
  async findById(id: string) {
    return userRepository.findById(id);
  }

  async create(userData: CreateUserDto) {
    // Business logic here
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await hashPassword(userData.password);

    return userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }
}
```

### 3. Repository Pattern

```typescript
// src/repositories/user.repository.ts
import { db } from "../lib/db";

export class UserRepository {
  async findById(id: string) {
    return db.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return db.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserData) {
    return db.user.create({ data });
  }
}
```

### 4. Route Pattern

```typescript
// src/routes/user.routes.ts
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import { createUserSchema } from "../schemas/user.schema";

const router = Router();
const userController = new UserController();

router.get("/:id", authenticate, userController.getUser);
router.post("/", validateRequest(createUserSchema), userController.createUser);

export default router;
```

### 5. Error Handling

```typescript
// src/utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// src/middleware/error.middleware.ts
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error
  console.error(err);

  // Don't expose error details in production
  const response = {
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
}
```

## Security Rules

- ✅ Always validate input (use Zod, Joi, or class-validator)
- ✅ Hash passwords (bcrypt, argon2)
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Implement rate limiting
- ✅ Use HTTPS in production
- ✅ Sanitize output to prevent XSS
- ✅ Use CORS properly
- ✅ Never log sensitive data (passwords, tokens)
- ✅ Use environment variables for secrets
- ❌ Never trust client input
- ❌ Never return sensitive data in API responses

## Testing Pattern

```typescript
// src/controllers/user.controller.test.ts
import { userController } from "./user.controller";
import { userService } from "../services/user.service";

jest.mock("../services/user.service");

describe("UserController", () => {
  describe("getUser", () => {
    it("should return user when found", async () => {
      const mockUser = { id: "1", email: "test@example.com" };
      (userService.findById as jest.Mock).mockResolvedValue(mockUser);

      const req = { params: { id: "1" } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      await userController.getUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ data: mockUser });
    });

    it("should call next with error when user not found", async () => {
      (userService.findById as jest.Mock).mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      await userController.getUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
```

````

**.claude/skills/backend-guidelines/resources/database.md**:

```markdown
# Database Patterns

## Prisma ORM

### Schema Definition

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
````

### Query Patterns

```typescript
// Find with relations
const user = await db.user.findUnique({
  where: { id },
  include: { posts: true },
});

// Find many with filters
const users = await db.user.findMany({
  where: {
    email: { contains: "@example.com" },
  },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
});

// Transactions
await db.$transaction([
  db.user.create({ data: userData }),
  db.post.create({ data: postData }),
]);
```

````

## Frontend Guidelines Skill

**.claude/skills/frontend-guidelines/SKILL.md**:

```markdown
---
description: Frontend development patterns for React/Next.js applications
---

# Frontend Guidelines

## When to Use

Activate when:
- Creating React components
- Building UI/UX features
- Implementing state management
- Working with forms
- Handling client-side routing

## Component Pattern

````

Component Structure:
├── Props interface
├── State/hooks
├── Event handlers
├── Effects
├── Render logic
└── Styling

````

## File Locations

- **Components**: `/src/components/**/*.tsx`
- **Pages**: `/src/app/**` (Next.js App Router)
- **Hooks**: `/src/hooks/*.ts`
- **Utils**: `/src/lib/*.ts`
- **Types**: `/src/types/*.ts`
- **Styles**: `/src/styles/**`

## Key Patterns

### 1. Component Pattern

```typescript
// src/components/UserCard.tsx
import { useState } from 'react';

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  onDelete?: (id: string) => void;
}

export function UserCard({ id, name, email, onDelete }: UserCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Delete failed:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      {onDelete && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
    </div>
  );
}
````

### 2. Custom Hook Pattern

```typescript
// src/hooks/useUser.ts
import { useState, useEffect } from "react";

export function useUser(userId: string) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}
```

### 3. Form Pattern (with React Hook Form)

```typescript
// src/components/UserForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm({ onSubmit }: { onSubmit: (data: UserFormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} placeholder="Email" type="email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} placeholder="Password" type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Accessibility Rules (WCAG 2.1)

- ✅ Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- ✅ Add ARIA labels where needed
- ✅ Ensure keyboard navigation works
- ✅ Provide alt text for images
- ✅ Maintain color contrast (4.5:1 minimum)
- ✅ Make interactive elements focusable
- ✅ Use proper heading hierarchy
- ❌ Don't use `div` for buttons
- ❌ Don't rely on color alone for information

````

## skill-rules.json

**.claude/skills/skill-rules.json**:

```json
{
  "backend-guidelines": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": [
        "backend",
        "api",
        "endpoint",
        "controller",
        "service",
        "repository",
        "database",
        "server",
        "express",
        "fastify"
      ],
      "intentPatterns": [
        "(create|add|build).*?(api|endpoint|controller|service)",
        "(implement|write).*?(backend|server)"
      ]
    },
    "fileTriggers": {
      "pathPatterns": [
        "src/controllers/**",
        "src/services/**",
        "src/repositories/**",
        "src/routes/**",
        "src/api/**"
      ],
      "contentPatterns": [
        "router\\.",
        "express",
        "export.*Controller",
        "export.*Service"
      ]
    }
  },
  "frontend-guidelines": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": [
        "frontend",
        "react",
        "component",
        "ui",
        "interface",
        "form",
        "page",
        "next.js",
        "vue",
        "angular"
      ],
      "intentPatterns": [
        "(create|add|build).*?(component|page|form|ui)",
        "(implement|write).*?(frontend|interface)"
      ]
    },
    "fileTriggers": {
      "pathPatterns": [
        "src/components/**",
        "src/app/**",
        "src/pages/**",
        "components/**"
      ],
      "contentPatterns": [
        "export.*function.*Component",
        "useState",
        "useEffect",
        "return.*<"
      ]
    }
  }
}
````

---

# Appendix D: Complete Configuration Files

## settings.json (Base Configuration)

**.claude/settings.json**:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(yarn *)",
      "Bash(pnpm *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git log *)",
      "Bash(git branch *)",
      "Bash(docker ps *)",
      "Bash(docker logs *)",
      "Edit",
      "Write",
      "Read",
      "Glob",
      "Grep"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(sudo *)",
      "Bash(chmod 777 *)",
      "Bash(dd *)",
      "Bash(mkfs *)"
    ]
  },
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/skill-activation.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/build-check.sh"
          }
        ]
      }
    ]
  }
}
```

## CLAUDE.md Templates

### Web Application

**CLAUDE.md** (Web App):

```markdown
# [Project Name]

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run linter

## Structure

- `/src/app` - Next.js pages (App Router)
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and helpers
- `/src/api` - API routes
- `/prisma` - Database schema

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript 5.0
- Backend: Next.js API Routes, Prisma ORM
- Database: PostgreSQL 15
- Styling: Tailwind CSS 3.4
- Testing: Jest, React Testing Library

## Coding Rules

- Use Server Components by default (Next.js)
- Client Components only when needed (interactivity, hooks)
- All database access through Prisma client in `/src/lib/db`
- Validate all inputs with Zod
- Follow RESTful conventions for API routes
- Use TypeScript strictly (no `any` types)
- Write tests for all API endpoints

## Important Notes

- Run `docker compose up -d` before starting (PostgreSQL)
- Copy `.env.example` to `.env.local`
- Run `npx prisma migrate dev` after schema changes
- Build must pass before committing
```

### CLI Tool

**CLAUDE.md** (CLI Tool):

```markdown
# [CLI Tool Name]

## Commands

- `npm run build` - Build TypeScript
- `npm test` - Run tests
- `npm run dev` - Run in development mode
- `npm link` - Install CLI globally for testing

## Structure

- `/src/commands` - CLI commands
- `/src/lib` - Utility functions
- `/src/types` - TypeScript types
- `/tests` - Test files

## Tech Stack

- Runtime: Node.js 20
- Language: TypeScript 5.0
- CLI Framework: Commander.js
- Testing: Jest

## Coding Rules

- All commands in `/src/commands` directory
- Use Commander.js for command structure
- Include --help for all commands
- Provide meaningful error messages
- Use chalk for colored output (sparingly)
- Validate all user inputs
- Write tests for each command

## Important Notes

- Build before testing with `npm link`
- Update README.md with new commands
- Keep bundle size small (check with `npm run build`)
```

### API Service

**CLAUDE.md** (API Service):

```markdown
# [API Service Name]

## Commands

- `npm run dev` - Start development server (nodemon)
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm test` - Run tests
- `docker compose up` - Start database + Redis

## Structure

- `/src/controllers` - Route controllers
- `/src/services` - Business logic
- `/src/repositories` - Data access layer
- `/src/middleware` - Express middleware
- `/src/routes` - API routes
- `/src/models` - Database models

## Tech Stack

- Runtime: Node.js 20
- Framework: Express 4.18
- Language: TypeScript 5.0
- Database: PostgreSQL 15 + Prisma ORM
- Cache: Redis 7
- Testing: Jest + Supertest

## Coding Rules

- Follow Controller → Service → Repository pattern
- All database access through repositories
- Use dependency injection for services
- Validate inputs with Zod
- Return consistent API response format
- Include proper error handling
- Use async/await (no callbacks)
- Write integration tests for all endpoints

## Important Notes

- Port 3000 for API, 5432 for PostgreSQL, 6379 for Redis
- Run migrations before starting: `npx prisma migrate dev`
- All secrets in environment variables (.env)
- API versioning in routes: `/api/v1/`
```

---

## For Human Readers

**Starting points**:

- Solo, simple → Vanilla (CLAUDE.md + commands)
- Multi-step, research → + planning-with-files
- Complex, teams → + SuperClaude

**Key takeaways**:

1. Filesystem is external memory
2. Plan everything, clear every 20 iterations
3. Phase-based works across all frameworks
4. 2-Action Rule prevents loss (planning-with-files)
5. Never repeat failures (mutate, 3-strike)
6. Progressive enhancement (start simple)

**Next steps**:

1. Setup (Part 2 checklist)
2. Start simple (vanilla + CLAUDE.md)
3. Add planning-with-files when complex
4. Scale to SuperClaude for enterprise

## For Claude Instances

**Decision tree**:

```python
if task_complexity == "simple":
    vanilla_claude_code()
elif task_complexity == "medium":
    vanilla_claude_code() + phase_based_dev()
elif task_complexity == "complex" or requires_research:
    vanilla_claude_code() + planning_with_files()
    # task_plan.md, findings.md, progress.md
    # 2-Action Rule, Work Loop
else:  # enterprise, multi_domain
    superclaude_framework()
    # Agents, modes, MCP, memory, 30+ commands
```

**Core workflow**:

```
1. READ PLAN (refresh goals)
2. WORK (research/implement/test)
3. UPDATE FILES (findings after 2 view/browser, progress, task_plan)
4. CHECK COMPLETION (mark phases complete)
5. HANDLE ERRORS (log, mutate approach)
6. REPEAT → DELIVER
```

**Critical rules**:

```
✅ Plan FIRST (task_plan.md or plan.md)
✅ 2-Action Rule (findings.md after 2 view/browser ops)
✅ Log ALL errors with attempts
✅ Never repeat failures (MUTATE)
✅ One phase in_progress
✅ /clear every 20 iterations
✅ Read plan before decisions
✅ Verify before stopping
```

---

**Resources**:

- Official: https://docs.claude.com/en/docs/claude-code
- planning-with-files: https://github.com/OthmanAdi/planning-with-files
- SuperClaude: https://github.com/SuperClaude-Org/SuperClaude_Framework
- Manus: https://manus.im/blog/Context-Engineering-for-AI-Agents
