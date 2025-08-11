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
**Testing:** React Testing Library, Jest  
**Deployment:** Netlify 


## ⚡ Quick Start

```bash
# Clone and install
git clone https://github.com/biencos/portfolio.git
cd portfolio
```

Then run this project with: 
```bash
# Install dependencies
npm install

# Start development server
npm start
```

Or alternatively use a Makefile command:

```bash
# Install dependencies and start development server
make run
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

> **Note:** Running `make` with no arguments defaults to `make all`.

```
make all            # Complete development workflow (clean + install + ... + start)
make run            # Install dependencies and start development server
make install        # Install dependencies
make start          # Start development server (assume dependencies are installed)
make build          # Production build
make lint           # Check code quality
make lintfix        # Fix linting issues
make format         # Format code with Prettier
make format-check   # Check code formatting
make test           # Run tests
make test-coverage  # Run tests with coverage
make test-ci        # Run tests for CI
make validate       # Full quality check (lint + format-check + test-ci)
make clean          # Clean build artifacts
```


## 📁 Structure

```
src/
├── components/       # Reusable UI components
│   └── __tests__/    # Component unit tests
├── views/            # Page components  
│   └── __tests__/    # View integration tests
├── utils/            # Shared utilities
│   └── testUtils.js  # Test helper functions
├── __tests__/        # Integration tests
├── style.css         # Global styles
└── index.js          # App entry point
```


## 🏆 Code Quality

- **ESLint + Prettier** for consistent code style
- **React Testing Library** for user-focused testing
- **Pre-commit hooks** prevent bad code
- **GitHub Actions CI** validates code quality and deployment readiness
- **PropTypes** for component validation

**Test Coverage:** Components 100% | Views 100% | Overall 100%

Details: [LINTING.md](./LINTING.md)


## 🧪 Testing

**Framework:** React Testing Library + Jest  
**Coverage:** 100% components/views, 100% overall  

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
