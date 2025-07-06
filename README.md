# TERAMOTO 🏍️

**Professional Motorcycle Service Platform**

A comprehensive digital solution for motorcycle enthusiasts, workshops, and dealers built with modern web technologies.

---

## 🌟 Features

### Core Services
- **🔧 Workshop Booking** - Online appointment scheduling system
- **🛒 Parts Marketplace** - Browse and purchase motorcycle parts & gear
- **🤖 AI Gear Advisor** - Intelligent equipment recommendations
- **🏍️ Vehicle Sales** - Motorcycle buying/selling platform
- **👤 User Dashboard** - Manage profile, orders, and appointments

### Additional Features
- **🎵 Audio Player** - Background music with admin controls
- **🌍 Multi-language** - English & Croatian support
- **📱 Responsive Design** - Mobile-first approach
- **🔐 Secure Authentication** - Firebase Auth with Google Sign-In

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Authentication** | Firebase Auth |
| **Hosting** | Firebase App Hosting |
| **AI** | Google Genkit |
| **Internationalization** | next-intl |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

```bash
# Clone the repository
git clone https://github.com/skygorilla/teramoto-motorcycle-platform.git
cd teramoto-motorcycle-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase credentials

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

---

## ⚙️ Environment Configuration

Create `.env` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=teramoto-yd0q5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=teramoto-yd0q5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=teramoto-yd0q5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=info.teramoto@gmail.com

# Google AI (Genkit)
GOOGLE_API_KEY=your_google_ai_key

# reCAPTCHA (Optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
```

---

## 🌐 Live Deployment

**Production Site**: [tera-moto.hr](https://tera-moto.hr)

**Staging**: [studio--teramoto-yd0q5.us-central1.hosted.app](https://studio--teramoto-yd0q5.us-central1.hosted.app)

### Deployment Process
1. Push to `main` branch
2. Firebase App Hosting automatically builds and deploys
3. Changes are live within 2-3 minutes

---

## 📁 Project Structure

```
teramoto-motorcycle-platform/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and configurations
│   ├── ai/                  # Google Genkit AI integration
│   └── messages/            # Internationalization files
├── public/                  # Static assets
├── firebase.json           # Firebase configuration
└── package.json           # Dependencies and scripts
```

---

## 🔐 Authentication

The platform supports multiple authentication methods:

- **Email/Password** - Traditional registration
- **Google Sign-In** - OAuth integration
- **Admin Panel** - Special admin access at `/admin`

### Admin Features
- Audio playlist management
- User management
- System monitoring

---

## 🌍 Internationalization

Supported languages:
- **English** (en) - Default
- **Croatian** (hr) - Localized

Language switching is automatic based on browser settings or manual selection.

---

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Private-red)

- ✅ **Production Ready**
- ✅ **Mobile Responsive** 
- ✅ **Multi-language Support**
- ✅ **Firebase Integration**
- ✅ **AI-Powered Features**

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run genkit:dev   # Start Genkit AI development
```

---

## 🐛 Known Issues

- **Next-intl deprecation warnings** - Will be resolved in next update
- **DNS propagation** - Custom domain may take 24-48 hours to fully activate
- **API rate limits** - Google AI requests are limited per day

---

## 🔄 Changelog

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Complete authentication system
- ✅ Audio player with admin controls
- ✅ Multi-language support
- ✅ Firebase App Hosting deployment
- ✅ Custom domain setup (tera-moto.hr)

---

## 🚨 Security

- **API Keys**: Never commit API keys to repository
- **Environment Variables**: Use Firebase App Hosting environment settings
- **Domain Restrictions**: API keys are restricted to authorized domains
- **Authentication**: Firebase Auth with secure token management

**Security Issues**: Report to info@teramoto.hr

---

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for speed
- **CDN**: Global Firebase hosting
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes locally

### Before Submitting
```bash
npm run lint      # Check code style
npm run build     # Verify build works
npm run typecheck # TypeScript validation
```

---

## 📄 License

**Private Repository** - All rights reserved

This project is proprietary software. Unauthorized copying, distribution, or modification is prohibited.

---

## 📞 Support

For technical support or business inquiries:

- **Website**: [tera-moto.hr](https://tera-moto.hr)
- **Email**: info@teramoto.hr
- **GitHub Issues**: For bug reports and feature requests

---

## 🏆 Acknowledgments

Built with modern web technologies and best practices for the motorcycle community in Croatia and beyond.

**Powered by**: Next.js, Firebase, Google AI, and the open-source community.