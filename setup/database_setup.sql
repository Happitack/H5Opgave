-- Create Database
CREATE DATABASE NewsletterDB;
GO

-- Use Created Database
USE NewsletterDB;
GO

-- Create Subscribers table
CREATE TABLE Subscribers(
    ID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing ID
    Email NVARCHAR(320) NOT NULL, -- NVARCHAR type allows for Unicode characters. 320 is the maximum length of an email address.
    SubscriptionDate DATETIME DEFAULT GETDATE() -- Gets the date of subscription automatically.
);
GO

-- Create TextData table
CREATE TABLE TextData (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Page NVARCHAR(100),
    Title NVARCHAR(200),
    Subtitle NVARCHAR(200),
    Description NVARCHAR(MAX)
);
GO

-- Insert data into TextData table
INSERT INTO TextData (Page, Title, Subtitle, Description) VALUES ('header', 'Paranoia', 'The Concepts of Loneliness', 'In the aftermath of a social gathering, a young woman embarks on what should be a routine journey home. Yet, the comforting familiarity of her path is suddenly marred by an ominous sense of dread. Unseen eyes seem to linger in the shadows, turning every corner into a pulse-pounding question of safety. This tale of escalating paranoia blurs the line between the fearfully imagined and the dangerously real.');
GO