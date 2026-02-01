---
name: documentation
description: Write clear, helpful documentation and code comments. Use when adding new features, changing public APIs, writing complex logic, or creating reusable components. Covers when to comment code, function documentation (JSDoc/docstrings), README structure, and API documentation patterns.
---

# Documentation

Write clear documentation that helps others understand your code.

## Code Comments

**When to comment**:

- Complex algorithms
- Business logic
- Non-obvious decisions
- Warnings and gotchas

**When NOT to comment**:

- Obvious code (make code self-explanatory instead)
- Instead of refactoring (fix the code, don't explain bad code)
- Commented-out code (delete it, use git to recover)

**Example**:

```javascript
// Bad: Obvious
// Get user by ID
function getUserById(id) {
  return db.query("SELECT * FROM users WHERE id = ?", [id]);
}

// Good: Explains WHY
// We limit to 100 results to prevent database timeouts on large datasets.
// This matches the pagination limit in the frontend.
const MAX_RESULTS = 100;

// Good: Warns about gotchas
// Note: This function modifies the input array in-place for performance.
// Clone before calling if you need the original.
function sortUsers(users) {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}
```

## Function Documentation

**JSDoc (JavaScript/TypeScript)**:

```javascript
/**
 * Calculates the total price including tax and shipping.
 *
 * @param {Object} cart - The shopping cart
 * @param {Array<Object>} cart.items - Cart items
 * @returns {number} Total price in cents
 * @throws {ValidationError} If cart is empty
 *
 * @example
 * const total = calculateTotal({
 *   items: [{ price: 1000, quantity: 2 }]
 * });
 * // Returns: 2150 (items: 2000 + tax: 150)
 */
function calculateTotal(cart) {
  // Implementation
}
```

**Python Docstrings**:

```python
def calculate_total(cart: Dict) -> int:
    """
    Calculate the total price including tax and shipping.

    Args:
        cart: Dictionary containing 'items' list

    Returns:
        Total price in cents

    Raises:
        ValidationError: If cart is empty

    Example:
        >>> cart = {'items': [{'price': 1000, 'quantity': 2}]}
        >>> calculate_total(cart)
        2150
    """
    pass
```

## README Structure

Every project needs a README.md:

````markdown
# Project Name

Brief description (one sentence)

## Features

- Feature 1
- Feature 2

## Installation

\```bash
npm install
cp .env.example .env
npm run db:migrate
\```

## Usage

\```javascript
const app = require('./app');
app.doSomething();
\```

## Configuration

| Variable     | Description           | Default |
| ------------ | --------------------- | ------- |
| PORT         | Server port           | 3000    |
| DATABASE_URL | PostgreSQL connection | -       |

## Development

\```bash
npm install # Install dependencies
npm test # Run tests
npm run dev # Run in dev mode
\```
````

## API Documentation

For each endpoint:

````markdown
### POST /api/users

Create a new user account.

**Request Body:**
\```json
{
"email": "user@example.com",
"password": "securepassword123",
"name": "John Doe"
}
\```

**Response (201 Created):**
\```json
{
"id": "user_123",
"email": "user@example.com",
"name": "John Doe"
}
\```

**Error Responses:**

- `400 Bad Request` - Invalid input data
- `409 Conflict` - Email already exists
````

## Best Practices

**Keep it current**:

- Update docs when changing code (same PR)
- Remove docs for removed features
- Mark deprecated features clearly

**Show examples**:

````markdown
// Bad: Vague
Use the validator to validate input.

// Good: Clear example
\```javascript
import { validateUser } from './validation';

const result = validateUser({ email, password });
if (!result.isValid) {
return res.status(400).json({ errors: result.errors });
}
\```
````

**Make it scannable**:

- Use headers and subheaders
- Use bullet points
- Use code blocks
- Use tables for configuration

## Quick Reference

For new features:

- [ ] Code comments for complex logic
- [ ] Function documentation (JSDoc/docstrings)
- [ ] README updated (if public API changed)
- [ ] Examples added for common use cases
- [ ] Edge cases documented
