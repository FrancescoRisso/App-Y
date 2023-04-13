from flask import Flask
from flask import request
import json
from log import log as logger

from dbConnection import Database
from services.getAvatar import getAvatar
from services.getInfo import getInfo
from services.login import login

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


if __name__ == "__main__":
	app.run(port=config["SERVER_PORT"])
