# Claude Code Configuration

This folder contains a complete Claude Code configuration designed to work in any repository while being easily customizable for your specific project.

## Quick Start

### First-Time Setup

1. **Customize for your project**:

   ```bash
   /setup-claude
   ```

   This analyzes your repository and customizes the configuration.

2. **Start working**:

   ```bash
   /plan
   ```

   Creates a strategic plan for your work.

3. **Review before committing**:
   ```bash
   /review
   ```
   Comprehensive code review.

## What's Included

### 📁 Folder Structure

```
.claude/
├── CLAUDE.md                    # Main configuration (customize with /setup-claude)
├── README.md                    # This file
├── settings.json                # Permissions and hooks
├── claude-files/                # Workflow files (moved to root by /setup-claude)
│   ├── plans/                   # Task plans
│   │   ├── current/             # One active task
│   │   └── archive/             # Completed tasks
│   └── guides/                  # Project guides
├── commands/                    # Custom commands
│   ├── plan.md                  # Create planning files in claude-files/plans/current/
│   ├── review.md                # Code review
│   ├── update-context.md        # Save state before /clear
│   ├── guide.md                 # Pattern recommendation (NEW!)
│   ├── setup-claude.md          # META: Analyze and customize
│   └── create-skill.md          # META: Create new skills
├── skills/                      # Skills (auto-activate based on context)
│   ├── skill-rules.json         # Auto-activation configuration
│   ├── code-quality/            # DRY, SOLID, error handling
│   ├── testing/                 # Framework-agnostic test patterns
│   ├── security/                # OWASP top 10, secure coding
│   ├── git-workflow/            # Commits, branching, PRs
│   ├── documentation/           # Clear docs and comments
│   ├── pattern-guide/           # Pattern selection guidance (NEW!)
│   └── skill-creator/           # META: Create well-structured skills
├── hooks/                       # Hooks (guide you through patterns)
│   ├── skill-activation.sh      # Suggest relevant skills
│   ├── planning-reminder.sh     # Remind to plan before implementing
│   ├── context-check.sh         # Monitor context usage
│   └── build-check.sh           # Run build after changes
└── subagents/                   # Specialized agents
    ├── code-reviewer.md         # Systematic code review
    ├── setup-assistant.md       # Initial setup and analysis
    └── pattern-guide.md         # Teach patterns as you work
```

## Available Commands

### Essential Commands

**`/plan`** - Create strategic plan

- Creates files in `claude-files/plans/current/` (task_plan.md, findings.md, progress.md)
- Checks for existing active plan first
- Defines success criteria and phase-by-phase breakdown
- Prevents scope creep
- Use before starting non-trivial work

**`/review`** - Comprehensive code review

- Checks quality, security, performance
- Categorizes issues by severity
- Provides specific fixes
- Use before committing or creating PR

**`/update-context`** - Save state before /clear

- Saves current work to `claude-files/plans/current/progress.md`
- Updates `claude-files/plans/current/findings.md`
- Creates `.recovery.md` with recovery instructions
- Enables seamless session continuation
- Use every ~50 tool calls (hook will remind you)

**`/guide`** - Pattern recommendation

- Analyzes your scenario
- Recommends pattern (Vanilla/Planning-with-Files/SuperClaude)
- Provides step-by-step instructions
- Use when unsure which approach to take

### Meta Commands

**`/setup-claude`** - Customize for your project

- Analyzes repository structure
- Detects tech stack
- Creates project-specific CLAUDE.md
- Configures appropriate hooks
- Run once when adding to new project

**`/create-skill`** - Create custom skill

- Codifies project-specific patterns
- Configures auto-activation
- Documents domain knowledge
- Use when you have repeated patterns

## Skills System

Skills are "knowledge modules" that guide Claude's behavior.

### Generic Skills (Available in All Projects)

| Skill             | Purpose                           | Auto-activates when                    |
| ----------------- | --------------------------------- | -------------------------------------- |
| **code-quality**  | DRY, SOLID, error handling        | "refactor", "clean up", "improve"      |
| **testing**       | Framework-agnostic test patterns  | "test", "spec", "coverage"             |
| **security**      | OWASP top 10, secure coding       | "auth", "security", "password"         |
| **git-workflow**  | Commits, branching, PRs           | "commit", "branch", "merge"            |
| **documentation** | Clear docs and comments           | "document", "readme", "comment"        |
| **pattern-guide** | Choose right pattern for scenario | "how should i", "approach", "workflow" |
| **skill-creator** | Create well-structured skills     | "create skill", "new skill"            |

### How Skills Work

**Auto-activation**: Skills automatically activate based on keywords in your prompts.

- The `skill-activation.sh` hook suggests relevant skills before each message.

**Explicit activation**: Request a skill directly:

```
"Use the security skill to review this authentication code"
```

**Create custom skills**: Codify your project-specific patterns:

```bash
/create-skill
```

## Hooks System

Hooks automatically guide you through best practices.

### Active Hooks

**skill-activation.sh** (UserPromptSubmit)

- Suggests relevant skills based on your prompt
- Example: Typing "refactor" → suggests code-quality skill

**planning-reminder.sh** (UserPromptSubmit)

- Reminds you to create plan for implementation work
- Prevents diving into code without thinking

**context-check.sh** (UserPromptSubmit)

- Counts tool calls
- Suggests `/update-context` after ~50 calls
- Prevents "lost in the middle" problem

**build-check.sh** (Stop, after Edit/Write)

- Runs build after code changes (if build script exists)
- Catches breaking changes immediately

## Workflows

### Feature Development Workflow

```bash
1. /plan                              # Create plan in claude-files/plans/current/
2. Implement phase by phase           # Follow the plan
3. Update claude-files/plans/current/findings.md  # Document discoveries (every 2 view ops)
4. /review                            # Code review before committing
5. Git commit                         # Commit the changes
6. Archive plan (if complete)         # mv claude-files/plans/current claude-files/plans/archive/YYYY-MM-DD-name
```

### Long Session Workflow

```bash
# After ~50-75 tool calls (hook will remind you):
1. /update-context         # Save state to progress.md
2. /clear                  # Free up context
3. Read .recovery.md       # Resume from where you left off
4. Continue working        # Context is fresh
```

### Bug Fix Workflow

```bash
1. Write failing test      # Test-driven development
2. Fix the bug             # Make test pass
3. /review                 # Verify fix is solid
4. Git commit              # Commit fix + test
```

### New Project Setup Workflow

```bash
1. Copy .claude/ folder to repo           # Includes claude-files/ inside .claude/
2. /setup-claude                           # Moves claude-files/ to root + customizes config
3. Review CLAUDE.md (at project root)      # Adjust project-specific rules
4. /create-skill                           # Add custom skills if needed
5. Start working with /plan
```

**Note**: In the template, `claude-files/` starts inside `.claude/` for easy distribution. When you run `/setup-claude`, it automatically moves `claude-files/` to the project root for easier access during workflows.

## Planning Files Organization

Planning files use a **one active task at a time** pattern to enforce focus and prevent context confusion.

### Directory Structure

```
claude-files/plans/
├── current/                    ← ONE active task only
│   ├── task_plan.md           ← Strategic plan
│   ├── findings.md            ← Discoveries & learnings
│   └── progress.md            ← Session status
└── archive/                    ← Completed tasks
    ├── 2026-01-20-user-auth/
    ├── 2026-01-22-dashboard/
    └── 2026-01-25-bugfix-login/
```

### Quick Reference

| Action                     | Command/Process                                                            |
| -------------------------- | -------------------------------------------------------------------------- |
| **Start new task**         | `/plan` → creates files in `claude-files/plans/current/`                   |
| **Archive completed task** | `mv claude-files/plans/current claude-files/plans/archive/YYYY-MM-DD-name` |
| **Resume archived task**   | `mv claude-files/plans/archive/YYYY-MM-DD-name claude-files/plans/current` |
| **Save before /clear**     | `/update-context` → updates `current/` files                               |
| **Switch tasks mid-work**  | Archive current, then `/plan` for new task                                 |

### Naming Convention for Archives

Format: `YYYY-MM-DD-short-description`

Examples:

- `2026-01-20-user-authentication`
- `2026-01-22-api-performance-optimization`
- `2026-01-25-bugfix-login-timeout`
- `2026-01-28-refactor-database-layer`

### Why One Active Task?

✅ **Enforces focus** - One phase in_progress at a time
✅ **Clear context** - Claude never confuses multiple tasks
✅ **Clean history** - Archive shows project evolution
✅ **Easy resumption** - Simple `mv` to switch between tasks
✅ **Prevents context switching** - Stay focused on current work

### What Gets Committed?

- `claude-files/plans/current/` → ❌ **Not committed** (working files, in .gitignore)
- `claude-files/plans/archive/` → ✅ **Can be committed** (useful team documentation)

## Patterns

This configuration enforces patterns from three frameworks:

### 1. Vanilla Claude Code

- Custom commands for common tasks
- Skills for domain knowledge
- Hooks for automation
- Subagents for complex tasks

### 2. Planning-with-Files (Manus Pattern)

- **claude-files/plans/current/task_plan.md** - Strategic plan (rarely changes)
- **claude-files/plans/current/findings.md** - Discoveries (updated frequently, 2-Action Rule)
- **claude-files/plans/current/progress.md** - Current status (updated before /clear)
- **claude-files/plans/archive/** - Completed plans (organized by date and feature)
- Prevents "lost in the middle" problem
- Enforces focus with one active task at a time

### 3. SuperClaude Framework

- Specialized agents for different tasks
- Meta-capabilities (self-improving system)
- Advanced workflows and modes

## Customization

### For Your Project

1. **Run `/setup-claude`**
   - Automatically detects tech stack
   - Creates project-specific CLAUDE.md
   - Enables appropriate hooks

2. **Edit `.claude/CLAUDE.md`**
   - Add project-specific coding rules
   - Document architecture patterns
   - List important files/directories

3. **Create custom skills** with `/create-skill`
   - API endpoint patterns
   - Component architecture
   - Domain business rules

4. **Add custom commands**
   - Create `.claude/commands/your-command.md`
   - Use with `/your-command`

### For Your Team

1. **Commit `.claude/` to git**
   - Entire team uses same patterns
   - Consistency across the project

2. **Document project patterns**
   - Create custom skills for team conventions
   - Add coding rules to CLAUDE.md

3. **Keep it updated**
   - Update skills as patterns evolve
   - Refine commands based on team feedback

## Tips

### Getting Started

- Start with `/plan` for any non-trivial work
- Let hooks guide you through patterns
- Review `.claude/CLAUDE.md` periodically

### Context Management

- Watch for context-check hook warnings
- Run `/update-context` every ~50 tool calls
- Use `/clear` to free up context

### Learning

- Skills teach patterns through examples
- Hooks remind you of best practices
- Subagents provide specialized expertise

### Customization

- Start minimal, add as needed
- Use `/create-skill` for repeated patterns
- Update CLAUDE.md when patterns change

## Troubleshooting

### Hooks not running

```bash
# Make hooks executable
chmod +x .claude/hooks/*.sh
```

### Skills not activating

- Check `.claude/skills/skill-rules.json`
- Ensure keywords match your prompts
- Try explicit activation: "Use the [skill-name] skill"

### Build check failing

- Hook catches build errors early (this is good!)
- Fix the errors, then continue
- Disable hook in `settings.json` if not needed

### Context issues

- Run `/update-context` more frequently
- Use `/clear` after saving state
- Follow 2-Action Rule (update claude-files/plans/current/findings.md every 2 view ops)
- Keep only ONE active task in claude-files/plans/current/

## Philosophy

This configuration follows these principles:

**Minimal Sufficiency**

- Start simple, add complexity only when needed
- CLAUDE.md < 200 lines
- Skills focused on one domain each

**Pattern Enforcement**

- Hooks guide you to follow best practices
- Skills codify project-specific patterns
- Commands automate common workflows

**Self-Improving**

- `/setup-claude` adapts to your project
- `/create-skill` lets you add new patterns
- Configuration evolves with your project

**Semantic Continuity**

- Planning-with-files pattern preserves context
- `/update-context` enables seamless session recovery
- Filesystem as external memory

## Resources

### Files to Read

- `.claude/CLAUDE.md` - Project-specific configuration
- `.claude/skills/*/SKILL.md` - Detailed skill documentation
- `.claude/commands/*.md` - Command implementations

### External Resources

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Planning-with-Files Guide](../claude-files/guides/claude/CLAUDE_PLANNING_WITH_FILES_GUIDE.md)
- [SuperClaude Guide](../claude-files/guides/claude/SUPER_CLAUDE_GUIDE.md)

## Support

### Getting Help

- Read skill documentation: `.claude/skills/[skill-name]/SKILL.md`
- Use pattern-guide subagent for teaching
- Run `/setup-claude` to reconfigure

---
