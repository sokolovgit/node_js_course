-- Create the "members" table
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    photo VARCHAR(255),
    academic_faculty VARCHAR(255) NOT NULL,
    academic_department VARCHAR(255) NOT NULL,
    hobbies TEXT[], -- Array of strings for hobbies
    favorite_quote TEXT NOT NULL
);

-- Create the "notes" table
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

-- Optionally, you may want to create the "gen_random_uuid" extension to support UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";