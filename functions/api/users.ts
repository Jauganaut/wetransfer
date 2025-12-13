/// <reference types="@cloudflare/workers-types" />

import { PagesDOAdapter } from "../_shared/do-adapter";
import type { PagesEnv } from "../_shared/pages-utils";
import { ok, bad, isStr } from "../_shared/pages-utils";

interface PagesFunctionContext {
  request: Request;
  env: PagesEnv;
  params: Record<string, string>;
}

export async function onRequestGet(context: PagesFunctionContext) {
  try {
    const adapter = new PagesDOAdapter(context.env);
    const users = await adapter.getUsers();
    return ok(users);
  } catch (error) {
    return bad('Failed to fetch users');
  }
}

export async function onRequestPost(context: PagesFunctionContext) {
  try {
    const { name } = await context.request.json() as { name?: string };
    if (!name?.trim()) return bad('name required');

    const adapter = new PagesDOAdapter(context.env);
    const user = await adapter.createUser(name);
    return ok(user);
  } catch (error) {
    return bad('Failed to create user');
  }
}