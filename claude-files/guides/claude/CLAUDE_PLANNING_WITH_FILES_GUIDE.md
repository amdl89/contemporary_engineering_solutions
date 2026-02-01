# Comprehensive User Guide to planning-with-files Plugin

---

## Table of Contents

### Part 1: Understanding

1. [What is planning-with-files?](#what-is-planning-with-files)
2. [Why Does It Exist?](#why-does-it-exist)
3. [The Problem It Solves](#the-problem-it-solves)
4. [When to Use It vs When to Skip](#when-to-use-it-vs-when-to-skip)

### Part 2: The 3-File Pattern

5. [task_plan.md - The Strategic Roadmap](#task_planmd---the-strategic-roadmap)
6. [findings.md - The Knowledge Base](#findingsmd---the-knowledge-base)
7. [progress.md - The Session Log](#progressmd---the-session-log)
8. [How They Work Together](#how-they-work-together)

### Part 3: Core Concepts

9. [The 5-Phase Workflow](#the-5-phase-workflow)
10. [The Work Loop (Iterative)](#the-work-loop-iterative)
11. [Key Principles (Manus Context Engineering)](#key-principles-manus-context-engineering)
12. [The 2-Action Rule](#the-2-action-rule)
13. [State Machines for Phases](#state-machines-for-phases)

### Part 4: Practical Application

14. [Research Task Example (Step-by-step)](#research-task-example-step-by-step)
15. [Bug Fix Workflow (Step-by-step)](#bug-fix-workflow-step-by-step)
16. [Feature Development Pattern](#feature-development-pattern)
17. [Cross-Session Continuation Pattern](#cross-session-continuation-pattern)
18. [Integration Patterns](#integration-patterns)

### Part 5: Using the Plugin

19. [Getting Started](#getting-started)
20. [Session Recovery After /clear](#session-recovery-after-clear)
21. [Helper Scripts](#helper-scripts)
22. [When Planning Files Are Created](#when-planning-files-are-created)

### Part 6: Best Practices

23. [Best Practices Summary (Golden Rules)](#best-practices-summary-golden-rules)
24. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
25. [Decision Framework (When to Use)](#decision-framework-when-to-use)
26. [Common Troubleshooting](#common-troubleshooting)

### Part 7: Learning Aids (For Claude)

27. [Pattern Recognition Examples](#pattern-recognition-examples)
28. [Common Tool Call Sequences](#common-tool-call-sequences)
29. [File Update Triggers](#file-update-triggers)
30. [Error Handling Patterns](#error-handling-patterns)

---

# Part 1: Understanding

## What is planning-with-files?

**planning-with-files** is a Claude Code plugin that transforms how AI agents work by using **persistent markdown files** for planning, progress tracking, and knowledge storage — the exact pattern that made Manus worth billions.

It's context engineering made practical: treating your filesystem as external, persistent memory for AI agents.

### The Core Philosophy

```
Context Window = RAM (volatile, limited)
Filesystem = Disk (persistent, unlimited)

→ Anything important gets written to disk.
```

Instead of relying solely on the AI's volatile context window (which gets forgotten or compressed), the plugin ensures critical information lives in files that persist across sessions, context resets, and even complete restarts.

### What Makes It Special

On December 29, 2025, Meta acquired Manus for $2 billion. In just 8 months, Manus went from launch to $100M+ revenue. Their secret? **Context engineering** — specifically, using markdown files as "working memory on disk."

This plugin brings those same techniques to Claude Code and other AI coding assistants.

## Why Does It Exist?

### The Manus Quote

> "Markdown is my 'working memory' on disk. Since I process information iteratively and my active context has limits, Markdown files serve as scratch pads for notes, checkpoints for progress, building blocks for final deliverables."
> — Manus AI

### The Deep Problem

AI agents like Claude have incredible capabilities but face fundamental limitations:

1. **Limited Working Memory**: The context window is like RAM — fast but limited
2. **Attention Decay**: After ~50 tool calls, original goals get "lost in the middle"
3. **No Persistent State**: Context resets or compaction lose information
4. **Error Amnesia**: Without tracking, agents repeat the same mistakes
5. **Goal Drift**: Long tasks cause agents to lose sight of the original objective

### The Context Engineering Solution

Manus discovered that by treating the **filesystem as external memory**, AI agents could:

- **Remember** across context resets
- **Track** progress systematically
- **Learn** from errors without repeating them
- **Refocus** on goals by re-reading plan files
- **Scale** to complex, multi-phase tasks

This plugin implements those patterns.

## The Problem It Solves

### Before: Volatile Memory

Without planning-with-files:

```
User: "Build a todo app with add, list, delete, and save features"

Claude (Turn 1): "I'll create a todo app"
[20 tool calls later]
Claude (Turn 20): "I've added the list feature"
[30 more tool calls]
Claude (Turn 50): "Wait, what was I building again?"
```

**Problems:**

- Goals forgotten after many operations
- TodoWrite disappears on `/clear` or context reset
- Errors not tracked, so mistakes repeat
- No systematic progress tracking

### After: Persistent Memory

With planning-with-files:

```
User: "Build a todo app with add, list, delete, and save features"

Claude: Creates task_plan.md, findings.md, progress.md
[20 tool calls later]
Claude: Reads task_plan.md → "Goal: todo app with add, list, delete, save"
[30 more tool calls]
Claude: Reads task_plan.md → Still remembers all requirements
[Context fills up, user runs /clear]
Claude: Session recovery finds unsynced work, continues seamlessly
```

**Benefits:**

- Goals persist across entire task
- Progress tracked systematically
- Errors logged and avoided
- Works across sessions and context resets

## When to Use It vs When to Skip

### ✅ Use planning-with-files for:

| Scenario                         | Why                                      |
| -------------------------------- | ---------------------------------------- |
| **Multi-step tasks (3+ steps)**  | Need systematic tracking                 |
| **Research tasks**               | Findings must be captured and organized  |
| **Building/creating projects**   | Multiple files, phases, decisions        |
| **Tasks spanning 5+ tool calls** | Risk of goal drift increases             |
| **Bug investigations**           | Track attempts, avoid repeating failures |
| **Feature development**          | Design decisions need documentation      |
| **Tasks requiring organization** | Plans keep work structured               |
| **Cross-session work**           | Persistence across context resets        |

### ❌ Skip planning-with-files for:

| Scenario                     | Why                                     |
| ---------------------------- | --------------------------------------- |
| **Simple questions**         | "What is X?" doesn't need planning      |
| **Single-file edits**        | "Fix typo in README" is straightforward |
| **Quick lookups**            | "Find function X" is a single operation |
| **Trivial changes**          | "Add console.log" doesn't need phases   |
| **Already have a plan file** | If it exists, just use it               |

### Decision Framework

```
Is this task > 3 steps?          NO  → Skip planning-with-files
    ↓ YES
Will it take > 5 tool calls?     NO  → Skip planning-with-files
    ↓ YES
Might span multiple sessions?    NO  → Consider using it
    ↓ YES
Requires research/decisions?     NO  → Consider using it
    ↓ YES
                                      → DEFINITELY use planning-with-files
```

---

# Part 2: The 3-File Pattern

For every complex task, create **THREE files**:

```
task_plan.md      → Track phases and progress
findings.md       → Store research and findings
progress.md       → Session log and test results
```

## task_plan.md - The Strategic Roadmap

### Purpose

`task_plan.md` is your **north star**. It answers:

- What am I trying to achieve? (Goal)
- Where am I now? (Current Phase)
- What's next? (Remaining Phases)
- What decisions did I make? (Decisions Table)
- What went wrong? (Errors Table)

### Structure

```markdown
# Task Plan: [Brief Description]

## Goal

[One sentence describing the end state]

## Current Phase

Phase 1

## Phases

### Phase 1: Requirements & Discovery

- [ ] Understand user intent
- [ ] Identify constraints
- [ ] Document in findings.md
- **Status:** in_progress

### Phase 2: Planning & Structure

- [ ] Define approach
- [ ] Create project structure
- **Status:** pending

### Phase 3: Implementation

- [ ] Execute the plan
- [ ] Write to files before executing
- **Status:** pending

### Phase 4: Testing & Verification

- [ ] Verify requirements met
- [ ] Document test results
- **Status:** pending

### Phase 5: Delivery

- [ ] Review outputs
- [ ] Deliver to user
- **Status:** pending

## Key Questions

1. [Question to answer]
2. [Question to answer]

## Decisions Made

| Decision | Rationale |
| -------- | --------- |
|          |           |

## Errors Encountered

| Error | Attempt | Resolution |
| ----- | ------- | ---------- |
|       | 1       |            |
```

### When to Update

| Trigger                     | Action                                    |
| --------------------------- | ----------------------------------------- |
| **Starting task**           | Create it FIRST (never skip!)             |
| **Completing a phase**      | Change status: `in_progress` → `complete` |
| **Making a major decision** | Add to Decisions table with rationale     |
| **Encountering an error**   | Add to Errors table with attempt number   |
| **Before major decisions**  | Read it to refresh goals                  |

### Status Values

- `pending`: Not started yet
- `in_progress`: Currently working on this
- `complete`: Finished this phase

### Why It Works

After ~50 tool calls, AI models experience "lost in the middle" effect — recent context gets attention, but early goals fade. By **re-reading task_plan.md** before decisions, goals reappear at the end of context where they get maximum attention.

```
[Start of context: Original goal - far away, forgotten]
... 50 tool calls ...
[End of context: Just read task_plan.md - FRESH IN ATTENTION!]
```

## findings.md - The Knowledge Base

### Purpose

`findings.md` is your **external memory**. It stores:

- Research discoveries
- Technical decisions with rationale
- Resources (URLs, docs, file paths)
- Visual/multimodal findings (CRITICAL)
- Issues encountered and resolved

### Structure

```markdown
# Findings & Decisions

## Requirements

- [Requirement 1]
- [Requirement 2]

## Research Findings

- [Key discovery 1]
- [Key discovery 2]

## Technical Decisions

| Decision | Rationale |
| -------- | --------- |
|          |           |

## Issues Encountered

| Issue | Resolution |
| ----- | ---------- |
|       |            |

## Resources

- [URL/file path/API reference]

## Visual/Browser Findings

<!-- CRITICAL: Update after every 2 view/browser operations -->

- [Information from screenshots/images/PDFs]
```

### When to Update

| Trigger                             | Action                      | Priority     |
| ----------------------------------- | --------------------------- | ------------ |
| **Discovering something new**       | Add to Research Findings    | Normal       |
| **After 2 view/browser/search ops** | **MUST UPDATE**             | **CRITICAL** |
| **Making a technical decision**     | Add to Technical Decisions  | High         |
| **Finding useful resources**        | Add to Resources            | Normal       |
| **Viewing images/PDFs**             | Capture as text immediately | **CRITICAL** |

### The 2-Action Rule (Preview)

**CRITICAL RULE:**

> After every 2 view/browser/search operations, you MUST update findings.md

This is covered in detail later in the guide.

## progress.md - The Session Log

### Purpose

`progress.md` is your **activity log**. It tracks:

- What actions were taken
- When phases were completed
- Which files were created/modified
- Test results
- Detailed error log with timestamps

### Structure

```markdown
# Progress Log

## Session: 2026-01-15

### Phase 1: [Title]

- **Status:** in_progress
- **Started:** 2026-01-15 10:00
- Actions taken:
  - Created todo.py with basic structure
  - Implemented add functionality
- Files created/modified:
  - todo.py (created)
  - task_plan.md (updated)

### Phase 2: [Title]

- **Status:** pending
- ## Actions taken:
- ## Files created/modified:

## Test Results

| Test | Input | Expected | Actual | Status |
| ---- | ----- | -------- | ------ | ------ |
|      |       |          |        |        |

## Error Log

| Timestamp | Error | Attempt | Resolution |
| --------- | ----- | ------- | ---------- |
|           |       | 1       |            |

## 5-Question Reboot Check

| Question             | Answer           |
| -------------------- | ---------------- |
| Where am I?          | Phase X          |
| Where am I going?    | Remaining phases |
| What's the goal?     | [goal statement] |
| What have I learned? | See findings.md  |
| What have I done?    | See above        |
```

### When to Update

| Trigger                  | Action                            |
| ------------------------ | --------------------------------- |
| **Starting a new phase** | Log start time                    |
| **Completing a phase**   | Log actions taken, files modified |
| **Running tests**        | Add to Test Results table         |
| **Encountering errors**  | Add to Error Log with timestamp   |
| **Resuming after break** | Update 5-Question Check           |

### The 5-Question Reboot Test

If you can answer these questions, your context management is solid:

1. **Where am I?** → Current phase in task_plan.md
2. **Where am I going?** → Remaining phases in task_plan.md
3. **What's the goal?** → Goal statement in task_plan.md
4. **What have I learned?** → See findings.md
5. **What have I done?** → See progress.md

## How They Work Together

### The Relationship

```
┌─────────────────────────────────────────────────────────────────┐
│                         task_plan.md                             │
│  Goal, Phases, Decisions, Errors                                 │
│  → The WHAT and WHERE (strategic)                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              │              ▼
┌─────────────────┐      │      ┌─────────────────┐
│   findings.md   │      │      │   progress.md   │
│  WHY and HOW    │      │      │  WHEN and DONE  │
│  (knowledge)    │      │      │  (chronology)   │
└─────────────────┘      │      └─────────────────┘
                         │
                         ▼
              Re-read before major decisions
              to refresh goals in attention
```

### Information Flow

```
User Request
    ↓
Create task_plan.md (Goal, Phases)
    ↓
Research → Update findings.md
    ↓
Make Decision → Update findings.md (Technical Decisions)
    ↓
Implement → Update progress.md (Actions taken)
    ↓
Complete Phase → Update task_plan.md (Status: complete)
    ↓
Complete Phase → Update progress.md (Phase summary)
    ↓
Test → Update progress.md (Test Results)
    ↓
Error → Update task_plan.md (Errors table)
    ↓
Error → Update progress.md (Error Log)
    ↓
Repeat until all phases complete
```

### Complementary Roles

| File           | Focus     | Updates               | Detail Level |
| -------------- | --------- | --------------------- | ------------ |
| `task_plan.md` | Strategic | After phases complete | High-level   |
| `findings.md`  | Knowledge | After discoveries     | Medium       |
| `progress.md`  | Tactical  | Throughout work       | Detailed     |

All three files work together to provide complete situational awareness across context resets and sessions.

---

# Part 3: Core Concepts

## The 5-Phase Workflow

Most tasks fit into 5 standard phases:

### Phase 1: Requirements & Discovery

**Goal:** Understand what needs to be done

**Tasks:**

- [ ] Understand user intent
- [ ] Identify constraints and requirements
- [ ] Explore existing code/systems if applicable
- [ ] Document findings in findings.md

**Outputs:**

- `findings.md`: Requirements section filled
- `task_plan.md`: Key Questions identified

**Common Patterns:**

```
User request → Break down requirements → Document in findings.md
User request → Ask clarifying questions → Update requirements
User request → Explore codebase → Document current state
```

### Phase 2: Planning & Structure

**Goal:** Decide how to approach the problem

**Tasks:**

- [ ] Define technical approach
- [ ] Choose technologies/libraries
- [ ] Create project structure if needed
- [ ] Document decisions with rationale

**Outputs:**

- `findings.md`: Technical Decisions table filled
- `task_plan.md`: Decisions Made table filled

**Common Patterns:**

```
Research options → Compare approaches → Choose best → Document rationale
Design architecture → Sketch structure → Document decisions
Plan implementation order → Break into subtasks → Update plan
```

### Phase 3: Implementation

**Goal:** Actually build/create the solution

**Tasks:**

- [ ] Execute the plan step by step
- [ ] Write code to files before executing
- [ ] Test incrementally
- [ ] Log progress in progress.md

**Outputs:**

- Code files created/modified
- `progress.md`: Actions taken, files modified
- `task_plan.md`: Errors logged if any occur

**Common Patterns:**

```
Implement feature → Test → Fix issues → Log in progress.md
Write code → Execute → Error occurs → Log → Fix → Test
Create file → Implement logic → Test → Mark complete
```

### Phase 4: Testing & Verification

**Goal:** Verify everything works and meets requirements

**Tasks:**

- [ ] Test all functionality
- [ ] Verify requirements met
- [ ] Document test results in progress.md
- [ ] Fix any issues found

**Outputs:**

- `progress.md`: Test Results table filled
- All tests passing
- Issues resolved

**Common Patterns:**

```
Run tests → Document results → Fix failures → Re-test
Manual verification → Check requirements → Confirm complete
Integration testing → Document outcomes → Fix issues
```

### Phase 5: Delivery

**Goal:** Final review and handoff

**Tasks:**

- [ ] Review all output files
- [ ] Ensure deliverables are complete
- [ ] Create documentation if needed
- [ ] Deliver to user

**Outputs:**

- All deliverable files complete
- Documentation if applicable
- Task complete message

**Common Patterns:**

```
Review outputs → Check completeness → Deliver
Create final documentation → Review → Deliver
Package deliverables → Verify → Hand off to user
```

## The Work Loop (Iterative)

Each task operates in a continuous loop until complete:

```
┌─────────────────────────────────────────┐
│  1. READ PLAN                            │
│     Read task_plan.md → Refresh goals   │
├─────────────────────────────────────────┤
│  2. PERFORM WORK                         │
│     Research / Implement / Test         │
├─────────────────────────────────────────┤
│  3. UPDATE FILES                         │
│     → findings.md: After discoveries    │
│     → progress.md: After actions        │
├─────────────────────────────────────────┤
│  4. CHECK PHASE COMPLETION               │
│     Phase done? Update task_plan.md     │
├─────────────────────────────────────────┤
│  5. HANDLE ERRORS IF ANY                 │
│     Log → Resolve → Document            │
├─────────────────────────────────────────┤
│  6. MOVE TO NEXT ACTION                  │
│     Repeat loop                         │
└────────────┬────────────────────────────┘
             │
             ▼
    All phases complete?
             │
      YES────┴────NO
       │           │
       ▼           └──► Continue loop
   DELIVER
```

### Loop Characteristics

- **Iterative:** Repeats until task complete
- **Self-correcting:** Errors logged, approach mutates
- **Goal-aligned:** Plan refreshed before decisions
- **Progress-aware:** Files updated continuously

## Key Principles (Manus Context Engineering)

These are the foundational principles from Manus:

### 1. Filesystem as External Memory

**Principle:** Context window = RAM (volatile). Filesystem = Disk (persistent).

**Implementation:**

- Store important information in files
- Don't stuff everything in context
- Keep URLs even if content is dropped
- Keep file paths when dropping document contents

**For planning-with-files:**

- All critical info lives in the 3 files
- Files persist across context resets
- `/clear` doesn't lose work (session recovery)

### 2. Manipulate Attention Through Recitation

**Principle:** Re-read goals before decisions to push them into attention window

**Problem:** After ~50 tool calls, models forget original goals ("lost in the middle")

**Solution:** Read task_plan.md before major decisions

**Effect:**

```
[Start of context: Original goal - far away]
...50 tool calls...
[End of context: Just read task_plan.md - ATTENTION!]
```

Goals now get maximum attention at decision time.

### 3. Keep the Wrong Stuff In

**Principle:** Leave failed actions and errors in context

**Why:**

- Failed actions let model update beliefs
- Stack traces provide learning signals
- Reduces mistake repetition
- "Error recovery is one of the clearest signals of TRUE agentic behavior"

**For planning-with-files:**

- Log ALL errors in task_plan.md
- Don't hide failures
- Document resolution attempts

### 4. Never Repeat Failures

**Principle:** Track what you tried. Mutate the approach.

**Rule:**

```python
if action_failed:
    next_action != same_action
```

**Implementation:**

```markdown
## Errors Encountered

| Error             | Attempt | Resolution           |
| ----------------- | ------- | -------------------- | --------------------- |
| FileNotFoundError | 1       | Check if file exists |
| FileNotFoundError | 2       | Create default file  | # Different approach! |
```

**3-Strike Protocol:**

```
ATTEMPT 1: Diagnose & Fix
  → Identify root cause
  → Apply targeted fix

ATTEMPT 2: Alternative Approach
  → Same error? Try different method
  → NEVER repeat exact same action

ATTEMPT 3: Broader Rethink
  → Question assumptions
  → Search for solutions
  → Consider updating plan

AFTER 3 FAILURES: Escalate to User
  → Explain attempts
  → Share error
  → Ask guidance
```

### 5. Design for Persistence

**Principle:** Information should survive context resets and session changes

**Implementation:**

- Write to files frequently
- Update after every 2 view/browser operations
- Log all errors immediately
- Don't rely on memory alone

### 6. Progressive Disclosure

**Principle:** Load information only as needed

**Implementation:**

- Read specific sections of files when needed
- Don't load everything into context at once
- Use grep/glob to find before reading
- Reference files by path rather than keeping content in context

## The 2-Action Rule

**CRITICAL RULE:**

> After every 2 view/browser/search operations, IMMEDIATELY save key findings to text files.

### Why It Exists

Visual/multimodal information (screenshots, browser results, PDFs) **does not persist** in the AI's context window. If you view an image or browser result and don't capture findings as text, that information is **lost forever**.

### The Pattern

```
Operation 1: WebSearch / WebFetch / Read image
  → Note mental findings

Operation 2: WebSearch / WebFetch / Read image
  → MUST UPDATE findings.md NOW

Operation 3: Grep / Read / View
  → Note mental findings

Operation 4: Grep / Read / View
  → MUST UPDATE findings.md NOW
```

### What Counts as a "View/Browser" Operation

| Counts              | Doesn't Count      |
| ------------------- | ------------------ |
| WebSearch           | Read (text files)  |
| WebFetch            | Write              |
| Browser tools       | Edit               |
| Image viewing       | Bash (non-viewing) |
| PDF reading         | Grep results       |
| Screenshot analysis |                    |

### Example Scenario

**WRONG (Information Lost):**

```
1. WebSearch "React hooks tutorial"
2. WebFetch docs page
3. WebSearch "useState examples"
4. WebFetch example code
5. Start implementing → ERROR: Don't remember what I learned!
```

**CORRECT (Information Saved):**

```
1. WebSearch "React hooks tutorial"
2. WebFetch docs page
   → UPDATE findings.md:
      - useState manages state in functional components
      - useEffect handles side effects
3. WebSearch "useState examples"
4. WebFetch example code
   → UPDATE findings.md:
      - Pattern: const [state, setState] = useState(initial)
      - Call setState to trigger re-render
5. Start implementing → Can reference findings.md
```

### Implementation in Claude

When you're Claude and using this pattern:

```markdown
**After 2nd view operation:**

I've completed 2 browser/search operations. Following the 2-Action Rule,
I'll now update findings.md with what I learned:

[Updates findings.md with discoveries]
```

## State Machines for Phases

Each phase operates as a state machine:

```
     ┌─────────────┐
     │   PENDING   │  Initial state
     └──────┬──────┘
            │ Start phase
            ▼
     ┌─────────────┐
     │ IN_PROGRESS │  Working on phase
     └──────┬──────┘
            │ Complete all tasks
            ▼
     ┌─────────────┐
     │  COMPLETE   │  Terminal state
     └─────────────┘
```

### State Transitions

**pending → in_progress:**

- When: Starting work on phase
- Action: Update task_plan.md status
- Log: Update progress.md with start time

**in_progress → complete:**

- When: All phase tasks finished
- Action: Update task_plan.md status
- Action: Mark checkboxes: `[ ]` → `[x]`
- Log: Update progress.md with summary

**No backwards transitions:** Once complete, stays complete

### Multi-Phase State

```
Phase 1: [complete]    ✓
Phase 2: [in_progress] ← Currently here
Phase 3: [pending]
Phase 4: [pending]
Phase 5: [pending]
```

**Rules:**

- Only ONE phase should be `in_progress` at a time
- All previous phases should be `complete`
- All future phases should be `pending`

**Valid progression:**

```
All pending → Phase 1 in_progress → Phase 1 complete →
Phase 2 in_progress → Phase 2 complete → ... → All complete
```

---

# Part 4: Practical Application

## Research Task Example (Step-by-step)

**User Request:** "Research the benefits of morning exercise and write a summary"

### Step 1: Create Planning Files

**task_plan.md:**

```markdown
# Task Plan: Morning Exercise Benefits Research

## Goal

Create a comprehensive research summary on the benefits of morning exercise.

## Current Phase

Phase 1

## Phases

### Phase 1: Create Planning Files

- [x] Create task_plan.md
- [x] Create findings.md
- [x] Create progress.md
- **Status:** complete

### Phase 2: Search and Gather Sources

- [ ] Search for scientific studies
- [ ] Search for health benefits
- [ ] Gather credible sources
- **Status:** in_progress

### Phase 3: Analyze Findings

- [ ] Categorize benefits (physical, mental)
- [ ] Identify key studies
- [ ] Document main findings
- **Status:** pending

### Phase 4: Write Summary

- [ ] Structure the summary
- [ ] Write comprehensive report
- [ ] Include citations
- **Status:** pending

### Phase 5: Review and Deliver

- [ ] Review for completeness
- [ ] Verify sources cited
- [ ] Deliver to user
- **Status:** pending

## Key Questions

1. What are the physical health benefits?
2. What are the mental health benefits?
3. What scientific studies support this?
4. What's the optimal timing for morning exercise?
```

### Step 2: Research (Following 2-Action Rule)

```bash
# Claude's work:
WebSearch "morning exercise benefits scientific studies"
# Operation 1 - note findings mentally

WebFetch https://example.com/study-on-morning-exercise
# Operation 2 - MUST UPDATE findings.md NOW
```

**findings.md (after 2 operations):**

```markdown
# Findings & Decisions

## Requirements

- Comprehensive summary on morning exercise benefits
- Include scientific evidence
- Cover both physical and mental benefits

## Research Findings

- Morning exercise increases metabolism for hours afterward
- Studies show improved sleep quality with AM workouts
- Cortisol levels naturally higher in morning, optimal for exercise
- Consistency easier to maintain with morning routine
- Source: Journal of Physiology, 2019 study

## Resources

- https://example.com/study-on-morning-exercise
- https://healthjournal.com/morning-workout-benefits
```

Continue with more research operations, updating findings.md every 2 operations, and eventually complete all phases systematically.

## Bug Fix Workflow (Step-by-step)

**User Request:** "Fix the login bug - users can't log in with valid credentials"

### The Complete Pattern

**1. Create task_plan.md** with phases:

- Phase 1: Understand the Bug
- Phase 2: Locate Relevant Code
- Phase 3: Identify Root Cause
- Phase 4: Implement Fix
- Phase 5: Verify and Document

**2. Investigation:**

- Search for login code
- Read authentication module
- Document findings in findings.md

**3. Debug and fix:**

- Identify root cause
- Log error in task_plan.md
- Apply fix with different approach if needed
- Test thoroughly

**4. Document:**

- Update progress.md with test results
- Mark all phases complete
- Deliver fix with explanation

## Feature Development Pattern

For feature development:

**1. Research phase:**

- Explore existing codebase
- Follow 2-Action Rule for findings
- Document technical decisions

**2. Design phase:**

- Make architectural choices
- Document rationale in findings.md
- Update task_plan.md with decisions

**3. Implementation:**

- Build incrementally
- Test each component
- Log progress continuously

**4. Complete:**

- Verify all requirements met
- All phases marked complete
- Deliver with documentation

## Cross-Session Continuation Pattern

### When Context Fills Up

**Session 1:**

- Work on complex task
- Update planning files
- Context fills up
- User runs `/clear`

**Session 2:**

- Invoke `/planning-with-files`
- Session recovery runs automatically
- Shows unsynced context
- Update files and continue

**Key actions:**

1. Check git diff for code changes
2. Read all planning files
3. Update based on catchup report
4. Continue seamlessly

## Integration Patterns

### Pattern 1: Research → Implementation

Research findings from one task inform implementation in the next:

- Reference findings.md from research task
- Use technical decisions as guidance
- Build on documented knowledge

### Pattern 2: Spike → Full Build

Exploratory spike documents options, full implementation follows the chosen approach.

### Pattern 3: Investigation → Fix

Bug investigation identifies root cause, fix task implements the solution.

---

# Part 5: Using the Plugin

## Getting Started

### Automatic Activation

The plugin activates automatically when Claude detects a complex task (>5 tool calls expected). When activated:

1. **Planning files are created** in your project directory
2. **The workflow engages** automatically
3. **Claude follows the pattern** systematically

### Manual Activation

You can manually invoke the plugin:

```bash
/planning-with-files
```

This will:

- Check for existing planning files
- Run session recovery if needed
- Create files if they don't exist
- Activate the planning workflow

### What Happens Automatically

When the plugin is active:

**Before major operations:**

- The plan file is displayed to refresh goals

**After file modifications:**

- Reminders appear to update status if phase complete

**When trying to stop:**

- Verification ensures all phases are complete

## Session Recovery After /clear

### Why It's Needed

When context fills up and you run `/clear`, work might not be synced to planning files yet. Session recovery finds that work.

### How to Use It

**Automatic (Recommended):**

```bash
# After /clear, invoke the plugin
/planning-with-files

# Session recovery runs automatically
# Shows catchup report if unsynced work found
```

### What to Do Next

1. **Run git diff** to see code changes
2. **Read planning files** to see current state
3. **Update files** based on unsynced context
4. **Continue work** from where you left off

## Helper Scripts

### init-session.sh

Creates all three planning files at once if they don't exist.

### check-complete.sh

Verifies all phases in task_plan.md are complete. Shows:

- Total phases
- Complete count
- In progress count
- Pending count

### session-catchup.py

Finds unsynced work from previous sessions. Runs automatically with `/planning-with-files`.

## When Planning Files Are Created

### Automatic Creation

Claude automatically creates planning files when:

- Task is detected as complex (>5 tool calls)
- User requests a multi-step task
- Research or investigation needed
- Feature development starting

### Files Location

**Planning files go in YOUR project directory:**

```
✅ /my-project/task_plan.md
✅ /my-project/findings.md
✅ /my-project/progress.md
```

---

# Part 6: Best Practices

## Best Practices Summary (Golden Rules)

### Rule 1: Create Plan First

Never start without task_plan.md. Create all 3 files before any work.

### Rule 2: Follow 2-Action Rule

After 2 view/browser operations, update findings.md immediately.

### Rule 3: Read Before Decide

Read task_plan.md before major decisions to refresh goals.

### Rule 4: Update After Act

After completing a phase, update status to `complete`.

### Rule 5: Log ALL Errors

Every error goes in task_plan.md with attempt number and resolution.

### Rule 6: Never Repeat Failures

If something fails, mutate approach. Never try the same thing twice.

### Rule 7: One Phase at a Time

Only ONE phase should be `in_progress` at any time.

### Rule 8: Files in Project Root

Planning files go in YOUR project directory.

### Rule 9: Verify Before Stopping

All phases must be complete before finishing.

### Rule 10: Use Session Recovery

After `/clear`, let session recovery run to capture unsynced work.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Starting Without a Plan

**DON'T:** Jump into implementation
**DO:** Create task_plan.md first

### Anti-Pattern 2: Using TodoWrite Instead

**DON'T:** Rely on volatile TodoWrite
**DO:** Use persistent planning files

### Anti-Pattern 3: Forgetting 2-Action Rule

**DON'T:** Skip updating findings.md after browser operations
**DO:** Update every 2 view/browser operations

### Anti-Pattern 4: Hiding Errors

**DON'T:** Fix silently without documentation
**DO:** Log every error with resolution

### Anti-Pattern 5: Repeating Failed Actions

**DON'T:** Try the same failed action again
**DO:** Mutate approach each attempt

### Anti-Pattern 6: Stopping Too Early

**DON'T:** Stop with incomplete phases
**DO:** Complete all phases before stopping

### Anti-Pattern 7: Context Stuffing

**DON'T:** Keep everything in context
**DO:** Write to files, reference as needed

### Anti-Pattern 8: Skipping Progress Updates

**DON'T:** Forget to update progress.md
**DO:** Log actions and files after each phase

### Anti-Pattern 9: Ignoring Session Recovery

**DON'T:** Start fresh after `/clear` without checking
**DO:** Use session recovery to capture unsynced work

### Anti-Pattern 10: Not Reading Plan

**DON'T:** Make decisions without refreshing goals
**DO:** Read task_plan.md before major operations

## Decision Framework (When to Use)

### Quick Decision Tree

```
Is this task complex (>3 steps)?
│
├─ NO → Skip planning-with-files
│
└─ YES → Will it take >5 tool calls?
    │
    ├─ NO → Consider skipping
    │
    └─ YES → Does it involve research/decisions?
        │
        ├─ NO → Consider using it
        │
        └─ YES → DEFINITELY use planning-with-files
```

### When to Use (Red Flags)

🚩 User says "complex task"
🚩 Estimate >10 tool calls
🚩 Multiple files will be modified
🚩 Need to research before implementing
🚩 Task will take >15 minutes
🚩 Need systematic testing
🚩 Multiple approaches possible
🚩 Might span sessions

### When to Skip (Green Lights)

✅ Single operation
✅ Trivial change
✅ Direct answer from knowledge
✅ Quick lookup
✅ Simple question

## Common Troubleshooting

### Issue: Planning Files Not Found

**Solution:** Check current directory, create files with `/planning-with-files` if needed.

### Issue: Phase Status Not Updating

**Solution:** Check exact spelling. Use `**Status:** complete` (lowercase, exact format).

### Issue: Session Recovery Shows Nothing

**Possible reason:** All work already synced. Not necessarily a problem.

### Issue: 2-Action Rule Being Forgotten

**Solution:** Set mental counter. Add reminder in findings.md. Check frequently.

### Issue: Context Filling Up Too Fast

**Solution:** Write to files more frequently. Use session recovery after `/clear`. Reference files by path.

### Issue: Lost Track of Progress

**Solution:** Read task_plan.md. Use 5-Question Check to reorient.

---

# Part 7: Learning Aids (For Claude)

## Pattern Recognition Examples

### Pattern 1: Creating Planning Files

**Trigger:** Complex task
**Action:** Create all 3 files, define phases

### Pattern 2: Following 2-Action Rule

**Trigger:** 2nd view/browser operation
**Action:** Update findings.md immediately

### Pattern 3: Completing a Phase

**Trigger:** All phase tasks finished
**Action:** Update status to complete, log in progress.md

### Pattern 4: Encountering an Error

**Trigger:** Tool execution fails
**Action:** Log in both task_plan.md and progress.md, try different approach

### Pattern 5: Pre-Decision Plan Read

**Trigger:** About to make major decision
**Action:** Read task_plan.md to refresh goals

## Common Tool Call Sequences

### Sequence 1: Task Initialization

Write task_plan.md → Write findings.md → Write progress.md → Edit task_plan.md

### Sequence 2: Research Phase

Read task_plan.md → WebSearch → WebFetch → Edit findings.md → Edit task_plan.md

### Sequence 3: Implementation Phase

Read task_plan.md → Read findings.md → Write code → Test → Edit progress.md

### Sequence 4: Error Handling

Error occurs → Edit task_plan.md → Edit progress.md → Try different approach

### Sequence 5: Task Completion

Final tests → Edit progress.md → Edit task_plan.md → Read task_plan.md → Deliver

## File Update Triggers

### task_plan.md Triggers

- Task starts → Create with goal and phases
- Phase completes → Update status
- Major decision → Add to Decisions table
- Error occurs → Add to Errors table
- Before major operation → Read to refresh

### findings.md Triggers

- Discovery made → Add to Research Findings
- 2 view operations → MUST UPDATE
- Technical decision → Add to Technical Decisions
- Resource found → Add to Resources
- Visual content → Add description

### progress.md Triggers

- Phase starts → Log start time
- Phase completes → Log actions and files
- Test runs → Add to Test Results
- Error occurs → Add to Error Log
- Session starts → Update date

## Error Handling Patterns

### Pattern A: First Error

Log error, identify root cause, apply fix, document resolution.

### Pattern B: Repeated Error

Log with different approach. Attempt 2 MUST differ from attempt 1.

### Pattern C: After 3 Attempts

Escalate to user with explanation of all attempts.

### Pattern D: Root Cause Documentation

Document ROOT CAUSE, not just symptom, in both files.

### Pattern E: Preventive Logging

Log even successful error handling for future reference.

---

# Conclusion

## For Human Readers

You now understand the **planning-with-files** plugin — a practical implementation of context engineering techniques from Manus ($2B acquisition).

**Key takeaways:**

1. Filesystem is external memory (persistent, unlimited)
2. 3 files track everything systematically
3. Plugin automates best practices
4. 2-Action Rule prevents information loss
5. Never repeat failures

**Using the plugin:**

- Activates automatically for complex tasks
- Or invoke with `/planning-with-files`
- Creates files in your project directory
- Maintains systematic workflow

## For Claude Instances

**When to activate:**

- Task >3 steps or >5 tool calls
- Research required
- Multiple decisions needed
- Cross-session work likely

**Core loop:**

1. Create/read task_plan.md
2. Perform work
3. Update files (2-Action Rule!)
4. Complete phase → update status
5. Handle errors → log & mutate
6. Repeat until complete

**Critical rules:**

- ✅ Create plan FIRST
- ✅ Follow 2-Action Rule
- ✅ Log ALL errors
- ✅ Never repeat failures
- ✅ One phase in_progress

**You now have the knowledge to work like Manus.**

---

## Additional Resources

- **Repository:** https://github.com/OthmanAdi/planning-with-files
- **Issues:** https://github.com/OthmanAdi/planning-with-files/issues
- **Manus Blog:** https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus

_This guide was created with the planning-with-files pattern itself._
