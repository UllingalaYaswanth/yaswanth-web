import React, { useRef, useState } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const submitBtnRef = useMagnetic<HTMLButtonElement>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setShowSuccess(false);
    setErrorMsg(null);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const brevoApiKey = import.meta.env.VITE_BREVO_API_KEY;
    const senderName = import.meta.env.VITE_BREVO_SENDER_NAME || 'Yaswanth Portfolio';
    const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL || 'yaswanthullingala@gmail.com';
    const recipientEmail = import.meta.env.VITE_BREVO_RECIPIENT_EMAIL || 'yaswanthullingala@gmail.com';

    if (brevoApiKey && brevoApiKey !== 'your_brevo_api_key_here') {
      try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: senderName,
              email: senderEmail,
            },
            to: [
              {
                email: recipientEmail,
                name: 'Yaswanth Ullingala',
              },
            ],
            replyTo: {
              email: email,
              name: name,
            },
            subject: `Portfolio Contact Form: ${name}`,
            htmlContent: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #2563eb;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f3f4f6; padding: 12px 16px; border-left: 4px solid #2563eb; margin: 0; white-space: pre-wrap;">${message}</blockquote>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `API error (${response.status})`);
        }

        setIsSending(false);
        setShowSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (err: any) {
        console.error('Brevo Email Error:', err);
        setIsSending(false);
        setErrorMsg(err.message || 'Failed to send email. Please check Brevo credentials.');
      }
    } else {
      // Demo fallback if API key is not configured yet
      setTimeout(() => {
        setIsSending(false);
        setShowSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setShowSuccess(false), 5000);
      }, 900);
    }
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section className="section-pad" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Get In Touch & Direct Info */}
          <div>
            <span className="section-tag reveal">Contact</span>
            <h2 className="section-title reveal">Let's build something.</h2>
            <p className="section-sub reveal" style={{ maxWidth: '480px', margin: '14px 0 0' }}>
              Have a project in mind, or just want to talk frontend architecture? My inbox is open.
            </p>
            
            <div className="contact-info-list" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="contact-info-item reveal" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="contact-info-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v16H4z" opacity="0" />
                    <path d="M22 6l-10 7L2 6" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-2)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Me</div>
                  <a href="mailto:yaswanthullingala@gmail.com" className="contact-link" style={{ fontSize: '1.05rem', fontWeight: '600', textDecoration: 'none' }}>
                    yaswanthullingala@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item reveal" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="contact-info-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-2)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Me</div>
                  <a href="tel:+917989608279" className="contact-link" style={{ fontSize: '1.05rem', fontWeight: '600', textDecoration: 'none' }}>
                    +91 7989608279
                  </a>
                </div>
              </div>

              <div className="contact-info-item reveal" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="contact-info-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '.78rem', color: 'var(--text-2)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--navy)' }}>
                    India (IST, UTC+5:30)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="glass contact-card reveal" style={{ width: '100%', maxWidth: '600px' }}>
            <form id="contactForm" ref={formRef} onSubmit={handleSubmit}>
              <div className="field">
                <input type="text" name="name" placeholder=" " required />
                <label>Your name</label>
              </div>
              <div className="field">
                <input type="email" name="email" placeholder=" " required />
                <label>Email address</label>
              </div>
              <div className="field">
                <textarea name="message" placeholder=" " required></textarea>
                <label>Message</label>
              </div>
              
              <button
                ref={submitBtnRef}
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleRipple}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
              
              <div className={`success-check ${showSuccess ? 'show' : ''}`} id="successMsg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Message sent — I'll get back to you soon.
              </div>

              {errorMsg && (
                <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', fontSize: '0.88rem', textAlign: 'center' }}>
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
