## Vercel Deployment

### 1. GitHub OAuth App (Production)
- Go to github.com/settings/developers → New OAuth App
- Homepage URL: https://jordanvorsterwebsite.online
- Callback URL: https://jordanvorsterwebsite.online/api/auth/callback/github
- Copy Client ID and Client Secret

### 2. Push to GitHub
- git init
- git add .
- git commit -m "init"
- Create repo on GitHub, push

### 3. Import to Vercel
- vercel.com/new → Import your repo
- Framework: Next.js (auto-detected)

### 4. Environment Variables (add in Vercel dashboard)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=        (run: openssl rand -base64 32)
NEXTAUTH_URL=https://jordanvorsterwebsite.online
NEXT_PUBLIC_GITHUB_USERNAME=

### 5. Custom Domain
- Vercel dashboard → your project → Settings → Domains
- Add: jordanvorsterwebsite.online
- Add the DNS records Vercel gives you to your domain registrar
