async function sendTestMessage() {
    console.log("Intentando enviar mensaje a Discord...");
    try {
        const response = await axios.post(fullWebhookUrl, {
            content: "Prueba desde Railway"
        });
        console.log("Respuesta de Discord:", response.status);
    } catch (error) {
        console.log("ERROR DETECTADO:");
        if (error.response) {
            // Discord respondió con un error (ej. 401 Unauthorized o 404 Not Found)
            console.log("Status:", error.response.status);
            console.log("Datos del error:", error.response.data);
        } else {
            // No se pudo ni llegar a Discord
            console.log("Mensaje de error:", error.message);
        }
    }
}
