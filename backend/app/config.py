import os
from dotenv import load_dotenv

# Load .env file if exists
load_dotenv()

# ----------------------
# Database configuration
# ----------------------
DB = {
    "POSTGRES_HOST": os.getenv("DB_HOST", "localhost"),
    "POSTGRES_PORT": os.getenv("DB_PORT", 5432),
    "POSTGRES_DB": os.getenv("DB_NAME", "chatbot_db"),
    "POSTGRES_USER": os.getenv("DB_USER", ""),
    "POSTGRES_PASSWORD": os.getenv("DB_PASSWORD", ""),
}

# ----------------------
# AI Model / API configuration
# ----------------------
MODEL = {
    "api_key": os.getenv("GOOGLE_API_KEY", ""),
    "model_name": os.getenv("MODEL_NAME", "gpt-4"),
}

# ----------------------
# Langfuse / Langsmith
# ----------------------
LANGFUSE = {
    "api_key": os.getenv("LANGFUSE_API_KEY", ""),
    "project": os.getenv("LANGSMITH_PROJECT", "default_project"),
}

# ----------------------
# General / Other parameters
# ----------------------
PARAMS = {
    "log_level": os.getenv("LOG_LEVEL", "INFO"),
}

# ----------------------
# Top-level CONFIG dict
# ----------------------
CONFIG = {
    "DB": DB,
    "MODEL": MODEL,
    "LANGFUSE": LANGFUSE,
    "PARAMS": PARAMS,
}
