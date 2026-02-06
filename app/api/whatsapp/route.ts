import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const to = process.env.WHATSAPP_TO;

    if (!token || !phoneId || !to) {
      console.error('WhatsApp env vars missing');
      return NextResponse.json(
        { success: false, error: 'Configuration serveur incomplète.' },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('WhatsApp API error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Erreur API WhatsApp.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('WhatsApp route error:', err);
    return NextResponse.json(
      { success: false, error: 'Erreur interne serveur.' },
      { status: 500 }
    );
  }
}
