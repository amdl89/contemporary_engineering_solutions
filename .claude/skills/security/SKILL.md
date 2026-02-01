---
name: security
description: Write secure code following OWASP best practices. Use when handling user authentication, processing user input, storing sensitive data, or making external API calls. Covers OWASP Top 10 vulnerabilities, input validation, output encoding, secure password handling, and preventing injection attacks.
---

# Security

Write secure code following OWASP best practices.

## Broken Access Control

Check authorization on every request. Deny by default.

**Example**:

```javascript
// Bad: No authorization check
app.get("/api/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  res.json(user);
});

// Good: Check authorization
app.get("/api/users/:id", requireAuth, (req, res) => {
  const requestedUserId = req.params.id;
  const currentUserId = req.user.id;

  if (requestedUserId !== currentUserId && !req.user.isAdmin) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = getUserById(requestedUserId);
  res.json(user);
});
```

## Cryptographic Failures

Use strong encryption. Never roll your own crypto.

**Password hashing with bcrypt**:

```javascript
const bcrypt = require("bcrypt");
const saltRounds = 12;

// Hash password
const passwordHash = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(inputPassword, user.passwordHash);
```

## Injection Prevention

Use parameterized queries. Never interpolate user input into SQL.

**Example**:

```javascript
// Bad: SQL injection vulnerability
const query = `SELECT * FROM users WHERE id = ${userId}`;
// Attacker can send: /api/users/1 OR 1=1

// Good: Parameterized query
const query = "SELECT * FROM users WHERE id = ?";
const result = await db.query(query, [userId]);

// Better: Use ORM
const user = await User.findByPk(userId);
```

## Rate Limiting

Prevent brute force attacks with rate limiting.

```javascript
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: "Too many login attempts, try again later",
});

app.post("/api/login", loginLimiter, async (req, res) => {
  // Login logic
});
```

## Secure Error Messages

Don't leak internal details in production.

```javascript
// Bad: Detailed error in production
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

// Good: Generic error message
app.use((err, req, res, next) => {
  logger.error("Error occurred", { err, userId: req.user?.id });

  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});
```

## Secure Password Requirements

```javascript
function isStrongPassword(password) {
  return (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
```

## Secure Session Configuration

```javascript
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Strong, random secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // HTTPS only
      httpOnly: true, // No JavaScript access
      maxAge: 3600000, // 1 hour
      sameSite: "strict", // CSRF protection
    },
  }),
);
```

## Input Validation

Validate everything: length, type, format, range, allowed characters.

```javascript
// Using validation library (e.g., Zod)
const schema = z.object({
  email: z.string().email().max(255),
  age: z.number().int().min(0).max(150),
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
});

app.post("/api/users", (req, res) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  createUser(result.data);
});
```

## XSS Prevention

Use templating engines that auto-escape output. Add CSP headers.

```javascript
// Good: Use templating with auto-escaping
res.render("welcome", { name: req.query.name });

// Add CSP header
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'",
  );
  next();
});
```

## Security Headers

```javascript
const helmet = require("helmet");
app.use(helmet()); // Sets multiple security headers
```

## Secrets Management

Never commit secrets to git. Use environment variables.

```javascript
// Bad
const apiKey = "sk_live_abc123def456";

// Good
const apiKey = process.env.API_KEY;
```

## SSRF Prevention

Validate URLs against allowlist.

```javascript
const ALLOWED_DOMAINS = ["api.example.com", "cdn.example.com"];

app.get("/fetch", async (req, res) => {
  const url = new URL(req.query.url);

  if (!ALLOWED_DOMAINS.includes(url.hostname)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const response = await fetch(url.toString());
  res.json(await response.json());
});
```

## Quick Reference

Before deploying:

- [ ] All inputs validated
- [ ] SQL queries use parameterization
- [ ] Passwords are hashed (bcrypt/scrypt/Argon2)
- [ ] HTTPS enabled everywhere
- [ ] Security headers configured
- [ ] Authentication/authorization on all endpoints
- [ ] Error messages don't leak info
- [ ] Dependencies updated (npm audit)
- [ ] No secrets in code/git
- [ ] Rate limiting on auth endpoints
