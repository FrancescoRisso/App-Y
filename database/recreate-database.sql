DROP DATABASE IF EXISTS App_y;

CREATE DATABASE IF NOT EXISTS App_y;

USE App_y;

SET
	FOREIGN_KEY_CHECKS = 1;

CREATE TABLE USERS (
	ID INT NOT NULL PRIMARY KEY,
	Name VARCHAR(30) NOT NULL,
	Surname VARCHAR(30) NOT NULL,
	-- If selected sex is "Other", (Sex_specified, Male) = (false, don't care)
	-- If selected sex is "Male", (Sex_specified, Male) = (true, true)
	-- If selected sex is "Female", (Sex_specified, Male) = (true, false)
	Sex_specified BOOLEAN NOT NULL,
	Male BOOLEAN,
	Birthdate DATE NOT NULL,
	Username VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE AVATAR (
	ID INT NOT NULL PRIMARY KEY,
	Is_default BOOLEAN NOT NULL,
	-- The fields have to be computed later, will be in the form [character_item] INT NOT NULL,
	FOREIGN KEY(ID) REFERENCES USERS(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DAILY_SURVEYS (
	ID INT NOT NULL,
	DAY DATE NOT NULL,
	-- Value [TYPE] NOT NULL
	PRIMARY KEY (ID, DAY),
	FOREIGN KEY (ID) REFERENCES USERS(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE STATS (
	ID INT NOT NULL,
	-- Should be historicized? Please do PK based on that
	-- Fields to be computed, in the form [field_name] FLOAT NOT NULL
	FOREIGN KEY (ID) REFERENCES USERS(ID) ON DELETE CASCADE ON UPDATE CASCADE
);