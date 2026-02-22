// src/services/chatApi.ts
import { api } from './axiosInstance.ts'; // ensure the file name is exactly 'axiosinstance.ts' in lowercase
// import type { Message } from '../features/chat/chatSlice'; // okay to keep if you use it later

// Send a message to backend
export const sendMessage = (content: string) => {
  return api.post<{
    input: string;
    response: string;
    messages: string[];
  }>('/chat', {
    user_latest_message: content,
  });
};