# TERAMOTO - Motorcycle Service Platform

🏍️ A comprehensive platform for motorcycle enthusiasts built with Next.js, Firebase, and AI.

## Features

- **Workshop Booking** - Schedule service appointments
- **Parts Marketplace** - Browse and purchase gear
- **AI Gear Advisor** - Intelligent equipment recommendations
- **Vehicle Sales** - Buy/sell motorcycles
- **User Management** - Profile, appointments, and orders

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Firebase Auth
- **Hosting**: Firebase App Hosting
- **AI**: Google Genkit
- **UI**: Shadcn UI + Tailwind CSS
- **Language**: TypeScript
- **i18n**: English & Croatian

## Quick Start

```bash
# Clone repository
git clone git@github.com:skygorilla/teramoto-motorcycle-platform.git
cd teramoto-motorcycle-platform

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env

# Run development server
npm run dev
```

## Environment Variables

Create `.env` file with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=teramoto-yd0q5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=teramoto-yd0q5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=teramoto-yd0q5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
GOOGLE_API_KEY=your_genkit_key
```

## Deployment

**Live Site**: [tera-moto.hr](https://tera-moto.hr)

Deployment is automated via Firebase App Hosting when pushing to `main` branch.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**Before submitting:**
```bash
npm run lint
npm run build
```

## License

Private - All rights reserved