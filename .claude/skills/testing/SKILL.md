---
name: testing
description: Write effective tests that catch bugs and enable confident refactoring. Use when writing new features, fixing bugs, or refactoring code. Covers the AAA pattern (Arrange-Act-Assert), test naming, mocking strategies, test coverage guidelines, and the testing pyramid (unit/integration/e2e).
---

# Testing

Write effective tests that catch bugs and enable refactoring.

## AAA Pattern (Arrange-Act-Assert)

Every test should follow this structure:

```javascript
test("calculateTotal applies discount correctly", () => {
  // Arrange: Set up test data
  const items = [
    { price: 100, quantity: 2 },
    { price: 50, quantity: 1 },
  ];
  const discountPercentage = 10;

  // Act: Execute the function under test
  const total = calculateTotal(items, discountPercentage);

  // Assert: Verify the result
  expect(total).toBe(225); // (200 + 50) * 0.9
});
```

## What to Test

**Happy path**:

```javascript
test("user login with valid credentials succeeds", async () => {
  const result = await login("user@example.com", "correct-password");
  expect(result.success).toBe(true);
});
```

**Edge cases**:

```javascript
test("handles empty shopping cart", () => {
  const total = calculateTotal([]);
  expect(total).toBe(0);
});
```

**Error conditions**:

```javascript
test("throws error for invalid email", () => {
  expect(() => validateEmail("not-an-email")).toThrow("Invalid email");
});
```

**Business rules**:

```javascript
test("free shipping applies for orders over $100", () => {
  const order = { total: 150 };
  expect(calculateShipping(order)).toBe(0);
});
```

## Test Naming

Pattern: `[method/feature] [scenario] [expected behavior]`

```javascript
// Bad names
test("test1", () => {});
test("it works", () => {});

// Good names
test("login with valid credentials returns success", () => {});
test("login with invalid password returns error", () => {});
test("calculateTotal applies discount correctly", () => {});
```

## Mocking

**When to mock**:

- External services (APIs, databases)
- Time-dependent code
- File system operations

**When NOT to mock**:

- Simple utility functions
- Pure functions
- Code you control and should test

**Example**:

```javascript
// Mock external API
test("fetchUser handles API failure gracefully", async () => {
  const mockFetch = jest.fn().mockRejectedValue(new Error("API down"));

  const result = await fetchUser(123, mockFetch);

  expect(result).toBeNull();
  expect(mockFetch).toHaveBeenCalledWith("/users/123");
});
```

## Test Coverage

**Aim for**:

- 80%+ code coverage overall
- 100% coverage for critical paths (auth, payments)
- Focus on valuable tests, not just coverage percentage

## Testing Pyramid

**Unit Tests (70%)**:

- Test individual functions
- Fast, isolated
- Example: Testing a validation function

**Integration Tests (20%)**:

- Test how components work together
- Example: Testing API endpoint with database

**End-to-End Tests (10%)**:

- Test complete user flows
- Slower, more fragile
- Example: Testing checkout flow in browser

## Testing Async Code

```javascript
// Use async/await
test("fetches user data", async () => {
  const user = await fetchUser(123);
  expect(user.name).toBe("John");
});
```

## Setup and Teardown

```javascript
beforeEach(() => {
  // Runs before each test
  database.clear();
});

afterEach(() => {
  // Runs after each test
  database.close();
});
```

## Test Anti-Patterns

**Tests that test nothing**:

```javascript
// Bad: No assertions
test("user can login", () => {
  login("user@example.com", "password");
  // No expect() - doesn't test anything!
});
```

**Tests that depend on each other**:

```javascript
// Bad: Tests share state
let user;

test("creates user", () => {
  user = createUser("test");
});

test("updates user", () => {
  user.name = "updated";
  // Fails if first test doesn't run!
});
```

**Testing implementation details**:

```javascript
// Bad: Testing HOW it works
test("calls database.query", () => {
  const spy = jest.spyOn(database, "query");
  userService.getUser(123);
  expect(spy).toHaveBeenCalled();
  // Breaks if we refactor to use ORM
});

// Good: Testing WHAT it does
test("returns user data", () => {
  const user = userService.getUser(123);
  expect(user.id).toBe(123);
  // Works regardless of implementation
});
```

## Quick Reference

Before considering feature "done":

- [ ] Happy path is tested
- [ ] Edge cases are tested
- [ ] Error conditions are tested
- [ ] Business rules are verified
- [ ] Tests are fast (< 100ms per test)
- [ ] Tests don't depend on each other
- [ ] Test names are descriptive
- [ ] All tests pass
