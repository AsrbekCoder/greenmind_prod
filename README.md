# 🌱 GreenMind AI - Landing Page

A modern, professional multi-language landing page for GreenMind AI - an intelligent factory copilot for a low-carbon future.

## 🚀 Features

- **Multi-language Support**: Full internationalization (i18n) for 3 languages:

  - 🇬🇧 English
  - 🇺🇿 Uzbek (O'zbek)
  - 🇷🇺 Russian (Русский)

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)

- **Modern Tech Stack**:

  - ⚡️ Vite - Lightning-fast build tool
  - ⚛️ React 18 - Modern UI framework
  - 📘 TypeScript - Type-safe development
  - 🌍 react-i18next - Internationalization framework
  - 🎨 CSS Modules - Scoped styling

- **AI-Themed Green Design**: Beautiful green color scheme reflecting sustainability and CO₂ reduction focus

- **All Sections Included**:

  - Hero section with CTAs
  - Problem & Solution
  - Team (4 mock members)
  - Why Us
  - Roadmap
  - Approach & Technologies
  - Business Model
  - Request Demo (Telegram integration: @coder_fs)
  - Footer

- **Smooth Navigation**:
  - Sticky header with smooth scroll
  - Mobile-friendly hamburger menu
  - Language switcher with flags
  - Scroll-to-section functionality

## 📦 Installation

The project is already set up and dependencies are installed. If you need to reinstall:

\`\`\`bash
cd greenmind-landing
npm install
\`\`\`

## 🏃‍♂️ Running the Project

### Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at [http://localhost:5173/](http://localhost:5173/)

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
greenmind-landing/
├── src/
│ ├── assets/
│ │ └── images/
│ │ └── logo.png # GreenMind AI logo
│ ├── components/
│ │ ├── common/ # Reusable components
│ │ │ ├── Button/
│ │ │ ├── Card/
│ │ │ ├── Container/
│ │ │ └── LanguageSwitcher/
│ │ ├── layout/ # Layout components
│ │ │ ├── Header/
│ │ │ └── Footer/
│ │ └── sections/ # Page sections
│ │ ├── Hero/
│ │ ├── ProblemSolution/
│ │ ├── Team/
│ │ ├── RequestDemo/
│ │ └── SimpleSections.tsx # WhyUs, Roadmap, Approach, BusinessModel
│ ├── i18n/
│ │ ├── config.ts # i18n configuration
│ │ └── locales/
│ │ ├── en.json # English translations
│ │ ├── uz.json # Uzbek translations
│ │ └── ru.json # Russian translations
│ ├── styles/
│ │ ├── global.css # Global styles
│ │ └── variables.css # CSS variables (colors, spacing, etc.)
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── index.css # Base CSS
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

## 🎨 Design System

### Color Palette

- **Primary Green**: #10B981 (Main brand color)
- **Secondary Blue**: #3B82F6
- **Accent Yellow**: #F59E0B
- **Text Colors**: Gray scale
- **Background**: White and light gray tones

### Typography

- Base font size: 16px
- Responsive headings using `clamp()`
- Line height: 1.6 for body, 1.2 for headings

## 🌍 Changing Languages

The language switcher in the header allows users to switch between:

- English (EN)
- Uzbek (UZ)
- Russian (RU)

The selected language is stored in `localStorage` for persistence.

## ✏️ Editing Content

To edit the content, modify the translation files:

- **English**: `src/i18n/locales/en.json`
- **Uzbek**: `src/i18n/locales/uz.json`
- **Russian**: `src/i18n/locales/ru.json`

## 👥 Team Members

The Team section includes 4 mock team members:

1. Suvonov Asrbek - Founder & Tech Lead
2. Boboqulov Ulug'bek - Data & AI Engineer
3. Doniyor Tuychiyev - Hardware & IoT Engineer
4. Murodova Marjona - Industry & Operations Lead

You can update their details in the translation files.

## 📱 Contact/Demo

The Request Demo section includes a Telegram link:

- **Telegram**: [@coder_fs](https://t.me/coder_fs)

To change the Telegram username, update the link in `src/components/sections/RequestDemo/RequestDemo.tsx`

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🛠️ Customization

### Changing Colors

Edit `src/styles/variables.css` to change the color scheme:

\`\`\`css
:root {
--primary-green: #10B981; /_ Change to your primary color _/
--secondary-blue: #3B82F6; /_ Change to your secondary color _/
/_ ... other variables _/
}
\`\`\`

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add translations to all language files
3. Import and add to `App.tsx`
4. Add navigation link in `Header.tsx`

## 📝 License

© 2024 GreenMind AI. All rights reserved.

---

**Made in Uzbekistan with 💚**

Built with Vite + React + TypeScript + i18next
