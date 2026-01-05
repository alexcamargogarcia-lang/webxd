const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const MI_TOKEN = process.env.WEBHOOK_TOKEN; 
const DISCORD_URL = process.env.DISCORD_URL; 

app.post('/create-url', async (req, res) => {
    const tokenRecibido = req.body.token;

    // 1. Verificación de seguridad
    if (!tokenRecibido || tokenRecibido !== MI_TOKEN) {
        console.log(`❌ Bloqueado: Recibí [${tokenRecibido}] pero esperaba [${MI_TOKEN}]`);
        return res.status(403).send("Token incorrecto");
    }

    try {
        // 2. Intento de envío
        await axios.post(DISCORD_URL, {
            content: "🚀 **Prueba Final:** El puente Railway-Discord está funcionando."
        });
        
        console.log("✅ ¡MENSAJE ENVIADO A DISCORD!");
        res.status(200).send("Enviado");

    } catch (err) {
        // 3. ESTO ES LO MÁS IMPORTANTE: Nos dirá el error real
        if (err.response) {
            console.error("❌ DISCORD RECHAZÓ EL MENSAJE:", err.response.data);
        } else {
            console.error("❌ ERROR DE CONEXIÓN:", err.message);
        }
        res.status(500).send("Error en el destino final");
    }
});

app.get('/', (req, res) => res.send("Servidor V2 funcionando"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Monitoreo activo"));
