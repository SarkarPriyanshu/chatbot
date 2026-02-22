import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { List, Input, Button } from 'antd';
import { sendMessage } from '../../services/chatApi';
import { setLoading, setError, addMessage } from '../../features/chat/chatSlice';

const { TextArea } = Input;

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useSelector((state: RootState) => state.chat);
  const [input, setInput] = useState('');

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
        id: Date.now().toString(),
        role: 'user' as const,
        content: input,
        createdAt: new Date().toISOString(),
    };
    dispatch(addMessage(userMessage));
    setInput('');

    dispatch(setLoading(true));
    try {
        const res = await sendMessage(input);

        // Backend returns res.data.response (latest assistant message)
        const assistantMessage = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant' as const,
        content: res.data.response,
        createdAt: new Date().toISOString(),
        };
        dispatch(addMessage(assistantMessage));
    } catch (err) {
        dispatch(setError('Failed to send message'));
    } finally {
        dispatch(setLoading(false));
    }
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages container */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px', border: '1px solid #f0f0f0', marginBottom: '8px' }}>
        <List
          dataSource={messages}
          renderItem={msg => (
            <List.Item style={{ justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  background: msg.role === 'user' ? '#1890ff' : '#f0f0f0',
                  color: msg.role === 'user' ? '#fff' : '#000',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  maxWidth: '60%',
                  wordBreak: 'break-word'
                }}
              >
                {msg.content}
              </div>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <TextArea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button
        type="primary"
        onClick={handleSend}
        style={{ marginTop: '8px', alignSelf: 'flex-end' }}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatWindow;