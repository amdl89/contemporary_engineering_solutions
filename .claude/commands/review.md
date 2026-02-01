# Review Command

You are performing a comprehensive code review focused on quality, security, and maintainability.

## Review Checklist

### 1. Functionality

- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error conditions are properly handled
- [ ] No obvious bugs or logical errors

### 2. Security (OWASP Top 10)

- [ ] **Injection**: All inputs are validated and sanitized
- [ ] **Authentication**: Auth logic is secure, no hardcoded credentials
- [ ] **Sensitive Data**: No secrets in code, proper encryption used
- [ ] **Access Control**: Authorization checks are in place
- [ ] **Security Misconfiguration**: No overly permissive settings
- [ ] **XSS**: Output is properly escaped/sanitized
- [ ] **Insecure Deserialization**: Safe deserialization practices
- [ ] **Known Vulnerabilities**: Dependencies are up to date
- [ ] **Logging**: Sensitive data not logged, proper error handling
- [ ] **CSRF**: CSRF protection where applicable

### 3. Code Quality

- [ ] **DRY**: No duplicate code, proper abstraction
- [ ] **SOLID Principles**:
  - Single Responsibility: Each function/class has one purpose
  - Open/Closed: Extensible without modification
  - Liskov Substitution: Subtypes are substitutable
  - Interface Segregation: No unnecessary dependencies
  - Dependency Inversion: Depend on abstractions
- [ ] **Naming**: Variables, functions, classes have clear, descriptive names
- [ ] **Complexity**: Functions are short and focused (< 50 lines ideal)
- [ ] **Comments**: Code is self-documenting, comments explain WHY not WHAT

### 4. Error Handling

- [ ] Errors are caught and handled appropriately
- [ ] Error messages are helpful (for developers) and safe (for users)
- [ ] No silent failures
- [ ] Proper cleanup in error paths (close connections, release resources)

### 5. Testing

- [ ] New features have tests
- [ ] Existing tests still pass
- [ ] Edge cases are tested
- [ ] Error conditions are tested
- [ ] Test coverage is adequate (aim for > 80%)

### 6. Performance

- [ ] No obvious performance issues (N+1 queries, unnecessary loops)
- [ ] Large datasets are paginated
- [ ] Database queries are optimized
- [ ] Caching is used where appropriate
- [ ] No memory leaks

### 7. Dependencies

- [ ] New dependencies are justified
- [ ] Dependencies are from trusted sources
- [ ] No unused dependencies
- [ ] Versions are pinned (not using `*` or `^` in production)

### 8. Git Hygiene

- [ ] Commit messages are clear and descriptive
- [ ] No debug code or commented-out code
- [ ] No unnecessary files committed
- [ ] .gitignore is properly configured

## Review Process

1. **Read the recent changes**: Use `git diff` or read modified files
2. **Check each category**: Go through the checklist systematically
3. **Flag issues**: For each issue found, provide:
   - Location (file:line)
   - Severity (Critical/High/Medium/Low)
   - Description of the issue
   - Suggested fix
4. **Provide summary**: Overall assessment and priority recommendations

## Output Format

```markdown
# Code Review Summary

## Overview

[Brief description of what was reviewed]

## Issues Found

### Critical (Must Fix Before Merge)

1. **[Issue Category]** in `file.ts:42`
   - Problem: [Description]
   - Fix: [Suggested solution]

### High Priority

[Similar format]

### Medium Priority

[Similar format]

### Low Priority / Suggestions

[Similar format]

## Positive Observations

[Things done well - be specific]

## Recommendations

1. [Prioritized action items]
2. [...]

## Overall Assessment

[Ready to merge? What needs to be done?]
```

## Important Notes

- Be thorough but constructive
- Focus on patterns, not just individual lines
- Suggest improvements, don't just point out problems
- Acknowledge good practices when you see them
- Consider the context - different projects have different standards
