# Portfolio Project Makefile

.PHONY: all run install start build lint lintfix format format-check test test-coverage test-ci validate clean

# Complete development workflow
all: clean install lintfix format test-coverage validate start

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

# Run tests
test:
	npm test -- --watchAll=false

# Run tests with coverage
test-coverage:
	npm run test:coverage

# Run tests for CI
test-ci:
	npm run test:ci

# Full validation (for local use only)
validate: lint format-check test-ci
	@echo "✅ All validation checks passed!"

# Clean build artifacts
clean:
	rm -rf build/
	rm -rf node_modules/
	npm cache clean --force