import mysql.connector


class Database:
	"""Database connection class."""

	def __init__(self, config):
		self.__host = config["DB_HOST"]
		self.__username = config["DB_USER"]
		self.__password = config["DB_PASSWD"]
		self.__port = int(config["DB_PORT"])
		self.__dbname = config["DB_NAME"]
		self.__conn = None
		self.__open_connection()

	def __del__(self):
		self.close_connection()

	def __open_connection(self):
		self.__conn = mysql.connector.connect(
			host=self.__host, database=self.__dbname, user=self.__username, password=self.__password, port=self.__port
		)
		if not self.__conn.is_connected():
			self.__conn = None
			raise Exception("Error while connecting to the database")

	@property
	def db_connection_status(self):
		"""Returns the connection status"""
		return True if (self.__conn is not None and self.__conn.is_connected()) else False

	def close_connection(self):
		if self.__conn is not None:
			self.__conn.close()
			self.__conn = None

	def run_query(self, query, params=None):
		"""Execute SQL query."""
		if not query or not isinstance(query, str):
			raise Exception()

		if params is not None and not isinstance(params, tuple):
			raise Exception()

		if not self.__conn:
			self.__open_connection()

		with self.__conn.cursor() as cursor:
			cursor.execute(query, params)
			if not query.startswith("SELECT"):
				self.__conn.commit()
			return cursor.fetchall()
