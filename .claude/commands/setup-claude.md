# Setup Claude Command

You are analyzing the repository and customizing the `.claude` folder for this specific project.

## Objective

Transform the generic `.claude` folder into a project-specific configuration by:

1. Detecting tech stack and project type
2. Creating customized `CLAUDE.md` at **project root** (not in .claude/)
3. Generating domain-specific skills if needed
4. Configuring appropriate hooks
5. Preserving `.claude/CLAUDE.md` as template reference

## Important File Locations

**Before setup (Case 1 - Fresh project):**

- `.claude/CLAUDE.md` = Generic template (bootstrap)
- `CLAUDE.md` = Does not exist yet

**Before setup (Case 2 - Existing CLAUDE.md):**

- `.claude/CLAUDE.md` = Generic template (bootstrap)
- `CLAUDE.md` = Already exists with project content

**After setup:**

- `CLAUDE.md` = Project-specific config at **PROJECT ROOT** (auto-loaded by Claude Code)
  - Case 1: Created from template
  - Case 2: Augmented with .claude/ features
- `.claude/CLAUDE.md` = Renamed to `.claude/CLAUDE.md.template` (preserved as reference)

## Critical First Step: Check for Existing CLAUDE.md

**BEFORE doing anything else, check if CLAUDE.md already exists:**

```bash
ls CLAUDE.md 2>/dev/null
```

**Decision Flow:**

```
Does CLAUDE.md exist at project root?
│
├─ NO  → Case A: Create fresh CLAUDE.md from template
│         - Read .claude/CLAUDE.md as template
│         - Analyze project and customize
│         - Write new CLAUDE.md at root
│
└─ YES → Case B: Augment existing CLAUDE.md
          - Read existing CLAUDE.md (preserve everything!)
          - Read .claude/CLAUDE.md for features to add
          - Append missing sections only
          - Add <!-- Added by /setup-claude --> comment
```

## Analysis Steps

### 1. Detect Project Type

Examine the repository to determine:

- **Project type**: Web app, CLI tool, library, API service, mobile app, etc.
- **Tech stack**: Languages, frameworks, databases
- **Build system**: npm, gradle, cargo, make, etc.
- **Testing framework**: Jest, Pytest, JUnit, etc.
- **Project structure**: Monorepo, microservices, monolith

**Look for**:

- `package.json` → Node.js project
- `Cargo.toml` → Rust project
- `go.mod` → Go project
- `requirements.txt`, `pyproject.toml` → Python project
- `pom.xml`, `build.gradle` → Java project
- `src/`, `lib/`, `app/` → Common structure patterns

### 2. Analyze Current Configuration

Check what exists:

```bash
ls -la
cat package.json 2>/dev/null || echo "No package.json"
cat README.md 2>/dev/null || head -20 README.md
find . -name "*.config.*" -type f | head -10
```

### 3. Identify Patterns

Based on project type, identify:

- **Common tasks**: Build, test, lint, deploy
- **Pain points**: What slows development?
- **Coding patterns**: Architecture style, naming conventions
- **Domain specifics**: E-commerce, SaaS, analytics, etc.

## Customization Tasks

### 1. Handle CLAUDE.md at Project Root

**IMPORTANT**: The file must be at **PROJECT ROOT**, not inside `.claude/`!

**FIRST: Check if CLAUDE.md already exists at project root**

```bash
# Check for existing CLAUDE.md
if [ -f "CLAUDE.md" ]; then
  echo "Found existing CLAUDE.md - will AUGMENT it"
else
  echo "No CLAUDE.md found - will CREATE it"
fi
```

#### Case A: CLAUDE.md Does NOT Exist (Fresh Setup)

Steps:

1. Read `.claude/CLAUDE.md` as template
2. Analyze the project (steps above)
3. Generate customized content based on analysis
4. Write to `CLAUDE.md` at project root (using Write tool)
5. Rename `.claude/CLAUDE.md` to `.claude/CLAUDE.md.template` (preserve as reference)

Use the template below for the new `CLAUDE.md`.

#### Case B: CLAUDE.md Already EXISTS (Augment Existing)

**CRITICAL**: Do NOT replace their existing CLAUDE.md! Instead, augment it intelligently.

Steps:

1. **Read** existing `CLAUDE.md` (understand current structure and content)
2. **Read** `.claude/CLAUDE.md` (template with .claude/ features)
3. **Analyze** what's missing:
   - Do they have a Commands section? If not, add it
   - Do they have a Skills section? If not, add it
   - Do they have references to .claude/ folder? If not, add them
   - Do they document hooks/automation? If not, add it
4. **Augment** the existing file by:
   - Preserving ALL existing content (don't remove anything!)
   - Adding missing sections at the end
   - Adding a comment showing what was added by /setup-claude
5. **Rename** `.claude/CLAUDE.md` to `.claude/CLAUDE.md.template`

**Augmentation Pattern:**

```markdown
[... existing CLAUDE.md content - PRESERVE EVERYTHING ...]

---

<!-- Added by /setup-claude on [date] -->

## Available Commands

The `.claude/` folder provides these commands:

- `/plan` - Create strategic plan (task_plan.md)
- `/review` - Comprehensive code review
- `/update-context` - Save state before /clear
- `/create-skill` - Create new domain skills

## Skills System

Generic skills available in `.claude/skills/`:

- `code-quality` - DRY, SOLID, error handling
- `testing` - Framework-agnostic test patterns
- `security` - OWASP top 10, secure coding
- `git-workflow` - Commits, branching, PRs
- `documentation` - Clear docs and comments

Skills auto-activate based on keywords in prompts (see `.claude/skills/skill-rules.json`).

## Hooks & Automation

The `.claude/hooks/` folder provides automation:

- **skill-activation** - Suggests relevant skills based on prompt
- **planning-reminder** - Reminds to plan before coding
- **context-check** - Monitors tool calls, suggests /update-context at ~50
- **build-check** - Verifies build after edits (if build script exists)

Hooks are configured in `.claude/settings.json`.

## Workflows

For complex tasks:

1. Run `/plan` to create task_plan.md
2. Follow phase-based approach (see planning-with-files pattern)
3. Run `/review` before committing
4. Use `/update-context` every ~50 tool calls to avoid context loss

---
```

**Key Principle**: When augmenting, be **additive only** - never remove or modify existing content!

**Example Augmentation:**

```markdown
# My Existing Project

This is my project description that I wrote.

## Tech Stack

- Node.js
- React
- PostgreSQL

## Rules

- Use TypeScript
- Test everything

--- ← YOU ADD THIS

<!-- Added by /setup-claude on 2026-01-20 -->    ← YOU ADD THIS

## Available Commands ← YOU ADD THIS

The `.claude/` folder provides these commands:

- `/plan` - Create strategic plan (task_plan.md)
  ...

## Skills System ← YOU ADD THIS

Generic skills available in `.claude/skills/`:
...

## Hooks & Automation ← YOU ADD THIS

...
```

**What to check before augmenting:**

- Has "Commands" or "Available Commands"? → Skip adding Commands section
- Has "Skills"? → Skip adding Skills section
- Has "Hooks"? → Skip adding Hooks section
- Has "Workflows"? → Skip adding Workflows section
- Missing all of them? → Add all sections

Be smart about it - only add what's truly missing!

---

### Template for NEW `CLAUDE.md` (Case A only)

Use this template when creating CLAUDE.md from scratch:

````markdown
# [Project Name]

[One-sentence project description]

## Project Type

[Web Application/API Service/CLI Tool/Library]

## Tech Stack

- **Language**: [Primary language and version]
- **Framework**: [Main framework]
- **Database**: [Database if applicable]
- **Testing**: [Test framework]
- **Build**: [Build tool]

## Commands

- `/plan` - Create implementation plan (task_plan.md)
- `/review` - Code review (quality, security, performance)
- `/update-context` - Save state before /clear
- [Add project-specific commands as needed]

## Skills

Generic skills available:

- `code-quality` - DRY, SOLID, error handling
- `testing` - Framework-agnostic test patterns
- `security` - OWASP top 10, secure coding
- `git-workflow` - Commits, branching, PRs
- `documentation` - Clear docs and comments

[List any custom skills created for this project]

## Project Structure

\```
[Describe the key directories and their purposes]
\```

## Coding Rules

### Architecture

[Describe the architectural pattern used]

### Naming Conventions

[Project-specific naming rules]

### File Organization

[Where different types of code should go]

### Testing Requirements

[What needs tests, coverage requirements]

### Performance Considerations

[Any specific performance requirements]

## Workflows

### Feature Development

1. Run `/plan` to create task_plan.md
2. Implement following the plan
3. Write tests
4. Run `/review` before committing
5. Create PR

### Bug Fixes

1. Write failing test first
2. Fix the bug
3. Verify test passes
4. Run `/review`

## Important Notes

[Project-specific gotchas, warnings, or important context]

## References

- [Link to main documentation]
- [Link to API docs]
- [Link to architecture docs]
````

### 2. Create Domain-Specific Skills (If Needed)

If the project has strong domain patterns, create custom skills:

**Example: E-commerce project** → Create `ecommerce/SKILL.md`:

```markdown
# E-commerce Skill

## Patterns

### Product Management

- Always validate prices (no negatives, max 2 decimals)
- Track inventory changes in audit log
- Handle out-of-stock gracefully

### Order Processing

- Orders are immutable after submission
- Use transactions for multi-step order creation
- Calculate tax based on shipping address
- Log all payment attempts

### Cart Management

- Clear abandoned carts after 7 days
- Validate item availability before checkout
- Recalculate totals on every cart change
```

**Example: API project** → Create `api-patterns/SKILL.md`:

````markdown
# API Patterns Skill

## Endpoint Structure

All endpoints follow:

- GET /api/resource - List
- GET /api/resource/:id - Get one
- POST /api/resource - Create
- PUT /api/resource/:id - Update
- DELETE /api/resource/:id - Delete

## Response Format

\```json
{
"data": {},
"meta": {
"page": 1,
"total": 100
},
"errors": []
}
\```

## Error Handling

- 400: Client error (validation)
- 401: Unauthenticated
- 403: Unauthorized
- 404: Not found
- 500: Server error
````

### 3. Configure Hooks

Based on project type, enable/disable hooks:

**If project has build script**:

- Enable `build-check.sh` hook
- Configure in settings.json

**If project has test script**:

- Create/enable `test-check.sh` hook

**Always enable**:

- `skill-activation.sh` - Suggest relevant skills
- `planning-reminder.sh` - Enforce planning pattern
- `context-check.sh` - Monitor context usage

### 4. Move claude-files to Project Root

The `.claude/claude-files/` folder contains workflow-related files and should be at the project root for easy access:

**During setup, move the folder:**

```bash
# Move claude-files from .claude/ to project root
mv .claude/claude-files ./
```

**Purpose of claude-files:**

- `claude-files/plans/` - Stores task plans created by `/plan` command
- `claude-files/guides/` - Project-specific guides and documentation
- Other workflow files that should be easily accessible

**Important**: The folder starts inside `.claude/` in the template but should be moved to project root during setup for better workflow integration.

### 5. Update skill-rules.json

Add triggers for any custom skills created:

```json
{
  "ecommerce": {
    "description": "E-commerce patterns and rules",
    "promptTriggers": {
      "keywords": [
        "cart",
        "order",
        "product",
        "inventory",
        "checkout",
        "payment"
      ],
      "filePatterns": ["**/cart/**", "**/order/**", "**/product/**"]
    }
  }
}
```

## Execution Order

Follow this exact sequence:

1. **Check** if `CLAUDE.md` exists at project root
2. **Analyze project** (detect tech stack, structure, patterns)
3. **Read** `.claude/CLAUDE.md` (template)
4. **Branch based on Case A or Case B:**

   **Case A (No existing CLAUDE.md):**
   - Generate customized content based on analysis
   - Write `CLAUDE.md` to **project root** (not .claude/)

   **Case B (Existing CLAUDE.md found):**
   - Read existing `CLAUDE.md`
   - Analyze what sections are missing
   - Augment by appending missing sections (preserve all existing content!)
   - Add comment: `<!-- Added by /setup-claude on [date] -->`

5. **Rename** `.claude/CLAUDE.md` → `.claude/CLAUDE.md.template`
6. **Create** any domain-specific skills (if needed)
7. **Update** `.claude/skills/skill-rules.json` (if new skills added)
8. **Update** `.claude/settings.json` (configure hooks for build/test)
9. **Move** `.claude/claude-files/` → `claude-files/` (move to project root for workflow files)

## Output Summary

After customization, show user which case was handled:

**For Case A (Fresh CLAUDE.md):**

```markdown
# Setup Complete ✅

## Detected Configuration

- **Project Type**: [type]
- **Tech Stack**: [stack]
- **Build Command**: [command]
- **Test Command**: [command]

## What Was Created

- ✅ `CLAUDE.md` created at project root with project-specific context
- ✅ `.claude/CLAUDE.md` renamed to `.claude/CLAUDE.md.template` (reference)
- ✅ `claude-files/` moved to project root (workflow files)
- ✅ [X] domain-specific skills
- ✅ Configured hooks for build/test
- ✅ Updated skill-rules.json
```

**For Case B (Augmented existing CLAUDE.md):**

```markdown
# Setup Complete ✅

## Detected Configuration

- **Project Type**: [type]
- **Tech Stack**: [stack]
- **Build Command**: [command]
- **Test Command**: [command]

## What Was Done

- ✅ Found existing `CLAUDE.md` - preserved all content
- ✅ Augmented `CLAUDE.md` with:
  - Commands section (references to .claude/ folder)
  - Skills system documentation
  - Hooks & automation overview
  - Workflow guidance
- ✅ `.claude/CLAUDE.md` renamed to `.claude/CLAUDE.md.template` (reference)
- ✅ `claude-files/` moved to project root (workflow files)
- ✅ [X] domain-specific skills created
- ✅ Configured hooks for build/test
- ✅ Updated skill-rules.json

## Important

Your existing CLAUDE.md content was preserved! New sections were added at the end.
Check the `<!-- Added by /setup-claude -->` comment to see what was added.
```

**Common sections for both cases:**

## What You Can Do Now

### Essential Commands

- `/plan` - Create strategic plan for new work
- `/review` - Comprehensive code review
- `/update-context` - Save state before /clear

### Skills Available

[List all skills, both generic and custom]

### Next Steps

1. Review `CLAUDE.md` (at project root) and customize further if needed
2. Run `/plan` to start your first task
3. The hooks will guide you through best practices

### Customization

- Edit `CLAUDE.md` (project root) to add project-specific rules
- Reference `.claude/CLAUDE.md.template` for the original template
- Create custom skills with `/create-skill`
- Add custom commands in `.claude/commands/`

## Tips

- Hooks will remind you to follow patterns
- Use `/plan` for any non-trivial work
- Run `/update-context` every ~50 tool calls
- Review `.claude/` folder periodically and update as project evolves

```

## Important Notes

- **File locations matter**: `CLAUDE.md` MUST be at project root, not in `.claude/`
- **Augmentation is additive only**: When CLAUDE.md exists, NEVER remove or modify existing content - only append
- **Check first, then act**: Always check if CLAUDE.md exists before deciding to create vs augment
- **Preserve user intent**: If they already have a CLAUDE.md, respect their structure and style
- **Don't over-customize**: Start minimal, add as needed
- **Preserve generic skills**: Keep code-quality, testing, security
- **Document customizations**: Explain why custom skills/commands exist
- **Keep CLAUDE.md under 200 lines**: Reference skills instead of duplicating (applies to fresh setups)
- **Test hooks**: Ensure build-check doesn't break workflow
- **Template preserved**: `.claude/CLAUDE.md.template` remains as reference for future projects

## Decision Tree

```

Is this a web application?
├─ Yes → Include frontend/backend patterns
│ ├─ Has API? → Create api-patterns skill
│ ├─ Has database? → Add database patterns to CLAUDE.md
│ └─ Has build step? → Enable build-check hook
│
Is this a library?
├─ Yes → Focus on public API, documentation
│ ├─ Add API documentation requirements
│ └─ Add breaking change guidelines
│
Is this a CLI tool?
├─ Yes → Focus on argument parsing, error messages
│ └─ Add CLI-specific patterns to CLAUDE.md
│
Is this an API service?
├─ Yes → Create api-patterns skill
│ ├─ Document endpoint patterns
│ ├─ Document error responses
│ └─ Add rate limiting considerations

```

## Remember

The goal is to make the `.claude` folder **immediately useful** for this specific project while maintaining the **flexibility** of the generic components.

Start minimal. Add customizations as patterns emerge in the project.
```
