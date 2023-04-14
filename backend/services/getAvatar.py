import json

from log import log


def getAvatar(db, request):
	if "userID" not in request.args:
		return json.dumps({"type": "param_error", "cause": "Missing userID"})

	userId = request.args["userID"]

	try:
		result = db.run_query("SELECT Is_default FROM avatar WHERE ID=%s", (userId,))
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": "Error in the database read"})

	try:
		if list(list(result)[0])[0] == 1:
			return json.dumps({"type": "avatar", "isCustom": False})
	except Exception:
		log("ERR", f"User ID {userId} is not present in the database")
		return json.dumps({"type": "param_error", "cause": "Invalid userID"})

	return json.dumps({"type": "avatar", "isCustom": True, "details": None})
