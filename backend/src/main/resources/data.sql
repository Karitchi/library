-- Insert books (skip if already exist)
INSERT INTO books (title, author, summary, publication_date, total_quantity, available_quantity)
VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of the Jazz Age', '1925-04-10', 3, 3),
  ('1984', 'George Orwell', 'A dystopian novel', '1949-06-08', 5, 5),
  ('The Great Gatsby 2', 'F. Scott Fitzgerald', 'A story of the Jazz Age', '1925-04-10', 3, 3),
  ('1984', 'George Orwell 2', 'A dystopian novel', '1949-06-08', 5, 5)
ON CONFLICT (title, author) DO NOTHING;
