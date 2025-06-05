# **App Name**: TERAMOTO

## Core Features:

- Localization Setup: Implements i18n for English and Croatian, including navigation link translations. Sets up middleware for locale detection and redirection, ensuring a localized user experience.
- Global Layout Structure: Establishes a consistent layout using AppShell with a Sidebar for navigation and a Header with a LanguageSwitcher, creating a unified user interface.
- Homepage Design: A landing page that displays TERAMOTO services, calls to action, and key service highlights using clear placeholder content and relevant icons.
- Appointment Details Page: An informational page outlining TERAMOTO's appointment booking services, workshop information, and contact details.
- Marketplace Interface: A grid layout of placeholder product cards in the marketplace page, displaying the name, price, description, and data-ai-hint for demonstration purposes.
- AI-Powered Gear Recommendation: The AI Assistant allows users to find the right equipment with AI recommendation tool. Collects user inputs like Riding Style, Weather Conditions, and Budget and submits the forms.
- User authentication: Components for signing in, signing up and signing out users of the website. Includes proper input validation, and real-time user feedback. The component manages account using email and password with Firebase authentication.

## Style Guidelines:

- Dark gray/black (#121212) to create a modern and sleek look, in keeping with current web design trends.
- Light gray/white (#EDEDED) to provide high contrast on the dark background.
- Gold/yellow (#FF9100) to highlight key elements, evoking the company's established identity (based on the name TERAMOTO) and providing a luxury feel. The HSL values are roughly analogous with orange hues.
- 'Belleza' sans-serif for headlines and shorter text passages. Provides a stylistic reference to high design contexts.
- 'Alegreya' serif for longer text passages, in the unlikely event that longer blocks of text will be included. Provides a highly readable and elegant appearance.
- 'Source Code Pro' monospaced font for displaying code snippets.
- Crisp, simple icons from 'lucide-react' should be used throughout the application to enhance usability without unnecessary visual clutter.
- Use a structured layout with the AppShell component. Sidebars will be collapsable and all core navigation components will stay fixed.
- Subtle, tasteful animations for transitions and interactions to improve the user experience; for instance, fading transitions when new content appears.