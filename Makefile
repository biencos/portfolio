# Portfolio Project Makefile

.PHONY: all help run install start build lint lintfix format format-check test test-coverage test-ci validate clean dev

# Complete development workflow
# Cleans, installs, validates code, then starts dev server
# Detects .env: runs netlify dev (with .env) or mock mode (without .env)
all: clean install lintfix format test-ci validate
	@if [ -f .env ]; then \
		echo "📧 .env found - starting Netlify Functions..."; \
		npx netlify dev; \
	else \
		echo "🎨 No .env found - starting in mock mode..."; \
		REACT_APP_MOCK_MODE=true npm start; \
	fi

# Install dependencies and start development server
run: install all

# Install dependencies
install:
	npm install

# Start development server only (React without backend)
start:
	npm start

# Start Netlify Functions + React development
dev:
	npx netlify dev

# Build for production
build:
	npm run build

# Check code quality
lint:
	npm run lint

# Fix code quality issues
lintfix:
	npm run lint:fix

# Format code
format:
	npm run format

# Check code formatting
format-check:
	npm run format:check

# Run tests
test:
	npm test -- --watchAll=false

# Run tests with coverage
test-coverage:
	npm run test:coverage

# Run tests for CI
test-ci:
	npm run test:ci

# Full validation (for CI and pre-commit checks)
validate: lint format-check test-ci
	@echo "✅ All validation checks passed!"

# Clean build artifacts
clean:
	rm -rf build coverage node_modules/.cache