---
name: code-quality
description: Write clean, maintainable code following DRY, SOLID principles, and proper error handling. Use when writing new code, refactoring, or reviewing code. Covers avoiding duplication, single responsibility, naming conventions, function design, and error handling patterns.
---

# Code Quality

Write clean, maintainable code following universal principles.

## DRY (Don't Repeat Yourself)

Extract duplicate code into functions or abstractions.

**Example**:

```javascript
// Bad: Repeated validation
function createUser(data) {
  if (!data.email || !data.email.includes("@"))
    throw new Error("Invalid email");
  // create user
}

function updateUser(data) {
  if (!data.email || !data.email.includes("@"))
    throw new Error("Invalid email");
  // update user
}

// Good: Extracted validation
function validateEmail(email) {
  if (!email || !email.includes("@")) throw new Error("Invalid email");
}

function createUser(data) {
  validateEmail(data.email);
  // create user
}
```

## Single Responsibility

Each function/class should have one reason to change.

**Example**:

```javascript
// Bad: Multiple responsibilities
function processOrder(order) {
  // Validation
  if (!order.items?.length) throw new Error("No items");

  // Calculation
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }

  // Database
  database.save(order);
  return total;
}

// Good: Separate concerns
function processOrder(order) {
  validateOrder(order);
  const total = calculateOrderTotal(order);
  saveOrder(order);
  return total;
}
```

## Error Handling

Handle errors explicitly. Never use empty catch blocks.

**Pattern**:

```javascript
// Bad: Silent failure
try {
  await doSomething();
} catch (e) {}

// Good: Log and re-throw
try {
  await doSomething();
} catch (error) {
  logger.error("Failed to do something", { error, context });
  throw new ApplicationError("Operation failed", { cause: error });
}
```

## Naming Conventions

Use descriptive names that reveal intent.

**Variables & Functions**:

- Use verbs for functions: `fetchUsers`, `calculateTotal`
- Use nouns for variables: `userList`, `totalPrice`
- Booleans start with `is`, `has`, `should`: `isActive`, `hasPermission`

**Classes**:

- PascalCase nouns: `UserService`, `PaymentProcessor`

**Constants**:

- UPPER_SNAKE_CASE: `MAX_RETRY_ATTEMPTS`

## Function Design

Keep functions small (under 50 lines) with minimal parameters (3-4 max).

**Pattern**:

```javascript
// Bad: Too many parameters
function createUser(name, email, password, role, status, age, address, phone) {
  // ...
}

// Good: Use object parameter
function createUser(userData) {
  const { name, email, password, role, status, age, address, phone } = userData;
  // ...
}
```

## Code Comments

Comment the WHY, not the WHAT. Code should be self-documenting.

```javascript
// Bad: Obvious comment
// Loop through users
users.forEach((user) => sendEmail(user.email));

// Good: Explains business rule
// Send welcome email only to users who registered in last 24 hours
// Marketing team requested this to improve activation rates
recentUsers
  .filter((u) => u.registeredAt > Date.now() - 86400000)
  .forEach((u) => sendWelcomeEmail(u));
```

## Quick Reference

Before considering code "done":

- [ ] No duplicate code (DRY)
- [ ] Functions have single responsibility
- [ ] Names are clear and descriptive
- [ ] Error handling is explicit
- [ ] Functions are under 50 lines
- [ ] Comments explain WHY (if needed)
