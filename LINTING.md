# Code Quality & Linting Setup 

This project uses a comprehensive linting and formatting setup to ensure code quality and consistency.

## Tools & Configuration

### ESLint
- **Purpose**: JavaScript/React code linting and error detection
- **Config**: `eslint.config.mjs` (ESLint v9 flat config)
- **Extends**: 
  - `@eslint/js` recommended rules
  - `eslint-plugin-react` with React 18 support
  - `eslint-plugin-react-hooks` for hooks validation
  - `eslint-plugin-prettier` integration

### Prettier
- **Purpose**: Code formatting
- **Config**: `.prettierrc`
- **Key Settings**: 
  - Single quotes for strings and JSX (`singleQuote: true`, `jsxSingleQuote: true`)
  - 2-space indentation (`tabWidth: 2`)
  - Semi-colons enabled (`semi: true`)
  - 80 character line width (`printWidth: 80`)
  - Trailing commas for ES5 compatibility (`trailingComma: 'es5'`)
  - Auto line endings (`endOfLine: 'auto'`)

### PropTypes
- **Purpose**: React component prop validation
- **Usage**: Validation warnings for components with props
- **Level**: Warning (not enforced as error)

### Husky + lint-staged
- **Purpose**: Pre-commit hooks for automated quality checks
- **Config**: `.husky/pre-commit` + `lint-staged` in package.json
- **Behavior**: Automatically runs linting and formatting on staged files

### EditorConfig
- **Purpose**: Consistent editor settings across different IDEs
- **Config**: `.editorconfig`

## Available Scripts

```bash
# Run ESLint to check for issues
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is properly formatted
npm run format:check

# Run both linting and format check
npm run check
```

## VSCode Integration

The `.vscode/settings.json` file configures:
- Format on save
- Auto-fix ESLint issues on save
- Proper file encoding and line endings

## Recommended VSCode Extensions

1. **ESLint** - Real-time linting
2. **Prettier** - Code formatting
3. **EditorConfig** - Consistent editor settings

## Rules & Standards

### ESLint Rules
- **React**: `react-in-jsx-scope` disabled (React 17+)
- **PropTypes**: Warnings for missing prop validation
- **React Hooks**: Strict hooks rules enforced (`rules-of-hooks` error, `exhaustive-deps` warning)
- **General**: No unused vars (warn), no console (warn), prefer const (error), no var (error)
- **Test Files**: Console allowed in `*.test.js` and `__tests__/` files

### Prettier Rules
- Single quotes for strings
- JSX single quotes
- Semi-colons required
- Trailing commas (ES5)
- 2-space indentation

## Pre-commit Hooks

Every commit automatically:
1. Runs ESLint with auto-fix on staged JS/JSX files
2. Formats staged files with Prettier
3. Prevents commit if linting errors remain

## File Structure

```
portfolio/
├── eslint.config.mjs     # ESLint v9 flat configuration
├── .prettierrc           # Prettier configuration
├── .prettierignore       # Prettier ignore patterns
├── .editorconfig         # Editor configuration
├── .husky/
│   └── pre-commit        # Pre-commit hook
├── .vscode/
│   └── settings.json     # VSCode workspace settings
└── package.json          # lint-staged configuration
```

## Benefits

- **Consistency**: All code follows the same style
- **Quality**: Catches errors and bad practices early
- **Automation**: No manual formatting needed
- **Team**: Reduces style debates and review time
- **Professional**: Industry-standard tooling and practices
- **Modern Setup**: ESLint v9 flat config with React 18 support
- **Test Security**: Global mocks prevent production API calls during testing
- **Type Safety**: PropTypes validation for all React components

## Troubleshooting

### Common Issues

1. **ESLint errors on commit**: Fix manually or run `npm run lint:fix`
2. **Formatting issues**: Run `npm run format`
3. **Pre-commit hook not working**: Ensure `.husky/pre-commit` is executable

### Force skip hooks (not recommended)
```bash
git commit --no-verify
```
