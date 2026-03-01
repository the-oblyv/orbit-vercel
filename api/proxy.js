export const config = {
runtime: "edge"
};
const TARGET = "https://orbit.foo.ng";
export default async function handler(req) {
const url = new URL(req.url);
const targetUrl = new URL(url.pathname + url.search, TARGET);
const headers = new Headers(req.headers);
headers.set("host", new URL(TARGET).host);
const response = await fetch(targetUrl.toString(), {
method: req.method,
headers,
body: req.method !== "GET" && req.method !== "HEAD"
? req.body
: undefined,
redirect: "manual"
});
const responseHeaders = new Headers(response.headers);
responseHeaders.delete("content-encoding");
responseHeaders.delete("content-length");
return new Response(response.body, {
status: response.status,
headers: responseHeaders
});
}
