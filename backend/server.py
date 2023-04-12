from flask import Flask
from flask import request
import json
from log import log as logger

from dbConnection import Database
from services.getAvatar import getAvatar

##
#   Disable default flask logger
#

import logging

log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

try:
	with open("./config.json", "r") as f:
		config = json.load(f)
	db = Database(config)
except Exception as e:
	logger("ERR", e)
	exit(-1)


app = Flask(__name__)


@app.route("/api/getAvatar", methods=["GET"])
def apiGetAvatar():
	return getAvatar(db, request)


if __name__ == "__main__":
	app.run(port=config["SERVER_PORT"])
