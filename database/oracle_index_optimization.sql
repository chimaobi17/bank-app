-- ============================================================================
-- Phase 15.1: Oracle 21c Index Optimization
-- ============================================================================
-- Optimizes query patterns for high-volume tables: transactions, ledger_entries,
-- and supporting tables used in analytics, statements, and admin views.
--
-- Execute in Oracle SQL*Plus or SQL Developer against the bank schema.
-- ============================================================================

-- ── Transactions ──────────────────────────────────────────────────────────────

-- Accelerate SpendAnalysisService / StatementService date-range queries on source
CREATE INDEX idx_tx_src_type_posted ON transactions(source_account_id, type, posted_at);

-- Accelerate SpendAnalysisService / StatementService date-range queries on dest
CREATE INDEX idx_tx_dest_type_posted ON transactions(dest_account_id, type, posted_at);

-- Accelerate dashboard monthly-breakdown aggregation (covers SUM + WHERE)
CREATE INDEX idx_tx_src_posted_amount ON transactions(source_account_id, posted_at, amount);
CREATE INDEX idx_tx_dest_posted_amount ON transactions(dest_account_id, posted_at, amount);

-- Accelerate status-filtered queries (admin pending review, etc.)
CREATE INDEX idx_tx_status_posted ON transactions(status, posted_at);

-- Accelerate reference lookups (idempotency checks, transfer tracking)
-- Note: reference already has UNIQUE constraint, but adding explicit index for clarity
-- CREATE INDEX idx_tx_reference ON transactions(reference);  -- Already covered by UNIQUE

-- Accelerate channel-based analytics
CREATE INDEX idx_tx_channel_posted ON transactions(channel, posted_at);

-- ── Ledger Entries ────────────────────────────────────────────────────────────

-- Accelerate double-entry reconciliation (DR/CR per transaction)
CREATE INDEX idx_ledger_tx_direction ON ledger_entries(transaction_id, direction);

-- Accelerate account balance reconstruction (opening balance computation)
CREATE INDEX idx_ledger_acct_posted_dir ON ledger_entries(account_id, posted_at, direction, amount);

-- ── Accounts ──────────────────────────────────────────────────────────────────

-- Accelerate account lookup by number + customer (used in StatementsController, TransfersPageController)
CREATE INDEX idx_accounts_number_customer ON accounts(account_number, customer_id);

-- Accelerate dormancy detection and status-based admin queries
CREATE INDEX idx_accounts_status_opened ON accounts(status, opened_at);

-- ── Cards ─────────────────────────────────────────────────────────────────────

-- Accelerate card-by-account lookup (CardsPageController)
CREATE INDEX idx_cards_account_status ON cards(account_id, status);

-- ── Loans ─────────────────────────────────────────────────────────────────────

-- Accelerate admin pending loan views
CREATE INDEX idx_loans_status_created ON loans(status, created_at);

-- Accelerate customer loan history
CREATE INDEX idx_loans_customer_status ON loans(customer_id, status);

-- ── Loan Installments ─────────────────────────────────────────────────────────

-- Accelerate upcoming/overdue installment queries
CREATE INDEX idx_installments_status_due ON loan_installments(status, due_date);

-- ── Notifications ─────────────────────────────────────────────────────────────

-- Accelerate unread notification count (used on every dashboard load)
CREATE INDEX idx_notif_user_status_read ON notifications(user_id, status, read_at);

-- ── Biometric Credentials ─────────────────────────────────────────────────────

-- Accelerate passkey lookup for WebAuthn authentication
CREATE INDEX idx_biometric_user_revoked ON biometric_credentials(user_id, revoked_at);

-- ── OTP Challenges ────────────────────────────────────────────────────────────

-- Accelerate OTP lookup by user + purpose (avoid scanning expired/consumed)
CREATE INDEX idx_otp_user_purpose ON otp_challenges(user_id, purpose, consumed_at);

-- ── User Sessions ─────────────────────────────────────────────────────────────

-- Accelerate active session lookup (DeviceManagementService)
CREATE INDEX idx_user_sessions_user_revoked ON user_sessions(user_id, revoked_at);

-- ── Fraud Flags ───────────────────────────────────────────────────────────────

-- (Only create if fraud_flags table exists from Phase 12)
-- CREATE INDEX idx_fraud_flags_acct_created ON fraud_flags(account_id, created_at);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Run after execution:
--   SELECT index_name, table_name FROM user_indexes ORDER BY table_name;
-- ============================================================================

COMMIT;
