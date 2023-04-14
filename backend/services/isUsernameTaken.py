import json

from log import log


def isUsernameTaken(db, request):
	if "username" not in request.args:
		return json.dumps({"type": "param_error", "cause": "Missing username"})

	username = request.args["username"]

	try:
		result = db.run_query("SELECT COUNT(*) FROM users WHERE Username=%s", (username,))
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": "Error in the database read"})

	print(result)

	if list(list(result)[0])[0] > 0:
		return json.dumps({"type": "usernameCheck", "isUsed": True})

	return json.dumps({"type": "usernameCheck", "isUsed": False})
