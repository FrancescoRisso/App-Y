USE App_y;

SET
	FOREIGN_KEY_CHECKS = 1;

INSERT INTO
	USERS (
		ID,
		Name,
		Surname,
		Sex_specified,
		Male,
		Birthdate,
		Username,
		HashedPwd
	)
VALUES
	(
		0,
		"Mario",
		"Rossi",
		TRUE,
		TRUE,
		"2000-02-15",
		"MarioRossi",
		"9640b8497989f88328b7f3bd94c6636f00acc35dabab138345a0b9b5088ff2d2" -- ^hash of "HeySoMario"
	),
	(
		1,
		"Lucia",
		"Bianchi",
		TRUE,
		false,
		"1999-05-12",
		"Luci123",
		"941d32b55cc70d6ea591dca6bd05bf6da905b40edf19022a263441c08abdf961" -- ^hash of "Luci123"
	),
	(
		2,
		"Andrea",
		"Verdi",
		false,
		NULL,
		"2001-05-01",
		"Balena456",
		"011efea0cac926232add733f86e3d9f6ab53c237be9e40f9e6a2e255ba33abc3" -- ^hash of "P4ssw0rd"
	);

UPDATE
	AVATAR
SET
	Is_default = false
WHERE
	ID = 0;

UPDATE
	AVATAR
SET
	Is_default = TRUE
WHERE
	ID = 1;

UPDATE
	AVATAR
SET
	Is_default = TRUE
WHERE
	ID = 2;

INSERT INTO
	DAILY_SURVEYS(ID, DAY)
VALUES
	(0, "2002-04-11"),
	(0, "2022-04-12"),
	(1, "2022-04-12");

