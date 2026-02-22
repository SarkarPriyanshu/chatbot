import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ✅ Add this
from app.graphs.chatbot_graph import graph, checkpointer_context
from app.utils.logger import logger  

app = FastAPI()

# ✅ CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # allow all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],           # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],           # allow any headers
)

logger.info("FastAPI application initialized")

config = {"configurable": {"thread_id": uuid.uuid4().hex[:8]}}


@app.on_event("shutdown")
def cleanup():
    logger.info("Application shutdown initiated. Closing Postgres checkpointer.")
    checkpointer_context.__exit__(None, None, None)
    logger.info("Postgres checkpointer closed successfully.")


@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "Hello World"}


@app.post("/chat")
async def chat_endpoint(payload: dict):
    logger.info("Chat endpoint called")

    user_message = payload.get("user_latest_message", "")

    if not user_message:
        logger.warning("Chat endpoint called without user_latest_message")
        return {"error": "Message is required"}

    logger.info(f"Received user message: {user_message}")

    state_input = {"user_latest_message": user_message}

    logger.info("Invoking LangGraph with latest user message")

    response_state = graph.invoke(state_input, config)

    logger.info("Graph invocation completed successfully")

    messages_content = [m.content for m in response_state["messages"]]

    logger.info("Response prepared and returning to client")

    return {
        "input": user_message,
        "response": messages_content[-1],
        "messages": messages_content
    }