/**
 * Vercel Edge Middleware — PortLev Learn preview gate.
 * Gates the entire site behind HTTP Basic Auth when env var PREVIEW_GATE=true.
 * Defaults to OFF so production is unaffected unless you opt in.
 *
 * To enable preview gating in the Vercel dashboard:
 *   Project → Settings → Environment Variables
 *   PREVIEW_GATE = true
 *   PREVIEW_USER = caio          (any string)
 *   PREVIEW_PASS = portlev2026   (change this)
 *
 * Then redeploy. Visiting any page prompts for username/password.
 * To unlock the site for the public, set PREVIEW_GATE=false (or delete it) and redeploy.
 *
 * Static assets (svg/css/js/png/etc.) bypass the gate so the login page renders correctly.
 */
export const config = {
  matcher: '/((?!_next|_vercel|_astro|favicon|portlev-logo|pagefind|sitemap|robots|diagrams/.*|.*\\.(?:svg|css|js|mjs|map|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|xml|txt|json)).*)',
};

export default async function middleware(request) {
  if (process.env.PREVIEW_GATE !== 'true') return;

  const auth = request.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      try {
        const decoded = atob(encoded);
        const idx = decoded.indexOf(':');
        const user = decoded.slice(0, idx);
        const pass = decoded.slice(idx + 1);
        const expectedUser = process.env.PREVIEW_USER || 'caio';
        const expectedPass = process.env.PREVIEW_PASS || 'portlev2026';
        if (user === expectedUser && pass === expectedPass) return;
      } catch {}
    }
  }

  return new Response(
    '<!doctype html><html><head><title>PortLev Learn — preview</title><style>body{background:#0c0f17;color:#f4f1e9;font:16px/1.6 system-ui,Inter,sans-serif;padding:3rem 1.5rem;max-width:560px;margin:0 auto;}h1{font-family:Georgia,serif;color:#e2c079;font-weight:600;}code{background:#11151f;padding:.2em .5em;border-radius:6px;color:#e2c079;}</style></head><body><h1>PortLev Learn — preview access</h1><p>This is a gated preview of the Chief AI Officer Program. Your browser should have prompted you for a username and password.</p><p>If you have the credentials, refresh the page and enter them. If you do not, contact Yuri.</p></body></html>',
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="PortLev Learn preview access"',
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  );
}
