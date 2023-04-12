import time

from typing import Literal


def log(type: Literal["ERR", "INFO"], message: str) -> None:
	print(f"{time.strftime('%Y-%m-%d %H:%M:%S').format()} [{type:4}] {message}", flush=True)
