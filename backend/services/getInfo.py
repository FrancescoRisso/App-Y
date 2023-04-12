import json
from hashlib import sha256

from log import log

def getInfo(db, request):
	if "userID" not in request.args:
		return json.dumps(None)

	if "pwd" not in request.args:
		return json.dumps(None)

	userId = request.args["userID"]
	pwdHash = sha256(request.args["pwd"].encode("utf-8")).hexdigest()

	try:
		result = db.run_query(
			"""SELECT Name, Surname, Sex_specified, Male, Birthdate, Username\
				FROM users\
				WHERE ID=%s AND HashedPwd=%s""",
			(userId, pwdHash),
		)
	except Exception as e:
		log("ERR", e)
		return "err"

	try:
		result = list(list(result)[0])
	except Exception:
		log("ERR", f"User ID {userId} is not present in the database, or the password is wrong")
		return json.dumps(None)

	try:
		response = dict()
		response["Name"] = result[0]
		response["Surname"] = result[1]
		response["Sex"] = "other" if not result[2] else ("male" if result[3] else "female")
		response["Birthdate"] = str(result[4])
		response["Username"] = result[5]
		return json.dumps(response)
	except Exception as e:
		log("ERR", f"Error in the database read: {e}")
		return json.dumps(None)
