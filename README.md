# 💼 My Professional Portfolio

> Modern, responsive portfolio website built with React.

[![Netlify Status](https://api.netlify.com/api/v1/badges/90aae875-5231-4d4d-83c5-bc08149f1ca2/deploy-status.svg)](https://app.netlify.com/sites/portfolio-biencos/deploys)
[![React](https://img.shields.io/badge/react-18.3.1-blue)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD Pipeline](https://github.com/biencos/portfolio/workflows/🚀%20CI/CD%20Pipeline/badge.svg)](https://github.com/biencos/portfolio/actions)
[![Code Quality](https://github.com/biencos/portfolio/workflows/🔍%20Code%20Quality/badge.svg)](https://github.com/biencos/portfolio/actions)



## ✨ Features

- **Modern Design** - Clean, responsive interface with mobile-first approach
- **Code Quality** - ESLint, Prettier, pre-commit hooks
- **Automated CI/CD** - Quality gates, deployment readiness validation
- **Architecture** - Component-based design following SOLID principles
- **Performance** - Optimized build with lazy loading
- **Security** - Backend-only credentials, zero sensitive data in JavaScript bundle
- **Testing** - Comprehensive test coverage with Jest & React Testing Library


## 🛠️ Tech Stack

**Frontend:** React 18, React Router, React Helmet  
**Backend:** Netlify Functions (serverless)  
**Build:** Create React App, CRACO  
**Quality:** ESLint, Prettier, Husky, GitHub Actions  
**Testing:** React Testing Library, Jest  
**Localization:** Centralized JSON-based i18n system
**Deployment:** Netlify 


## ⚡ Quick Start

```bash
git clone https://github.com/biencos/portfolio.git
cd portfolio
make              # Auto-installs dependencies and starts (detects .env setup)
```

**Or specific commands:**
```bash
npm install       # Install dependencies
npm start         # React dev only (demo mode if no .env)
make dev          # Backend + React (requires .env)
make test         # Run tests
make build        # Production build
```

Open [http://localhost:3000](http://localhost:3000)


## 📋 Scripts

```bash
npm start               # Development server
npm run build           # Production build
npm test                # Run tests
npm run test:coverage   # Test coverage report
npm run test:ci         # CI tests with coverage
npm run lint            # Check code quality
npm run format          # Format with Prettier
npm run validate        # Full validation
```

_Tip: You can use the Makefile commands as shortcuts for common npm scripts._


## 🛠️ Makefile Commands

For convenience, this project includes a Makefile with common development commands:

> **Default:** Running `make` (no arguments) runs the complete workflow: clean → install → lint → format → test → validate → start dev server (smart-detects .env)

```
make                # Complete workflow: clean + install + format + test + validate + start
make run            # Install dependencies and run complete workflow
make install        # Install dependencies only
make start          # React dev server only (ignores .env)
make dev            # Netlify Functions + React (requires .env)
make build          # Production build
make lint           # Check code quality
make lintfix        # Fix linting issues
make format         # Format code with Prettier
make format-check   # Check code formatting
make test           # Run tests
make test-coverage  # Run tests with coverage
make test-ci        # Run tests for CI
make validate       # Full validation (lint + format-check + build + tests)
make clean          # Clean build artifacts
```


## 📁 Structure

```
src/
├── components/              # Reusable UI components
│   ├── ContactForm.js       # Contact form component
│   ├── Contact.js           # Contact page
│   ├── Navbar.js            # Navigation component
│   └── __tests__/           # Component unit tests
├── hooks/                   # Custom React hooks
│   ├── useContactForm.js    # Form state & Netlify Function integration
│   └── useTranslations.js   # i18n hook for accessing locale data
│   └── __tests__/           # Hook tests
├── locales/                 # Translation files
│   └── en.json              # English strings organized by section
├── utils/                   # Shared utilities
│   ├── testUtils.js         # Test helper functions
│   ├── formValidation.js    # Form validation logic
│   └── __tests__/           # Utility tests
├── views/                   # Page components  
│   ├── Home.js              # Homepage
│   ├── ThankYou.js          # Thank you page
│   └── __tests__/           # View integration tests
├── __tests__/               # Integration tests
├── style.css                # Global styles
├── setupTests.js            # Jest configuration
└── index.js                 # App entry point

netlify/
└── functions/
    └── send-email.js        # Backend email service (Netlify Function)
```


## 🏆 Code Quality

- **ESLint + Prettier** for consistent code style
- **React Testing Library** for user-focused testing
- **Pre-commit hooks** prevent bad code
- **GitHub Actions CI** validates code quality and deployment readiness
- **PropTypes** for component validation

**Test Coverage:** 87.42% statements | 77.4% branches | 84.5% functions

Details: [LINTING.md](./LINTING.md)


## 🧪 Testing

**Framework:** React Testing Library + Jest  
**Coverage:** 87.42% statements, 168 tests passing  

```bash
npm test                # Interactive mode
npm run test:coverage   # Coverage report  
npm run test:ci         # CI mode

# Or use Makefile shortcuts
make test               # Run tests
make test-coverage      # Coverage report
make test-ci            # CI mode
```

**Test Structure:**
- `components/__tests__/` - Component unit tests
- `views/__tests__/` - View integration tests  
- `__tests__/` - Integration & E2E tests
- `utils/testUtils.js` - Centralized test utilities

**Principles Applied:**
- **Single Responsibility** - One test per behavior
- **DRY** - Shared utilities eliminate duplication
- **Clean Code** - Descriptive test names, minimal setup


## 🌍 Localization (i18n)

This project implements a scalable, hook-based internationalization (i18n) system for managing all user-facing content strings.

**How It Works:**
```javascript
import { useTranslations } from '../hooks/useTranslations';

export function MyComponent() {
  const t = useTranslations();
  return <h1>{t.navbar.links.home}</h1>;
}
```

**File Organization:**
```
src/
├── locales/
│   └── en.json              # English strings organized by section
├── hooks/
│   └── useTranslations.js   # Hook providing access to locale data
└── utils/
    └── testUtils.js         # Test helpers with getLocale() function
```

**Locale Structure:**
```
en.json
├── site                  # Site-wide strings
├── navbar                # Navigation bar
├── hero                  # Hero section
├── services              # Services section
├── clientFlags           # Client flags section
├── experience            # Experience/employment section
├── contact               # Contact form & section
├── footer                # Footer
├── thankYou              # Thank you page
└── notFound              # 404 page
├── privacyPolicy         # Privacy Policy page
└── termsOfUse            # Terms of Use page
```

**Future Expansion:**
To add a new language, simply create `src/locales/fr.json` with the same structure. Components automatically access the correct locale without changes.

**Testing with Locales:**
```javascript
import { getLocale } from '../utils/testUtils';

const locale = getLocale();
expect(screen.getByText(locale.navbar.links.home)).toBeInTheDocument();
```


## 🚀 Deployment

Automatic deployment via Netlify on push to main branch.

**Live Site**: [View Portfolio](https://portfolio-biencos.netlify.app)
**Pipeline:** GitHub Actions → Quality Checks + Build Validation → Auto-deploy
**Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)


## 👨‍💻 About

Built by **biencos** - [Live Demo](https://portfolio-biencos.netlify.app/) | [GitHub](https://github.com/biencos)


## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

Copyright © 2025 [biencos](https://github.com/biencos)

---

⭐ **Star this repo if you found it helpful!**
Copyright © 2025 [biencos](https://github.com/biencos)
