// src/features/chat/chatSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Message type
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

// Conversation type
export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
};

// Chat slice state
type ChatState = {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Set all conversations
    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },

    // Set currently active conversation
    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
      const conv = state.conversations.find(c => c.id === action.payload);
      state.messages = conv ? conv.messages : [];
      state.error = null; // reset error when switching conversations
    },

    // Add a message to the current conversation and message list
    addMessage(state, action: PayloadAction<Message>) {
      const conv = state.conversations.find(c => c.id === state.activeConversationId);
      if (conv) {
        conv.messages = [...conv.messages, action.payload]; // immutable push
      }
      state.messages = [...state.messages, action.payload]; // update UI messages
    },

    // Set loading flag
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    // Set error message
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Exports
export const { setConversations, setActiveConversation, addMessage, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;