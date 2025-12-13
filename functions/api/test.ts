interface PagesFunctionContext {
  request: Request;
  env: Record<string, any>;
  params: Record<string, string>;
}

export async function onRequest(context: PagesFunctionContext) {
  return new Response(JSON.stringify({
    success: true,
    data: { name: 'Cloudflare Pages API Demo' }
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}