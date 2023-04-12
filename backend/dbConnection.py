import pymysql


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
		"""Connect to MySQL Database."""
		try:
			if self.__conn is None:
				self.__conn = pymysql.connect(
					host=self.__host, port=self.__port, user=self.__username, passwd=self.__password, db=self.__dbname,
				)
		except pymysql.MySQLError as sqle:
			raise pymysql.MySQLError(f"Failed to connect to the database due to: {sqle}")
		except Exception as e:
			raise Exception(f"An exception occured due to: {e}")

	@property
	def db_connection_status(self):
		"""Returns the connection status"""
		return True if self.__conn is not None else False

	def close_connection(self):
		"""Close the DB connection."""
		try:
			if self.__conn is not None:
				print("Here", self.__conn)
				self.__conn.close()
				self.__conn = None
		except Exception as e:
			raise Exception(f"Failed to close the database connection due to: {e}")

	def run_query(self, query, params=None):
		"""Execute SQL query."""
		try:
			if not query or not isinstance(query, str):
				raise Exception()

			if params is not None and not isinstance(params, tuple):
				print(type(params))
				raise Exception()

			if not self.__conn:
				self.__open_connection()

			with self.__conn.cursor() as cursor:
				cursor.execute(query, params)
				if "SELECT" in query.upper():
					result = cursor.fetchall()
				else:
					self.__conn.commit()
					result = f"{cursor.rowcount} row(s) affected."
				cursor.close()

				return result
		except pymysql.MySQLError as sqle:
			raise pymysql.MySQLError(f"Failed to execute query due to: {sqle}")
		except Exception as e:
			raise Exception(f"An exception occured due to: {e}")
