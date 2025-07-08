# TERAMOTO 🏍️

**AI-Powered Professional Motorcycle Service Platform**

The most advanced digital ecosystem for motorcycle enthusiasts, workshops, and dealers. Featuring AI diagnostics, smart scheduling, predictive maintenance, and comprehensive marketplace integration.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Firebase account

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/skygorilla/teramoto-motorcycle-platform.git
    cd teramoto-motorcycle-platform
    ```

2.  **Set up Environment Variables**
    This is a **critical step** for the application to function. All secret keys and API credentials are managed in an environment file that you must create.

    ➡️ **Please follow the detailed guide here: [./docs/security.md](./docs/security.md)**

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Start development server**
    ```bash
    npm run dev
    ```

Visit `http://localhost:9002` to see the application.

---

## 🌐 Live Deployment

**Production Site**: [tera-moto.hr](https://tera-moto.hr)

**Staging**: [studio--teramoto-yd0q5.us-central1.hosted.app](https://studio--teramoto-yd0q5.us-central1.hosted.app)

This project uses a GitHub Actions workflow for Continuous Deployment. Any push to the `main` branch will automatically build and deploy the application to Firebase App Hosting.

➡️ **See `docs/deployment.md` for details on setting up the required GitHub secrets.**

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


## 📁 Project Structure

```
teramoto-motorcycle-platform/
├── .github/workflows/   # CI/CD pipeline
├── docs/                # Documentation
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utilities and configurations (Firebase, etc.)
│   ├── ai/              # Google Genkit AI integration
│   └── messages/        # Internationalization files
├── .env.example         # Environment variable template
├── firebase.json        # Firebase configuration
└── package.json         # Dependencies and scripts
```

---

## 🔐 Authentication & Security

This application uses Firebase Authentication with Email/Password and Google/Facebook sign-in. All forms are protected by Google reCAPTCHA Enterprise to prevent abuse.

➡️ **For details on setting up API keys and security credentials, see [./docs/security.md](./docs/security.md).**


### Admin Features
- Audio playlist management
- User management
- System monitoring

---

## 🚨 Security

- **API Keys**: Use environment variables (`.env`) for local development. Never commit your `.env` file.
- **Environment Variables for Production**: Use Firebase App Hosting environment settings or GitHub Secrets for deployment.
- **Domain Restrictions**: API keys are restricted to authorized domains in the Firebase and Google Cloud consoles.
- **Authentication**: Firebase Auth with secure token management.

**Security Issues**: Report to info@teramoto.hr

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server (port 9002)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run genkit:dev   # Start Genkit AI development
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

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
