# 💼 My Professional Portfolio

> Modern, responsive portfolio website built with React.

[![Netlify Status](https://api.netlify.com/api/v1/badges/90aae875-5231-4d4d-83c5-bc08149f1ca2/deploy-status.svg)](https://app.netlify.com/sites/portfolio-biencos/deploys)
[![React](https://img.shields.io/badge/react-17.0.2-blue)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD Pipeline](https://github.com/biencos/portfolio/workflows/🚀%20CI/CD%20Pipeline/badge.svg)](https://github.com/biencos/portfolio/actions)
[![Code Quality](https://github.com/biencos/portfolio/workflows/🔍%20Code%20Quality/badge.svg)](https://github.com/biencos/portfolio/actions)



## ✨ Features

- **Modern Design** - Clean, responsive interface with mobile-first approach
- **Code Quality** - ESLint, Prettier, pre-commit hooks
- **Automated CI/CD** - Quality gates, deployment readiness validation
- **Architecture** - Component-based design following SOLID principles
- **Performance** - Optimized build with lazy loading


## 🛠️ Tech Stack

**Frontend:** React 17, React Router, React Helmet  
**Build:** Create React App, CRACO  
**Quality:** ESLint, Prettier, Husky, GitHub Actions  
**Deployment:** Netlify 


## ⚡ Quick Start

```bash
# Clone and install
git clone https://github.com/biencos/portfolio.git
cd portfolio
npm install

# Start development
npm start
```

Open [http://localhost:3000](http://localhost:3000)


## 📋 Scripts

```bash
npm start          # Development server
npm run build      # Production build
npm run lint       # Check code quality
npm run format     # Format with Prettier
npm run validate   # Full validation
```


## 🛠️ Makefile Commands

For convenience, this project includes a Makefile with common development commands:

```
make all          # Complete development workflow (clean, fix, validate, run)
make install      # Install dependencies
make run          # Start development server
make build        # Production build
make lint         # Check code quality
make lintfix      # Fix linting issues
make format       # Format code with Prettier
make format-check # Check code formatting
make validate     # Full quality check (lint + format + build)
make clean        # Clean build artifacts
```

## 📁 Structure

```
src/
├── components/    # Reusable UI components
├── views/         # Page components
├── style.css      # Global styles
└── index.js       # App entry point
```


## 🏆 Code Quality

- **ESLint + Prettier** for consistent code style
- **Pre-commit hooks** prevent bad code
- **GitHub Actions CI** validates code quality and deployment readiness
- **PropTypes** for component validation

Details: [LINTING.md](./LINTING.md)


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
