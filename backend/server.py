from flask import Flask
from flask import request
import json
from log import log as logger

from dbConnection import Database
from services.getAvatar import getAvatar
from services.getInfo import getInfo
from services.login import login
from services.isUsernameTaken import isUsernameTaken
from services.register import register
from services.dailyActivities import dailyActivities
from services.setActivities import setActivities
from services.getScores import getScores

##
#   Disable default flask logger
#

import logging

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

db = None
config = None

try:
	with open("./config.json", "r") as f:
		config = json.load(f)
except Exception as e:
	logger("ERR", e)
	exit(-1)


def refreshDbConnection():
	global db
	if not isinstance(db, Database) or not db.db_connection_status:
		db = Database(config)


app = Flask(__name__)
refreshDbConnection()


@app.route("/api/getAvatar", methods=["GET"])
def apiGetAvatar():
	refreshDbConnection()
	return getAvatar(db, request)


@app.route("/api/getInfo", methods=["POST"])
def apiGetInfo():
	refreshDbConnection()
	return getInfo(db, request)


@app.route("/api/login", methods=["POST"])
def apiLogin():
	refreshDbConnection()
	return login(db, request)


@app.route("/api/isUsernameTaken", methods=["GET"])
def apiIsUsernameTaken():
	refreshDbConnection()
	return isUsernameTaken(db, request)


@app.route("/api/register", methods=["POST"])
def apiRegister():
	refreshDbConnection()
	return register(db, request)


@app.route("/api/getActivities", methods=["GET"])
def apiDailyAcrivities():
	refreshDbConnection()
	return dailyActivities(db, request)


@app.route("/api/setActivities", methods=["POST"])
def apiSetActivities():
	refreshDbConnection()
	return setActivities(db, request)


@app.route("/api/getScores", methods=["GET"])
def apiGetScores():
	refreshDbConnection()
	return getScores(db, request)


if __name__ == "__main__":
	app.run(port=config["SERVER_PORT"])
