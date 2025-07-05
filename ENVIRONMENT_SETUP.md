# Environment Setup

This document explains how to set up the environment variables needed for the contact form functionality.

## Required Environment Variables

Create a `.env.local` file in the root directory of your project with the following variables:

### reCAPTCHA Configuration

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site or use an existing one
3. Choose reCAPTCHA v2 "I'm not a robot" Checkbox
4. Add your domain (e.g., `localhost:3000` for development)
5. Copy the Site Key and Secret Key

```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

### Email Configuration (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use your Gmail address and the generated app password

```env
# Email Configuration (for Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
CONTACT_EMAIL=your_email@gmail.com
```

### Optional: SMTP Configuration

If you're not using Gmail, you can configure custom SMTP settings:

```env
# Optional: SMTP Configuration (if not using Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Example .env.local File

```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email Configuration (for Gmail)
EMAIL_USER=yourname@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
CONTACT_EMAIL=yourname@gmail.com
```

## Development vs Production

### Development
- Use `localhost:3000` or `localhost:3001` in reCAPTCHA domain settings
- Use your Gmail app password for email functionality

### Production
- Add your production domain to reCAPTCHA settings
- Consider using a dedicated email service like SendGrid or AWS SES
- Update the domain in reCAPTCHA admin console

## Troubleshooting

### reCAPTCHA Issues
- **"Missing required parameters: sitekey"**: Make sure `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- **"reCAPTCHA verification failed"**: Check that the domain is added to reCAPTCHA settings
- **"reCAPTCHA score too low"**: This is normal for v3, consider using v2 checkbox

### Email Issues
- **"Authentication failed"**: Check your Gmail app password
- **"Invalid credentials"**: Make sure 2FA is enabled and app password is correct
- **"Connection timeout"**: Check your internet connection and firewall settings

### Environment Variables Not Loading
- Make sure the file is named `.env.local` (not `.env`)
- Restart your development server after adding environment variables
- Check that the variables are prefixed correctly (`NEXT_PUBLIC_` for client-side)

## Security Notes

1. **Never commit `.env.local` to version control**
2. **Use app passwords, not your main Gmail password**
3. **Keep your reCAPTCHA secret key secure**
4. **Use environment variables in production deployments**

## Testing

1. Start your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out the form and submit
4. Check your email for the message
5. Verify that the auto-reply was sent

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Add your production domain to reCAPTCHA settings
3. Test the contact form on the live site
4. Monitor email delivery and spam folder 