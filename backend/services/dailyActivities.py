import json
from hashlib import sha256

from log import log


def dailyActivities(db, request):
	if "userID" not in request.args:
		return json.dumps({"type": "param_error", "cause": "Missing username"})

	userId = request.args["userID"]

	log("INFO", f"UserID {userId} requested their daily activities for today")

	try:
		result = db.run_query(
			"""SELECT ACTIVITY\
				FROM activities\
				WHERE ID=%s AND DAY=curdate()""",
			(userId,),
		)
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": str(e)})

	if len(result) == 0:
		return json.dumps({"type": "activitiesSelected", "activities": "notSelected"})

	return json.dumps({"type": "activitiesSelected", "activities": [row[0] for row in result]})
