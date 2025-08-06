# Portfolio Project Makefile

.PHONY: all install run build lint lintfix format format-check validate clean

# Complete development workflow
all: clean lintfix format validate run

# Install dependencies
install:
	npm install

# Start development server
run: install
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