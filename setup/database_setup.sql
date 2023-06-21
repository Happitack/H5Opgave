-- Create Database
CREATE DATABASE TwinMindsDB;
GO

-- Use Created Database
USE TwinMindsDB;
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

INSERT INTO TextData (Page, Title, Subtitle, Description) VALUES ('film2', 'Project Fear', 'The Concepts of Loneliness', 'After uncovering a forgotten tale, journalist Rachel White ventures into the remote Vermont wilderness, expecting a solitary expedition. Yet, the vast, tranquil expanse takes an unsettling turn as eerie phenomena start to manifest around her. A whisper in the wind, unseen eyes in the shadows, and an omnipresent dread turn the wilderness into a terrifying labyrinth. This chilling saga of escalating fear and loneliness blurs the line between her horrifying imagination and a possibly dangerous reality, posing the question: is it all in her mind, or is she truly not alone?');
GO