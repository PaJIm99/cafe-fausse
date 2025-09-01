-- Customers
CREATE TABLE IF NOT EXISTS customers (
id SERIAL PRIMARY KEY,
name VARCHAR(120) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
phone VARCHAR(32),
newsletter BOOLEAN NOT NULL DEFAULT FALSE
);
-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
id SERIAL PRIMARY KEY,
customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
time_slot TIMESTAMP NOT NULL,
table_number INTEGER NOT NULL,
guests INTEGER NOT NULL CHECK (guests >= 1),
CONSTRAINT uq_slot_table UNIQUE (time_slot, table_number)
);
-- Newsletter
CREATE TABLE IF NOT EXISTS newsletter (
id SERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(120)
);
-- Helpful index
CREATE INDEX IF NOT EXISTS idx_reservations_time_slot ON
reservations(time_slot);