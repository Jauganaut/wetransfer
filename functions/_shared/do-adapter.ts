/// <reference types="@cloudflare/workers-types" />

import type { User, Chat, ChatMessage } from "../../shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS } from "../../shared/mock-data";

export class PagesDOAdapter {
  constructor(private env: { GlobalDurableObject: DurableObjectNamespace }) {}

  private getStub(id: string): DurableObjectStub {
    const doId = this.env.GlobalDurableObject.idFromName(id);
    return this.env.GlobalDurableObject.get(doId);
  }

  async getUsers(): Promise<User[]> {
    // For demo purposes, return mock data
    // In production, you'd fetch from DO
    return MOCK_USERS;
  }

  async createUser(name: string): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: name.trim()
    };
    // In production, save to DO
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