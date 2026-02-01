# SuperClaude Framework - Comprehensive User Guide

> Transform Claude Code into a specialized AI team with 16 domain experts, 30+ commands, and intelligent behavioral modes.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Commands Reference](#commands-reference)
4. [Agent System](#agent-system)
5. [MCP Servers](#mcp-servers)
6. [Behavioral Modes](#behavioral-modes)
7. [Common Workflows](#common-workflows)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

> **Installation**: See the [Installation Guide](mcp-installation.md) for setup instructions.

### Your First Commands

```bash
# Create project index for efficient context
/sc:index-repo

# Start working
/sc:brainstorm "your idea"
/sc:implement "your feature"
```

### Your First Task

```bash
# Scenario: Build authentication system
/sc:brainstorm "user authentication system"
# → Asks discovery questions about requirements

/sc:design auth-system --type architecture
# → Creates architecture diagrams and API specs

/sc:implement "JWT authentication" --with-tests
# → Writes code with security best practices

/sc:test --coverage
# → Runs tests and shows coverage report
```

---

## Core Concepts

### The SuperClaude Philosophy

SuperClaude transforms Claude Code through **four pillars**:

1. **Specialized Agents**: 16 domain experts (security, frontend, backend, etc.)
2. **Powerful Commands**: 30+ task-specific commands (`/sc:implement`, `/sc:analyze`, etc.)
3. **Enhanced Capabilities**: 5 free MCP servers for documentation, testing, and performance analysis
4. **Intelligent Modes**: Automatic adaptation to task complexity

### How It Works

```
User Request → SuperClaude → Agents + Commands + MCP Servers + Modes → Result

Example:
"Build secure payment API"
  ↓
Security Engineer (agent) + Backend Architect (agent)
  ↓
/sc:implement (command) with --safe flag
  ↓
Context7 (docs) + Sequential (reasoning) + Playwright (testing)
  ↓
Secure, tested payment API with documentation
```

---

## Commands Reference

### Command Categories

SuperClaude provides 30+ commands organized by purpose:

#### 🎯 Orchestration (Meta-Level)

- `/sc:pm` - Project Manager (always active, coordinates everything)
- `/sc:spawn` - Break down complex tasks into subtasks
- `/sc:task` - Execute tasks with multi-tool coordination
- `/sc:workflow` - Generate implementation plans from PRDs

#### 🔍 Discovery

- `/sc:brainstorm` - Interactive requirements discovery (Socratic dialogue)
- `/sc:research` - Deep web research with evidence synthesis

#### 🛠️ Implementation

- `/sc:implement` - Write code with framework patterns
- `/sc:design` - Create architecture, APIs, schemas

#### ✅ Quality

- `/sc:analyze` - Code analysis (security, performance, quality)
- `/sc:troubleshoot` - Root cause analysis and fixes
- `/sc:test` - Run tests with coverage
- `/sc:build` - Build and compile projects

#### 🔧 Improvement

- `/sc:improve` - Refactoring and optimization
- `/sc:cleanup` - Remove dead code and unused imports

#### 📚 Documentation

- `/sc:explain` - Code explanations at different levels
- `/sc:document` - Generate inline and external docs
- `/sc:index-repo` - Create project index (3KB vs 58KB)

#### 👥 Expert Panels

- `/sc:spec-panel` - Specification review by renowned experts (Fowler, Wiegers, etc.)
- `/sc:business-panel` - Business analysis by legendary thinkers (Porter, Drucker, etc.)

### Key Command Patterns

**Document-Only Commands** (stop after output):

```bash
/sc:brainstorm "idea"          # → Requirements spec
/sc:workflow "feature"         # → Implementation plan
/sc:research "topic"           # → Research report
/sc:design "system"            # → Architecture docs
```

**Execution Commands** (make changes):

```bash
/sc:implement "feature"        # → Writes code
/sc:improve "codebase"         # → Applies improvements
/sc:cleanup "module"           # → Removes dead code
/sc:test                       # → Runs tests
```

### Command Comparison: spawn vs task vs implement

| Command         | Purpose                   | Output                           | When to Use                             |
| --------------- | ------------------------- | -------------------------------- | --------------------------------------- |
| `/sc:spawn`     | Decompose large task      | Task hierarchy (no code)         | Don't know how to break down work       |
| `/sc:task`      | Execute with coordination | Finished result (can write code) | Multi-domain task (API + UI + security) |
| `/sc:implement` | Write code directly       | Code files                       | Single domain, clear requirements       |

**Example:**

```bash
# Scenario: E-commerce platform
/sc:spawn "build e-commerce platform"
# → Creates: Auth Story → Product Story → Checkout Story → Tasks

# Scenario: Complex authentication
/sc:task create "user authentication" --strategy systematic
# → Activates: architect + security + backend + QA → produces code

# Scenario: Simple component
/sc:implement "login button" --type component --framework react
# → Directly creates: LoginButton.tsx + tests
```

---

## Agent System

### What Are Agents?

Agents are specialized AI domain experts implemented as context instructions. When you make a request, SuperClaude activates relevant agents automatically based on keywords and patterns.

### The 16-Agent Team

#### Architecture & System Design

- **system-architect**: Large-scale distributed systems, microservices
- **backend-architect**: API design, databases, server-side logic
- **frontend-architect**: UI/UX, components, accessibility (WCAG 2.1)
- **devops-architect**: CI/CD, containers, infrastructure

#### Quality & Analysis

- **security-engineer**: Threat modeling, OWASP, encryption
- **performance-engineer**: Optimization, profiling, scaling
- **root-cause-analyst**: Systematic debugging, incident response
- **quality-engineer**: Testing strategy, automation, coverage

#### Specialized Development

- **python-expert**: Modern Python, FastAPI, async programming
- **refactoring-expert**: SOLID principles, design patterns
- **requirements-analyst**: PRDs, user stories, specifications

#### Communication & Learning

- **technical-writer**: API docs, user guides, clarity
- **learning-guide**: Tutorials, concept explanations, mentorship

#### Meta-Layer

- **pm-agent**: Project management, documentation, learning from mistakes
- **deep-research-agent**: Multi-hop web research, evidence synthesis

### Agent Auto-Activation

Agents activate automatically based on context:

```bash
# Security keywords → security-engineer
/sc:implement "JWT authentication"
# → security-engineer + backend-architect

# UI keywords → frontend-architect
/sc:implement "responsive dashboard"
# → frontend-architect + learning-guide (accessibility)

# Performance keywords → performance-engineer
/sc:troubleshoot "slow API responses"
# → performance-engineer + root-cause-analyst

# Multiple domains → team coordination
/sc:implement "e-commerce checkout with payment"
# → frontend-architect + backend-architect + security-engineer + quality-engineer
```

### Manual Agent Invocation

```bash
# Force specific agent
@agent-security "review authentication code"
@agent-frontend "design component library"
@agent-refactoring-expert "suggest SOLID improvements"

# Combine with commands
/sc:implement "payment system"
@agent-security "ensure PCI-DSS compliance"
```

---

## MCP Servers

### What Are MCP Servers?

MCP (Model Context Protocol) servers extend Claude Code with specialized tools. SuperClaude integrates 5 free servers that require no API keys or payment.

### The 5 Free Servers

| Server                  | Purpose                                          | Auto-Triggers                       |
| ----------------------- | ------------------------------------------------ | ----------------------------------- |
| **sequential-thinking** | Multi-step reasoning and systematic analysis     | Complex analysis, debugging         |
| **context7**            | Official library documentation and code examples | Framework questions, implementation |
| **playwright**          | Browser automation and E2E testing               | E2E testing, visual validation      |
| **serena**              | Semantic code analysis and project memory        | Large codebases, symbol operations  |
| **chrome-devtools**     | Performance analysis and debugging               | Performance issues, debugging       |

> **Note**: These servers require no API keys, no payment, and no signup. See [MCP Installation Guide](mcp-installation.md) for setup instructions.

### Recommended Server Combination

**Essential Trio** (Most Common):

- **sequential-thinking** + **context7** + **playwright**
- Perfect for: Development, testing, and framework patterns

**Full Stack** (All 5):

- Add **serena** (for large codebases) + **chrome-devtools** (for performance)
- Perfect for: Enterprise development and optimization

---

## Behavioral Modes

### What Are Modes?

Modes are behavioral patterns that Claude Code adopts based on task complexity. They activate automatically through context instructions but can be manually controlled.

### The 6 Modes

#### 🧠 Brainstorming Mode

**Purpose**: Transform vague ideas into structured requirements

**Auto-Triggers**: "brainstorm", "maybe", "thinking about", vague requests

**Example**:

```bash
# Request: "I want to build a mobile app"
# Standard: "I'll build a mobile app with React Native..."
# Brainstorming:
"🤔 Let's explore this together:
 - What problem does your app solve?
 - Who are your target users?
 - What platforms (iOS/Android/both)?
 - Any specific features you envision?
 📝 Outcome: Detailed requirements brief"
```

#### 🔍 Introspection Mode

**Purpose**: Expose reasoning for learning and debugging

**Auto-Triggers**: Error recovery, "analyze reasoning", complex decisions

**Example**:

```bash
# Debugging authentication issue
"🧠 Meta-Analysis: Why did JWT validation fail?
 🎯 Hypothesis: Missing secret in environment
 🔄 Evidence Check: .env file exists but JWT_SECRET undefined
 💡 Learning: Always validate env vars before auth
 ⚡ Fix: Add JWT_SECRET to .env"
```

#### 🔬 Deep Research Mode

**Purpose**: Systematic investigation with evidence

**Auto-Triggers**: `/sc:research`, investigation keywords

**Workflow**:

- 📋 Understand (5-10%): Query analysis
- 📝 Plan (10-15%): Strategy selection
- ✅ TodoWrite (5%): Task breakdown
- 🔄 Execute (50-60%): Parallel searches
- 📊 Track: Progress monitoring
- ✓ Validate (10-15%): Evidence verification

#### 📋 Task Management Mode

**Purpose**: Hierarchical coordination for complex work

**Auto-Triggers**: >3 steps, >2 directories, complex dependencies

**Example**:

```bash
# Request: "Implement authentication system"
"📋 Multi-Phase Plan:
 🎯 Phase 1: Database schema + models
 🎯 Phase 2: API endpoints + middleware
 🎯 Phase 3: Frontend integration
 🎯 Phase 4: Testing + documentation
 💾 Session persistence enabled"
```

#### 🎯 Orchestration Mode

**Purpose**: Optimize tool selection and parallel execution

**Auto-Triggers**: Multi-tool operations, performance needs

**Example**:

```bash
# Complex analysis task
"🎯 Tool Coordination:
 🔍 Sequential: Architecture analysis
 📚 Context7: Framework patterns
 🧪 Playwright: E2E testing
 🔄 Parallel execution: 3 tools simultaneously"
```

#### ⚡ Token Efficiency Mode

**Purpose**: Compressed communication (30-50% reduction)

**Auto-Triggers**: High context usage, `--uc` flag

**Example**:

```bash
# Standard: "The authentication system implementation shows..."
# Efficient:
"🛡️ auth.js:45 → user val() → critical vuln
 📊 Impact: ❌ token bypass
 ⚡ Fix: validation + audit | 2h impl + 1h test"
```

### Mode Control

```bash
# Manual activation
/sc:implement "feature" --brainstorm        # Force discovery
/sc:analyze "code" --introspect            # Add transparency
/sc:task "complex" --task-manage           # Enable coordination
/sc:research "topic" --depth exhaustive    # Maximum research

# Disable specific modes
/sc:implement "simple" --no-mcp            # Native tools only
/sc:analyze "code" --no-uc                 # No compression
```

---

## Common Workflows

### 1. New Feature Development

```bash
# Phase 1: Discovery
/sc:brainstorm "real-time chat feature"
# → Asks about: users, scale, platforms, integrations

# Phase 2: Architecture
/sc:design chat-system --type architecture
# → Creates: WebSocket architecture, message queue, scaling strategy

# Phase 3: Planning
/sc:workflow chat-system --strategy systematic
# → Produces: Phase-by-phase implementation roadmap

# Phase 4: Implementation
/sc:implement "WebSocket server" --with-tests
/sc:implement "message persistence" --with-tests
/sc:implement "chat UI component" --framework react

# Phase 5: Quality
/sc:test --type all --coverage
/sc:analyze chat-system/ --focus security
```

### 2. Bug Investigation

```bash
# Step 1: Diagnose
/sc:troubleshoot "users can't login" --trace
# → Root cause analysis with evidence

# Step 2: Fix
/sc:implement "fix authentication validation"
# → Applies fix with tests

# Step 3: Verify
/sc:test auth/ --coverage
/sc:analyze auth/ --focus security
```

### 3. Code Refactoring

```bash
# Step 1: Analyze
/sc:analyze legacy-module/ --focus quality
# → Identifies: code smells, duplication, complexity

# Step 2: Improve
/sc:improve legacy-module/ --type maintainability --safe
# → Applies: SOLID principles, design patterns

# Step 3: Clean
/sc:cleanup legacy-module/ --type all --interactive
# → Removes: dead code, unused imports

# Step 4: Validate
/sc:test --coverage
```

### 4. Research-Driven Development

```bash
# Step 1: Research
/sc:research "latest React Server Components patterns 2024" --depth deep
# → Report: docs/research/react_rsc_[timestamp].md

# Step 2: Design
/sc:design app-architecture --type architecture
# → Incorporates: research findings into design

# Step 3: Implement
/sc:implement "server components" --c7
# → Uses: Context7 for official React patterns
```

### 5. Specification Review

```bash
# Business strategy review
/sc:business-panel @pitch-deck.md --mode debate
# → Porter: "What's your competitive advantage?"
# → Christensen: "Disruption potential?"
# → Taleb: "Antifragile to market changes?"

# Technical spec review
/sc:spec-panel @api-spec.yml --mode critique --focus architecture
# → Fowler: "❌ CRITICAL: Violates single responsibility"
# → Newman: "⚠️ MAJOR: Service versioning missing"
# → Nygard: "Consider circuit breaker pattern"
```

### 6. Full-Stack Development

```bash
# Backend
/sc:implement "REST API for tasks" --type api --safe --with-tests
# → backend-architect + security-engineer + quality-engineer

# Frontend
/sc:implement "task dashboard component" --framework react --with-tests
# → frontend-architect + learning-guide (accessibility)

# Integration
/sc:test --type integration
/sc:analyze . --focus performance

# Documentation
/sc:document api/ --type api --style detailed
```

---

## Advanced Features

### 1. Memory System (ReflexionMemory)

Automatic error learning across sessions:

```python
# How it works
Error Occurs → PM Agent analyzes → Saves to memory
Next Error → Searches past errors → Applies known solution
Result: <10% error recurrence, 75-95% token savings

# Storage: docs/memory/reflexion.jsonl

# View learnings
cat docs/memory/reflexion.jsonl | jq

# Search specific topic
cat docs/memory/reflexion.jsonl | jq 'select(.task | contains("auth"))'
```

### 2. Session Management (Serena MCP)

Persistent context across conversations:

```bash
# Save session
/sc:save "authentication implemented with JWT and refresh tokens"

# Load in new conversation
/sc:load project-name
# → Restores: all decisions, context, progress

# Assess progress
/sc:reflect --scope project
# → Compares: current state vs stored milestones
```

### 3. Project Indexing

94% token reduction through efficient indexing:

```bash
# Full indexing (3KB vs 58KB)
/sc:index-repo
# → Creates: PROJECT_INDEX.md with structure, entry points, dependencies

# Quick update
/sc:index-repo mode=update

# Alternative: Serena semantic analysis
serena activate_project .
serena onboarding
```

### 4. Parallel Execution

3.5x faster through wave-checkpoint pattern:

```bash
# Automatically detected
/sc:implement "update 10 components"
# → Wave 1: Read all files in parallel
# → Checkpoint: Analyze patterns
# → Wave 2: Edit all files in parallel

# Manual control
/sc:task execute "complex feature" --parallel --concurrency 5
```

### 5. Token Budget Management

Automatic allocation based on complexity:

```bash
# Simple tasks: 200 tokens (typo fix)
# Medium tasks: 1,000 tokens (bug fix)
# Complex tasks: 2,500 tokens (feature)

# Markers in pytest
@pytest.mark.complexity("medium")
def test_with_budget(token_budget):
    assert token_budget.limit == 1000
```

---

## Troubleshooting

### Common Issues

#### MCP Servers Not Working

```bash
# Check Node.js version (need 18+)
node --version

# Check server connections
claude mcp list

# Test without MCP
/sc:implement "feature" --no-mcp

# Reinstall
superclaude mcp --servers sequential-thinking context7
```

#### Agent Not Activating

```bash
# Use specific keywords
"implement JWT authentication security"  # ✅ Triggers security-engineer
"add login"                              # ❌ May not trigger

# Manual override
@agent-security "review authentication"

# Check activation
/sc:implement "auth" --introspect
# → Shows reasoning about agent selection
```

#### Mode Confusion

```bash
# Force specific mode
/sc:brainstorm "clear requirements" --brainstorm  # Force discovery
/sc:analyze "code" --no-uc                        # Disable compression

# Check mode indicators
# 🤔 = Brainstorming
# 🎯 = Introspection
# 📋 = Task Management
```

#### Context Pressure

```bash
# Use token efficiency
/sc:analyze large-codebase/ --uc

# Use indexing
/sc:index-repo

# Split into phases
/sc:spawn "large task" --strategy adaptive
```

#### MCP Server Connection Issues

```bash
# Check Node.js version (need 18+)
node --version

# Check server connections
claude mcp list

# Restart Claude Code session to reconnect servers
```

### Progressive Support

**Level 1: Quick Fix (< 2 min)**

- Check prerequisites: `node --version`, `claude --version`
- Restart Claude Code session
- Use manual flags: `--brainstorm`, `--no-mcp`, `--uc`

**Level 2: Detailed Help (5-15 min)**

```bash
/sc:help modes                  # List modes
/sc:reflect --type mode-status  # Check current state
superclaude mcp --list          # Available servers
```

**Level 3: Expert Support (30+ min)**

```bash
superclaude install --diagnose
# Full system diagnosis
```

**Level 4: Community**

- GitHub Issues: https://github.com/SuperClaude-Org/SuperClaude_Framework/issues
- Documentation: https://github.com/SuperClaude-Org/SuperClaude_Framework/tree/master/docs

---

## Quick Reference

### Essential Commands

```bash
# Discovery
/sc:brainstorm "idea"           # Requirements discovery
/sc:research "topic"            # Web research

# Implementation
/sc:design "system"             # Architecture & design
/sc:implement "feature"         # Write code
/sc:workflow "PRD"              # Generate plan

# Quality
/sc:analyze "code"              # Code analysis
/sc:test                        # Run tests
/sc:troubleshoot "issue"        # Debug

# Improvement
/sc:improve "code"              # Refactor
/sc:cleanup "module"            # Remove dead code

# Documentation
/sc:document "code"             # Generate docs
/sc:explain "concept"           # Explanations
```

### Agent Triggers

```bash
# Security → security-engineer
"auth", "security", "vulnerability", "encryption"

# Performance → performance-engineer
"slow", "optimization", "bottleneck", "latency"

# Frontend → frontend-architect
"UI", "React", "component", "responsive", "accessible"

# Backend → backend-architect
"API", "server", "database", "REST", "GraphQL"
```

### MCP Server Usage

```bash
# Documentation patterns
/sc:implement "feature" --c7    # Use Context7

# Deep analysis
/sc:analyze "code" --seq        # Use Sequential

# Browser testing
/sc:test --type e2e --play      # Use Playwright

# Performance analysis
/sc:analyze "code" --chrome     # Use Chrome DevTools

# Semantic code understanding
/sc:refactor "module" --serena  # Use Serena
```

### Flags Reference

```bash
# Analysis depth
--think          # Standard analysis (~4K tokens)
--think-hard     # Deep analysis (~10K tokens)
--ultrathink     # Maximum analysis (~32K tokens)

# Execution control
--safe           # Conservative approach
--interactive    # User guidance
--parallel       # Parallel execution
--uc             # Token compression

# Output
--format text|json|report
--depth quick|standard|deep|exhaustive
--verbose        # Detailed output
```

---

## Real-World Scenarios

### Scenario 1: Startup MVP

**Context**: Building MVP with unclear requirements

```bash
# Week 1: Discovery
/sc:brainstorm "SaaS project management tool"
# → Clarifies: target users, core features, tech stack

/sc:business-panel @idea.md --mode discussion
# → Porter, Christensen analyze market fit

# Week 2: Architecture
/sc:design mvp-architecture --type architecture
/sc:spec-panel @design.md --mode critique
# → Fowler, Newman validate technical approach

# Week 3-4: Implementation
/sc:workflow mvp-features --strategy agile
/sc:implement "user authentication" --with-tests
/sc:implement "project dashboard" --framework react
/sc:implement "task API" --type api

# Week 5: Polish
/sc:test --type all --coverage
/sc:analyze . --focus security
/sc:document api/ --type api
```

### Scenario 2: Legacy System Modernization

**Context**: Refactoring 10-year-old monolith

```bash
# Phase 1: Analysis (Week 1-2)
/sc:index-repo                  # Understand structure
/sc:analyze legacy/ --ultrathink --all-mcp
# → Comprehensive analysis with all tools

# Phase 2: Strategy (Week 3)
/sc:spawn "modernize legacy system" --strategy adaptive
# → Breaks into phases: DB → API → Frontend → Testing

/sc:business-panel @modernization-plan.md
# → Business justification and risk analysis

# Phase 3: Execution (Month 2-3)
/sc:improve legacy/database --type architecture --safe
/sc:improve legacy/api --type quality --interactive
/sc:implement "new microservices" --strategy systematic

# Phase 4: Validation (Month 4)
/sc:test --type integration --coverage
/sc:analyze . --focus performance
/sc:document . --type architecture
```

### Scenario 3: Security Audit

**Context**: Preparing for security audit

```bash
# Week 1: Assessment
/sc:analyze . --focus security --think-hard
# → Identifies: vulnerabilities, OWASP issues, compliance gaps

# Week 2: Remediation
/sc:implement "fix authentication vulnerabilities" --safe
/sc:implement "add rate limiting" --safe
/sc:implement "encrypt sensitive data" --safe

# Week 3: Validation
@agent-security "comprehensive security review"
/sc:test --type security
/sc:spec-panel @security-spec.md --focus compliance

# Week 4: Documentation
/sc:document security/ --type guide
/sc:explain "security architecture" --level advanced
```

---

## Best Practices

### 1. Start Simple, Scale Up

```bash
# ❌ Wrong: Over-engineering from start
/sc:implement "enterprise authentication system" --ultrathink --all-mcp

# ✅ Right: Start simple, add complexity
/sc:brainstorm "auth requirements"  # Clarify needs
/sc:implement "JWT auth" --safe     # Start simple
# Add complexity only when needed
```

### 2. Use Right Tool for Job

```bash
# Single component → implement
/sc:implement "login button" --type component

# Multi-domain feature → task
/sc:task create "payment system" --strategy systematic

# Unclear scope → spawn
/sc:spawn "modernize system" --strategy adaptive
```

### 3. Document Decisions

```bash
# Save architectural decisions
/sc:save "chose microservices over monolith because [reasons]"

# Document in code
/sc:document architecture/ --type guide

# Create ADRs for major choices
/sc:design "authentication strategy" --format spec
```

### 4. Test Throughout

```bash
# TDD approach
/sc:implement "feature" --with-tests  # Tests created with code
/sc:test --coverage                   # Verify coverage
/sc:test --type e2e --play           # Integration tests
```

### 5. Security First

```bash
# Always review security for auth/payments
/sc:implement "payment API" --safe
@agent-security "review payment flow"
/sc:analyze payment/ --focus security
```

---

## Appendix: Command Summary Table

| Category      | Command              | Purpose               | Key Flag         |
| ------------- | -------------------- | --------------------- | ---------------- |
| **Meta**      | `/sc:pm`             | Project management    | Always active    |
|               | `/sc:spawn`          | Task decomposition    | `--strategy`     |
|               | `/sc:task`           | Coordinated execution | `--parallel`     |
|               | `/sc:workflow`       | Plan generation       | `--depth`        |
| **Discovery** | `/sc:brainstorm`     | Requirements          | `--strategy`     |
|               | `/sc:research`       | Web research          | `--depth`        |
| **Build**     | `/sc:implement`      | Code writing          | `--with-tests`   |
|               | `/sc:design`         | Architecture          | `--type`         |
| **Quality**   | `/sc:analyze`        | Code analysis         | `--focus`        |
|               | `/sc:troubleshoot`   | Debugging             | `--trace`        |
|               | `/sc:test`           | Testing               | `--coverage`     |
|               | `/sc:build`          | Building              | `--type`         |
| **Improve**   | `/sc:improve`        | Refactoring           | `--safe`         |
|               | `/sc:cleanup`        | Dead code             | `--type`         |
| **Docs**      | `/sc:document`       | Documentation         | `--type`         |
|               | `/sc:explain`        | Explanations          | `--level`        |
|               | `/sc:index-repo`     | Project index         | `mode=update`    |
| **Review**    | `/sc:spec-panel`     | Spec review           | `--mode`         |
|               | `/sc:business-panel` | Business review       | `--mode`         |
| **Utils**     | `/sc:git`            | Git operations        | `--smart-commit` |
|               | `/sc:estimate`       | Estimation            | `--breakdown`    |
|               | `/sc:reflect`        | Progress check        | `--validate`     |

---

**Remember**: SuperClaude is designed to work naturally. Start with simple commands, let agents and modes activate automatically, and add complexity only when needed. The framework scales from simple scripts to enterprise applications.
