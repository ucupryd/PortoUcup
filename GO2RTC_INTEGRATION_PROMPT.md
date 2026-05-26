# Go2RTC Dashboard Integration Prompt (Copy/Paste)

Use this prompt with another AI agent. It is framework-agnostic and includes Vite-specific notes only as an option. Replace placeholders with your own values.

---

You are a senior full-stack developer. I need to integrate go2rtc WebRTC streams into my dashboard UI (unknown framework). The go2rtc server is protected by Basic Auth. Build a solution that is reliable on localhost and production.

Constraints and facts:
- go2rtc provides an ES module `video-rtc.js` that exports `VideoRTC` (custom element), but it does NOT auto-register `customElements.define('video-rtc', ...)`.
- `video-rtc` expects `src` to be set as a PROPERTY (not just an attribute), otherwise it may not start the connection.
- Browsers often strip Basic Auth credentials from `wss://user:pass@host/...` for WebSocket, so we must inject the Authorization header via a proxy.
- The UI must show a 6-camera grid (sub streams) and a modal (main stream).

Tasks:
1) Make a local copy of the go2rtc module file and import it as a module (not from /public if the toolchain forbids that).
2) Register the custom element with `customElements.define('video-rtc', VideoRTC)` once.
3) Create a helper component that sets `src` as a PROPERTY on the element.
4) Configure a dev/prod proxy that adds Basic Auth to all WebSocket requests.
5) Use `/proxy/api/ws?src=kamera_X_sub` for grid and `/proxy/api/ws?src=kamera_X` for modal.

Implementation details the agent must follow:

A) Module loading and custom element registration:
- Dynamically import the module and register the element if not present.
- Example:
  import('PATH_TO/video-rtc.js').then(({ VideoRTC }) => {
    if (!customElements.get('video-rtc')) {
      customElements.define('video-rtc', VideoRTC)
    }
  })

B) Property-based src setter:
- Create a small wrapper component that uses a ref and sets `element.src = value` in an effect.
- Pseudocode (React-like):
  function VideoRtc({ src }) {
    const ref = useRef(null)
    useEffect(() => { if (ref.current) ref.current.src = src }, [src])
    return <video-rtc ref={ref} />
  }

C) Proxy with Basic Auth:
- Do NOT hardcode credentials in code. Use env variables:
  GO2RTC_USER
  GO2RTC_PASS
- The proxy must add `Authorization: Basic base64(user:pass)`.
- The proxy must support WebSocket and remove the `/proxy` prefix before forwarding.

D) Grid + modal:
- Grid uses sub streams (kamera_1_sub ... kamera_6_sub).
- Modal uses main stream (kamera_1 ... kamera_6).
- On click, open modal and show the selected camera in larger size.
- Unmount modal on close to avoid leaks.

Framework-specific notes (choose one):

1) If Vite:
- Use `server.proxy` in `vite.config.ts` with `ws: true`.
- Load env with `loadEnv` and build the Basic Auth header.
- Use a rewrite to strip `/go2rtc` prefix.

2) If Next.js:
- Create a custom API route or edge proxy for WebSocket (or use a separate proxy server).
- Ensure it forwards `Authorization` header for WS upgrades.

3) If Express or any Node server:
- Use `http-proxy-middleware` with `ws: true` and set headers.
- Example: `createProxyMiddleware('/go2rtc', { target, changeOrigin, ws: true, pathRewrite })`.

Debugging checklist:
- Network tab must show WS requests to `/proxy/api/ws?src=...` with status 101.
- If only `/?token=...` appears, that is HMR WS, not go2rtc.
- If video-rtc.js loads but no WS appears, the element is not registered or `src` not set as property.
- If WS is 401/403, proxy is not attaching Authorization header.

Deliverables:
- A clean, modular page and components for grid + modal.
- A proxy configuration that works in dev and can be adapted for prod.
- Instructions for env variables and restart steps.

---

Example env file (do not commit real secrets):
GO2RTC_USER=
GO2RTC_PASS=
