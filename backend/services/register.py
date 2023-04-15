import json
from hashlib import sha256

from log import log

cnt = 0


def register(db, request):
	params = json.loads(request.data)

	userDetails = {}

	for param in ["username", "name", "surname", "sex", "birthdate", "pwd"]:
		try:
			userDetails[param] = params[param]
		except Exception:
			return json.dumps({"type": "param_error", "cause": f"Missing {param}"})

	userDetails["pwd"] = sha256(userDetails["pwd"].encode("utf-8")).hexdigest()


	try:
		result = db.run_query(
			"""INSERT INTO users (\
				ID,\
				Name,\
				Surname,\
				Sex_specified,\
				Male,\
				Birthdate,\
				Username,\
				HashedPwd\
			)\
			VALUES (\
				(SELECT MAX(users2.ID)+1 FROM (SELECT ID FROM users) AS users2),\
				%s,\
				%s,\
				%s,\
				%s,\
				%s,\
				%s,\
				%s\
			)""",
			(
				userDetails["name"],
				userDetails["surname"],
				True if userDetails["sex"] != "other" else False,
				True if userDetails["sex"] == "male" else False,
				userDetails["birthdate"],
				userDetails["username"],
				userDetails["pwd"],
			),
		)

	except Exception as e:
		log("ERR", str(e))
		if "Duplicate entry" in str(e):
			return json.dumps({"type": "register", "correct": False})
		else:
			return json.dumps({"type": "server_error", "cause": str(e)})

	try:
		result = db.run_query(
			"""SELECT ID\
				FROM users\
				WHERE Username=%s""",
			(userDetails["username"],),
		)
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": str(e)})

	try:
		result = list(list(result)[0])[0]
	except Exception:
		return json.dumps({"type": "server_error", "cause": e})

	log("INFO", f"UserID {result} registered")
	return json.dumps({"type": "register", "correct": True, "userId": f"{result}"})
