DROP TABLE Timesheet CASCADE;
DROP TABLE Job CASCADE;
DROP TABLE Admin CASCADE;
DROP TABLE Employer CASCADE;
DROP TABLE Employee CASCADE;
DROP TABLE Department CASCADE;
DROP TABLE Period;

CREATE TABLE Department (
    Title VARCHAR ( 50 ) PRIMARY KEY
);

CREATE TABLE Admin (
    JHED VARCHAR ( 20 ) PRIMARY KEY,
    First_Name VARCHAR ( 50 ),
    Last_Name VARCHAR ( 50 ),
    Department VARCHAR ( 50 ),
    FOREIGN KEY (Department) REFERENCES Department (Title) ON DELETE SET NULL
);

CREATE TABLE Employer (
    JHED VARCHAR ( 20 ) PRIMARY KEY,
    First_Name VARCHAR ( 50 ) NOT NULL,
    Last_Name VARCHAR ( 50 ) NOT NULL,
    Job_Title VARCHAR ( 50 ),
    Department VARCHAR (50),
    FOREIGN KEY (Department) REFERENCES Department (Title) ON DELETE SET NULL
);

CREATE TABLE Employee (
    JHED VARCHAR ( 20 ) PRIMARY KEY,
    First_Name VARCHAR ( 50 ) NOT NULL,
    Last_Name VARCHAR ( 50 ) NOT NULL,
    Department VARCHAR (50),
    FOREIGN KEY (Department) REFERENCES Department (Title) ON DELETE SET NULL
);

CREATE TABLE Job (
    ID VARCHAR (20) PRIMARY KEY,
    Title VARCHAR (255) NOT NULL,
    Wage NUMERIC NOT NULL,
    Hour_Limit NUMERIC,
    Department VARCHAR (50) NOT NULL,
    Active bool,
    Grant_ID VARCHAR (255),
    JHED VARCHAR (20),
    eJHED VARCHAR (20) NOT NULL,
    aJHED VARCHAR (20) NOT NULL,
    FOREIGN KEY (JHED) REFERENCES Employee (JHED) ON DELETE SET NULL,
    FOREIGN KEY (eJHED) REFERENCES Employer (JHED) ON DELETE SET NULL,
    FOREIGN KEY (aJHED) REFERENCES Admin (JHED) ON DELETE SET NULL,
    FOREIGN KEY (Department) REFERENCES Department (Title) ON DELETE CASCADE
);

CREATE TABLE Timesheet (
    Job_ID VARCHAR (20) NOT NULL,
    JHED VARCHAR (20) NOT NULL,
    Date DATE NOT NULL,
    Start_hours TIMESTAMP,
    End_hours TIMESTAMP,
    Total_hours NUMERIC(4, 2) NOT NULL GENERATED ALWAYS AS (EXTRACT(epoch FROM End_hours - Start_hours)/3600) STORED,
    Approved bool,
    Constraint PK_JobID_JHED_Date PRIMARY KEY (Job_ID, JHED, Date),
    FOREIGN KEY (JHED) REFERENCES Employee (JHED) ON DELETE CASCADE,
    FOREIGN KEY (Job_ID) REFERENCES Job (ID) ON DELETE CASCADE
);

CREATE TABLE Period (
    ID SERIAL PRIMARY KEY,
    Start_date DATE NOT NULL,
    End_date DATE NOT NULL
);

-------------------- NOW RUN IN POSTGRESQL SHELL --------------------

\copy department FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/department.csv' delimiter ',' CSV HEADER;

\copy admin FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/admin.csv' delimiter ',' CSV HEADER;

\copy employer FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/employer.csv' delimiter ',' CSV HEADER;

\copy employee FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/employee.csv' delimiter ',' CSV HEADER;

\copy job FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/job.csv' delimiter ',' CSV HEADER;

\copy timesheet FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/timesheet.csv' delimiter ',' CSV HEADER;

\copy period FROM '/Users/andrewsuh/Documents/JHU/06_Spring 2022/01_OOSE/project-team-14-lego/code/backend/data/sample_data/period.csv' delimiter ',' CSV HEADER;