/// <reference types="@cloudflare/workers-types" />

import { PagesDOAdapter } from "../../../_shared/do-adapter";
import type { PagesEnv } from "../../../_shared/pages-utils";
import { ok, bad, notFound, isStr } from "../../../_shared/pages-utils";

interface PagesFunctionContext {
  request: Request;
  env?: any;
  params: Record<string, string>;
}

export async function onRequestGet(context: PagesFunctionContext) {
  try {
    const chatId = context.params.chatId;
    if (!chatId) return bad('chatId required');

    const adapter = new PagesDOAdapter(context.env);
    const messages = await adapter.getChatMessages(chatId);
    return ok(messages);
  } catch (error) {
    return notFound('chat not found');
  }
}

export async function onRequestPost(context: PagesFunctionContext) {
  try {
    const chatId = context.params.chatId;
    if (!chatId) return bad('chatId required');

    const { userId, text } = await context.request.json() as { userId?: string; text?: string };
    if (!isStr(userId) || !text?.trim()) return bad('userId and text required');

    const adapter = new PagesDOAdapter(context.env);
    const message = await adapter.sendMessage(chatId, userId, text);
    return ok(message);
  } catch (error) {
    return bad('Failed to send message');
  }
}