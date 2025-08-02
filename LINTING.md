# Code Quality & Linting Setup 

This project uses a comprehensive linting and formatting setup to ensure code quality and consistency.

## Tools & Configuration

### ESLint
- **Purpose**: JavaScript/React code linting and error detection
- **Config**: `.eslintrc.js`
- **Extends**: 
  - `eslint:recommended`
  - `plugin:react/recommended`
  - `plugin:react-hooks/recommended`
  - `prettier` (to disable conflicting rules)

### Prettier
- **Purpose**: Code formatting
- **Config**: `.prettierrc`
- **Settings**: 
  - Single quotes for JS/JSX
  - 2-space indentation
  - Semi-colons enabled
  - 80 character line width

### PropTypes
- **Purpose**: React component prop validation
- **Usage**: Add to all components with props

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
- **PropTypes**: Required for all components
- **Hooks**: Strict hooks rules enforced
- **General**: No unused vars, prefer const, no var

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
├── .eslintrc.js          # ESLint configuration
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

## Troubleshooting

### Common Issues

1. **ESLint errors on commit**: Fix manually or run `npm run lint:fix`
2. **Formatting issues**: Run `npm run format`
3. **Pre-commit hook not working**: Ensure `.husky/pre-commit` is executable

### Force skip hooks (not recommended)
```bash
git commit --no-verify
```
