# Bank App - Oracle Database Setup Instructions

This document provides step-by-step instructions to set up your Oracle database for the bank application using Oracle SQL Developer.

## Prerequisites

- Oracle Database running on `127.0.0.1:1521`
- Oracle SQL Developer installed
- Database user `bank` with password `111111`
- SID: `xe`

## Connection Details

```
Host: 127.0.0.1
Port: 1521
SID: xe
Username: bank
Password: secret
```

## Setup Steps

### Step 1: Connect to Oracle Database

1. Open **Oracle SQL Developer**
2. Click **File** → **New** → **Database Connection**
3. Fill in the connection details:
   - **Connection Name**: `BankApp`
   - **Username**: `bank`
   - **Password**: `secret`
   - **Connection Type**: `Basic`
   - **Hostname**: `127.0.0.1`
   - **Port**: `1521`
   - **SID**: `xe`
4. Click **Test** to verify the connection
5. Click **Save**
6. Double-click the connection to connect

### Step 2: Run Main Migration Script

1. In Oracle SQL Developer, go to **File** → **Open**
2. Navigate to and select **`bank_app_oracle_migration.sql`**
3. The file will open in the editor window
4. Click **Execute** (the green Run button) or press **F5**
5. Watch the Output panel for completion message
6. You should see: `Script completed successfully!` or similar

**⏱️ Note**: This may take 1-2 minutes as it creates all tables with foreign keys and constraints.

### Step 3: Verify Tables Were Created

Run this query to verify all tables were created:

```sql
SELECT table_name 
FROM user_tables 
ORDER BY table_name;
```

You should see tables like:
- `ACCOUNTS`
- `AUDIT_LOGS`
- `BILLERS`
- `BRANCHES`
- `CACHE`
- `CARDS`
- `CURRENCIES`
- `CUSTOMERS`
- `FAILED_JOBS`
- `FAQS`
- `FEE_SCHEDULES`
- `INTEREST_RATE_CONFIGS`
- `JOB_BATCHES`
- `JOBS`
- `LEDGER_ENTRIES`
- `LOAN_INSTALLMENTS`
- `LOANS`
- `MIGRATIONS`
- `NOTIFICATIONS`
- `NOTIFICATION_PREFERENCES`
- `PAYMENTS`
- `PERMISSIONS`
- `ROLES`
- `SCHEDULED_TRANSFERS`
- `SESSIONS`
- `SUPPORT_TICKETS`
- `SYSTEM_CONFIGS`
- `TRANSACTIONS`
- `USERS`
- `USER_ROLES`
- `USER_SESSIONS`
- `PASSWORD_RESET_TOKENS`

### Step 4: Run Seed Data Script (Optional but Recommended)

1. Go to **File** → **Open**
2. Select **`bank_app_seed_data.sql`**
3. Click **Execute** (F5)
4. Wait for completion

This will populate reference data like:
- Currencies (NGN, USD, EUR, GBP)
- Roles (admin, manager, teller, customer, loan_officer)
- Permissions (user management, transactions, loans, etc.)
- Interest rate configurations
- Fee schedules
- System configurations
- FAQs
- Billers

### Step 5: Verify Seed Data (Optional)

Run these queries to confirm data was inserted:

```sql
-- Check currencies
SELECT * FROM currencies;

-- Check roles
SELECT * FROM roles;

-- Check permissions
SELECT * FROM permissions;

-- Check billers
SELECT * FROM billers;
```

## Script Files

Two SQL scripts are provided in your project root:

### 1. `bank_app_oracle_migration.sql` (Main Schema)
- Creates all 27 database tables
- Establishes foreign key relationships
- Creates indexes for performance
- Records migration history

**Tables created:**
- User & Authentication (users, customers, roles, permissions, sessions)
- Banking Structure (branches, accounts)
- Transactions (transactions, ledger_entries, scheduled_transfers)
- Loans (loans, loan_installments)
- Payments (payments, billers, cards)
- Notifications & Audit (notifications, audit_logs)
- Reference Data (currencies, interest_rates, fees, system_configs, faqs)
- Jobs & Queue (jobs, job_batches, failed_jobs)

### 2. `bank_app_seed_data.sql` (Reference Data)
- Inserts 4 currencies
- Inserts 5 roles
- Inserts 15 permissions
- Inserts 3 interest rate configurations
- Inserts 5 fee schedules
- Inserts 9 system configurations
- Inserts 5 FAQs
- Inserts 6 billers

## Troubleshooting

### Error: "User lacks CREATE TABLE privilege"
- Ensure the `bank` user has CREATE TABLE permission
- Ask your Oracle DBA to grant: `GRANT CREATE TABLE TO bank;`

### Error: "ORA-01031: insufficient privileges"
- The `bank` user may not have required permissions
- Required privileges: CREATE TABLE, CREATE INDEX, CREATE SEQUENCE

### Error: "ORA-00955: name is already used by an existing object"
- Tables may already exist from a previous attempt
- Run this to drop all tables first:
  ```sql
  BEGIN
    FOR c IN (SELECT table_name FROM user_tables) LOOP
      EXECUTE IMMEDIATE 'DROP TABLE ' || c.table_name || ' CASCADE CONSTRAINTS';
    END LOOP;
  END;
  /
  ```

### Tables not showing up after execution
- Refresh the schema: Right-click on the connection → **Refresh**
- Or disconnect and reconnect

## Next Steps

Once your database is set up:

1. **Update Laravel Configuration** (if not already done):
   ```php
   // config/database.php - oracle connection
   'oracle' => [
       'driver' => 'oracle',
       'host' => env('DB_HOST', '127.0.0.1'),
       'port' => env('DB_PORT', '1521'),
       'database' => env('DB_DATABASE', 'xe'),
       'service_name' => env('DB_SERVICE_NAME', 'xe'),
       'username' => env('DB_USERNAME', 'bank'),
       'password' => env('DB_PASSWORD', 'secret'),
       'charset' => env('DB_CHARSET', 'AL32UTF8'),
       'edition' => env('DB_EDITION', 'ora$base'),
   ]
   ```

2. **Update .env file**:
   ```env
   DB_CONNECTION=oracle
   DB_HOST=127.0.0.1
   DB_PORT=1521
   DB_DATABASE=xe
   DB_SERVICE_NAME=xe
   DB_USERNAME=bank
   DB_PASSWORD=secret
   ```

3. **Test the connection** from your Laravel application

4. **Start developing** your banking application!

## Database Schema Summary

The database implements:

✅ **Double-Entry Bookkeeping** - All transactions create debit/credit ledger entries
✅ **Role-Based Access Control (RBAC)** - Users assigned roles with specific permissions
✅ **KYC Verification** - Customer Know-Your-Customer compliance tracking
✅ **Two-Factor Authentication** - User account security
✅ **Audit Logging** - Track all user actions
✅ **Loan Management** - Loan applications, approvals, disbursements, installments
✅ **Account Types** - Savings, Checking, Fixed Deposit accounts with different rules
✅ **Transaction Controls** - Daily limits, per-transaction limits, reversals
✅ **Bill Payments** - Scheduled and recurring payment support
✅ **Job Queues** - Background job processing

## Questions or Issues?

If you encounter any issues:

1. Check the Output panel in SQL Developer for error messages
2. Verify Oracle is running: `sqlplus bank/secret@xe`
3. Confirm database user has correct privileges
4. Check your .env file matches Oracle connection details

---

**Setup Complete!** Your bank application database is ready for development. 🎉
