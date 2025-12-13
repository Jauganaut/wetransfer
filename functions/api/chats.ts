/// <reference types="@cloudflare/workers-types" />

import { PagesDOAdapter } from "../_shared/do-adapter";
import type { PagesEnv } from "../_shared/pages-utils";
import { ok, bad, notFound, isStr } from "../_shared/pages-utils";

interface PagesFunctionContext {
  request: Request;
  env: PagesEnv;
  params: Record<string, string>;
}

export async function onRequestGet(context: PagesFunctionContext) {
  try {
    const adapter = new PagesDOAdapter(context.env);
    const chats = await adapter.getChats();
    return ok(chats);
  } catch (error) {
    return bad('Failed to fetch chats');
  }
}

export async function onRequestPost(context: PagesFunctionContext) {
  try {
    const { title } = await context.request.json() as { title?: string };
    if (!title?.trim()) return bad('title required');

    const adapter = new PagesDOAdapter(context.env);
    const chat = await adapter.createChat(title);
    return ok({ id: chat.id, title: chat.title });
  } catch (error) {
    return bad('Failed to create chat');
  }
}