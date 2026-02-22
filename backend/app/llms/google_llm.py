import os
from langchain_google_genai import ChatGoogleGenerativeAI
from app.config import CONFIG
from app.utils.logger import logger  

# Load API key and model name
api_key = CONFIG.get("MODEL", {}).get("api_key", "")
model_name = CONFIG.get("MODEL", {}).get("model_name", "")

if not api_key:
    logger.warning("GOOGLE_API_KEY not found in CONFIG")
else:
    logger.info("GOOGLE_API_KEY loaded from CONFIG (hidden for security)")

if not model_name:
    logger.warning("Model name not found in CONFIG")
else:
    logger.info(f"Initializing Google Generative AI model: {model_name}")

# Set environment variable
os.environ["GOOGLE_API_KEY"] = api_key

# Initialize model
google_model = ChatGoogleGenerativeAI(
    model=model_name,
    temperature=1.0
)

logger.info(f"Google Generative AI model '{model_name}' initialized successfully")