const https = require('https');

// 1. Extraemos y limpiamos manualmente
const baseUrl = process.env.DISCORD_URL.trim().replace(/\/$/, '');
const token = process.env.WEBHOOK_TOKEN.trim().replace(/^\//, '');
const fullPath = `/api/webhooks/${baseUrl.split('/webhooks/')[1]}/${token}`;

const data = JSON.stringify({
    content: "🚀 **PRUEBA DEFINITIVA**\nSi este mensaje llega, el problema eran los headers automáticos."
});

const options = {
    hostname: 'discord.com',
    port: 443,
    path: fullPath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log("🔗 Conectando a:", fullPath.substring(0, 30) + "...");

const req = https.request(options, (res) => {
    console.log(`Código de respuesta: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error("❌ Error de red:", error);
});

req.write(data);
req.end();

// Mantener vivo
setInterval(() => {}, 60000);
