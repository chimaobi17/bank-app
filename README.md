# ApexBank 🏦

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/chimaobi17/bank-app)

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Inertia](https://img.shields.io/badge/Inertia.js-3.x-9553E9?style=flat-square)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Oracle](https://img.shields.io/badge/Oracle-21c-F80000?style=flat-square&logo=oracle)](https://www.oracle.com/database/)

**ApexBank** is a premium, enterprise-grade private treasury banking application. It is engineered with a strict Domain-Driven Design (DDD) philosophy, a robust double-entry ledger engine, and a high-fidelity mobile-first user interface.

Built for scale and security, ApexBank leverages the power of **Laravel 13**, **React 19**, and **Oracle 21c** to deliver a seamless and secure financial experience.

> [!TIP]
> This repository is optimized for a **Decoupled Architecture**: The Backend API is deployed to **Render** and the Frontend SPA is deployed to **Vercel**.

---

## ✨ Key Features

### 💎 Core Banking Engine
- **Pure PHP Domain Layer**: Business logic decoupled from Eloquent models using specialized Value Objects and Entities.
- **Double-Entry Ledger**: A strict DR/CR system ensuring 100% financial integrity for all transactions.
- **Polymorphic Account Hierarchy**: Support for Savings, Checking, and Fixed Deposit accounts with unique behaviors (overdrafts, liquidation penalties, etc.).
- **Atomic Transactions**: All financial movements are processed via a centralized `TransactionProcessor` within database transactions with row-level locking.

### 🛡️ Security & Fraud Prevention
- **WebAuthn (Passkeys)**: Native biometric authentication support for high-value actions and MFA.
- **Advanced MFA**: TOTP-based multi-factor authentication (Google Authenticator) integrated into the core flow.
- **PII Encryption**: Sensitive customer data (BVN, NIN, Address) is encrypted at rest using Laravel's `encrypted` casts.
- **Searchable Hashes**: HMAC-SHA256 oblivious indexing for fast, secure lookups on encrypted PII.
- **Fraud Detection**: Real-time heuristics identifying velocity spikes, impossible travel (geo-fencing), and unusual login patterns.
- **Hardened Middleware**: Global secure headers (CSP, HSTS, X-Frame-Options) and session hijacking protection.

### 📱 Premium User Experience
- **Executive Dashboard**: A stunning, glassmorphic mobile interface with real-time portfolio analytics.
- **Financial Intelligence**: Spending analysis, income vs. expense visualization (Recharts), and balance trend tracking.
- **Seamless Transfers**: End-to-end internal and interbank transfer flows with real-time name enquiry.
- **Digital Ecosystem**: Virtual card issuance, bill payments (Airtime, Data, Utilities), and savings goals.
- **KYC Onboarding**: A systematic multi-step verification engine for profile and identity validation.

### 🏛️ Backoffice & Analytics
- **Admin Console**: Unified portal for KYC approvals, loan management, and system configuration.
- **Audit Trails**: Immutable ledger entries and detailed system activity logs for compliance.
- **Financial Reporting**: Automated statement generation with CSV export capabilities.

---

## 🛠️ Tech Stack

- **Backend**: [Laravel 13](https://laravel.com) (PHP 8.3+)
- **Frontend**: [React 19](https://react.dev) with [Inertia.js 3.0](https://inertiajs.com)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com) & Vanilla CSS for premium micro-interactions.
- **Database**: [Oracle 21c](https://www.oracle.com/database/) (via OCI8/Yajra)
- **State Management**: [Inertia.js](https://inertiajs.com) + React Hooks
- **Testing**: [Pest 4.0](https://pestphp.com) (Unit/Feature) & [Playwright](https://playwright.dev) (E2E)
- **Infrastructure**: [Podman](https://podman.io) for Oracle container orchestration.

---

## 🚀 Getting Started

### Prerequisites
- PHP 8.3 or Higher
- Node.js 20+ & NPM
- Podman (for Oracle 21c database)
- [OCI8 Extension](https://www.php.net/manual/en/book.oci8.php)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/chimaobi17/bank-app.git
   cd bank-app
   ```

2. **Backend Setup**
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Environment**
   Set up your Oracle instance (see `ORACLE_SETUP_INSTRUCTIONS.md` for detailed Podman steps). Update your `.env` with the Oracle credentials.

4. **Migrations & Seeding**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

5. **Frontend Setup**
   ```bash
   npm install
   npm run build
   ```

6. **Run Development Server**
   ```bash
   # Start the all-in-one dev command (Vite + PHP + Queue)
   composer dev
   ```

---

## 🧪 Quality Assurance

We maintain high standards through rigorous automated testing:

```bash
# Run PHP Unit/Feature tests
php artisan test

# Run End-to-End browser tests (Playwright)
npx playwright test

# Run Environment Audit (Security & Connection Check)
php artisan env:audit
```

---

## 📐 Architecture

The project follows a **Domain-Driven Design** approach:
- `app/Domain`: Contains pure business logic, Value Objects, and Domain Entities.
- `app/Services`: Orchestration layer connecting domain logic to persistence.
- `app/Http/Resources`: Standardized API responses with `ApiResource`.
- `resources/js/pages`: React components mapped to Inertia routes.

---

## 📄 License
This project is private and proprietary. All rights reserved.
