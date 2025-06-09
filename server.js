const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

app.post('/send_telegram', async (req, res) => {
    try {
        const tgResp = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, req.body);
        res.json(tgResp.data);
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Error sending to Telegram' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Forward server running on port ${PORT}`));
