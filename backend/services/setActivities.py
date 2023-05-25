import json
from hashlib import sha256

from log import log


def setActivities(db, request):
	params = json.loads(request.data)

	try:
		userId = params["userID"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing userID"})

	try:
		activities = params["activities"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing pwd"})

	for activity in activities:
		try:
			result = db.run_query(
				"""INSERT INTO activities (ID, DAY, ACTIVITY, COMPLETED)\
					VALUES (%s, curdate(), %s, FALSE)""",
				(userId, activity),
			)
		except Exception as e:
			log("ERR", e)
			return json.dumps({"type": "server_error", "cause": str(e)})

	log("INFO", f"UserID {userId} set activities for today")
	return json.dumps({"type": "done"})
