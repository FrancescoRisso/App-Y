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
		Username
	)
VALUES
	(
		0,
		"Mario",
		"Rossi",
		TRUE,
		TRUE,
		"2000-02-15",
		"MarioRossi"
	),
	(
		1,
		"Lucia",
		"Bianchi",
		TRUE,
		false,
		"1999-05-12",
		"Luci123"
	),
	(
		2,
		"Andrea",
		"Verdi",
		false,
		NULL,
		"2001-05-01",
		"Balena456"
	);

INSERT INTO
	AVATAR(ID, Is_default)
VALUES
	(0, false),
	(1, TRUE),
	(2, TRUE);

INSERT INTO
	DAILY_SURVEYS(ID, DAY)
VALUES
	(0, "2002-04-11"),
	(0, "2022-04-12"),
	(1, "2022-04-12");

-- INSERT INTO STATS(ID)
