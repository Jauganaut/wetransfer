interface PagesFunctionContext {
  request: Request;
  env: Record<string, any>;
  params: Record<string, string>;
}

export async function onRequest(context: PagesFunctionContext) {
  const clientIP = context.request.headers.get('CF-Connecting-IP') ||
                   context.request.headers.get('X-Forwarded-For') ||
                   context.request.headers.get('X-Real-IP') ||
                   'unknown';

  return new Response(JSON.stringify({
    success: true,
    data: { ip: clientIP }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}