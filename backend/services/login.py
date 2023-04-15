import json
from hashlib import sha256

from log import log


def login(db, request):
	params = json.loads(request.data)

	try:
		userId = params["username"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing username"})

	try:
		pwd = params["pwd"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing pwd"})

	pwdHash = sha256(pwd.encode("utf-8")).hexdigest()

	try:
		result = db.run_query(
			"""SELECT ID\
				FROM users\
				WHERE Username=%s AND HashedPwd=%s""",
			(userId, pwdHash),
		)
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": str(e)})

	try:
		result = list(list(result)[0])[0]
	except Exception:
		return json.dumps({"type": "login", "correct": False})

	log("INFO", f"UserID {result} logged in")
	return json.dumps({"type": "login", "correct": True, "userId": f"{result}"})
