## Deploy to Vercel

### 1. GitHub OAuth Apps — create TWO

**Development:**
- Go to github.com/settings/developers → New OAuth App
- Homepage URL: http://localhost:3000
- Callback URL: http://localhost:3000/api/auth/callback/github
- Copy Client ID and Client Secret → use in `.env.local`

**Production:**
- Go to github.com/settings/developers → New OAuth App
- Homepage URL: https://jordanvorsterwebsite.online
- Callback URL: https://jordanvorsterwebsite.online/api/auth/callback/github
- Copy Client ID and Client Secret → use in Vercel environment variables

### 2. Push to GitHub
```
git init && git add . && git commit -m "init"
```
Create repo on GitHub and push.

### 3. Import on Vercel
vercel.com/new → import repo → Next.js auto-detected

### 4. Environment Variables (Vercel dashboard)
```
GITHUB_CLIENT_ID=        (production OAuth app)
GITHUB_CLIENT_SECRET=    (production OAuth app)
NEXTAUTH_SECRET=         (run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
NEXTAUTH_URL=https://jordanvorsterwebsite.online
NEXT_PUBLIC_GITHUB_USERNAME=golba98
```

### 5. Custom Domain
- Vercel dashboard → project → Settings → Domains
- Add: jordanvorsterwebsite.online
- Copy the DNS records Vercel gives you → add to your domain registrar
