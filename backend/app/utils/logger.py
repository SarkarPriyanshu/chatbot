import logging
import os
from datetime import datetime

# Create logs directory if not exists
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# Filename: YYYY-MM-DD_log_chat.log
log_filename = f"{datetime.now().strftime('%Y-%m-%d')}_log_chat.log"
log_path = os.path.join(LOG_DIR, log_filename)

# Create logger
logger = logging.getLogger("chatbot_logger")
logger.setLevel(logging.INFO)

# Prevent duplicate handlers
if not logger.handlers:

    # File handler
    file_handler = logging.FileHandler(log_path)
    file_handler.setLevel(logging.INFO)

    # Console handler (optional but recommended)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)

    # Log format
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)