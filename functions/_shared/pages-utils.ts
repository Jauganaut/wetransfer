/// <reference types="@cloudflare/workers-types" />

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PagesEnv {
  GlobalDurableObject: DurableObjectNamespace;
}

export const ok = <T>(data: T): Response => new Response(JSON.stringify({ success: true, data } as ApiResponse<T>), {
  headers: { 'Content-Type': 'application/json' }
});

export const bad = (error: string): Response => new Response(JSON.stringify({ success: false, error } as ApiResponse), {
  status: 400,
  headers: { 'Content-Type': 'application/json' }
});

export const notFound = (error = 'not found'): Response => new Response(JSON.stringify({ success: false, error } as ApiResponse), {
  status: 404,
  headers: { 'Content-Type': 'application/json' }
});

export const isStr = (s: unknown): s is string => typeof s === 'string' && s.length > 0;