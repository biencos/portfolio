# Portfolio Project Makefile

.PHONY: all run install start build lint lintfix format format-check validate clean

# Complete development workflow
all: clean install lintfix format validate start

# Install dependencies and start development server
run: install start

# Install dependencies
install:
	npm install

# Start development server (assume dependencies are installed)
start:
	npm start

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

# Full validation (lint + format check + build)
validate:
	npm run validate

# Clean build artifacts
clean:
	rm -rf build/
	rm -rf node_modules/
	npm cache clean --force