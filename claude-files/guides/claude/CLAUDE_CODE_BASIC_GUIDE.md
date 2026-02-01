# Claude Code: Complete Guide

> A comprehensive guide to Claude Code for both humans learning the system and Claude itself as a reference.

---

## Table of Contents

### FOUNDATIONS

- [Part 0: Core Philosophy](#part-0-core-philosophy)
- [Part 1: Directory Structure](#part-1-directory-structure)
- [Part 2: CLAUDE.md](#part-2-claudemd)

### ESSENTIAL SETUP

- [Part 3: Settings & Permissions](#part-3-settings--permissions)
- [Part 4: Custom Commands](#part-4-custom-commands)
- [Part 5: Skills System](#part-5-skills-system)

### CORE FEATURES

- [Part 6: Hooks System](#part-6-hooks-system)
- [Part 7: Subagents](#part-7-subagents)
- [Part 8: Context Management](#part-8-context-management)

### WORKFLOWS

- [Part 9: Phase-Based Development](#part-9-phase-based-development)
- [Part 10: Initial Setup](#part-10-initial-setup)

### ADVANCED

- [Part 11: Skill Auto-Activation](#part-11-skill-auto-activation)
- [Part 12: MCP Servers](#part-12-mcp-servers)
- [Part 13: Advanced Features](#part-13-advanced-features)

### REFERENCE

- [Part 14: Shortcuts & Tips](#part-14-shortcuts--tips)
- [Part 15: Troubleshooting](#part-15-troubleshooting)
- [Part 16: Quick Reference](#part-16-quick-reference)

---

# Part 0: Core Philosophy

## The Two Golden Principles

**1. Minimal Sufficiency**

> Only give Claude what it actually needs—more isn't always better.

- Every token in CLAUDE.md loads on _every_ interaction
- Large files defeat progressive disclosure
- If Claude doesn't need it now, don't include it

**2. Semantic Continuity**

> Focus on preserving meaning, not just raw data.

- Preserve _decisions_ and _intent_, not raw conversation
- Phase files capture the "why" not just the "what"
- Context restoration gives understanding, not just information

## Think Like a Product Manager

| What a PM Provides   | How to Apply                                  |
| -------------------- | --------------------------------------------- |
| Clear requirements   | Specific, actionable prompts with constraints |
| Success criteria     | Define "done" before starting                 |
| Context & motivation | Explain _why_, not just _what_                |
| Verification method  | Tests, functionality checks                   |

**Key**: Verify via functionality and tests, not line-by-line code review.

## Prompting Guidelines

**Tone & Structure**

- ✅ Action-oriented: "Create a function that..." not "I need..."
- ✅ Positive framing: "Always validate" not "Don't forget"
- ✅ Use constraints to prevent scope creep
- ✅ Break complex requests into numbered steps
- ✅ Provide explicit output guidance

**Special Keywords**
| Keyword | Effect |
|---------|--------|
| "Think" / "Think hard" / "Think harder" | Triggers extended thinking |
| "Ultrathink" | Maximum computation |
| "parallel subagents" | Team collaboration mode |

**Anti-Patterns**

- ❌ Leading questions—Claude tells you what you want to hear
- ❌ Vague scope—invites over-engineering
- ❌ Multiple unrelated tasks in one prompt
- ❌ Assuming Claude remembers

## The Primitives Hierarchy

```
PROMPTS/COMMANDS → One-off tasks, simple workflows
    ↓ compose into
SKILLS → Reusable patterns, domain-specific guidelines
    ↓ parallelize with
SUBAGENTS → Isolated context, specialized tasks
```

**Decision Guide**:

- Need it once? → **Prompt/Command**
- Need it repeatedly for a domain? → **Skill**
- Need parallel work or isolated context? → **Subagent**
- Need automatic enforcement? → **Hook + Skill**

## Context Management: Reduce & Delegate

**Reduce**

- Don't use MCP unless needed—each server adds overhead
- Keep CLAUDE.md <100 lines (ideally <1000 tokens)
- Use context priming commands: `/prime`, `/prime_bug`, `/prime_feature`

**Delegate**

- Use subagents to keep primary context small
- Skills load details progressively
- Phase files externalize context

## The Real Secret

> "Claude is like an extremely confident junior dev with extreme amnesia."

Every system here addresses:

1. **Confidence without competence** → Skills, hooks, reviews catch mistakes
2. **Amnesia** → Phase files, dev docs preserve state

**Plan everything. Document decisions. Review output. Clear context often.**

---

# Part 1: Directory Structure

## What Claude Reads Automatically

| File/Folder                 | Auto-Read?                | Purpose               |
| --------------------------- | ------------------------- | --------------------- |
| `CLAUDE.md`                 | ✅ Yes                    | Project instructions  |
| `.claude/commands/*.md`     | ✅ Yes                    | Custom slash commands |
| `.claude/settings.json`     | ✅ Yes                    | Permissions, hooks    |
| `.mcp.json`                 | ✅ Yes                    | MCP servers           |
| `.claude/skills/*/SKILL.md` | ⚠️ Sees, won't auto-use   | Guidelines            |
| `.claude/agents/*.md`       | ⚠️ Available, must invoke | Subagents             |

## Complete Structure

```
project/
├── CLAUDE.md                    ← Project config (<100 lines)
├── .mcp.json                    ← MCP config (optional)
└── .claude/
    ├── settings.json            ← Permissions & hooks
    ├── settings.local.json      ← Local overrides (gitignore)
    ├── commands/                ← Slash commands (*.md)
    ├── skills/                  ← Guidelines
    │   ├── [skill-name]/
    │   │   ├── SKILL.md         ← Main (<500 lines)
    │   │   └── resources/       ← Detailed docs
    │   └── skill-rules.json     ← Auto-activation
    ├── agents/                  ← Subagents (*.md)
    └── hooks/                   ← Hook scripts
```

---

# Part 2: CLAUDE.md

## Rules

- ✅ Under 100 lines
- ✅ Project-specific only
- ❌ No generic best practices (use skills)

## Template

```markdown
# Project Name

## Commands

- `npm run build` - Build project
- `npm test` - Run tests
- `npm run dev` - Start dev server

## Structure

- `/src/api` - Backend routes
- `/src/components` - React components

## Tech Stack

- Next.js 14, TypeScript, Prisma, PostgreSQL

## Coding Rules

- Use server components by default
- All DB access through `/src/lib/db`
- Zod for validation

## Important Notes

- Run `docker compose up -d` before tests
- Copy `.env.example` to `.env.local`
```

## Setup

```bash
/init                    # Auto-generate
# OR
touch CLAUDE.md          # Create manually
```

## Multiple CLAUDE.md (Nested)

Claude merges all CLAUDE.md files. Most specific (nested) wins conflicts.

---

# Part 3: Settings & Permissions

## File Locations

| File                          | Scope      | Commit? |
| ----------------------------- | ---------- | ------- |
| `.claude/settings.json`       | Project    | Yes     |
| `.claude/settings.local.json` | Local only | No      |
| `~/.claude/settings.json`     | User-level | N/A     |

## Template

```json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Edit",
      "Write",
      "Read"
    ],
    "deny": ["Bash(rm -rf /)", "Bash(sudo *)"]
  },
  "hooks": {}
}
```

---

# Part 4: Custom Commands

## Location & Usage

```
.claude/commands/
├── plan.md              → /plan
├── implementation.md    → /implementation
└── complete-phase.md    → /complete-phase
```

Use `$ARGUMENTS` for parameters: `/deploy staging` → `$ARGUMENTS = "staging"`

## Essential Commands

### 1. `/plan`

`.claude/commands/plan.md`:

```markdown
Create plan.md with:

## Problem

[One sentence]

## Core Features (MVP)

[Essential features only]

## Future Features (Post-MVP)

[What we're NOT building now]

## Tech Stack

[Specific versions]

## Phases

[High-level breakdown]

Do NOT start coding. Only create the plan.
```

### 2. `/implementation`

`.claude/commands/implementation.md`:

```markdown
Read plan.md and create implementation/implementation.md with phases.

For each phase:

- **Deliverable**: What works after this phase
- **Success Test**: How to verify
- **Tasks**: Implementation steps
- **Files**: Affected files

Then create phase-1-implementation.md with detailed tasks.
```

### 3. `/complete-phase`

`.claude/commands/complete-phase.md`:

```markdown
1. Run success test from implementation.md
2. Mark current phase Complete

IF more phases: Create next phase-N-implementation.md and start
IF all done: Ask "What next?", update plan, create new phase
```

### 4. `/update-context`

`.claude/commands/update-context.md`:

```markdown
Before /clear:

1. Find active docs in /dev/active/ or /implementation/
2. Update context file: decisions, files, state, next steps
3. Update tasks: mark complete, add new, note in-progress

Confirm: "Context updated. Safe to /clear"
```

### 5. `/review`

`.claude/commands/review.md`:

```markdown
Review code for:

1. Bugs and logic errors
2. Security issues (injection, XSS, secrets, auth)
3. Performance (N+1 queries, memory leaks)
4. Pattern consistency

Output:

### 🔴 Critical (Must Fix)

### 🟡 Warning (Should Fix)

### 🟢 Suggestions
```

---

# Part 5: Skills System

## Structure

```
.claude/skills/
├── [skill-name]/
│   ├── SKILL.md         ← Main (<500 lines)
│   └── resources/       ← Detailed docs
└── skill-rules.json     ← Auto-activation
```

## SKILL.md Template

````markdown
---
description: Brief description for matching
---

# Skill Name

## When to Use

- [Trigger 1]
- [Trigger 2]

## Quick Reference

### Pattern Name

[Explanation]

### File Locations

- [Type]: [path]

## Key Patterns

### Example Pattern

```language
[Code example]
```
````

## Resource Files

- `resources/[file].md` - [Description]

````

## Example: Backend Guidelines

```markdown
---
description: Backend patterns for Node.js/Express
---

# Backend Guidelines

## When to Use
- Creating API endpoints
- Database operations
- Backend services

## Architecture
Controller → Service → Repository

### File Locations
- Controllers: `/src/controllers`
- Services: `/src/services`
- Repositories: `/src/repositories`

## Key Patterns

### Controller Example
```typescript
export class UserController extends BaseController {
  async getUser(req: Request, res: Response) {
    try {
      const user = await userService.findById(req.params.id);
      res.json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
````

## Resource Files

- `resources/api-patterns.md` - Detailed patterns
- `resources/error-handling.md` - Sentry integration

````

## skill-rules.json

```json
{
  "backend-guidelines": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": ["backend", "api", "controller", "service"],
      "intentPatterns": [
        "(create|add).*?(endpoint|controller)"
      ]
    },
    "fileTriggers": {
      "pathPatterns": ["src/controllers/**", "src/services/**"],
      "contentPatterns": ["router\\.", "export.*Controller"]
    }
  }
}
````

## Manual Usage

```
"Use the backend-guidelines skill for this task"
```

---

# Part 6: Hooks System

## Hook Types

| Hook               | When                      | Use                                 |
| ------------------ | ------------------------- | ----------------------------------- |
| `UserPromptSubmit` | Before Claude sees prompt | Skill activation, context injection |
| `PreToolUse`       | Before tool use           | Block operations                    |
| `PostToolUse`      | After tool use            | Format, log                         |
| `Stop`             | After response            | Build checks                        |

## Configuration

```json
{
  "hooks": {
    "[HookType]": [
      {
        "matcher": "[Tool pattern]",
        "hooks": [
          {
            "type": "command",
            "command": "./.claude/hooks/[script].sh"
          }
        ]
      }
    ]
  }
}
```

## Exit Codes

- `0` = Success
- `2` = Block and show output to Claude

## Environment Variables

- `$CLAUDE_FILE_PATHS` - Edited files
- `$CLAUDE_PROJECT_DIR` - Project root
- `$CLAUDE_TOOL_NAME` - Tool used

## Essential Hook: Skill Activation

`.claude/hooks/skill-activation.sh`:

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

if [ -n "$(echo $MATCHED | tr -d ' ')" ]; then
  echo ""
  echo "🎯 Consider using: $MATCHED"
  echo "Load: \"Use the [skill-name] skill\""
fi
exit 0
```

Configuration:

```json
{
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
    ]
  }
}
```

## Essential Hook: Build Check

`.claude/hooks/build-check.sh`:

```bash
#!/bin/bash
cd "$CLAUDE_PROJECT_DIR"
npm run build 2>&1
if [ $? -ne 0 ]; then
    echo "Build failed! Fix errors."
    exit 2
fi
exit 0
```

Configuration:

```json
{
  "hooks": {
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

# Part 7: Subagents

## What They Are

Specialized AI assistants that run in isolated context. Results return to main session.

## Structure

```
.claude/agents/
├── code-reviewer.md
├── test-writer.md
└── security-auditor.md
```

## Template

```markdown
---
name: agent-name
description: What this agent does
model: sonnet # Optional: sonnet, opus, haiku
---

# Role Title

You are [role]. Your job is [task].

## Checklist

- [Check 1]
- [Check 2]

## Output Format

### Section 1

### Section 2

## Rules

- [Rule 1]
- [Rule 2]
```

## Example: Code Reviewer

`.claude/agents/code-reviewer.md`:

```markdown
---
name: code-reviewer
description: Reviews code for bugs, security, patterns
---

# Code Reviewer

Review for:

- **Bugs**: Edge cases, null checks, race conditions
- **Security**: Injection, XSS, secrets, auth
- **Performance**: N+1 queries, memory leaks
- **Patterns**: Codebase consistency

## Output

### 🔴 Critical (Must Fix)

### 🟡 Warning (Should Fix)

### 🟢 Suggestions

## Rules

- NO style nitpicks
- Explain WHY
- Suggest specific fixes
```

## Usage

```
"Use code-reviewer agent to review these changes"
"Spawn test-writer for PaymentService"
```

## When to Use

| Scenario          | Agent                            |
| ----------------- | -------------------------------- |
| Before commit     | code-reviewer                    |
| After new feature | test-writer                      |
| Auth/payment code | security-auditor                 |
| Before PR         | code-reviewer + security-auditor |

---

# Part 8: Context Management

## The Problem

Context fills up → quality drops

## The Solution

```bash
/clear   # Use constantly!
```

**When to clear:**

- After completing any task
- Every 2-3 messages on complex work
- When Claude seems confused

## Preserving Progress

```
1. /update-context    # Save to files
2. /clear
3. "Read [file] and continue"
```

## Rules

- Reset every 20 iterations
- CLAUDE.md <100 lines
- Skills <500 lines each
- Use phase files to externalize state
- Delegate to subagents

## The /compact Trap

Use `/compact` sparingly. Phase-based approach with files is better:

- ✅ Preserves details in files
- ✅ Maintains consistency
- ✅ Systematic management

---

# Part 9: Phase-Based Development

## What It Is

Build software incrementally through well-defined, testable phases. Each phase produces working deliverable.

## Core Principles

1. **Incremental Delivery** - Every phase ends with something that works
2. **Clear Success Criteria** - Explicit tests verify completion
3. **Bounded Scope** - Phases complete in one focused session
4. **Context Preservation** - Documents enable safe context clearing

## Structure

```
Phase N: [Name]
├── Deliverable    ← What works
├── Success Test   ← How to verify
├── Tasks          ← Steps
└── Files          ← What changes
```

## Workflow

```
/plan → Define scope
  ↓
/implementation → Break into phases
  ↓
Code Phase 1 → Test → /complete-phase
  ↓
Repeat
```

## File Structure

```
project/
├── plan.md
└── implementation/
    ├── implementation.md
    ├── phase-1-implementation.md
    └── phase-2-implementation.md
```

## Example: Todo App

```markdown
## Phase 1: Display Static List

**Deliverable**: Page shows hardcoded todos
**Success Test**: Open localhost:3000, see 3 items

## Phase 2: Add New Todos

**Deliverable**: User can add via input
**Success Test**: Type "Buy milk", press Enter, see in list

## Phase 3: Mark Complete

**Deliverable**: User can check off items
**Success Test**: Click checkbox, item shows strikethrough

## Phase 4: Persist Data

**Deliverable**: Todos survive refresh
**Success Test**: Add item, refresh, still there
```

## Best Practices

**Defining Phases**

- Start simple
- 1-4 hours of work each
- Name by deliverable, not activity

**Success Tests**

- Be specific and actionable
- Include exact steps
- Good: "1. Run `npm start` 2. Go to /login 3. Enter test@test.com/pass 4. See dashboard"
- Bad: "User can log in"

**Transitions**

- Never skip success test
- Update docs before next phase
- Add new requirements to future phases

## Results

| Metric             | Before | After     |
| ------------------ | ------ | --------- |
| Debugging time     | 40-60% | <10%      |
| Feature completion | ~60%   | 100%      |
| Code consistency   | Poor   | Excellent |

## Templates

### plan.md

```markdown
# [Project]

## Problem

[One sentence]

## Core Features (MVP)

1. [Feature]

## Future Features

- [Later]

## Tech Stack

- [Stack]

## Phases

1. [Phase]
```

### implementation.md

```markdown
## Phase N: [Name]

**Status**: [ ] Not Started | [x] In Progress | [x] Complete
**Deliverable**: [Outcome]
**Success Test**: [Steps]

### Tasks

- [ ] Task 1

### Files

- [path] - [purpose]
```

---

# Part 10: Initial Setup

## Step-by-Step

```bash
# 1. Create directories
mkdir -p .claude/{commands,skills,agents,hooks}

# 2. Create CLAUDE.md (see Part 2)

# 3. Create settings.json (see Part 3)

# 4. Create essential commands (see Part 4)
#    - /plan
#    - /implementation
#    - /complete-phase
#    - /update-context
#    - /review

# 5. Create skills for your stack
#    - backend-guidelines (if applicable)
#    - frontend-guidelines (if applicable)
#    - database-guidelines (if applicable)

# 6. Create skill-rules.json (see Part 5)

# 7. Create hooks
chmod +x .claude/hooks/*.sh

# 8. Create agents
#    - code-reviewer.md
#    - test-writer.md (if tests exist)

# 9. Update .gitignore
echo ".claude/settings.local.json" >> .gitignore
```

## Checklist

```
[ ] Directories created
[ ] CLAUDE.md with project info
[ ] settings.json with permissions
[ ] Essential commands created
[ ] Skills for project domains
[ ] skill-rules.json configured
[ ] Hooks created and executable
[ ] Agents created
[ ] .gitignore updated
[ ] Test /plan command
[ ] Test hooks work
```

---

# Part 11: Skill Auto-Activation

## Setup

1. Create `skill-rules.json` (see Part 5)
2. Create `skill-activation.sh` (see Part 6)
3. Make executable: `chmod +x .claude/hooks/skill-activation.sh`
4. Configure in settings.json

## When Worth It?

| Project Size      | Recommendation               |
| ----------------- | ---------------------------- |
| Small, solo       | Skip - use manual            |
| Medium            | Consider if patterns complex |
| Large (100k+ LOC) | Definitely                   |
| Team              | Essential                    |

---

# Part 12: MCP Servers

## What It Is

Model Context Protocol connects Claude to external tools, databases, APIs.

## Configuration

`.mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<token>"
      }
    }
  }
}
```

## Commands

```bash
claude mcp add <name> --scope user
claude mcp list
claude mcp remove <name>
```

## Popular Servers

- `server-github` - GitHub PR management
- `server-filesystem` - File operations
- `server-fetch` - Fetch URLs
- `sequential-thinking` - Complex task breakdown

⚠️ **Warning**: Each server adds context overhead. Disable unused servers.

---

# Part 13: Advanced Features

## Git Worktrees (Parallel Development)

Run multiple Claude instances without conflicts:

```bash
mkdir -p ../worktrees
git worktree add ../worktrees/feature-a feature-a-branch
git worktree add ../worktrees/feature-b feature-b-branch

# Terminal 1
cd my-project && claude

# Terminal 2
cd ../worktrees/feature-a && claude
```

**Tips**: 3-5 agents optimal, each is independent

## Headless Mode (CI/CD)

```bash
# Basic
claude -p "Review code for issues"

# With JSON output
claude -p "Review code" --output-format json

# GitHub Actions
gh pr diff ${{ github.event.pull_request.number }} | \
  claude -p "Review for bugs and security" --output-format json
```

## Background Tasks

```
"Run tests in background"
/bashes                    # List tasks
```

---

# Part 14: Shortcuts & Tips

## Keyboard Shortcuts

| Shortcut     | Action                   |
| ------------ | ------------------------ |
| `Escape`     | Stop Claude              |
| `Escape × 2` | Go back (branch)         |
| `Tab`        | Toggle extended thinking |
| `Shift+Tab`  | Cycle modes              |
| `Ctrl+V`     | Paste images             |
| `?`          | Show shortcuts           |

## Hidden Commands

| Command    | Action                |
| ---------- | --------------------- |
| `/vim`     | Enable vim mode       |
| `/memory`  | Open memory file      |
| `/bashes`  | List background tasks |
| `#message` | Save to CLAUDE.md     |

## Model Switching

- 0-50% quota: Opus (best)
- 50-100%: Sonnet (faster)

## Cost Optimization

1. `/clear` after every task (reset every 20 iterations)
2. CLAUDE.md <100 lines
3. Efficient prompts: clear, numbered steps
4. Chunk large tasks
5. Disable unused MCP servers
6. Batch related questions

**Typical costs**: $6-12/day, ~$100-200/month per dev

## The 30-Second Rule

If Claude tries same approach 3 times:

1. Press `Escape`
2. Intervene: "Stop. Issue is X. Fix by Y."
3. Or `Escape × 2` → "Try different approach"

---

# Part 15: Troubleshooting

| Issue                     | Solution                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Hooks not running         | • Scripts executable? `chmod +x`<br>• Path correct in settings.json?<br>• Valid JSON? |
| Skills not activating     | • skill-rules.json valid?<br>• Keywords match?<br>• Hook configured?                  |
| Context lost after /clear | • Run /update-context first<br>• Use phase files                                      |
| Build check blocking      | • Verify build command<br>• Check exit codes                                          |

## Debugging Hooks

```bash
# Test manually
echo "create API endpoint" | ./.claude/hooks/skill-activation.sh
echo $?  # Check exit code (0=success, 2=block)
```

## When Claude Gets Stuck

```
# Fresh approach
Escape × 2 → "Try different approach"

# Nuclear option
/clear → "Read @file and fix [specific issue]"
```

---

# Part 16: Quick Reference

```
╔══════════════════════════════════════════════════════════╗
║  WHAT CLAUDE READS AUTOMATICALLY                         ║
╠══════════════════════════════════════════════════════════╣
║  CLAUDE.md              → Always                         ║
║  .claude/commands/*.md  → Always (become /commands)      ║
║  .claude/settings.json  → Always                         ║
║  .mcp.json              → Always                         ║
║  .claude/skills/        → Sees, won't auto-use           ║
║  .claude/agents/        → Available for spawning         ║
╚══════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════╗
║  ESSENTIAL COMMANDS                                      ║
╠══════════════════════════════════════════════════════════╣
║  /init      → Create CLAUDE.md                           ║
║  /clear     → Reset context (USE OFTEN!)                 ║
║  /compact   → Summarize (use sparingly)                  ║
║  /vim       → Enable vim mode                            ║
║  /bashes    → List background tasks                      ║
╚══════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════╗
║  PHASE-BASED WORKFLOW                                    ║
╠══════════════════════════════════════════════════════════╣
║  /plan           → Define scope                          ║
║  /implementation → Break into phases                     ║
║  /complete-phase → Finish & transition                   ║
║                                                          ║
║  Restore: "Read implementation/phase-N.md and continue"  ║
╚══════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════╗
║  THE GOLDEN RULES                                        ║
╠══════════════════════════════════════════════════════════╣
║  1. CLAUDE.md under 100 lines                            ║
║  2. /clear every 2-3 messages                            ║
║  3. Plan before coding                                   ║
║  4. One phase at a time                                  ║
║  5. Review everything Claude produces                    ║
║  6. Reset every 20 iterations                            ║
║  7. Use skills + hooks for consistency                   ║
║  8. Delegate to subagents for parallel work              ║
╚══════════════════════════════════════════════════════════╝
```

## Common Patterns

```
Context Preservation:
  /update-context → /clear → "Read [file] and continue"

Phase Workflow:
  /plan → /implementation → code → /complete-phase → repeat

Skill Usage:
  Hook suggests → "Use [skill-name] skill" → work

Code Review:
  Implement → "Use code-reviewer agent" → fix → commit

Adding Feature:
  Update plan.md → Add phase → Create phase file → implement
```

## Resources

**Official**

- [Hooks Reference](https://docs.claude.com/en/docs/claude-code/hooks)
- [MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Subagents](https://docs.claude.com/en/docs/claude-code/sub-agents)

**Community**

- [Skills Guide](https://mikhail.io/2025/10/claude-code-skills/)
- [Auto-Activation](https://github.com/diet103/claude-code-infrastructure-showcase)
- [Awesome Subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
- [Complete Guide](https://github.com/zebbern/claude-code-guide)

---
