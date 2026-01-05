const axios = require('axios');

// Extraemos las variables tal cual las tienes en Railway
const baseUrl = process.env.DISCORD_URL;
const token = process.env.WEBHOOK_TOKEN;

// Construimos la URL asegurándonos de que haya una sola barra entre ellas
const urlFinal = `${baseUrl.replace(/\/$/, '')}/${token.replace(/^\//, '')}`;

async function enviarMensaje() {
    console.log("🚀 Enviando mensaje limpio a Discord...");
    
    try {
        // IMPORTANTE: Solo enviamos 'content'. 
        // No agregues otros campos que causen el error de 'enum'.
        await axios.post(urlFinal, {
            content: "✅ **Shxdow Security Online**\nEl script ha superado el error de validación y está activo en Railway."
        });

        console.log("✅ ¡MENSAJE ENVIADO CON ÉXITO A DISCORD!");
    } catch (error) {
        console.error("❌ Error en el envío:");
        if (error.response) {
            // Esto nos dirá si Discord sigue rechazando algo
            console.log("Código:", error.response.status);
            console.log("Detalle técnico:", JSON.stringify(error.response.data));
        } else {
            console.log("Error de conexión:", error.message);
        }
    }
}

// Ejecutar al iniciar
enviarMensaje();

// Mantener el proceso vivo para que Railway no lo mate
setInterval(() => {
    console.log("🛰️ Shxdow Script sigue activo...");
}, 60000);
