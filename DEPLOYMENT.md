# Deployment Guide

## Production Deployment

**Platform:** Netlify  
**URL:** https://portfolio-biencos.netlify.app  
**Auto-deploy:** `main` branch  

## Setup

1. **Connect Repository**
   - Link GitHub repo to Netlify
   - Auto-configuration via `netlify.toml`

2. **Branch Strategy**
   - `main` → Production deployment
   - `dev` → Development/Staging environment
   - Feature branches → Deploy previews

## CI/CD Pipeline

**Quality Gates:**
- ESLint code quality validation
- Prettier formatting checks  
- Production build verification
- Make validation command

**Deploy Process:**
1. Push to `main`/`dev` or PR triggers workflow
2. Quality checks + Build validation must pass  
3. Auto-deployment on success (`main` only)

## Environment

- **Runtime:** Node.js 18.x
- **Build Command:** `npm run build`
- **Publish Directory:** `build/`

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/90aae875-5231-4d4d-83c5-bc08149f1ca2/deploy-status.svg)](https://app.netlify.com/sites/portfolio-biencos/deploys)