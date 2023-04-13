import json
from hashlib import sha256

from log import log


def getInfo(db, request):
	params = json.loads(request.data)

	try:
		userId = params["userID"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing userID"})

	log("INFO", f"UserID {userId} requested their information")

	try:
		pwd = params["pwd"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing pwd"})

	pwdHash = sha256(pwd.encode("utf-8")).hexdigest()

	try:
		result = db.run_query(
			"""SELECT Name, Surname, Sex_specified, Male, Birthdate, Username\
				FROM users\
				WHERE ID=%s AND HashedPwd=%s""",
			(userId, pwdHash),
		)
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": e})

	try:
		result = list(list(result)[0])
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Invalid userID or password"})

	try:
		response = dict()
		response["Name"] = result[0]
		response["Surname"] = result[1]
		response["Sex"] = "other" if not result[2] else ("male" if result[3] else "female")
		response["Birthdate"] = str(result[4])
		response["Username"] = result[5]
		return json.dumps({"type": "userInfo", "details": response})
	except Exception as e:
		log("ERR", f"Error in the database read: {e}")
		return json.dumps({"type": "server_error", "cause": "Error in the database read"})
