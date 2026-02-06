import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string;
  urgency: string;
  description?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // ✅ Compatible with:
    // 1) { formData }
    // 2) { bookingId, formData, payload }
    const formData: FormData | undefined = body?.formData;
    const bookingId: string | undefined = body?.bookingId;

    if (!formData || !formData.name || !formData.phone) {
      return NextResponse.json(
        { success: false, error: "Données invalides: formData manquant." },
        { status: 400 }
      );
    }

    const EMAIL_USER = process.env.EMAIL_USER || "zaplomberie.pro@gmail.com";
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || "zaplomberie.pro@gmail.com";

    if (!EMAIL_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          error:
            "EMAIL_PASSWORD manquant. Ajoutez un App Password Gmail dans les variables d'environnement.",
        },
        { status: 500 }
      );
    }

    // ✅ Gmail transporter (use App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const refLine = bookingId ? `\n🆔 Référence : ${bookingId}\n` : "\n";

    const emailContent = `
📩 Nouvelle demande d'intervention / devis
${refLine}
👤 Nom : ${formData.name}
📞 Téléphone : ${formData.phone}
📧 E-mail : ${formData.email}
📍 Adresse : ${formData.address}

🔧 Type d'intervention : ${formData.type}
⚠️ Niveau d'urgence : ${formData.urgency}

📝 Description :
${formData.description || "(aucune description renseignée)"}

---
Envoyée depuis ZA Plomberie (site web).
    `.trim();

    const subjectRef = bookingId ? ` (Réf. ${bookingId})` : "";
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_RECIPIENT,
      subject: `Nouvelle demande${subjectRef} - ${formData.type} - ${formData.urgency}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; margin-bottom: 8px;">📩 Nouvelle demande d'intervention / devis</h2>

          ${
            bookingId
              ? `<p style="margin: 0 0 14px; color:#0f172a; background:#e2e8f0; display:inline-block; padding:6px 10px; border-radius:999px; font-size:12px;">
                   <strong>Référence :</strong> ${bookingId}
                 </p>`
              : ""
          }

          <div style="background: #f1f5f9; padding: 18px; border-radius: 10px; margin: 16px 0;">
            <p><strong>👤 Nom :</strong> ${formData.name}</p>
            <p><strong>📞 Téléphone :</strong> ${formData.phone}</p>
            <p><strong>📧 E-mail :</strong> ${formData.email}</p>
            <p><strong>📍 Adresse :</strong> ${formData.address}</p>
            <p><strong>🔧 Type d'intervention :</strong> ${formData.type}</p>
            <p><strong>⚠️ Niveau d'urgence :</strong> ${formData.urgency}</p>
          </div>

          <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin: 16px 0;">
            <p style="margin-top:0;"><strong>📝 Description :</strong></p>
            <p style="white-space: pre-wrap; margin-bottom:0;">${
              formData.description || "(aucune description renseignée)"
            }</p>
          </div>

          <p style="color: #64748b; font-size: 12px; margin-top: 18px;">
            Envoyée depuis ZA Plomberie (site web).
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email route error:", err);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
