-- Bank App Oracle Reference Data Seed Script
-- Execute this AFTER running the main migration script

-- ============================================================================
-- 1. SEED CURRENCIES
-- ============================================================================

INSERT INTO currencies (code, name, symbol, is_active)
VALUES ('NGN', 'Nigerian Naira', '₦', 1);

INSERT INTO currencies (code, name, symbol, is_active)
VALUES ('USD', 'US Dollar', '$', 1);

INSERT INTO currencies (code, name, symbol, is_active)
VALUES ('EUR', 'Euro', '€', 1);

INSERT INTO currencies (code, name, symbol, is_active)
VALUES ('GBP', 'British Pound', '£', 1);

-- ============================================================================
-- 2. SEED ROLES
-- ============================================================================

INSERT INTO roles (role_name, description)
VALUES ('admin', 'System Administrator with full access');

INSERT INTO roles (role_name, description)
VALUES ('manager', 'Branch Manager');

INSERT INTO roles (role_name, description)
VALUES ('teller', 'Bank Teller');

INSERT INTO roles (role_name, description)
VALUES ('customer', 'Regular Customer');

INSERT INTO roles (role_name, description)
VALUES ('loan_officer', 'Loan Officer');

-- ============================================================================
-- 3. SEED PERMISSIONS
-- ============================================================================

INSERT INTO permissions (permission_name, description)
VALUES ('user.create', 'Create new users');

INSERT INTO permissions (permission_name, description)
VALUES ('user.read', 'View user details');

INSERT INTO permissions (permission_name, description)
VALUES ('user.update', 'Update user information');

INSERT INTO permissions (permission_name, description)
VALUES ('user.delete', 'Delete users');

INSERT INTO permissions (permission_name, description)
VALUES ('account.create', 'Create new accounts');

INSERT INTO permissions (permission_name, description)
VALUES ('account.read', 'View account details');

INSERT INTO permissions (permission_name, description)
VALUES ('account.update', 'Update account');

INSERT INTO permissions (permission_name, description)
VALUES ('transaction.create', 'Initiate transactions');

INSERT INTO permissions (permission_name, description)
VALUES ('transaction.approve', 'Approve transactions');

INSERT INTO permissions (permission_name, description)
VALUES ('transaction.reverse', 'Reverse transactions');

INSERT INTO permissions (permission_name, description)
VALUES ('loan.create', 'Create loan applications');

INSERT INTO permissions (permission_name, description)
VALUES ('loan.approve', 'Approve loans');

INSERT INTO permissions (permission_name, description)
VALUES ('loan.disburse', 'Disburse loan funds');

INSERT INTO permissions (permission_name, description)
VALUES ('report.view', 'View reports');

INSERT INTO permissions (permission_name, description)
VALUES ('audit.view', 'View audit logs');

-- ============================================================================
-- 4. SEED INTEREST RATE CONFIGS
-- ============================================================================

INSERT INTO interest_rate_configs (account_type, rate, posting_frequency, min_balance_for_interest, is_active)
VALUES ('savings', 0.0400, 'monthly', 10000, 1);

INSERT INTO interest_rate_configs (account_type, rate, posting_frequency, min_balance_for_interest, is_active)
VALUES ('checking', 0.0050, 'monthly', 50000, 1);

INSERT INTO interest_rate_configs (account_type, rate, posting_frequency, min_balance_for_interest, is_active)
VALUES ('fixed_deposit', 0.0800, 'annual', 100000, 1);

-- ============================================================================
-- 5. SEED FEE SCHEDULES
-- ============================================================================

INSERT INTO fee_schedules (fee_type, description, amount, is_active)
VALUES ('account_opening', 'Account Opening Fee', 1000, 1);

INSERT INTO fee_schedules (fee_type, description, amount, is_active)
VALUES ('monthly_maintenance', 'Monthly Maintenance Fee', 500, 1);

INSERT INTO fee_schedules (fee_type, description, percentage, min_amount, max_amount, is_active)
VALUES ('transfer_fee', 'Transfer Fee', 0.0050, 500, 50000, 1);

INSERT INTO fee_schedules (fee_type, description, amount, is_active)
VALUES ('overdraft_fee', 'Overdraft Fee', 5000, 1);

INSERT INTO fee_schedules (fee_type, description, amount, is_active)
VALUES ('card_replacement', 'Card Replacement Fee', 2000, 1);

-- ============================================================================
-- 6. SEED SYSTEM CONFIGS
-- ============================================================================

INSERT INTO system_configs (key, value, description)
VALUES ('app_name', 'Digital Bank', 'Application Name');

INSERT INTO system_configs (key, value, description)
VALUES ('app_email', 'noreply@bank.local', 'Application Email Address');

INSERT INTO system_configs (key, value, description)
VALUES ('support_email', 'support@bank.local', 'Support Email Address');

INSERT INTO system_configs (key, value, description)
VALUES ('max_login_attempts', '5', 'Maximum login attempts before account lock');

INSERT INTO system_configs (key, value, description)
VALUES ('lock_duration_minutes', '30', 'Account lock duration in minutes');

INSERT INTO system_configs (key, value, description)
VALUES ('daily_transfer_limit', '5000000', 'Daily transfer limit in kobo');

INSERT INTO system_configs (key, value, description)
VALUES ('per_transaction_limit', '1000000', 'Per transaction limit in kobo');

INSERT INTO system_configs (key, value, description)
VALUES ('kyc_required', '1', 'KYC verification required');

INSERT INTO system_configs (key, value, description)
VALUES ('two_factor_enabled', '1', 'Two-factor authentication enabled');

-- ============================================================================
-- 7. SEED FAQs
-- ============================================================================

INSERT INTO faqs (question, answer, category, sort_order, is_active)
VALUES (
    'How do I create an account?',
    'Visit our website, click Register, and fill in your personal details. Our team will verify your KYC documents and activate your account.',
    'account',
    1,
    1
);

INSERT INTO faqs (question, answer, category, sort_order, is_active)
VALUES (
    'What are the transfer limits?',
    'Daily transfer limit is ₦5,000,000 and per transaction limit is ₦1,000,000. Premium accounts may have higher limits.',
    'transfers',
    1,
    1
);

INSERT INTO faqs (question, answer, category, sort_order, is_active)
VALUES (
    'How do I reset my password?',
    'Click on the Login page, select "Forgot Password", enter your email, and follow the instructions sent to your email.',
    'account',
    2,
    1
);

INSERT INTO faqs (question, answer, category, sort_order, is_active)
VALUES (
    'What is KYC verification?',
    'KYC (Know Your Customer) is a verification process to confirm your identity using government-issued documents.',
    'security',
    1,
    1
);

INSERT INTO faqs (question, answer, category, sort_order, is_active)
VALUES (
    'How do I apply for a loan?',
    'Navigate to the Loans section, select a loan product, provide required documents, and submit your application for review.',
    'loans',
    1,
    1
);

-- ============================================================================
-- 7. BILLERS
-- ============================================================================

INSERT INTO billers (name, code, category, is_active)
VALUES ('Electricity Distribution Company', 'DISCO', 'utilities', 1);

INSERT INTO billers (name, code, category, is_active)
VALUES ('Water Corporation', 'WATER', 'utilities', 1);

INSERT INTO billers (name, code, category, is_active)
VALUES ('Internet Service Provider', 'ISP', 'internet', 1);

INSERT INTO billers (name, code, category, is_active)
VALUES ('Mobile Network A', 'MNO_A', 'telecom', 1);

INSERT INTO billers (name, code, category, is_active)
VALUES ('Mobile Network B', 'MNO_B', 'telecom', 1);

INSERT INTO billers (name, code, category, is_active)
VALUES ('TV Subscription Service', 'CABLE_TV', 'entertainment', 1);

-- ============================================================================
-- COMMIT ALL CHANGES
-- ============================================================================

COMMIT;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries to verify data was inserted correctly:

-- SELECT COUNT(*) as currency_count FROM currencies;
-- SELECT COUNT(*) as role_count FROM roles;
-- SELECT COUNT(*) as permission_count FROM permissions;
-- SELECT COUNT(*) as fee_count FROM fee_schedules;
-- SELECT COUNT(*) as biller_count FROM billers;
-- SELECT COUNT(*) as config_count FROM system_configs;

-- ============================================================================
-- SEED SCRIPT COMPLETE
-- ============================================================================
