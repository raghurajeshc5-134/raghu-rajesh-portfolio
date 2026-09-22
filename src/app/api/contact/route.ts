import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Basic rate limiting tracking in memory (per IP, max 5 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();

    // Check rate limit
    const clientLimit = rateLimitMap.get(ip);
    if (clientLimit) {
      if (now - clientLimit.firstRequestTime < RATE_LIMIT_WINDOW) {
        if (clientLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: 'Too many inquiries submitted. Please wait a few minutes before trying again.' },
            { status: 429 }
          );
        }
        clientLimit.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    }

    const body = await req.json();
    const { name, email, company, project_type, budget, message, website_hp } = body;

    // 1. Honeypot anti-spam check
    if (website_hp && website_hp.trim() !== '') {
      // Bot detected, silently accept without processing
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    // 2. Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!project_type || typeof project_type !== 'string' || project_type.trim().length === 0) {
      return NextResponse.json({ error: 'Please select a project type.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Please enter a message of at least 5 characters.' }, { status: 400 });
    }

    // Clean inputs
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 100);
    const sanitizedCompany = (company || '').toString().trim().slice(0, 120);
    const sanitizedProjectType = project_type.trim().slice(0, 80);
    const sanitizedBudget = (budget || '').toString().trim().slice(0, 50);
    const sanitizedMessage = message.trim().slice(0, 3000);
    const submissionTime = new Date().toISOString();
    const readableDate = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 3. Store in Supabase if credentials are provided
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let dbSaved = false;
    if (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http') && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error: dbError } = await supabase.from('inquiries').insert([
          {
            name: sanitizedName,
            email: sanitizedEmail,
            company: sanitizedCompany || null,
            project_type: sanitizedProjectType,
            budget: sanitizedBudget || null,
            message: sanitizedMessage,
            status: 'new',
            created_at: submissionTime,
          },
        ]);

        if (dbError) {
          console.error('[API] Supabase insertion error:', dbError.message);
        } else {
          dbSaved = true;
        }
      } catch (err) {
        console.error('[API] Supabase connection failed:', err);
      }
    }

    // 4. Send Email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'raghurajeshc5@gmail.com';
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || 'onboarding@resend.dev';

    let emailSent = false;
    if (resendApiKey && resendApiKey.startsWith('re_')) {
      try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0e; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #141419; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #18181b 0%, #09090b 100%); padding: 32px 28px; border-bottom: 1px solid #27272a; }
    .badge { display: inline-block; background-color: #9333ea; color: #ffffff; font-weight: 700; font-size: 11px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; letter-spacing: 0.05em; }
    .title { margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; }
    .subtitle { margin: 6px 0 0 0; font-size: 13px; color: #a1a1aa; }
    .content { padding: 28px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #a1a1aa; margin-bottom: 4px; font-weight: 600; }
    .value { font-size: 15px; color: #f4f4f5; font-weight: 500; }
    .message-box { background-color: #0a0a0c; border: 1px solid #27272a; border-radius: 8px; padding: 16px; margin-top: 6px; font-size: 14px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap; }
    .reply-btn { display: inline-block; background-color: #9333ea; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 8px; margin-top: 24px; }
    .footer { padding: 20px 28px; background-color: #09090b; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">New Client Lead</span>
      <h1 class="title">New Inquiry: ${sanitizedName}</h1>
      <p class="subtitle">Submitted on ${readableDate} UTC</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Client Name</div>
        <div class="value">${sanitizedName}</div>
      </div>
      <div class="field">
        <div class="label">Client Email</div>
        <div class="value"><a href="mailto:${sanitizedEmail}" style="color: #d0ff71;">${sanitizedEmail}</a></div>
      </div>
      ${
        sanitizedCompany
          ? `<div class="field">
        <div class="label">Company / Brand</div>
        <div class="value">${sanitizedCompany}</div>
      </div>`
          : ''
      }
      <div class="field">
        <div class="label">Project Type</div>
        <div class="value">${sanitizedProjectType}</div>
      </div>
      ${
        sanitizedBudget
          ? `<div class="field">
        <div class="label">Estimated Budget</div>
        <div class="value">${sanitizedBudget}</div>
      </div>`
          : ''
      }
      <div class="field">
        <div class="label">Project Brief / Message</div>
        <div class="message-box">${sanitizedMessage}</div>
      </div>

      <a href="mailto:${sanitizedEmail}?subject=Re: ${encodeURIComponent(sanitizedProjectType)} Inquiry - Raghu Rajesh" class="reply-btn">Reply to ${sanitizedName} &rarr;</a>
    </div>
    <div class="footer">
      Sent from Raghu Rajesh Portfolio Inquiry Engine
    </div>
  </div>
</body>
</html>
`;

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `Raghu Rajesh Inquiries <${senderEmail}>`,
            to: [receiverEmail],
            reply_to: sanitizedEmail,
            subject: `New Inquiry from ${sanitizedName} — [${sanitizedProjectType}]`,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
        } else {
          const errData = await resendRes.json();
          console.error('[API] Resend API error response:', errData);
        }
      } catch (emailErr) {
        console.error('[API] Resend dispatch error:', emailErr);
      }
    } else {
      console.log('[API Notice] RESEND_API_KEY is not set yet. Inquiry was processed successfully:', {
        name: sanitizedName,
        email: sanitizedEmail,
        project_type: sanitizedProjectType,
        company: sanitizedCompany,
        budget: sanitizedBudget,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Raghu will review and get back to you shortly.',
      dbSaved,
      emailSent,
    });
  } catch (error: unknown) {
    console.error('[API Error] Contact submission handler failure:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again or email directly at raghurajeshc5@gmail.com' },
      { status: 500 }
    );
  }
}
