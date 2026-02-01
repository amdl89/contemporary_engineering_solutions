# Git Worktree Management Skill

Streamlined workflows for managing multiple git worktrees for feature branch development.

## Purpose

This skill captures patterns and automation for git worktree management to eliminate repetitive commands, standardize worktree organization, and simplify managing multiple concurrent branches. It's designed for solo developers who frequently create feature branches and need to switch contexts quickly.

## When to Use This Skill

This skill should be activated when:

- User mentions "worktree", "feature branch", or "switch branch"
- Creating new worktrees for parallel development
- Managing multiple active worktrees simultaneously
- Cleaning up old or stale worktrees
- Reviewing PRs in isolated environments
- Working on hotfixes while keeping main work undisturbed

## Worktree Patterns and Workflows

### Pattern 1: Standardized Directory Structure

**Rule**: All worktrees should follow a consistent naming and location pattern.

**Rationale**: Predictable paths make it easier to navigate, script, and manage multiple worktrees. Prevents cluttering the main repository directory.

**Recommended Structure**:

```
~/Projects/
├── my-project/              # Main worktree (default branch)
├── my-project-worktrees/    # All additional worktrees
│   ├── feature-auth/
│   ├── feature-dashboard/
│   ├── bugfix-login/
│   └── hotfix-security/
```

**Example**:

```bash
# Bad: Worktrees scattered everywhere
git worktree add ../feat-x -b feature-x
git worktree add ~/Desktop/fix-y -b bugfix-y
# Result: Hard to find, inconsistent naming

# Good: Centralized, predictable structure
git worktree add ../my-project-worktrees/feature-x -b feature-x
git worktree add ../my-project-worktrees/bugfix-y -b bugfix-y
# Result: Easy to locate, consistent naming
```

### Pattern 2: Automated Worktree Creation Workflow

**Rule**: When creating a worktree, automate the complete setup process.

**Rationale**: Manually running multiple commands (create worktree, checkout branch, install dependencies, open editor) is repetitive and error-prone.

**Standard Workflow Steps**:

1. Create worktree directory
2. Create and checkout new branch
3. Install dependencies (if package.json/requirements.txt exists)
4. Optional: Open in editor
5. Display next steps

**Example**:

```bash
# Manual (repetitive):
git worktree add ../my-project-worktrees/feature-payments -b feature-payments
cd ../my-project-worktrees/feature-payments
npm install
code .

# Automated (via this skill):
# User: "Create a worktree for feature-payments"
# Claude executes all steps automatically
```

### Pattern 3: Branch Naming Conventions

**Rule**: Use consistent prefixes for worktree/branch names.

**Rationale**: Makes it easy to identify purpose and filter/group worktrees.

**Conventions**:

- `feature-*`: New features
- `bugfix-*`: Bug fixes
- `hotfix-*`: Urgent production fixes
- `refactor-*`: Code refactoring
- `experiment-*`: Experimental/spike work
- `review-pr-*`: PR review environments

**Example**:

```bash
# Bad: Inconsistent naming
git worktree add ../my-project-worktrees/auth -b auth
git worktree add ../my-project-worktrees/fixing-bug -b fix
git worktree add ../my-project-worktrees/temp123 -b temp

# Good: Clear prefixes
git worktree add ../my-project-worktrees/feature-auth -b feature-auth
git worktree add ../my-project-worktrees/bugfix-login-error -b bugfix-login-error
git worktree add ../my-project-worktrees/hotfix-security -b hotfix-security
```

### Pattern 4: Worktree Status Overview

**Rule**: Provide a comprehensive status view of all worktrees.

**Rationale**: When juggling multiple worktrees, you need to quickly see which ones have uncommitted changes, which branches they're on, and their locations.

**Status Information to Display**:

- Worktree path
- Branch name
- Commit status (clean/dirty)
- Last commit date
- Ahead/behind remote

**Example**:

```bash
# Command: git worktree list
# Output: Basic paths only (not enough info)

# Enhanced status (via this skill):
# Worktree                        Branch              Status        Last Activity
# main                           main                Clean         2 hours ago
# ../worktrees/feature-auth      feature-auth        Dirty (3)     5 mins ago
# ../worktrees/bugfix-login      bugfix-login        Clean         1 day ago
```

### Pattern 5: Smart Cleanup

**Rule**: Regularly clean up merged or abandoned worktrees.

**Rationale**: Stale worktrees waste disk space and clutter the workspace. Automated detection prevents manual tracking.

**Cleanup Criteria**:

- Branch has been merged to main
- Worktree hasn't been touched in X days (configurable, default 14)
- No uncommitted changes
- Not the current worktree

**Example**:

```bash
# Manual cleanup (tedious):
cd ../worktrees/feature-old
git status  # check if clean
cd ../../main
git worktree remove ../worktrees/feature-old
git branch -d feature-old

# Automated cleanup (via this skill):
# User: "Clean up old worktrees"
# Claude identifies stale worktrees, shows list, asks confirmation, removes them
```

## Workflows

### Workflow 1: Create New Feature Worktree

**When to use**: Starting work on a new feature or bugfix

**Steps**:

1. Determine worktree name from user input
2. Ensure worktrees parent directory exists
3. Create worktree with new branch
4. Navigate to worktree
5. Detect and install dependencies
6. Report success and location

**Command sequence**:

```bash
# Create worktrees directory if needed
mkdir -p ../my-project-worktrees

# Create worktree + branch
git worktree add ../my-project-worktrees/feature-name -b feature-name

# Navigate and setup
cd ../my-project-worktrees/feature-name

# Install dependencies (detect package manager)
if [ -f "package.json" ]; then npm install; fi
if [ -f "requirements.txt" ]; then pip install -r requirements.txt; fi
if [ -f "go.mod" ]; then go mod download; fi

# Show status
pwd
git status
```

### Workflow 2: List All Worktrees with Status

**When to use**: User wants overview of all active worktrees

**Steps**:

1. Get basic worktree list
2. For each worktree, gather detailed info
3. Format as table
4. Highlight current worktree

**Command sequence**:

```bash
# Basic list
git worktree list

# Enhanced with status (iterate through each)
for path in $(git worktree list --porcelain | grep "^worktree" | cut -d' ' -f2); do
  cd "$path"
  branch=$(git branch --show-current)
  status=$(git status --short)
  echo "$path | $branch | $status"
done
```

### Workflow 3: Switch to Existing Worktree

**When to use**: User wants to switch context to another worktree

**Steps**:

1. List available worktrees
2. User selects target worktree
3. Navigate to worktree directory
4. Show current status

**Command sequence**:

```bash
# List worktrees with numbers
git worktree list

# User picks one, then:
cd <worktree-path>
git status
```

### Workflow 4: Remove Worktree Safely

**When to use**: Done with a feature/branch

**Steps**:

1. Verify not currently in target worktree
2. Check for uncommitted changes
3. Confirm deletion
4. Remove worktree
5. Delete local branch (if desired)
6. Prune worktree references

**Command sequence**:

```bash
# Check status first
cd <worktree-path>
git status

# Return to main
cd <main-repo>

# Remove worktree
git worktree remove <worktree-path>

# Delete branch (optional, ask user)
git branch -d <branch-name>

# Clean up references
git worktree prune
```

### Workflow 5: Create PR Review Worktree

**When to use**: Reviewing a PR without affecting current work

**Steps**:

1. Fetch PR branch from remote
2. Create worktree for PR branch
3. Navigate to worktree
4. Install dependencies
5. Optional: Run tests

**Command sequence**:

```bash
# Fetch PR branch
git fetch origin pull/<PR-NUMBER>/head:<branch-name>

# Create worktree
git worktree add ../my-project-worktrees/review-pr-<PR-NUMBER> <branch-name>

# Navigate and setup
cd ../my-project-worktrees/review-pr-<PR-NUMBER>
npm install

# Ready for review
git log --oneline -5
```

## Checklist

When working with worktrees:

- [ ] Worktree follows naming convention (feature-_, bugfix-_, etc.)
- [ ] Worktree is in centralized directory (not scattered)
- [ ] Dependencies are installed after creation
- [ ] Current branch is clearly identified
- [ ] Uncommitted changes are checked before removal
- [ ] Stale worktrees are cleaned up regularly (every 2 weeks)
- [ ] Main worktree is kept clean (experimental work in separate worktrees)

## Common Mistakes

### Mistake 1: Creating worktrees in random locations

**Problem**: Worktrees end up scattered across filesystem, hard to find and manage.

**Solution**: Always use a centralized `<project>-worktrees/` directory parallel to main repo.

```bash
# Bad
git worktree add ~/Desktop/temp-feature -b feature-x
git worktree add ../../somewhere/fix -b bugfix-y

# Good
git worktree add ../my-project-worktrees/feature-x -b feature-x
git worktree add ../my-project-worktrees/bugfix-y -b bugfix-y
```

### Mistake 2: Forgetting to install dependencies

**Problem**: After creating worktree, code doesn't run because dependencies weren't installed.

**Solution**: Always check for package manager files and install dependencies as part of setup.

```bash
# Incomplete
git worktree add ../worktrees/feature-x -b feature-x
cd ../worktrees/feature-x
# Start coding immediately → errors due to missing deps

# Complete
git worktree add ../worktrees/feature-x -b feature-x
cd ../worktrees/feature-x
npm install  # or pip install, go mod download, etc.
# Now ready to code
```

### Mistake 3: Removing worktree with uncommitted changes

**Problem**: Accidentally lose work by removing worktree without checking status.

**Solution**: Always verify git status shows clean working directory before removal.

```bash
# Dangerous
git worktree remove ../worktrees/feature-x
# Lost uncommitted changes!

# Safe
cd ../worktrees/feature-x
git status  # Check for changes
git add . && git commit -m "WIP" || echo "Clean, safe to remove"
cd ../../main
git worktree remove ../worktrees/feature-x
```

### Mistake 4: Not pruning old worktree references

**Problem**: Git still tracks removed worktrees, causing confusion.

**Solution**: Run `git worktree prune` after removing worktrees.

```bash
# After removal
git worktree remove ../worktrees/old-feature

# Clean up references
git worktree prune
```

### Mistake 5: Reusing same worktree for different features

**Problem**: Mixing multiple feature changes in one worktree, makes commits unclear.

**Solution**: Create a new worktree for each feature/bugfix. Disk space is cheap, clarity is valuable.

```bash
# Bad: Reusing same worktree
cd ../worktrees/temp
git checkout -b feature-a
# ... work on feature-a
git checkout -b feature-b
# ... work on feature-b
# Result: Confused branch history

# Good: Separate worktrees
git worktree add ../worktrees/feature-a -b feature-a
git worktree add ../worktrees/feature-b -b feature-b
# Result: Clean, isolated development
```

## Command Reference

### Quick Commands

```bash
# Create new feature worktree
git worktree add ../my-project-worktrees/<name> -b <name>

# List all worktrees
git worktree list

# Remove worktree
git worktree remove <path>

# Prune stale references
git worktree prune

# Move to worktree (from main)
cd ../my-project-worktrees/<name>
```

### Advanced Commands

```bash
# Create worktree from existing remote branch
git worktree add ../worktrees/<branch> <remote>/<branch>

# Create worktree at specific commit
git worktree add ../worktrees/<name> -b <name> <commit-hash>

# Lock worktree (prevent removal)
git worktree lock <path>

# Unlock worktree
git worktree unlock <path>

# Force remove worktree (dangerous!)
git worktree remove --force <path>
```

## Examples

### Example 1: Complete Feature Development Flow

```bash
# Start new feature
git worktree add ../my-project-worktrees/feature-user-auth -b feature-user-auth
cd ../my-project-worktrees/feature-user-auth
npm install

# Develop...
git add .
git commit -m "feat: add user authentication"
git push origin feature-user-auth

# After PR merged
cd ../../my-project
git worktree remove ../my-project-worktrees/feature-user-auth
git branch -d feature-user-auth
git worktree prune
```

### Example 2: Multiple Concurrent Features

```bash
# Working on multiple features simultaneously
git worktree add ../my-project-worktrees/feature-dashboard -b feature-dashboard
git worktree add ../my-project-worktrees/bugfix-login -b bugfix-login
git worktree add ../my-project-worktrees/refactor-api -b refactor-api

# Check status of all
git worktree list

# Switch between them
cd ../my-project-worktrees/feature-dashboard  # Work on dashboard
cd ../my-project-worktrees/bugfix-login       # Quick fix
cd ../my-project-worktrees/refactor-api       # Continue refactoring
```

### Example 3: Emergency Hotfix While Working on Feature

```bash
# Currently working in feature worktree
pwd  # ../my-project-worktrees/feature-dashboard

# Emergency! Production bug needs immediate fix
cd ../../my-project
git fetch origin
git worktree add ../my-project-worktrees/hotfix-critical-bug -b hotfix-critical-bug origin/main
cd ../my-project-worktrees/hotfix-critical-bug
npm install

# Fix bug, test, commit
git add .
git commit -m "hotfix: fix critical production bug"
git push origin hotfix-critical-bug

# After deployed, return to feature work
cd ../feature-dashboard
# Continue where you left off, no context lost
```

### Example 4: PR Review Setup

```bash
# Reviewing PR #123
git fetch origin pull/123/head:review-pr-123
git worktree add ../my-project-worktrees/review-pr-123 review-pr-123
cd ../my-project-worktrees/review-pr-123
npm install
npm test

# Review code, test locally, leave feedback
# When done
cd ../../my-project
git worktree remove ../my-project-worktrees/review-pr-123
git branch -d review-pr-123
git worktree prune
```

## Configuration

### Recommended Git Config

```bash
# Set default branch name for better clarity
git config --global init.defaultBranch main

# Enable worktree-specific Git settings
git config extensions.worktreeConfig true

# Automatically prune on fetch
git config fetch.prune true
```

### Environment Setup

```bash
# Add to ~/.bashrc or ~/.zshrc for quick navigation
alias gwl='git worktree list'
alias gwp='git worktree prune'

# Function to create worktree with deps install
gwc() {
  name=$1
  git worktree add ../my-project-worktrees/$name -b $name
  cd ../my-project-worktrees/$name
  [ -f "package.json" ] && npm install
  [ -f "requirements.txt" ] && pip install -r requirements.txt
}

# Function to safely remove worktree
gwr() {
  worktree=$1
  cd ../../my-project
  git worktree remove ../my-project-worktrees/$worktree
  git branch -d $worktree
  git worktree prune
}
```

## References

- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Pro Git Book - Git Worktree](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging)
- [Atlassian Git Worktree Tutorial](https://www.atlassian.com/git/tutorials/git-worktree)

## Remember

**Worktrees are about parallel context, not sequential work.**

Use worktrees when you need to:

- Work on multiple features simultaneously without constant branch switching
- Keep a clean main branch for quick hotfixes
- Review PRs without disrupting current work
- Run long-running tasks (tests, builds) in one context while coding in another

**Key principle**: Each worktree is an isolated workspace. Treat them like separate checkouts, because that's exactly what they are.

**Best practice**: Create liberally, clean up regularly. Worktrees are lightweight and fast to create, but should be removed once the branch is merged to keep your workspace organized.
