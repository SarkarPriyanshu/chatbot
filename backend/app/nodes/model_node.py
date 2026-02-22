from app.llms.google_llm import google_model
from app.states.chatbot_graph_state import MessagesState
from langchain_core.messages import HumanMessage, AIMessage
# from langchain_core.messages.utils 
from app.utils.logger import logger  

def model_node(state: MessagesState):
    logger.info("model_node invoked")

    user_msg = state["user_latest_message"]
    logger.info(f"Received user message: {user_msg}")

    # Only create messages for LLM (old messages + new user message)
    messages_for_llm = state.get("messages", []) + [HumanMessage(content=user_msg)]
    logger.info(f"Messages prepared for LLM invocation (latest appended)")

    # Call LLM
    response = google_model.invoke(messages_for_llm)
    logger.info(f"LLM response received: {response.content}")

    # Return ONLY the latest turn to avoid duplication
    latest_turn = [
        HumanMessage(content=user_msg),
        AIMessage(content=response.content)
    ]
    logger.info("Returning latest turn to graph state")

    return {
        "messages": latest_turn
    }