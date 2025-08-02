# Portfolio Project Makefile

.PHONY: all install run build lint lintfix format validate clean

# Complete workflow - clean, install, fix, validate, build, then run
all: clean install lintfix format validate build run

# Install dependencies
install:
	npm install

# Start development server
run: lintfix install
	npm start

# Build for production
build: validate
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

# Full validation (lint + format check + tests)
validate:
	npm run validate

# Clean build artifacts
clean:
	rm -rf build/
	rm -rf node_modules/
	npm cache clean --force