---
name: skill-creator
description: Guide for creating effective Agent Skills. Use when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations. Covers skill anatomy, progressive disclosure design, the 6-step creation process, and best practices for writing concise, reusable skills.
---

# Skill Creator

Guide for creating effective Agent Skills following Anthropic's official pattern.

## What Are Skills?

Skills are modular, self-contained packages that extend Claude's capabilities. They provide:

- **Workflows**: Step-by-step processes for specific tasks
- **Tool integrations**: Coordinated use of multiple tools
- **Domain expertise**: Specialized knowledge and patterns
- **Bundled resources**: Scripts, references, and assets

## Core Principles

### 1. Concise is Key

**Only add context Claude doesn't already have.** The context window is shared across all skills and conversation - assume Claude is already smart.

**Good**: "Store prices in cents (integers), never dollars (floats), to avoid floating-point rounding errors"

**Bad**: "Variables in JavaScript can hold different types of data. When working with money, it's important to understand that floating point numbers can have precision issues..."

### 2. Set Appropriate Degrees of Freedom

Match specificity to task fragility:

**High freedom** (text-based instructions):

- Use when: Task requires judgment, creativity, or adaptation
- Example: "Review code for security issues, focusing on input validation and authentication"

**Medium freedom** (pseudocode/scripts with parameters):

- Use when: Task has clear steps but variable inputs
- Example: Script that takes parameters for common operations

**Low freedom** (specific scripts, few parameters):

- Use when: Task is deterministic and repeatable
- Example: Build scripts, deployment automation

### 3. Progressive Disclosure

Claude loads information in three levels:

**Level 1: Metadata** (always available, ~100 words)

- `name` and `description` from YAML frontmatter
- Claude uses this to decide when to activate the skill

**Level 2: SKILL.md body** (when skill triggers, <5k words)

- Instructions and guidance
- Keep under 500 lines
- If approaching this limit, split content into references/

**Level 3: Bundled resources** (as needed by Claude)

- scripts/, references/, assets/
- Loaded only when Claude determines they're needed

## Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter metadata
│   │   ├── name: (required)
│   │   └── description: (required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/      - Executable code (Python/Bash)
    ├── references/   - Documentation loaded as needed
    └── assets/       - Templates, icons (not loaded into context)
```

### SKILL.md (Required)

**Frontmatter** (YAML between `---` markers):

```yaml
---
name: my-skill
description: Complete description including what, when, and why to use this skill
---
```

**Body** (Markdown instructions):

- Use imperative/infinitive form
- Keep under 500 lines
- Structure with headers, bullets, code blocks
- Focus on project-specific patterns

### Bundled Resources (Optional)

**scripts/** - Executable code

- Use for deterministic, repeatable tasks
- Python or Bash
- Claude can run these directly
- Example: Data processing, file generation, API calls

**references/** - Documentation

- Use for information that doesn't fit in SKILL.md
- Loaded into context only when Claude needs them
- Example: API documentation, configuration specs

**assets/** - Output templates

- Use for files used in output (not loaded into context)
- Example: Templates, icons, boilerplate files

## The 6-Step Creation Process

### Step 1: Understanding with Concrete Examples

**Gather real usage examples** to understand the functionality.

Ask questions:

- What task is this skill helping with?
- What are concrete examples of this task?
- When should this skill activate vs. not activate?
- What context does Claude already have?

**Example**:

```
Task: "Ensure API endpoints follow consistent patterns"

Concrete examples:
- GET /users should return { data: [...], errors: [] }
- POST /users/:id/activate should handle actions
- All 4xx errors need descriptive messages

When to activate: Creating/modifying API endpoints
When NOT to activate: Frontend code, database schemas
```

### Step 2: Planning Reusable Contents

**Analyze concrete examples** to identify what should be bundled.

Questions to ask:

- What scripts would be reused? → scripts/
- What documentation is needed repeatedly? → references/
- What templates or files are generated? → assets/

**Example**:

```
Scripts:
- validate_endpoint.py (checks endpoint follows patterns)

References:
- api-response-format.md (detailed response spec)
- error-codes.md (standard error codes)

Assets:
- endpoint-template.ts (boilerplate for new endpoints)
```

### Step 3: Initializing the Skill

Create the skill directory structure:

```bash
mkdir -p .claude/skills/skill-name
touch .claude/skills/skill-name/SKILL.md
```

Optional: Create bundled resource directories if needed:

```bash
mkdir -p .claude/skills/skill-name/scripts
mkdir -p .claude/skills/skill-name/references
mkdir -p .claude/skills/skill-name/assets
```

### Step 4: Edit the Skill

#### Writing the Frontmatter

**Critical**: The `description` field is the **primary triggering mechanism**.

Include ALL "when to use" information in the description, NOT in the body.

**Template**:

```yaml
---
name: skill-name
description: [What the skill does]. Use when [specific scenarios]. Covers [key areas].
---
```

**Example**:

```yaml
---
name: api-patterns
description: Ensure API endpoints follow consistent patterns for responses, errors, and validation. Use when creating new endpoints, modifying existing ones, or reviewing API code. Covers endpoint naming, response format, error handling, and input validation.
---
```

#### Writing the Body

**Use imperative/infinitive form**:

- ✅ "Store prices in cents"
- ✅ "Validate input before processing"
- ❌ "You should store prices in cents"
- ❌ "The developer needs to validate input"

**Structure for clarity**:

````markdown
# Skill Name

## Core Pattern 1

[Concise explanation]

**Example**:
\```language
// Good: [what to do]
[code]

// Bad: [what not to do]
[code]
\```

## Core Pattern 2

[Concise explanation]

**Example**:
[code]

## Quick Reference

- [ ] Checklist item 1
- [ ] Checklist item 2
````

**Progressive Disclosure Patterns**:

**Pattern 1**: High-level guide with references

```markdown
# API Patterns

## Response Format

All endpoints return consistent JSON structure (see references/response-spec.md for details):

- `data`: Payload or null
- `errors`: Array of error messages
- `meta`: Pagination, timestamps, etc.
```

**Pattern 2**: Domain-specific organization

```markdown
# E-commerce Patterns

## Price Handling

[rules for prices]

## Inventory Management

[rules for inventory]

## Order Processing

[rules for orders]
```

**Pattern 3**: Conditional details

```markdown
# Testing Patterns

## Unit Tests

[core guidance]

## Integration Tests

For complex integration scenarios, see references/integration-testing-guide.md
```

### Step 5: Packaging a Skill (Optional)

If distributing the skill:

1. Validate SKILL.md frontmatter and structure
2. Check that bundled resources are referenced in SKILL.md
3. Ensure naming conventions are consistent
4. Package as .skill file (zip format) if sharing

**Note**: For internal project skills, packaging is optional.

### Step 6: Iterate

Use the skill on real tasks and refine:

**Notice inefficiencies**:

- Is Claude asking for information that should be in the skill?
- Are there repeated patterns not captured?
- Is the skill activating when it shouldn't?

**Update and test**:

- Add missing patterns to SKILL.md
- Move verbose content to references/
- Update description to improve triggering
- Test on real scenarios again

## Best Practices

### Keep SKILL.md Under 500 Lines

If approaching this limit:

- Move detailed documentation to references/
- Split into multiple focused skills
- Remove redundant information

**Example**:

```markdown
# Database Patterns

## Query Optimization

Basic principles for query optimization:

- Index frequently queried columns
- Avoid N+1 queries
- Use appropriate JOIN types

For advanced optimization techniques, see references/advanced-query-optimization.md
```

### Avoid Duplication

Information should live in SKILL.md OR references, not both.

**Bad**:

```
SKILL.md: "Store prices in cents (see price-handling.md for details)"
references/price-handling.md: "Store prices in cents because..."
```

**Good**:

```
SKILL.md: "Store prices in cents to avoid floating-point errors"
references/price-handling.md: "Historical context, migration guide, edge cases..."
```

### No Auxiliary Files

Don't include:

- README.md (information goes in SKILL.md)
- INSTALLATION_GUIDE.md (bundle installation scripts instead)
- EXAMPLES.md (examples go in SKILL.md or references/)

The skill structure should be self-contained with just SKILL.md and optional bundled resources.

### Clear Triggering via Description

The description field determines when the skill activates. Make it comprehensive.

**Template**:

> "[What the skill does]. Use when [scenario 1], [scenario 2], or [scenario 3]. Covers [area 1], [area 2], and [area 3]."

**Example**:

> "Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. Use when Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks."

## Skill Auto-Activation (Project-Specific)

For this project, configure auto-activation in `.claude/skills/skill-rules.json`:

```json
{
  "skill-name": {
    "description": "Brief one-line description",
    "promptTriggers": {
      "keywords": ["keyword1", "keyword2", "specific-domain-term"],
      "filePatterns": ["**/relevant-directory/**", "**/*.relevant-extension"]
    }
  }
}
```

**Choosing keywords**:

- Pick 5-10 most relevant terms
- Include both general and specific
- Think about how users would ask for this
- Include domain terminology

**Choosing file patterns**:

- Use glob patterns
- Cover relevant directories
- Include file extensions
- Be specific enough to avoid false positives

## Example: Creating an API Patterns Skill

### Step 1: Gather Examples

Concrete examples from the project:

```javascript
// Good endpoint
app.get("/users", async (req, res) => {
  const users = await db.users.findAll();
  res.json({ data: users, errors: [] });
});

// Bad endpoint (inconsistent response)
app.get("/products", async (req, res) => {
  const products = await db.products.findAll();
  res.json(products); // Just array, no wrapper
});
```

### Step 2: Plan Contents

**SKILL.md**: Core patterns (response format, error handling, naming)
**references/api-spec.md**: Detailed API specification
**assets/endpoint-template.ts**: Boilerplate for new endpoints

### Step 3: Initialize

```bash
mkdir -p .claude/skills/api-patterns/{references,assets}
touch .claude/skills/api-patterns/SKILL.md
```

### Step 4: Write SKILL.md

````markdown
---
name: api-patterns
description: Ensure API endpoints follow consistent patterns for responses, errors, and validation. Use when creating new endpoints, modifying existing ones, or reviewing API code. Covers endpoint naming, response format, error handling, and input validation.
---

# API Patterns

## Response Format

All endpoints return consistent JSON structure:

\```typescript
{
data: T | null, // Payload on success, null on error
errors: string[], // Empty on success, messages on error
meta?: { // Optional metadata
page?: number,
total?: number,
timestamp?: string
}
}
\```

**Example**:
\```javascript
// Good: Consistent structure
app.get('/users', async (req, res) => {
try {
const users = await db.users.findAll();
res.json({ data: users, errors: [] });
} catch (error) {
res.status(500).json({ data: null, errors: ['Failed to fetch users'] });
}
});
\```

## Endpoint Naming

- Use plural nouns for resources: `/users`, `/products`
- Use verbs only for non-CRUD actions: `/users/:id/activate`
- Avoid redundant verbs: `/users` not `/getUsers`

## Error Handling

- 4xx errors: Client mistakes (always include descriptive message)
- 5xx errors: Server errors (log details, return generic message)

**Quick Reference**:

- [ ] Response follows { data, errors } format
- [ ] Endpoint uses plural noun
- [ ] Error messages are descriptive
- [ ] Try-catch wraps async operations
````

### Step 5: Configure Auto-Activation

```json
{
  "api-patterns": {
    "description": "API endpoint patterns and conventions",
    "promptTriggers": {
      "keywords": [
        "api",
        "endpoint",
        "route",
        "controller",
        "response",
        "error handling"
      ],
      "filePatterns": ["**/routes/**", "**/controllers/**", "**/api/**"]
    }
  }
}
```

### Step 6: Test and Iterate

Try on real tasks:

- "Create a new endpoint for /orders"
- "Review this API controller"
- "Fix error handling in user routes"

Refine based on what works.

## Remember

**Great skills are**:

- **Concise**: Only necessary context
- **Focused**: One clear domain
- **Actionable**: Tell what to do, not what to know
- **Progressive**: Start simple, references for depth
- **Living**: Updated as patterns evolve

**The goal**: Extend Claude's capabilities with your project's accumulated wisdom, making future work more consistent and efficient.
