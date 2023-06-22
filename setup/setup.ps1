# Start logging to setup.log
Start-Transcript -Path ".\setup.log" -Append

try {
    # Checking Node Version
    $nodeVersion = & node --version

    if ($nodeVersion -eq "v16.20.1") {
        Write-Host "Correct version of Node detected."
    } else {
        Write-Host "Node is not installed or incorrect version detected."
        $readInput = Read-Host -Prompt "Do you want to uninstall the current version and install the correct one (y/n)?"
        
        if ($readInput -eq 'y') {
            # Uninstall Node.js - make sure Node.js is installed in the default location
            Start-Process -FilePath "msiexec.exe" -ArgumentList "/x C:\Program Files\nodejs\node.msi /quiet" -Wait

            # Choose Node.js version (x64 or x86)
            $readInputNodeVersion = Read-Host -Prompt "Which version do you want to install (x64 or x86)?"
            $nodeURL = "https://nodejs.org/download/release/v16.20.1/node-v16.20.1-$($readInputNodeVersion).msi"

            # Download Node.js
            $nodeInstallerPath = "$env:TEMP\node-v16.20.1-$($readInputNodeVersion).msi"
            Invoke-WebRequest -Uri $nodeURL -OutFile $nodeInstallerPath

            # Install Node.js
            Start-Process -FilePath "msiexec.exe" -ArgumentList "/i $nodeInstallerPath /quiet" -Wait

        } else {
            Write-Host "Node v16.20.1 is required for setup. Please install the correct version."
            pause
            exit
        }
    }

    # Check MSSQL Server TCP/IP status
    Write-Host "Now we will check if your SQL Server is configured to allow TCP/IP connections."
    Write-Host "Attempting to connect to SQL Server..."
    try {
        # Run sqlcmd utility to connect to the server. This will throw an exception if unable to connect.
        $null = sqlcmd -S "localhost" -U "sa" -P "password" -Q "SELECT 1"
        Write-Host "Successfully connected to SQL Server."
    } catch {
        Write-Host "Failed to connect to SQL Server. Please make sure TCP/IP is enabled in SQL Server Configuration Manager, and the SQL Server service is running."
        Write-Host "You can enable TCP/IP following these steps:"
        Write-Host "1. Open SQL Server Configuration Manager."
        Write-Host "2. Expand SQL Server Network Configuration and select Protocols for your SQL instance."
        Write-Host "3. In the right panel, right-click on TCP/IP and select Enable."
        Write-Host "4. Restart your SQL Server instance for the changes to take effect."
        Write-Host "After doing this, please run the script again."
        Pause
        exit
    }


# Setting up Database - Make sure SQL Server PowerShell module is installed
$saPassword = "password"
$sqlQuery = @"
-- Check if the TwinMindsDB database exists before creating it
IF NOT EXISTS (
    SELECT name 
    FROM sys.databases 
    WHERE name = 'TwinMindsDB'
)
BEGIN
    -- Create Database
    CREATE DATABASE TwinMindsDB;
END
GO

-- Use Created Database
USE TwinMindsDB;
GO

-- Check if the Subscribers table exists before creating it
IF NOT EXISTS (
    SELECT * 
    FROM sys.tables
    WHERE name='Newsletter' AND type = 'U'
)
BEGIN
    -- Create Newsletter table
    CREATE TABLE Newsletter(
        ID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing ID
        Email NVARCHAR(320) NOT NULL, -- NVARCHAR type allows for Unicode characters. 320 is the maximum length of an email address.
        SubscriptionDate DATETIME DEFAULT GETDATE() -- Gets the date of subscription automatically.
    );
END
GO

-- Check if the TextData table exists before creating it
IF NOT EXISTS (
    SELECT * 
    FROM sys.tables
    WHERE name='TextData' AND type = 'U'
)
BEGIN
    -- Create TextData table
    CREATE TABLE TextData (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        Page NVARCHAR(100),
        Title NVARCHAR(200),
        Subtitle NVARCHAR(200),
        Description NVARCHAR(MAX)
    );
END
GO

-- Insert data into TextData table only if they don't exist
IF NOT EXISTS (
    SELECT * 
    FROM TextData
    WHERE Page = 'paranoia'
)
BEGIN
    INSERT INTO TextData (Page, Title, Subtitle, Description) VALUES ('paranoia', 'Paranoia', 'The Concepts of Loneliness', 'In the aftermath of a social gathering, a young woman embarks on what should be a routine journey home. Yet, the comforting familiarity of her path is suddenly marred by an ominous sense of dread. Unseen eyes seem to linger in the shadows, turning every corner into a pulse-pounding question of safety. This tale of escalating paranoia blurs the line between the fearfully imagined and the dangerously real.');
END
GO

IF NOT EXISTS (
    SELECT * 
    FROM TextData
    WHERE Page = 'projectfear'
)
BEGIN
    INSERT INTO TextData (Page, Title, Subtitle, Description) VALUES ('projectfear', 'Project Fear', 'The Concepts of Loneliness', 'After uncovering a forgotten tale, journalist Rachel White ventures into the remote Vermont wilderness, expecting a solitary expedition. Yet, the vast, tranquil expanse takes an unsettling turn as eerie phenomena start to manifest around her. A whisper in the wind, unseen eyes in the shadows, and an omnipresent dread turn the wilderness into a terrifying labyrinth. This chilling saga of escalating fear and loneliness blurs the line between her horrifying imagination and a possibly dangerous reality, posing the question: is it all in her mind, or is she truly not alone?');
END
GO
"@

# Set up a new SQL Server connection
$sqlServerInstance = "localhost" # change this if your SQL Server is not on localhost
$conn = New-Object System.Data.SqlClient.SqlConnection("Server=$sqlServerInstance;Database=master;User Id=sa;Password=$saPassword;")
$conn.Open()

# Execute the SQL script
$command = $conn.CreateCommand()
$command.CommandText = $sqlQuery
$command.ExecuteNonQuery()

$conn.Close()

# Navigate to your project directory
cd ..

# Install packages
Write-Host "Installing npm packages... This might take a few minutes."
npm install express mssql body-parser cors

Write-Host "Setup complete."

} catch {
    Write-Host "An error occurred:"
    Write-Host $_.Exception.Message
} finally {
    # Stop logging
    Stop-Transcript
    # Pause to let the user see the output
    pause
}