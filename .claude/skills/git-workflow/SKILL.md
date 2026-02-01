---
name: git-workflow
description: Use Git effectively with clear commit messages, organized branches, and professional workflows. Use when committing code, creating branches, or managing pull requests. Covers conventional commits format, atomic commits, branching strategies (Git Flow, GitHub Flow), and common workflows.
---

# Git Workflow

Use Git effectively with clear commits and organized branches.

## Commit Messages (Conventional Commits)

**Structure**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type** (required):

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Maintenance (dependencies, build config)

**Subject** (required):

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Keep under 50 characters

**Examples**:

```
feat(auth): add password reset functionality

Users can now request password reset via email. Reset tokens
expire after 1 hour.

Fixes #234
```

```
fix(api): prevent race condition in user creation

Added database transaction to ensure email uniqueness check
and user creation happen atomically.
```

**Bad commits**:

```
Update stuff
Fixed bug
WIP
```

## Atomic Commits

One commit = one logical change.

```bash
# Bad: Multiple unrelated changes
git add .
git commit -m "fix login, update readme, add tests"

# Good: Separate commits
git add src/auth/login.ts
git commit -m "fix(auth): handle expired tokens correctly"

git add README.md
git commit -m "docs: update installation instructions"
```

## Never Commit

- Sensitive data (API keys, passwords, certificates)
- Environment files (.env)
- Build artifacts (dist/, node_modules/)
- IDE settings (.vscode/, .idea/)
- Debug logs

**Use .gitignore**:

```
# Dependencies
node_modules/

# Environment
.env
.env.local

# Build output
dist/
build/

# IDE
.vscode/
.idea/
```

## Branch Naming

**Format**: `<type>/<short-description>`

```bash
# Good names
feature/user-authentication
fix/login-redirect-loop
refactor/payment-service
docs/api-documentation

# Bad names
new-branch
fix
johns-stuff
```

## GitHub Flow (Continuous Deployment)

```bash
# Create feature branch
git checkout -b add-user-profile

# Make changes and commit
git add .
git commit -m "feat(profile): add user profile page"

# Push and create pull request
git push -u origin add-user-profile

# After review, merge to main
```

## Keeping Branch Up to Date

```bash
# Update your local main
git checkout main
git pull origin main

# Update your feature branch
git checkout feature/my-feature
git rebase main

# Force push safely (after rebase)
git push --force-with-lease origin feature/my-feature
```

## Undoing Changes

```bash
# Unstage files
git reset HEAD file.txt

# Discard changes in working directory
git restore file.txt

# Undo last commit, keep changes
git reset --soft HEAD~1

# Fix last commit message
git commit --amend -m "new message"

# Add forgotten files to last commit
git add forgotten-file.txt
git commit --amend --no-edit
```

## Interactive Rebase

Clean up commits before merging:

```bash
git rebase -i HEAD~3

# Options:
# pick = keep commit
# reword = change commit message
# squash = combine with previous commit
# drop = delete commit
```

## Stashing

Save work-in-progress without committing:

```bash
# Stash changes
git stash save "WIP: adding user validation"

# Apply latest stash
git stash pop

# List stashes
git stash list
```

## Quick Reference

Before committing:

- [ ] Code follows project style
- [ ] Tests pass
- [ ] No sensitive data included
- [ ] Commit message follows conventions
- [ ] Changes are atomic

Before creating PR:

- [ ] Branch has descriptive name
- [ ] Commits tell a story
- [ ] PR description explains what and why
- [ ] Self-review completed
