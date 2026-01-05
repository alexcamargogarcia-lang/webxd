const axios = require('axios');

async function enviar() {
    // Construimos la URL manualmente aquí para asegurar que NO haya errores
    const url = process.env.DISCORD_URL.trim().replace(/\/$/, '');
    const token = process.env.WEBHOOK_TOKEN.trim().replace(/^\//, '');
    const webhookFull = `${url}/${token}`;

    console.log("🚀 Intentando envío ultra-limpio...");

    try {
        await axios({
            method: 'post',
            url: webhookFull,
            // IMPORTANTE: Solo 'content'. Si hay algo más, Discord da error 400.
            data: {
                content: "✅ **Sistema Shxdow Activo**\nSi ves este mensaje, la configuración es correcta."
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("✅ ¡ENVIADO CON ÉXITO!");
    } catch (e) {
        console.log("❌ Error persistente:");
        if (e.response) {
            console.log("Datos que recibió Discord:", JSON.stringify(e.response.data));
        } else {
            console.log(e.message);
        }
    }
}

enviar();

// Mantener el proceso vivo para evitar el error SIGTERM de tus logs
setInterval(() => {}, 10000);
