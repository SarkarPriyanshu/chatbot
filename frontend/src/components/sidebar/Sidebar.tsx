import React from 'react';
import { List, Avatar } from 'antd';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
};

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string;
  onSelect: (id: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ conversations, activeConversationId, onSelect }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={conversations}
      renderItem={conv => (
        <List.Item
          style={{ background: conv.id === activeConversationId ? '#e6f7ff' : undefined, cursor: 'pointer' }}
          onClick={() => onSelect(conv.id)}
        >
          <List.Item.Meta
            avatar={<Avatar>{conv.title[0]}</Avatar>}
            title={conv.title}
            description={conv.messages.length ? conv.messages[conv.messages.length - 1].content : 'No messages yet'}
          />
        </List.Item>
      )}
    />
  );
};

export default Sidebar;