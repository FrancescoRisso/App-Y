import json

from log import log


def getScores(db, request):
	if "userID" not in request.args:
		return json.dumps({"type": "param_error", "cause": "Missing userID"})

	userId = request.args["userID"]

	try:
		result = db.run_query(
			"SELECT PASSION, ORGANIZATION, RELATIONSHIPS, CAREER, HEALTH, SELFCARE\
			FROM stats\
			WHERE ID=%s",
			(userId,),
		)
	except Exception as e:
		log("ERR", e)
		return json.dumps({"type": "server_error", "cause": "Error in the database read"})

	if len(result) == 0:
		data = "none"
	else:
		data = {
			"passion": result[0][0],
			"organization": result[0][1],
			"relationships": result[0][2],
			"career": result[0][3],
			"health": result[0][4],
			"selfcare": result[0][5],
		}

	return json.dumps({"type": "scores", "scores": data})
