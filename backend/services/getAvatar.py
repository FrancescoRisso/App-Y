import json

from log import log

def getAvatar(db, request):
	if "userID" not in request.args:
		return ""
	
	userId = request.args["userID"]

	try:
		result = db.run_query("SELECT Is_default FROM avatar WHERE ID=%s", tuple(userId))
	except Exception as e:
		log("ERR", e)
		return ""

	try:
		if list(list(result)[0])[0] == 1:
			return json.dumps({"type": "default"})
		return json.dumps({"type": "custom", "details": "todo"})
	except Exception:
		return ""
