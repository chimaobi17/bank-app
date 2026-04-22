-- Bank App Oracle Database Migration Script
-- Execute this script in Oracle SQL Developer or SQL*Plus
-- Order: CREATE tables respecting foreign key dependencies, then CREATE indexes

-- ============================================================================
-- 1. BASE TABLES (NO DEPENDENCIES)
-- ============================================================================

CREATE TABLE currencies (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    code VARCHAR2(3) UNIQUE NOT NULL,
    name VARCHAR2(100) NOT NULL,
    symbol VARCHAR2(5) NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL
);

CREATE TABLE password_reset_tokens (
    email VARCHAR2(255) PRIMARY KEY,
    token VARCHAR2(255) NOT NULL,
    created_at TIMESTAMP NULL
);

CREATE TABLE cache (
    key VARCHAR2(255) PRIMARY KEY,
    value CLOB NOT NULL,
    expiration NUMBER(10) NOT NULL
);

CREATE INDEX idx_cache_expiration ON cache(expiration);

CREATE TABLE cache_locks (
    key VARCHAR2(255) PRIMARY KEY,
    owner VARCHAR2(255) NOT NULL,
    expiration NUMBER(10) NOT NULL
);

CREATE INDEX idx_cache_locks_expiration ON cache_locks(expiration);

-- ============================================================================
-- 2. CUSTOMER & USER MANAGEMENT
-- ============================================================================

CREATE TABLE customers (
    customer_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    full_name VARCHAR2(255) NOT NULL,
    dob DATE NOT NULL,
    nationality VARCHAR2(100) DEFAULT 'Nigerian' NOT NULL,
    gov_id_hash VARCHAR2(255) UNIQUE NOT NULL,
    gov_id_encrypted CLOB,
    email VARCHAR2(255) UNIQUE NOT NULL,
    phone VARCHAR2(20) UNIQUE NOT NULL,
    address CLOB NOT NULL,
    kyc_status VARCHAR2(20) DEFAULT 'not_started' NOT NULL,
    kyc_doc_id_path VARCHAR2(255),
    kyc_doc_address_path VARCHAR2(255),
    kyc_verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE users (
    user_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    customer_id NUMBER,
    username VARCHAR2(255) UNIQUE NOT NULL,
    email VARCHAR2(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP,
    phone VARCHAR2(20),
    phone_verified_at TIMESTAMP,
    password VARCHAR2(255) NOT NULL,
    status VARCHAR2(20) DEFAULT 'active' NOT NULL,
    failed_login_attempts NUMBER(5) DEFAULT 0 NOT NULL,
    locked_until TIMESTAMP,
    remember_token VARCHAR2(100),
    two_factor_secret CLOB,
    two_factor_recovery_codes CLOB,
    two_factor_confirmed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_users_customer_id FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id) ON DELETE SET NULL
);

CREATE TABLE roles (
    role_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    role_name VARCHAR2(50) UNIQUE NOT NULL,
    description VARCHAR2(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE permissions (
    permission_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    permission_name VARCHAR2(100) UNIQUE NOT NULL,
    description VARCHAR2(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE user_roles (
    user_id NUMBER NOT NULL,
    role_id NUMBER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user_id FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role_id FOREIGN KEY (role_id)
        REFERENCES roles(role_id) ON DELETE CASCADE
);

CREATE TABLE role_permissions (
    role_id NUMBER NOT NULL,
    permission_id NUMBER NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_role_permissions_role_id FOREIGN KEY (role_id)
        REFERENCES roles(role_id) ON DELETE CASCADE,
    CONSTRAINT fk_role_permissions_permission_id FOREIGN KEY (permission_id)
        REFERENCES permissions(permission_id) ON DELETE CASCADE
);

CREATE TABLE user_sessions (
    session_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    user_id NUMBER NOT NULL,
    device VARCHAR2(255),
    ip_address VARCHAR2(45),
    user_agent CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_seen_at TIMESTAMP,
    revoked_at TIMESTAMP,
    CONSTRAINT fk_user_sessions_user_id FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE sessions (
    id VARCHAR2(255) PRIMARY KEY,
    user_id NUMBER,
    ip_address VARCHAR2(45),
    user_agent CLOB,
    payload CLOB NOT NULL,
    last_activity NUMBER(10) NOT NULL
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_last_activity ON sessions(last_activity);

-- ============================================================================
-- 3. BANKING STRUCTURE (BRANCHES & ACCOUNTS)
-- ============================================================================

CREATE TABLE branches (
    branch_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    branch_code VARCHAR2(10) UNIQUE NOT NULL,
    name VARCHAR2(255) NOT NULL,
    address CLOB NOT NULL,
    city VARCHAR2(100),
    state VARCHAR2(100),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    phone VARCHAR2(20),
    manager_user_id NUMBER,
    operating_hours VARCHAR2(255),
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_branches_manager_user_id FOREIGN KEY (manager_user_id)
        REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE accounts (
    account_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    account_number VARCHAR2(10) UNIQUE NOT NULL,
    customer_id NUMBER NOT NULL,
    account_type VARCHAR2(20) NOT NULL,
    balance DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    available_balance DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    currency VARCHAR2(3) DEFAULT 'NGN' NOT NULL,
    status VARCHAR2(20) DEFAULT 'pending' NOT NULL,
    branch_id NUMBER,
    interest_rate DECIMAL(5, 4),
    daily_transfer_limit DECIMAL(19, 4) DEFAULT 1000000 NOT NULL,
    per_transaction_limit DECIMAL(19, 4) DEFAULT 500000 NOT NULL,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    closed_at TIMESTAMP,
    lock_in_months NUMBER(10),
    maturity_date TIMESTAMP,
    early_liquidation_penalty DECIMAL(5, 4),
    overdraft_limit DECIMAL(19, 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_accounts_customer_id FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id),
    CONSTRAINT fk_accounts_branch_id FOREIGN KEY (branch_id)
        REFERENCES branches(branch_id) ON DELETE SET NULL
);

CREATE INDEX idx_accounts_customer_status ON accounts(customer_id, status);

-- ============================================================================
-- 4. TRANSACTIONS & LEDGER (DOUBLE-ENTRY BOOKKEEPING)
-- ============================================================================

CREATE TABLE transactions (
    transaction_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    reference VARCHAR2(30) UNIQUE NOT NULL,
    type VARCHAR2(30) NOT NULL,
    amount DECIMAL(19, 4) NOT NULL,
    currency VARCHAR2(3) DEFAULT 'NGN' NOT NULL,
    source_account_id NUMBER,
    dest_account_id NUMBER,
    status VARCHAR2(20) DEFAULT 'pending' NOT NULL,
    narration CLOB,
    channel VARCHAR2(20) DEFAULT 'web' NOT NULL,
    initiated_by NUMBER,
    initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    posted_at TIMESTAMP,
    is_reversible NUMBER(1) DEFAULT 1 NOT NULL,
    reversed_by_id NUMBER,
    metadata CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_transactions_source_account FOREIGN KEY (source_account_id)
        REFERENCES accounts(account_id) ON DELETE SET NULL,
    CONSTRAINT fk_transactions_dest_account FOREIGN KEY (dest_account_id)
        REFERENCES accounts(account_id) ON DELETE SET NULL,
    CONSTRAINT fk_transactions_initiated_by FOREIGN KEY (initiated_by)
        REFERENCES users(user_id) ON DELETE SET NULL,
    CONSTRAINT fk_transactions_reversed_by FOREIGN KEY (reversed_by_id)
        REFERENCES transactions(transaction_id) ON DELETE SET NULL
);

CREATE INDEX idx_transactions_source_posted ON transactions(source_account_id, posted_at);
CREATE INDEX idx_transactions_dest_posted ON transactions(dest_account_id, posted_at);

CREATE TABLE ledger_entries (
    entry_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    transaction_id NUMBER NOT NULL,
    account_id NUMBER NOT NULL,
    direction VARCHAR2(2) NOT NULL,
    amount DECIMAL(19, 4) NOT NULL,
    balance_after DECIMAL(19, 4) NOT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_ledger_transaction FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id),
    CONSTRAINT fk_ledger_account FOREIGN KEY (account_id)
        REFERENCES accounts(account_id)
);

CREATE INDEX idx_ledger_account_posted ON ledger_entries(account_id, posted_at);

CREATE TABLE scheduled_transfers (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    user_id NUMBER NOT NULL,
    source_account_id NUMBER NOT NULL,
    dest_account_id NUMBER,
    external_bank_name VARCHAR2(255),
    external_account_number VARCHAR2(255),
    amount DECIMAL(19, 4) NOT NULL,
    currency VARCHAR2(3) DEFAULT 'NGN' NOT NULL,
    narration CLOB,
    frequency VARCHAR2(20) NOT NULL,
    next_run_date DATE NOT NULL,
    end_date DATE,
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    last_run_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_scheduled_transfers_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_scheduled_transfers_source FOREIGN KEY (source_account_id)
        REFERENCES accounts(account_id),
    CONSTRAINT fk_scheduled_transfers_dest FOREIGN KEY (dest_account_id)
        REFERENCES accounts(account_id) ON DELETE SET NULL
);

-- ============================================================================
-- 5. LOANS & INSTALLMENTS
-- ============================================================================

CREATE TABLE loans (
    loan_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    customer_id NUMBER NOT NULL,
    product VARCHAR2(20) NOT NULL,
    principal DECIMAL(19, 4) NOT NULL,
    interest_rate DECIMAL(5, 4) NOT NULL,
    tenor_months NUMBER(10) NOT NULL,
    status VARCHAR2(20) DEFAULT 'draft' NOT NULL,
    purpose CLOB,
    monthly_income DECIMAL(19, 4),
    collateral_doc_path VARCHAR2(255),
    income_proof_path VARCHAR2(255),
    approved_by NUMBER,
    approved_at TIMESTAMP,
    disbursed_account_id NUMBER,
    disbursed_at TIMESTAMP,
    outstanding_balance DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    total_interest DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    total_paid DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    late_fee_rate DECIMAL(5, 4) DEFAULT 0.0100 NOT NULL,
    closed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_loans_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id),
    CONSTRAINT fk_loans_approved_by FOREIGN KEY (approved_by)
        REFERENCES users(user_id) ON DELETE SET NULL,
    CONSTRAINT fk_loans_disbursed_account FOREIGN KEY (disbursed_account_id)
        REFERENCES accounts(account_id) ON DELETE SET NULL
);

CREATE TABLE loan_installments (
    installment_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    loan_id NUMBER NOT NULL,
    sequence NUMBER(10) NOT NULL,
    due_date DATE NOT NULL,
    principal_due DECIMAL(19, 4) NOT NULL,
    interest_due DECIMAL(19, 4) NOT NULL,
    total_due DECIMAL(19, 4) NOT NULL,
    paid_amount DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    late_fee DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    status VARCHAR2(20) DEFAULT 'upcoming' NOT NULL,
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_installments_loan FOREIGN KEY (loan_id)
        REFERENCES loans(loan_id) ON DELETE CASCADE,
    CONSTRAINT uq_loan_sequence UNIQUE (loan_id, sequence)
);

-- ============================================================================
-- 6. BILLING & PAYMENTS
-- ============================================================================

CREATE TABLE billers (
    biller_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    code VARCHAR2(20) UNIQUE NOT NULL,
    category VARCHAR2(50) NOT NULL,
    logo_path VARCHAR2(255),
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE payments (
    payment_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    customer_id NUMBER NOT NULL,
    account_id NUMBER NOT NULL,
    biller_id NUMBER,
    payment_type VARCHAR2(30) NOT NULL,
    amount DECIMAL(19, 4) NOT NULL,
    currency VARCHAR2(3) DEFAULT 'NGN' NOT NULL,
    status VARCHAR2(20) DEFAULT 'pending' NOT NULL,
    recipient_identifier VARCHAR2(255),
    narration CLOB,
    transaction_id NUMBER,
    scheduled_for TIMESTAMP,
    frequency VARCHAR2(20),
    is_recurring NUMBER(1) DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_payments_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id),
    CONSTRAINT fk_payments_account FOREIGN KEY (account_id)
        REFERENCES accounts(account_id),
    CONSTRAINT fk_payments_biller FOREIGN KEY (biller_id)
        REFERENCES billers(biller_id) ON DELETE SET NULL,
    CONSTRAINT fk_payments_transaction FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id) ON DELETE SET NULL
);

CREATE TABLE cards (
    card_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    account_id NUMBER NOT NULL,
    pan_token VARCHAR2(255) NOT NULL,
    masked_pan VARCHAR2(19) NOT NULL,
    card_type VARCHAR2(20) DEFAULT 'debit' NOT NULL,
    brand VARCHAR2(20) DEFAULT 'visa' NOT NULL,
    expiry DATE NOT NULL,
    status VARCHAR2(20) DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_cards_account FOREIGN KEY (account_id)
        REFERENCES accounts(account_id)
);

-- ============================================================================
-- 7. NOTIFICATIONS & PREFERENCES
-- ============================================================================

CREATE TABLE notifications (
    notification_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    user_id NUMBER NOT NULL,
    channel VARCHAR2(10) NOT NULL,
    category VARCHAR2(50) DEFAULT 'transaction' NOT NULL,
    subject VARCHAR2(255) NOT NULL,
    body CLOB NOT NULL,
    status VARCHAR2(20) DEFAULT 'pending' NOT NULL,
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE notification_preferences (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    user_id NUMBER NOT NULL,
    category VARCHAR2(50) NOT NULL,
    email_enabled NUMBER(1) DEFAULT 1 NOT NULL,
    sms_enabled NUMBER(1) DEFAULT 1 NOT NULL,
    in_app_enabled NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_notif_prefs_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT uq_user_category UNIQUE (user_id, category)
);

-- ============================================================================
-- 8. AUDIT LOGGING
-- ============================================================================

CREATE TABLE audit_logs (
    log_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    actor_user_id NUMBER,
    action VARCHAR2(100) NOT NULL,
    entity_type VARCHAR2(50) NOT NULL,
    entity_id NUMBER,
    before_state CLOB,
    after_state CLOB,
    ip_address VARCHAR2(45),
    user_agent CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_audit_logs_user FOREIGN KEY (actor_user_id)
        REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id, created_at);

-- ============================================================================
-- 9. REFERENCE DATA & CONFIGURATION
-- ============================================================================

CREATE TABLE interest_rate_configs (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    account_type VARCHAR2(20) NOT NULL,
    rate DECIMAL(5, 4) NOT NULL,
    posting_frequency VARCHAR2(20) DEFAULT 'monthly' NOT NULL,
    min_balance_for_interest DECIMAL(19, 4) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE fee_schedules (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    fee_type VARCHAR2(50) NOT NULL,
    description VARCHAR2(255) NOT NULL,
    amount DECIMAL(19, 4),
    percentage DECIMAL(5, 4),
    min_amount DECIMAL(19, 4),
    max_amount DECIMAL(19, 4),
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE system_configs (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    key VARCHAR2(100) UNIQUE NOT NULL,
    value CLOB NOT NULL,
    description VARCHAR2(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE faqs (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    question VARCHAR2(255) NOT NULL,
    answer CLOB NOT NULL,
    category VARCHAR2(50) DEFAULT 'general' NOT NULL,
    sort_order NUMBER(10) DEFAULT 0 NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE support_tickets (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    user_id NUMBER NOT NULL,
    subject VARCHAR2(255) NOT NULL,
    message CLOB NOT NULL,
    status VARCHAR2(20) DEFAULT 'open' NOT NULL,
    priority VARCHAR2(10) DEFAULT 'medium' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_support_tickets_user FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

-- ============================================================================
-- 10. JOB QUEUE SYSTEM
-- ============================================================================

CREATE TABLE jobs (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    queue VARCHAR2(255) NOT NULL,
    payload CLOB NOT NULL,
    attempts NUMBER(3) NOT NULL,
    reserved_at NUMBER(10),
    available_at NUMBER(10) NOT NULL,
    created_at NUMBER(10) NOT NULL
);

CREATE INDEX idx_jobs_queue ON jobs(queue);

CREATE TABLE job_batches (
    id VARCHAR2(255) PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    total_jobs NUMBER(10) NOT NULL,
    pending_jobs NUMBER(10) NOT NULL,
    failed_jobs NUMBER(10) NOT NULL,
    failed_job_ids CLOB NOT NULL,
    options CLOB,
    cancelled_at NUMBER(10),
    created_at NUMBER(10) NOT NULL,
    finished_at NUMBER(10)
);

CREATE TABLE failed_jobs (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    uuid VARCHAR2(255) UNIQUE NOT NULL,
    connection CLOB NOT NULL,
    queue CLOB NOT NULL,
    payload CLOB NOT NULL,
    exception CLOB NOT NULL,
    failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- RECORD MIGRATION IN MIGRATIONS TABLE
-- ============================================================================

CREATE TABLE migrations (
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    migration VARCHAR2(255) NOT NULL,
    batch NUMBER(10) NOT NULL
);

-- Insert migration records
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000000_create_users_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000001_create_cache_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000002_create_jobs_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000002_add_two_factor_columns_to_users_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000003_create_branches_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000004_create_accounts_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000005_create_transactions_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000006_create_loans_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000007_create_payments_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000008_create_notifications_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000009_create_audit_logs_table', 1);
INSERT INTO migrations (migration, batch) VALUES ('0001_01_01_000010_create_reference_data_tables', 1);

COMMIT;

-- ============================================================================
-- SCRIPT COMPLETE
-- ============================================================================
-- All tables have been created successfully!
--
-- Connection Details:
-- Host: 127.0.0.1
-- Port: 1521
-- SID: xe
-- Username: bank
-- Password: secret
--
-- Next Steps:
-- 1. Verify all tables are created (SELECT * FROM user_tables)
-- 2. Run seed scripts for reference data (if available)
-- 3. Update application configuration if needed
-- ============================================================================
