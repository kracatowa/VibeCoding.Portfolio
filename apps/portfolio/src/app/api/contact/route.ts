import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// La clé API vient de votre fichier .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Mapper le sujet
    const subjectMap: Record<string, string> = {
      project: 'Projet de développement',
      consulting: 'Consultation technique',
      job: "Opportunité d'emploi",
      other: 'Autre',
    };

    const subjectText = subjectMap[subject] || subject;

    // En mode dev sans clé API, simulation
    if (!process.env.RESEND_API_KEY) {
      console.log('=== EMAIL SIMULATION (DEV MODE) ===');
      console.log('⚠️  Configurez RESEND_API_KEY dans .env.local');
      console.log('To: ocean.barras@hotmail.com');
      console.log('Subject:', `[Portfolio] ${subjectText} - ${name}`);
      console.log('From:', name, `<${email}>`);
      console.log('Company:', company || 'N/A');
      console.log('Message:', message);
      console.log('=====================================');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message reçu (mode développement)' 
      });
    }

    // Envoi avec Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <contact@votre-domaine.com>', // Remplacez par votre domaine vérifié
      to: ['oce.barras@gmail.com'], // Votre email où recevoir les messages
      replyTo: email,
      subject: `[Portfolio] ${subjectText} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; }
            .footer { background: #1e293b; color: #94a3b8; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nouveau message depuis le portfolio</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nom</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Courriel</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Entreprise</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Sujet</div>
                <div class="value">${subjectText}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">${message}</div>
              </div>
            </div>
            <div class="footer">
              Ce message a été envoyé depuis le formulaire de contact de votre portfolio.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    console.log('✅ Email envoyé avec succès via Resend:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
