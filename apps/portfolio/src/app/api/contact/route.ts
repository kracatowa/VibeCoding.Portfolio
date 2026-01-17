import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Configuration du transporteur email
    // Pour la production, utilisez vos propres identifiants SMTP
    // Exemples de services : SendGrid, Mailgun, Amazon SES, ou SMTP personnel
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@portfolio.com',
      to: 'ocean.barras@hotmail.com',
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
      text: `
Nouveau message depuis le portfolio
====================================

Nom: ${name}
Courriel: ${email}
${company ? `Entreprise: ${company}` : ''}
Sujet: ${subjectText}

Message:
${message}

---
Ce message a été envoyé depuis le formulaire de contact de votre portfolio.
      `,
    };

    // En mode développement, on simule l'envoi
    if (process.env.NODE_ENV === 'development' && !process.env.SMTP_HOST) {
      console.log('=== EMAIL SIMULATION (DEV MODE) ===');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('From:', name, `<${email}>`);
      console.log('Company:', company || 'N/A');
      console.log('Message:', message);
      console.log('=====================================');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message reçu (mode développement)' 
      });
    }

    // Envoi de l'email en production
    await transporter.sendMail(mailOptions);

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
