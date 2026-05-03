# Implementation Plan: Bank Application Core & Ecosystem

This plan outlines the systematic implementation of the bank application features, moving from the foundational Domain-Driven Design (DDD) layer to the React SPA frontend.

## Goals
- Establish a robust, pure-PHP domain layer using OOP principles (Encapsulation, Inheritance, Polymorphism).
- Implement enterprise-grade banking services (Ledger, Loans, Transfers).
- Connect the React SPA to a versioned API layer.
- Ensure 100% compatibility with the Oracle 21c database.

## Phase 0: Domain Foundation (OOP Core)
The primary goal is to extract domain logic from Eloquent models into pure PHP classes.

### 0.1 Value Objects
- [ ] **Finish `Money`**: Ensure full immutability and `NUMBER(19,4)` rounding compatibility.
- [ ] **Finish `AccountNumber`**: Add checksum validation (e.g., Modulo 10/11).
- [ ] **New VOs**: Implement `InterestRate`, `LoanTerms`, `TransactionReference`, and `DateRange`.

### 0.2 Abstract Domain Entities
Create `app/Domain` structure:
- [ ] **`Account` (Abstract)**: Base class in `app/Domain/Account/`.
- [ ] **Subclasses**: `SavingsAccount`, `CheckingAccount`, `FixedDepositAccount`.
- [ ] **`AccountFactory`**: Use the `AccountType` enum to instantiate the correct domain subclass from an Eloquent model.

### 0.3 Polymorphic Transactions
- [ ] **`Transaction` Interface**: Define `execute()` and `reversible()`.
- [ ] **Implementations**: `TransferTransaction`, `DepositTransaction`, `LoanDisbursementTransaction`, etc.
- [ ] **`TransactionProcessor`**: A service that handles ledger posting for any `Transaction` type uniformly.

### 0.4 Capability Interfaces
- [ ] **Contracts**: Place `Reversible`, `InterestBearing`, `FeeCharging`, `Lockable`, `Auditable` in `app/Contracts/Domain/`.

### 0.5 Repository Contracts
- [ ] **Expand Repositories**: Complete the binding of `AccountRepositoryContract`, `TransactionRepositoryContract`, and `LoanRepositoryContract` in `RepositoryServiceProvider`.

---

## Phase 1: Core Banking Services
- [ ] **Ledger Engine**: Implement `LedgerService` with a strict double-entry system (DR/CR). ALL financial movements must pass through this service within an Oracle transaction.
- [ ] **TransferService**: Refactor existing service to use the new Domain entities and `TransactionProcessor`.
- [ ] **AccountService**: Implement the account opening state machine (Pending -> Active).

---

## Phase 2: Loan Engine
- [ ] **Loan Domain**: Implement `Loan` abstract class and subclasses (`Personal`, `Mortgage`, `Auto`).
- [ ] **Calculators**: Implement `InterestCalculator` strategies (Reducing Balance vs. Flat Rate).
- [ ] **Amortization**: Build the `AmortizationScheduleGenerator`.
- [ ] **Service**: Implement `apply()`, `approve()`, and `disburse()` logic.

---

## Phase 3: Payments & Scheduling
- [ ] **BillPaymentService**: Integrate with the `Biller` model.
- [ ] **ScheduledTransferService**: Implement the cron-based execution for recurring transfers.
- [ ] **CardPaymentService**: Implement PAN masking and tokenization logic.

---

## Phase 4: Auth, MFA, & Security
- [ ] **Sanctum**: Configure API token issuance.
- [ ] **MFA**: Integrate `google2fa` for sensitive actions (transfers, profile changes).
- [ ] **RBAC**: Wire `EnsureRole` middleware and define Laravel Policies for all entities.

---

## Phase 5: Notifications
- [ ] **Notification System**: Polymorphic channels (Email, SMS, In-App).
- [ ] **Queueing**: Ensure `SendNotificationJob` handles failures gracefully.

---

## Phase 6: API Layer
- [ ] **Versioning**: All routes under `v1/`.
- [ ] **Resources**: Standardize API responses using `ApiResource` and `RequestIdMiddleware`.
- [ ] **Documentation**: Annotate controllers for OpenAPI (Swagger).

---

## Phase 7 & 8: Admin Console & React SPA
- [ ] **Admin Panels**: User management, Audit viewing, and System Config.
- [ ] **Frontend Integration**: Map React pages in `resources/js/pages/` to the new API endpoints.
- [ ] **UX Polish**: Implement loading states, error boundaries, and WCAG AA compliance.

---

## Phase 9 & 10: Testing & Hardening
- [ ] **Testing**: Target 85% coverage with Pest (Unit) and Playwright (E2E).
- [ ] **Security**: TLS, encryption of sensitive columns (GOV_ID, PAN), and absolute session timeouts.

---

## Phase 11: Object-Oriented Banking System Completion
Ensure the system strictly adheres to the OOP paradigm (Abstraction, Encapsulation, Inheritance, Polymorphism) as defined in the functional requirements.

### 11.1 User & Role Domain Model
- [x] **`User` (Abstract)**: Base domain entity in `app/Domain/User/User.php`.
- [x] **Subclasses**: `Customer`, `Administrator`, `SuperAdministrator`, `Auditor`.
- [x] **`UserFactory`**: Resolves specialized domain user from model; supports `register()` plugin hook.
- [x] **Role-Based Logic**: `canManageSystem`, `canAuditSystem`, `canPerformTransaction`, `canOpenAccount`, `canApproveLoan`, `canReverseTransaction`, `canViewFinancialData`.

### 11.2 Transaction Integrity
- [x] **Immutability**: All transaction subclasses (`TransferTransaction`, `DepositTransaction`, `WithdrawalTransaction`, `BillPaymentTransaction`, `LoanDisbursementTransaction`) are `final readonly class`.
- [x] **Encapsulation**: Each financial movement constructs a unique transaction object whose state is frozen at construction.
- [x] **Persistence**: Transaction rows persist independently of account balance mutations (decoupled via `TransactionProcessor`).

### 11.3 Account Self-Management
- [x] **State Guards**: `guardActive`, `guardCanReceive`, `guardSufficientFunds`, `guardSameCurrency` — polymorphically overridable by subclasses (Checking overdraft, FixedDeposit lock-in).
- [x] **Abstraction**: `transfer()`, `depositIntent()`, `withdrawalIntent()`, `activate()`, `freeze()`, `close()`, `markDormant()` hide internal validation.

### 11.4 Core Feature: Money Transfer Logic
- [x] **Atomic Execution**: `TransactionProcessor::process` wraps ledger + balance updates in a single `DB::transaction` with row-level locks.
- [x] **Transfer Specialization**: `TransferTransaction` constructor rejects same-account, cross-currency, mismatched-amount, and zero-amount transfers.
- [x] **Immutability of History**: `final readonly class TransferTransaction` — asserted via `ReflectionClass::isReadOnly()`.
- [x] **Polymorphic Constraints**: `FixedDepositAccount::withdraw` applies early-liquidation penalty; `CheckingAccount::withdraw` honors overdraft — both engage transparently during a transfer.

### 11.5 Scalability & Extensibility
- [x] **Plugin Patterns**: `AccountFactory::register()` and `UserFactory::register()` accept closures for new account types or roles — Open/Closed without core edits.

---

## Phase 12: Feature Completeness & Ecosystem Expansion
Address unimplemented features to reach full "Modern Banking" parity.

### 12.1 KYC & Identity Verification
- [x] **Onboarding Engine**: `OnboardingEngine` with explicit steps (`profile → id_verification → address_proof → review`) driven by `KycStatus`.
- [x] **ID Verification**: `IdentityProviderContract` (BVN / NIN / Passport) with `MockIdentityProvider`; structured `IdentityVerificationResult` DTO.
- [x] **Multi-Device**: `DeviceManagementService` registers / lists / revokes `UserSession` rows; supports "revoke all except current" and known-device detection.

### 12.2 Advanced Card & Payment Ecosystem
- [x] **Virtual Cards**: `VirtualCardIssuer` mints Luhn-compliant PANs flagged `is_virtual=true, online_only=true`; persisted on new `cards` columns.
- [x] **Card Management**: `CardManagementService` for PIN set/verify/reset (3-strike auto-block), daily/monthly/single-tx limits, freeze/unfreeze, replacement requests.
- [x] **Simulation**: `AtmSimulator` and `PosSimulator` drive `WithdrawalTransaction` through `TransactionProcessor` with channel-scoped guards.

### 12.3 Wealth & Investment Features
- [x] **Goal-Based Savings**: `SavingsGoal` model (+ migration), `SavingsGoalService` for create/contribute/cancel with currency validation and auto "achieved" status.
- [x] **Investment Portfolio**: `InvestmentInstrument` + `InvestmentHolding` models; `InvestmentPortfolioService` handles buy/sell with weighted-average cost basis and `unrealizedPnl`.

### 12.4 Security & Fraud Prevention
- [x] **Advanced Security**: `OtpService` (SHA-256 hashed codes, configurable TTL / attempts, single-use consumption) backed by `otp_challenges` table.
- [x] **Biometric Support**: `BiometricAuthenticatorContract` + `StubBiometricAuthenticator` (WebAuthn-shaped begin/complete registration & assertion); `biometric_credentials` table.
- [x] **Fraud Detection**: `FraudDetectionService` with velocity, large-amount, and round-number-pattern rules; writes structured `fraud_flags`.

### 12.5 Admin & Backoffice (UI/UX)
- [x] **Admin Dashboard**: `UserApprovalService` orchestrates KYC + `UserStatus` transitions (approve / reject / suspend).
- [x] **Reporting**: `SpendAnalysisService` aggregates debits/credits and spending-by-type over a `DateRange`.
- [x] **Statement Generation**: `StatementService` computes opening/closing balances and produces CSV (`toCsv()` with proper quoting/escaping).

### 12.6 External Integrations
- [x] **Interbank Gateway**: `InterbankGatewayContract` (name enquiry / send / query-status) with `MockInterbankGateway`; `InterbankNameEnquiry`, `InterbankTransferRequest`, `InterbankTransferResponse` DTOs.
- [x] **Bill Payment Ecosystem**: `BillPaymentProviderContract` + `MockBillPaymentProvider` (idempotency via `idempotencyKey`, per-biller support set, token issuance for billers that require it).
- [x] **DI Wiring**: `Phase12ServiceProvider` binds all contracts to mock/stub implementations; registered in `bootstrap/providers.php`.

---

## Phase 13: UI/UX Completeness (Filling the Gaps)
Bring the frontend up to parity with the backend domain features.

### 13.1 KYC Onboarding Flow
- [x] **Implementation**: Built `resources/js/pages/banking/onboarding.tsx` multi-step component.
- [x] **Data Capture**: Integration of ID upload and BVN/NIN fields into the registration process.
- [x] **Workflow**: Implemented the state machine for KYC progress (Pending -> Verified) via `OnboardingController` + `OnboardingEngine`.

### 13.2 Card Management Portal
- [x] **Implementation**: Built `resources/js/pages/banking/cards/` (Index, Show).
- [x] **Features**: PIN management interface, Card freezing toggle, Spending limits, Virtual card issuance wizard, Replacement requests.

### 13.3 Financial Analytics & Statements
- [x] **Visualization**: Integrated Recharts in the Dashboard to show Spending Analysis (Income vs Expense bar chart, summary pills, 6-month monthly breakdown).
- [x] **Statement Page**: Built `resources/js/pages/banking/statements/index.tsx` with balance-trend area chart, spending-by-type donut, date-range filtering, and transaction ledger.
- [x] **CSV Export**: Implemented `StatementsController` with CSV download endpoint backed by `StatementService::toCsv()`.

---

## Phase 14: Advanced Security & Integrations
Harden the system and connect it to the real world.

### 14.1 WebAuthn (Biometrics)
- [x] **Passkeys**: Implemented WebAuthn support via `WebAuthnController` (API) and `PasskeysPageController` (Inertia). Full lifecycle: begin/complete registration, begin/verify authentication, list, and revoke. `StubBiometricAuthenticator` backs the ceremony for demo.
- [x] **Passkey UI**: Built `banking/security/passkeys.tsx` — register new passkeys with device naming, verify with biometric (grants MFA session), revoke, and view active/revoked list.
- [x] **MFA Hardening**: On successful passkey assertion, the `RequireMfa::SESSION_KEY` is stamped so biometric auth is equivalent to TOTP for all MFA-gated actions (high-value transfers, interbank, loan approvals).

### 14.2 External Integration Gateway
- [x] **Identity API**: Built `IdentityVerificationController` — generic adapter dispatches BVN/NIN/PASSPORT requests to the `IdentityProviderContract` (`MockIdentityProvider` in dev). Exposed on `POST /api/v1/identity/verify`.
- [x] **Payment Bridge**: Built `InterbankTransferController` (API) and `InterbankPageController` (Inertia page). End-to-end interbank cycle: name enquiry → MFA-gated send transfer → query status. Backed by `MockInterbankGateway`.
- [x] **Interbank UI**: Built `banking/transfers/interbank.tsx` — premium mobile UI with bank dropdown, real-time name enquiry with resolved-name badge, amount + narration, MFA-gated submission.
- [x] **Route Wiring**: All endpoints registered in both `web.php` (Inertia) and `api.php` (Sanctum API). Interbank sends are MFA-gated.

---

## Phase 15: Final Hardening & Verification
Infrastructure stabilization and final quality assurance.

### 15.1 Infrastructure Cleanup
- [x] **Database Optimization**: Created `database/oracle_index_optimization.sql` — 20+ optimized indexes for Oracle 21c covering `transactions` (source/dest compound + type/posted_at/amount), `ledger_entries` (reconciliation + balance reconstruction), `accounts`, `cards`, `loans`, `notifications`, `biometric_credentials`, and `otp_challenges`.
- [x] **Environment Audit**: Built `php artisan env:audit` command (`AuditEnvironment.php`) — comprehensive diagnostic that checks OCI8 extension, Oracle connectivity, table/index counts, environment variables, encrypted cast posture on sensitive models (Customer PII, Card PAN), and filesystem permissions.

### 15.2 Quality Assurance
- [x] **E2E Suite**: Implemented Playwright test suite with `playwright.config.ts` and 3 spec files:
  - `e2e/customer-transfers.spec.ts` — Customer flow: dashboard, analytics, transfers, interbank, accounts, cards, passkeys, notifications (8 tests).
  - `e2e/admin-approvals.spec.ts` — Admin flow: dashboard, users, accounts, loans, audit, RBAC boundaries (6 tests).
  - `e2e/security-audit.spec.ts` — Security: auth enforcement, API auth, CSRF, sensitive data non-disclosure, header checks (8 tests).
- [x] **Security Review**: Hardened sensitive data encryption:
  - `Customer` model: added `encrypted` casts for `gov_id_encrypted`, `phone`, `address`; `$hidden` for `gov_id_hash`, `gov_id_encrypted`.
  - `Card` model: added `encrypted` cast for `pan_token`; already has `$hidden` for `pan_token`, `pin_hash`.
  - `BiometricCredential` model: already has `$hidden` for `public_key`.
  - All protection verified by `env:audit` command.

---

## Phase 16: Final Security Audit & Hardening
Final pass to ensure the application meets top-tier banking security standards.

### 16.1 Data Privacy (At Rest)
- [x] **PII Encryption**: Implemented Laravel `encrypted` casts for `phone`, `address`, and `gov_id_encrypted` in `Customer` model; `pan_token` in `Card` model. Added `$hidden` arrays to prevent serialization of sensitive fields.
- [x] **Searchable Hashes**: Created `HasSearchableHashes` trait (`app/Concerns/HasSearchableHashes.php`) — auto-populates HMAC-SHA256 hash columns on save (keyed to APP_KEY). Provides `scopeWhereHash()` for exact-match queries on encrypted columns. Applied to `Customer` with `phone_hash` mapping.

### 16.2 Rate Limiting & Throttling
- [x] **Financial Throttling**: Built `FinancialRateLimiter` middleware with tier-based limits: transfers (10/min), interbank (5/min), payments (15/min), login (5/min). Returns 429 with `Retry-After` and `X-RateLimit-*` headers. Applied to `transfers.store`, `payments.bill`, `payments.airtime`, and `interbank.store` routes.
- [x] **Login Hardening**: User model already has `incrementFailedLoginAttempts()` with configurable threshold (default 5) and 30-minute auto-lock via `UserStatus::LOCKED`.

### 16.3 Infrastructure & Headers
- [x] **Secure Headers**: Built `SecureHeaders` middleware — global on all web requests. Adds CSP (`frame-ancestors 'none'`, `form-action 'self'`), HSTS (1yr + preload), X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy (camera/mic/geo disabled), X-XSS-Protection. Strips Server/X-Powered-By.
- [x] **Session Security**: Built `SessionSecurity` middleware — enforces 8-hour absolute session timeout, concurrent session limit (max 3, revokes oldest), IP change logging, and auto-tracks `UserSession` records.

### 16.4 Fraud Detection Heuristics
- [x] **Velocity Checks**: Already implemented in `FraudDetectionService` — velocity (10+ txs in 5min), large-amount (>₦1M), round-number pattern (structuring detection). Auto-records to `fraud_flags` table.
- [x] **Geo-Fencing**: Built `GeoFencingService` — 4 heuristics: new IP detection (+25 risk), impossible travel via subnet comparison within 30min (+50 risk), unusual-hour login (+15 risk), login burst 5+/hr (+20 risk). Returns 0-100 risk score; auto-logs to `audit_logs` when score ≥60.

---

## Phase 17: Dashboard UI Overhaul (Premium Mobile Style)
Recreate the high-fidelity, premium mobile banking interface based on the reference screenshot and requirements.

### 17.1 Design System & Layout
- [x] **Theme Foundation**: 
    - Added Phase 17 premium design tokens in `app.css`: `bg-premium-gradient` (purple 3-stop gradient), `glass-card` (backdrop-blur glassmorphism), `text-gradient-primary`, and custom keyframe animations (`shimmer`, `float`, `pulse-glow`).
    - Background: `#000000` (body), Cards: glass-card with `rgba(26,26,26,0.6)`.
    - Primary: `#7C3AED` (Purple) with gradient variants.
- [x] **Dashboard Layout**: 
    - Mobile-centered container (`max-w-md mx-auto`) via `DashboardLayout`.
    - Fixed Bottom Navigation bar with glassmorphism blur (`backdrop-blur-2xl`).
    - `no-scrollbar` CSS for horizontal card carousel.

### 17.2 Header & Hero Section
- [x] **Profile Section**: 
    - Time-based greeting ("Good morning/afternoon/evening, [Name]") using `getGreeting()` helper.
    - Profile avatar with animated glow (`animate-pulse-glow`).
    - Notification bell linking to `/banking/notifications` with unread badge.
    - Help/Security icon linking to `/banking/security/passkeys`.
- [x] **Balance Card**:
    - Premium purple gradient background (`bg-premium-gradient`).
    - Total Balance (Formatted ₦ via `Intl.NumberFormat`).
    - Eye-toggle for balance visibility with smooth transition.
    - Yesterday's earnings indicator (+₦ green badge).
    - "Top Up" and "Transfer" buttons with proper navigation links.
    - 3 animated decorative orbs (`animate-shimmer`, `animate-float`, `blur`).

### 17.3 Navigation & Service Grids
- [x] **Action Grid (Upper)**:
    - 4 interactive cards: `To Bank` → `/banking/transfers`, `Interbank` → `/banking/interbank`, `Wealth` → `/banking/accounts`, `Reward` → `/banking/cards`.
    - Gradient backgrounds with hover lift effect (`group-hover:-translate-y-1`).
- [x] **Services Grid (Lower)**:
    - 5-column icon grid: `Airtime`, `Data`, `Betting`, `Internet`, `Electricity`.
    - All navigable via `<Link>` to `/banking/payments`.
    - Hover: scale + lift + color transition.
- [x] **Transaction History**:
    - "Recent Activity" list with "See All" link with chevron icon.
    - Direction-aware icons (Send for debit, Banknote for credit).
    - Empty state with card icon and descriptive text.

### 17.4 Bottom Navigation
- [x] **Persistent Menu**:
    - `Home`, `Cards`, `Payments`, `Me` — already in `DashboardLayout`.
    - Active state: purple glow + dot indicator + bold icon.
    - Glassmorphism blur pill (`backdrop-blur-2xl`).

---

## Phase 18: Responsive Design (Mobile & Desktop)
**Goal:** Ensure the high-fidelity UI scales gracefully from mobile to large desktop screens, eliminating the rigid `max-w-md` constraints on larger viewports.

- [x] **Layout Architecture:**
  - Update `DashboardLayout` to utilize flexible constraints (`max-w-md` on mobile, expanding to `max-w-4xl` or `max-w-6xl` on desktop).
  - Convert bottom navigation to a sticky side navigation bar on desktop viewports.
- [x] **Dashboard Refactoring:**
  - Transition single-column grids (Actions, Accounts, Savings Goals) into responsive multi-column layouts using Tailwind breakpoints (e.g., `grid-cols-2md:grid-cols-4`).
- [x] **Nested Views Optimization:**
  - Ensure complex views like `statements/index.tsx` scale charts horizontally and use available space for data tables.
  - Center and scale forms (e.g., Transfers, Payments) cleanly on large screens without losing the glassmorphism premium feel.

---

## Phase 20: Stability & Oracle Optimization
**Goal:** Address persistent OCI8/Oracle driver limitations regarding CLOB handling and atomic balance commits to ensure 100% reliability in financial state transitions, following pure OOP paradigms.

- [x] **OCI8 CLOB Persistence Fix**:
  - Standardize `TransactionRepository` to handle Oracle-specific CLOB binding issues using explicit attribute setting and sequence-safe `save()` methods, avoiding `ORA-00932`.
- [x] **Domain Layer Refinement**:
  - Atomic balance updates enforced via a single `final protected adjustBalances(string $delta)` choke-point on `Domain/Account`. `deposit`, `withdraw`, and `CheckingAccount::withdraw` (overdraft path) all route through it — subclasses can no longer skew `balance` vs `available_balance` independently.
  - `TransferTransaction::execute()` no longer instantiates `new TransactionModel()`. It now calls `TransactionRepositoryContract::build()` — a new contract method that returns an unsaved, Oracle-safe model with explicit `narration` / `metadata` hydration. Persistence remains atomic via `TransactionProcessor`'s `DB::transaction`.
- [x] **Reactive UI Synchronization**:
  - Global toast provider active via the root `<Toaster>` in `app.tsx`, whose `useFlashToast` hook now surfaces both the structured `flash.toast` shape and the flat `flash.success` / `flash.error` strings used by every controller — dedup guarded by `useRef` so re-renders don't spam.
  - Dashboard's `spendAnalytics` prop is now a lazy closure in `DashboardController`; a "Refresh" control on the Analytics section calls `router.reload({ only: ['spendAnalytics'], preserveState: true })` for instant partial reloads without a full page fetch.

---

## Phase 21: Bill Payment Stability & Balance Reduction
**Goal:** Resolve the `ORA-01400` error blocking bill payments due to null `CHANNEL` values and ensure immediate balance deduction from the main account.

- [ ] **Transaction Channel Enforcement**:
    - [ ] Update `BillPaymentService.php` to provide a default `'web'` or `'mobile'` channel if not explicitly passed in the request data, preventing null insertion into the `TRANSACTIONS` table.
    - [ ] Update `BillPaymentTransaction.php` domain entity to enforce a non-null channel value during construction or execution.
- [ ] **Atomic Balance Reduction**:
    - [ ] Verify `BillPaymentTransaction::execute()` correctly calls `withdraw()` on the source account and persists the change to the `ACCOUNTS` table within the same database transaction.
    - [ ] Ensure the selected "Source Account" in the UI correctly maps to the user's primary/main account for bill payments.
- [ ] **Validation & Logging**:
    - [ ] Add explicit validation to ensure the source account has sufficient funds before initiating the bill payment external request.


---

## Phase 23: UI Fixes & Premium Auth Styling
**Goal:** Resolve deployment configuration issues on Vercel and apply the premium design system to the authentication flow.

- [ ] **Deployment Stabilization**:
    - [ ] Consolidate `vercel.json` and ensure it correctly builds the `frontend` subdirectory and serves from `dist`.
    - [ ] Fix asset resolution issues in the deployed environment.
- [ ] **Premium Auth UI**:
    - [ ] Update `AuthSimpleLayout` with vibrant background glows and enhanced glassmorphism.
    - [ ] Apply `bg-premium-gradient` and modern typography to `Login` and `Register` pages.
    - [ ] Implement subtle micro-animations for interactive elements.

## Verification Plan

### Automated Tests
- `php artisan test` (Focus on `TransferServiceTest`)
- `npx playwright test` (Verify balance reduction flow)

### Manual Verification
- Execute internal transfer and verify `ACCOUNTS` table `BALANCE` column via Tinker.
- Audit `LEDGER_ENTRIES` to ensure double-entry integrity (DR/CR equality).
- Verify mobile responsiveness on simulated iOS Safari.
