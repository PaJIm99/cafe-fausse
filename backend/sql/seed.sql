-- Insert a sample customer
INSERT INTO customers (name, email, phone, newsletter)
VALUES ('Sample Patron', 'patron@example.com', '+12025550123', true)
ON CONFLICT (email) DO NOTHING;

-- Get the inserted customer id and insert reservations
WITH c AS (
  SELECT id FROM customers WHERE email='patron@example.com'
)
INSERT INTO reservations (customer_id, time_slot, table_number, guests)
SELECT c.id, ts, tbl, g
FROM c,
(VALUES
  (TIMESTAMP '2025-09-01 18:00:00', 5, 2),
  (TIMESTAMP '2025-09-01 19:30:00', 12, 4),
  (TIMESTAMP '2025-09-02 20:00:00', 8, 3)
) AS r(ts, tbl, g)
ON CONFLICT DO NOTHING;

-- Another customer
INSERT INTO customers (name, email, phone, newsletter)
VALUES ('Ada Lovelace', 'ada@example.com', '+447911123456', false)
ON CONFLICT (email) DO NOTHING;

WITH c AS (
  SELECT id FROM customers WHERE email='ada@example.com'
)
INSERT INTO reservations (customer_id, time_slot, table_number, guests)
SELECT c.id, ts, tbl, g
FROM c,
(VALUES
  (TIMESTAMP '2025-09-02 18:00:00', 14, 2),
  (TIMESTAMP '2025-09-03 19:00:00', 21, 5)
) AS r(ts, tbl, g)
ON CONFLICT DO NOTHING;
