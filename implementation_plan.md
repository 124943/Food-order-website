# Authentication & Security Implementation Plan

Implementing robust security and authentication for the food delivery application to protect user data and prevent common web vulnerabilities.

## User Review Required

> [!IMPORTANT]
> The implementation involves changing how JWT tokens are issued and verified. Existing sessions might be invalidated.
> I will be installing several new dependencies in the backend.

## Proposed Changes

### Backend Security Hardening

#### [MODIFY] [server.js](file:///c:/Users/anand/Downloads/Food-Delivery-main/Food-Delivery-main/backend/server.js)
- Integrate security middlewares:
    - **Helmet**: Adds secure HTTP headers.
    - **Express Rate Limit**: Prevents Brute-force and DoS attacks.
    - **HPP**: Protects against HTTP Parameter Pollution.
    - **Mongo Sanitize**: Prevents NoSQL injection attacks.
- Configure CORS with specific origins instead of wildcard.

#### [MODIFY] [package.json](file:///c:/Users/anand/Downloads/Food-Delivery-main/Food-Delivery-main/backend/package.json)
- Add security dependencies: `helmet`, `express-rate-limit`, `hpp`, `express-mongo-sanitize`.

### Authentication Enhancements

#### [MODIFY] [userController.js](file:///c:/Users/anand/Downloads/Food-Delivery-main/Food-Delivery-main/backend/controllers/userController.js)
- Add `expiresIn: '7d'` to `jwt.sign` in `createToken` to prevent permanent tokens.

#### [MODIFY] [auth.js](file:///c:/Users/anand/Downloads/Food-Delivery-main/Food-Delivery-main/backend/middleware/auth.js)
- Change token retrieval to standard `Authorization: Bearer <token>` header.
- Assign decoded user ID to `req.user` instead of `req.body.userId`.

#### [NEW] [adminAuth.js](file:///c:/Users/anand/Downloads/Food-Delivery-main/Food-Delivery-main/backend/middleware/adminAuth.js)
- Create middleware to check for `admin` role specifically for administrative routes.

#### [MODIFY] All Routes (Orders, Food, Cart)
- Update routes to use the refined `auth.js` middleware and the new `adminAuth.js` where applicable.

---

## Verification Plan

### Automated Tests
- I'll use `run_command` with `curl` or simple scripts to verify:
    - Rate limiting triggers.
    - Security headers are present.
    - Forbidden routes return 401/403.

### Manual Verification
- Verify that users can still log in and register.
- Verify that admin functions still work with the new role-based check.
