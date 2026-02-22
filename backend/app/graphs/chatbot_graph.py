from langgraph.graph import START, END, StateGraph
from app.states.chatbot_graph_state import MessagesState
from app.nodes.model_node import model_node
from langgraph.checkpoint.postgres import PostgresSaver
from app.utils.logger import logger  

# create memory store
DB_URI = "postgresql://postgres:postgres@postgres:5432/chatbot_db"

logger.info("Initializing Postgres checkpointer")

# Enter context once (module level)
checkpointer_context = PostgresSaver.from_conn_string(DB_URI)
checkpointer = checkpointer_context.__enter__()

logger.info("Postgres connection established successfully")

# create tables once
logger.info("Setting up Postgres checkpoint tables (if not exists)")
checkpointer.setup()
logger.info("Postgres checkpoint tables ready")

# Build LangGraph
logger.info("Building LangGraph StateGraph")

builder = StateGraph(MessagesState)
builder.add_node("model_node", model_node)
builder.add_edge(START, "model_node")
builder.add_edge("model_node", END)

logger.info("Compiling LangGraph with Postgres checkpointer")
graph = builder.compile(checkpointer=checkpointer)

logger.info("LangGraph compiled successfully and ready to serve requests")