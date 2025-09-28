export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Pesan tidak boleh kosong" });
    }

    // 🔑 Langsung taruh token dan chat id di sini
    const TOKEN = "8443308505:AAEI8sofxGufyY6ZVfs7es47XpO5G1q_nVc";
    const CHAT_ID = "7271283790";

    const text = `
━━━━━━━━━━━━━━━
📩 <b>Pesan Baru Masuk</b>
━━━━━━━━━━━━━━━

👤 <b>Nama</b> : ${name?.trim() || "Anonim"}
💬 <b>Pesan</b> :
${message}

🕒 <b>Waktu</b> : ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta"})}
`;

    const telegramURL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const tgResp = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    const data = await tgResp.json();

    if (!data.ok) {
      return res.status(500).json({ error: data.description || "Telegram API error" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
