import React, { useEffect } from 'react';
import { Layout, Typography, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { setConversations, setActiveConversation } from '../features/chat/chatSlice';
import Sidebar from '../components/sidebar/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';

const { Sider, Content } = Layout;

const ChatPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, activeConversationId, loading } = useSelector((state: RootState) => state.chat);

  // Mock conversations
  useEffect(() => {
    dispatch(setConversations([
      {
        id: '1',
        title: 'First Chat',
        createdAt: new Date().toISOString(),
        messages: [
          { id: 'm1', role: 'assistant', content: 'Hello! How can I help you?', createdAt: new Date().toISOString() }
        ],
      },
      {
        id: '2',
        title: 'Second Chat',
        createdAt: new Date().toISOString(),
        messages: [],
      }
    ]));
  }, [dispatch]);

  return (
    <Layout style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={300}
        style={{ background: '#fff', borderRight: '1px solid #f0f0f0', height: '100vh' }}
      >
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId || ''}
          onSelect={(id) => dispatch(setActiveConversation(id))}
        />
      </Sider>

      {/* Main Content */}
      <Layout style={{ height: '100%' }}>
        <Content
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* Chat window grows and handles its own scrolling */}
          {activeConversationId ? (
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <ChatWindow />
            </div>
          ) : (
            <Typography.Text>Select a conversation</Typography.Text>
          )}

          {/* Loading spinner */}
          {loading && <Spin style={{ marginTop: 16, alignSelf: 'center' }} />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage;