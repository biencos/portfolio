# Deployment Guide

## Quick Setup

**Platform:** Netlify | **URL:** https://portfolio-biencos.netlify.app | **Auto-deploy:** `main` branch

### 1. Connect Repository

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect GitHub and select the portfolio repository
4. Netlify auto-detects build config from `netlify.toml`

### 2. Configure Backend Secrets

In **Netlify Dashboard** → Site settings → **Build & Deploy** → **Environment**, add these variables:

| Variable | Value | Type |
|---|---|---|
| `REACT_APP_RESEND_API_KEY` | From https://resend.com | Secret ✓ |
| `REACT_APP_CONTACT_EMAIL` | Your email address | All contexts |
| `REACT_APP_RECAPTCHA_SECRET_KEY` | From Google reCAPTCHA | Secret ✓ |
| `REACT_APP_RECAPTCHA_SITE_KEY` | From Google reCAPTCHA | All contexts |

**Important:** Mark API keys as **Secret** in Netlify dashboard.

### 3. Deploy

Push to `main` branch. Netlify automatically:
1. Runs GitHub Actions (linting + build checks)
2. Builds the project (`npm run build`)
3. Deploys to CDN
4. Activates Netlify Functions with server-side credentials

## Local Development

### With Real Emails (Backend Testing)

**Setup:**
```bash
# Create .env with your credentials
echo "REACT_APP_RESEND_API_KEY=re_xxxxx" > .env
echo "REACT_APP_CONTACT_EMAIL=your@email.com" >> .env
echo "REACT_APP_RECAPTCHA_SECRET_KEY=your_secret" >> .env
```

**Run:**
```bash
make dev              # Start Netlify Functions + React
# OR
netlify dev          # Direct command
```

### Without Emails (Demo Mode)

```bash
make              # Auto-detects .env - runs mock mode if not found
# OR
npm start         # React dev server only
```

## Testing

Tests run in **demo mode** automatically (no credentials needed):
```bash
npm test
npm run test:coverage
npm run test:ci
```

## Architecture

```
Frontend (React)            Backend (Netlify Functions)
    ↓                              ↓
Contact Form         →    reCAPTCHA Verification
Form Submission      →    Resend Email Service
                     →    Google API (verification)
```

- **Frontend:** Zero credentials in JavaScript bundle
- **Backend:** All secrets stored in Netlify dashboard only
- **Security:** Server-side verification for all submissions

## CI/CD Pipeline

**GitHub Actions validates on every commit:**
1. ESLint code quality checks
2. Prettier formatting validation
3. Production build test
4. Test suite execution (168 tests, 87.42% coverage)

**All checks must pass before deployment.**

## Build Configuration

Set in `netlify.toml`:
- **Node.js:** 20.x
- **Build Command:** `npm run build` (CRACO)
- **Publish Directory:** `build/`
- **Functions Directory:** `netlify/functions`

## Troubleshooting

### Build Fails
- Check Netlify build logs in dashboard
- Verify all environment variables are set
- Ensure Node.js version compatibility (20+)

### Email Not Sending
1. Verify backend secrets in Netlify dashboard:
   - `REACT_APP_RESEND_API_KEY` (marked as Secret)
   - `REACT_APP_CONTACT_EMAIL`
   - `REACT_APP_RECAPTCHA_SECRET_KEY` (marked as Secret)
2. Check Netlify Functions logs:
   - Dashboard → Functions → Send Email → Logs
3. Test locally: `make dev` then submit contact form

### reCAPTCHA Fails
1. Verify keys are correct in Netlify dashboard
2. Check domain whitelist in [Google reCAPTCHA console](https://www.google.com/recaptcha/admin)
3. Ensure `portfolio-biencos.netlify.app` is whitelisted

### Function 404 Error
1. Verify `netlify.toml` has `functions = "netlify/functions"`
2. Ensure `netlify/functions/send-email.js` exists
3. Redeploy: `git push origin main`

## Environment Variables Reference

### Local Development (.env file)

Required for `netlify dev` (real emails):
```env
REACT_APP_RESEND_API_KEY=re_xxxxx
REACT_APP_CONTACT_EMAIL=your@email.com
REACT_APP_RECAPTCHA_SECRET_KEY=your_secret_key
REACT_APP_RECAPTCHA_SITE_KEY=your_site_key
```

**Not in `.env`?** Demo mode runs - form submissions logged, no emails sent.

### Production (Netlify Dashboard Only)

Never commit secrets to Git. Set these in Netlify Dashboard only:
- `REACT_APP_RESEND_API_KEY` → Mark as Secret
- `REACT_APP_CONTACT_EMAIL`
- `REACT_APP_RECAPTCHA_SECRET_KEY` → Mark as Secret
- `REACT_APP_RECAPTCHA_SITE_KEY`

**GitHub repo is public** - only public keys visible in code.

## Security Checklist

Before deploying:
- [ ] All backend secrets in Netlify dashboard (never in code)
- [ ] Frontend has zero private credentials
- [ ] `REACT_APP_RECAPTCHA_SECRET_KEY` server-side only
- [ ] `REACT_APP_RESEND_API_KEY` server-side only
- [ ] `.env` file in `.gitignore`
- [ ] `netlify.toml` committed (no secrets in it)

## Verification After Deploy

1. Check Netlify build succeeded (green checkmark)
2. Visit https://portfolio-biencos.netlify.app
3. Test contact form (submit test message)
4. Verify email received
5. Confirm reCAPTCHA validation works

## Resources

- [Netlify Docs](https://docs.netlify.com)
- [Resend Email API](https://resend.com)
- [Google reCAPTCHA](https://www.google.com/recaptcha)
- [GitHub Actions](https://docs.github.com/actions)

---

**Status:** [![Netlify Status](https://api.netlify.com/api/v1/badges/90aae875-5231-4d4d-83c5-bc08149f1ca2/deploy-status.svg)](https://app.netlify.com/sites/portfolio-biencos/deploys)
