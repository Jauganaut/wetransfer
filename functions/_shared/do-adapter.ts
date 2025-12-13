import type { User, Chat, ChatMessage } from "../../shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS } from "../../shared/mock-data";

export class PagesDOAdapter {
  constructor(private env?: any) {}

  async getUsers(): Promise<User[]> {
    // Using mock data for Pages Functions
    // Durable Objects would require a separate Worker
    return MOCK_USERS;
  }

  async createUser(name: string): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: name.trim()
    };
    // In production, you'd save to a database or DO
    return user;
  }

  async getChats(): Promise<Chat[]> {
    return MOCK_CHATS;
  }

  async createChat(title: string): Promise<Chat> {
    const chat: Chat = {
      id: crypto.randomUUID(),
      title: title.trim()
    };
    return chat;
  }

  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    return MOCK_CHAT_MESSAGES.filter(m => m.chatId === chatId);
  }

  async sendMessage(chatId: string, userId: string, text: string): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      chatId,
      userId,
      text: text.trim(),
      ts: Date.now()
    };
    return message;
  }
}