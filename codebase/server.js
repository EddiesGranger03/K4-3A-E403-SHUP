/**
 * VLearn Hub & Spoke Tutor - Local Backend Server
 * Securely manages NVIDIA NIM API Key & serves frontend UI
 * Batch 04 · VinUni AI Thực Chiến 2026
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. Load Environment Variables from .env
function loadEnv() {
  const envPaths = [
    path.join(__dirname, '.env'),
    path.join(__dirname, '..', '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.substring(0, idx).trim();
            const val = trimmed.substring(idx + 1).trim();
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  }
}

loadEnv();

const PORT = process.env.PORT || 3000;
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';
const MODEL_NAME = process.env.MODEL_NAME || 'meta/llama-3.2-11b-vision-instruct';

// 2. MIME Types for Static File Serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

// 3. Create HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Endpoint: Check Server Status
  if (req.method === 'GET' && pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      hasKey: Boolean(NVIDIA_API_KEY),
      provider: 'NVIDIA NIM',
      model: MODEL_NAME
    }));
    return;
  }

  // Endpoint: Proxy AI Chat Request to NVIDIA NIM
  if (req.method === 'POST' && pathname === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { systemPrompt, userQuery, chatHistory } = payload;

        if (!userQuery) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Thiếu userQuery' }));
          return;
        }

        if (!NVIDIA_API_KEY) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Chưa cấu hình NVIDIA_API_KEY trong .env' }));
          return;
        }

        // Build messages with conversation memory
        const messages = [
          {
            role: 'system',
            content: systemPrompt || 'Bạn là AI Tutor VLearn hỗ trợ học tập thông minh, sư phạm và chuẩn mực.'
          }
        ];

        // Append recent conversation history turns
        if (Array.isArray(chatHistory)) {
          const recentTurns = chatHistory.slice(-10);
          for (const msg of recentTurns) {
            if (msg && msg.role && msg.content) {
              const role = msg.role === 'assistant' ? 'assistant' : 'user';
              messages.push({
                role: role,
                content: String(msg.content).slice(0, 1200)
              });
            }
          }
        }

        // Ensure current userQuery is at the end of messages
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg || lastMsg.role !== 'user' || lastMsg.content !== userQuery) {
          messages.push({
            role: 'user',
            content: userQuery
          });
        }

        const nvidiaPayload = {
          model: MODEL_NAME,
          messages: messages,
          max_tokens: 350,
          temperature: 0.2
        };

        console.log('\n================================================================');
        console.log(`🤖 [BACKEND AI CALL] NVIDIA NIM (${MODEL_NAME})`);
        console.log(`📥 [USER QUERY]: "${userQuery}" | History Turns: ${messages.length - 2}`);
        console.log(`📜 [SYSTEM PROMPT]: ${systemPrompt.slice(0, 120)}...`);
        const startTime = Date.now();

        // #4: Server-side 25s timeout so the Node.js process never hangs
        const nvidiaController = new AbortController();
        const nvidiaTimeoutId = setTimeout(() => {
          nvidiaController.abort();
          console.warn(`⏱️ [SERVER TIMEOUT]: NVIDIA NIM request vượt quá 25 giây, abort!`);
        }, 25000);

        const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${NVIDIA_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nvidiaPayload),
          signal: nvidiaController.signal
        });

        clearTimeout(nvidiaTimeoutId);

        const elapsed = Date.now() - startTime;

        if (!nvidiaRes.ok) {
          const errText = await nvidiaRes.text();
          console.error(`❌ [NVIDIA API ERROR HTTP ${nvidiaRes.status}]:`, errText);
          res.writeHead(nvidiaRes.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: errText }));
          return;
        }

        const data = await nvidiaRes.json();
        const replyText = data.choices?.[0]?.message?.content || '';
        
        console.log(`⏱️ [LATENCY]: ${elapsed}ms | STATUS: 200 OK | TOKENS: prompt=${data.usage?.prompt_tokens || 0}, completion=${data.usage?.completion_tokens || 0}, total=${data.usage?.total_tokens || 0}`);
        console.log(`📤 [AI REPLY]: ${replyText.substring(0, 100)}...`);
        console.log('================================================================\n');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          text: replyText,
          engineName: `NVIDIA NIM (${MODEL_NAME})`,
          latencyMs: elapsed,
          rawResponse: data
        }));
      } catch (err) {
        console.error('❌ [BACKEND SERVER ERROR]:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      const headers = { 'Content-Type': contentType };
      if (extname === '.pdf') {
        headers['Content-Disposition'] = 'inline';
        headers['Accept-Ranges'] = 'bytes';
      }
      res.writeHead(200, headers);
      res.end(content);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Cổng ${PORT} đang bị chiếm bởi một tiến trình khác!`);
    console.error(`👉 Gợi ý: Hãy tắt terminal đang chạy server trước đó, hoặc đổi PORT=${PORT + 1} trong file .env nhé.\n`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, () => {
  console.log('\n===========================================================');
  console.log(`🚀 VLearn AI Tutor Backend Server is RUNNING on http://localhost:${PORT}`);
  console.log(`🔑 API Key Security: NVIDIA API Key loaded from .env (Protected by .gitignore)`);
  console.log(`🤖 AI Engine: NVIDIA NIM (${MODEL_NAME})`);
  console.log(`🌐 Open in browser: http://localhost:${PORT}`);
  console.log('===========================================================\n');
});
