# Create Skill Command

You are creating a new custom skill for this project.

## Objective

Create a new skill that captures project-specific patterns, rules, or domain knowledge that Claude should follow.

## When to Create a Skill

Create a skill when you have:

- **Repeated patterns** you want to codify
- **Domain-specific rules** (e.g., e-commerce, finance, healthcare)
- **Project-specific conventions** not covered by generic skills
- **Complex workflows** that need documentation

**Examples**:

- API endpoint patterns for this project
- Database schema conventions
- Specific testing requirements
- Domain business rules
- Component architecture patterns

## Skill Creation Process

### 1. Gather Information

Ask user:

- **Skill name**: What should this skill be called? (lowercase-with-dashes)
- **Purpose**: What patterns/rules does it capture?
- **When to use**: What triggers should activate it?

### 2. Create Skill Structure

Create folder and SKILL.md:

```bash
mkdir -p .claude/skills/[skill-name]
```

### 3. Write SKILL.md

Use this template:

````markdown
# [Skill Name] Skill

[One-sentence description of what this skill covers]

## Purpose

[Explain what patterns, rules, or knowledge this skill captures and why it's important for this project]

## When to Use This Skill

This skill should be activated when:

- [Trigger condition 1]
- [Trigger condition 2]
- [Trigger condition 3]

## Patterns and Rules

### [Pattern/Rule Category 1]

**Rule**: [State the rule clearly]

**Rationale**: [Why this rule exists]

**Example**:
\```[language]
// Bad: [Counter-example]
[code]

// Good: [Correct example]
[code]
\```

### [Pattern/Rule Category 2]

[Same structure as above]

## Checklist

When working with [skill domain]:

- [ ] [Check item 1]
- [ ] [Check item 2]
- [ ] [Check item 3]

## Common Mistakes

### Mistake 1: [Description]

**Problem**: [What goes wrong]
**Solution**: [How to do it correctly]

### Mistake 2: [Description]

**Problem**: [What goes wrong]
**Solution**: [How to do it correctly]

## Examples

### Example 1: [Scenario]

\```[language]
[Complete working example]
\```

### Example 2: [Scenario]

\```[language]
[Complete working example]
\```

## References

- [Link to relevant documentation]
- [Link to architectural decision records]
- [Link to related code]

## Remember

[Key takeaway or principle to keep in mind]
````

### 4. Update skill-rules.json

Add auto-activation triggers:

```json
{
  "[skill-name]": {
    "description": "[Brief description]",
    "promptTriggers": {
      "keywords": ["[keyword1]", "[keyword2]", "[keyword3]"],
      "filePatterns": ["**/ [pattern1]/**", "**/ [pattern2].ts"]
    }
  }
}
```

**Keywords**: Words in user's prompt that suggest this skill is relevant
**File patterns**: Glob patterns for files where this skill applies

### 5. Test the Skill

Verify:

- [ ] SKILL.md is clear and complete
- [ ] Examples are correct and working
- [ ] Triggers are added to skill-rules.json
- [ ] Skill activates when appropriate

## Skill Writing Best Practices

### 1. Be Specific

```markdown
# Bad: Vague

Use good naming conventions.

# Good: Specific

Component files: PascalCase (UserProfile.tsx)
Utility files: camelCase (formatDate.ts)
Test files: Same as source + .test (UserProfile.test.tsx)
```

### 2. Explain Why

```markdown
# Bad: Just the rule

All API responses must include a timestamp.

# Good: Rule + rationale

All API responses must include a timestamp to help with:

- Debugging time-sensitive issues
- Cache invalidation
- Audit trails
```

### 3. Show Examples

Every rule should have:

- ❌ Bad example (what NOT to do)
- ✅ Good example (what TO do)
- 📝 Explanation (why the good example is better)

### 4. Keep It Focused

- One skill = one domain/concern
- Don't create mega-skills that cover everything
- Split large skills into multiple smaller ones

### 5. Make It Actionable

````markdown
# Bad: Abstract principle

Follow SOLID principles.

# Good: Specific action

When creating a new service:

1. Single Responsibility: One service per business entity
2. Dependency Injection: Accept dependencies in constructor
3. Interface: Define service interface separate from implementation

Example:
\```typescript
// IUserService.ts
export interface IUserService {
findById(id: string): Promise<User>;
create(data: CreateUserDTO): Promise<User>;
}

// UserService.ts
export class UserService implements IUserService {
constructor(
private db: IDatabase,
private emailService: IEmailService
) {}

async findById(id: string): Promise<User> {
return this.db.users.findOne({ id });
}
}
\```
````

## Example Skills to Create

### For React Projects

**Skill**: `react-patterns`

- Component structure
- State management conventions
- Props naming
- Event handler naming
- Custom hook patterns

### For API Projects

**Skill**: `api-conventions`

- Endpoint naming
- Response format
- Error handling
- Validation patterns
- Authentication/authorization

### For E-commerce

**Skill**: `ecommerce-rules`

- Price handling (always in cents)
- Inventory management
- Order state machine
- Payment processing rules

### For Data Processing

**Skill**: `data-pipeline`

- Data validation rules
- Transform patterns
- Error handling in pipelines
- Logging requirements

## Output After Creation

Show user:

```markdown
# Skill Created ✅

## Skill: [skill-name]

**Location**: `.claude/skills/[skill-name]/SKILL.md`

**Description**: [description]

**Auto-activates when**:

- Keywords: [list keywords]
- Files: [list file patterns]

## What's Next

1. **Review the skill**: Open `.claude/skills/[skill-name]/SKILL.md` and refine
2. **Test activation**: Try a prompt with keywords to verify auto-activation
3. **Iterate**: Update the skill as you discover new patterns

## Using This Skill

The skill will auto-activate based on your prompts, or you can explicitly request it:

"Use the [skill-name] skill to [task]"

## Tips

- Keep the skill updated as patterns evolve
- Add examples from real code in the project
- Remove rules that you're not actually following
- Consider creating a checklist in the skill for complex workflows
```

## Important Notes

- **Skills are living documents**: Update them as patterns evolve
- **Don't duplicate generic skills**: If code-quality covers it, don't recreate it
- **Focus on domain knowledge**: Generic programming principles are covered already
- **Make it practical**: Abstract principles without examples aren't helpful

## Checklist

Before completing skill creation:

- [ ] Skill has clear purpose
- [ ] Rules are specific and actionable
- [ ] Examples are provided for each rule
- [ ] Auto-activation triggers are configured
- [ ] skill-rules.json is updated
- [ ] Skill has been tested

## Remember

Good skills:

- Capture **project-specific** knowledge
- Are **actionable** (tell Claude what to DO)
- Include **examples** (show, don't just tell)
- Explain **WHY** (rationale for rules)
- Stay **focused** (one domain per skill)

"A skill should feel like a reference manual written by a senior developer who has deep knowledge of this project's patterns and conventions."
