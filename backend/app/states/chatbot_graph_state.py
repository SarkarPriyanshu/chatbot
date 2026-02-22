from langchain_core.messages import AnyMessage
from typing_extensions import Annotated, TypedDict
import operator

class MessagesState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]
    user_latest_message: str