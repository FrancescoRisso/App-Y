import json

from log import log

def getAvatar(db, request):
	if "userID" not in request.args:
		return json.dumps(None)

	userId = request.args["userID"]

	try:
		result = db.run_query("SELECT Is_default FROM avatar WHERE ID=%s", tuple(userId))
	except Exception as e:
		log("ERR", e)
		return "err"

	try:
		if list(list(result)[0])[0] == 1:
			return json.dumps({"type": "default"})
	except Exception:
		log("ERR", f"User ID {userId} is not present in the database")
		json.dumps(None)

	return json.dumps({"type": "custom", "details": "todo"})
