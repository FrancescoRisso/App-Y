import json

from log import log
from .getScores import getScoresInternal


def setScores(db, request):
	print("Here")
	params = json.loads(request.data)

	try:
		userId = params["userID"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing userID"})

	try:
		scores = params["scores"]
	except Exception:
		return json.dumps({"type": "param_error", "cause": "Missing pwd"})

	# In real world, first check if some data is present
	# If so, instead of deleting and re-adding, compute the exponential moving average

	try:
		db.run_query("DELETE FROM stats WHERE ID=%s", (userId,))
		db.run_query(
			"""INSERT INTO stats (ID, PASSION, ORGANIZATION, RELATIONSHIPS, CAREER, HEALTH, SELFCARE)\
				VALUES (%s, %s, %s, %s, %s, %s, %s)""",
			(
				userId,
				scores["passion"],
				scores["organization"],
				scores["relationships"],
				scores["career"],
				scores["health"],
				scores["selfcare"],
			),
		)
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": str(e)})

	log("INFO", f"UserID {userId} inserted some scores")
	return getScoresInternal(db, userId)
