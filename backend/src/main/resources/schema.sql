-- Roles table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table (with quantity directly)
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    summary TEXT,
    publication_date DATE,
    total_quantity INTEGER DEFAULT 1 CHECK (total_quantity >= 0),
    available_quantity INTEGER DEFAULT 1 CHECK (available_quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rentals table
CREATE TABLE IF NOT EXISTS rentals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    book_id INTEGER NOT NULL REFERENCES books(id),
    rent_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    CONSTRAINT active_rental_check CHECK (
        (status = 'active' AND return_date IS NULL) OR
        (status = 'returned' AND return_date IS NOT NULL)
    )
);

-- Insert default roles (skip if already exist)
INSERT INTO roles (name) VALUES ('librarian'), ('user')
ON CONFLICT (name) DO NOTHING;

-- Insert default users (password: "testtest") only if they don't already exist
INSERT INTO users (email, password, role_id) VALUES
  ('librarian@library.com', '$2a$10$l/InOIIhaW6C3.HENn5oPOf5NF.YUOLl0rLR76VKrHXoziCBLz7oq', 1),
  ('user@library.com', '$2a$10$l/InOIIhaW6C3.HENn5oPOf5NF.YUOLl0rLR76VKrHXoziCBLz7oq', 2)
ON CONFLICT (email) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_rentals_user_id ON rentals(user_id);
CREATE INDEX IF NOT EXISTS idx_rentals_book_id ON rentals(book_id);
CREATE INDEX IF NOT EXISTS idx_rentals_status ON rentals(status);

