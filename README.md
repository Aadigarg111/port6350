# Aadi's Portfolio

A modern, responsive portfolio website built with Next.js, featuring smooth animations, interactive components, and a contact form with reCAPTCHA protection.

## Features

- 🎨 **Modern Design**: Clean, professional design with smooth animations
- 📱 **Responsive**: Fully responsive across all devices
- ⚡ **Performance**: Optimized with Next.js and Turbopack
- 🔒 **Contact Form**: Secure contact form with reCAPTCHA protection
- 🎯 **SEO Optimized**: Built with SEO best practices
- 🌟 **Interactive**: Engaging animations and micro-interactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Setup](./ENVIRONMENT_SETUP.md)):
```bash
# Create .env.local file with your configuration
# Copy the example below and fill in your values
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Email Configuration (for Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
CONTACT_EMAIL=your_email@gmail.com
```

See [Environment Setup](./ENVIRONMENT_SETUP.md) for detailed instructions on setting up reCAPTCHA and email functionality.

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── sections/           # Page sections (Hero, About, etc.)
├── lib/               # Utility functions and configurations
├── constants/         # Application constants
└── public/           # Static assets
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
