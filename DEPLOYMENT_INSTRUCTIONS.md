# Deployment Instructions for BePresent PWA

## Deploying to Vercel (Recommended)

### Method 1: Using Vercel CLI (Already Installed)

1. **Login to Vercel**
   ```bash
   vercel login
   ```
   This will open your browser. Choose your login method (GitHub, GitLab, Bitbucket, or Email).

2. **Deploy the app**
   ```bash
   cd /Users/xavi.zanatta/Documents/BePresent/gift-finder
   vercel --prod
   ```

3. **Follow the prompts:**
   - Set up and deploy? → **Y**
   - Which scope? → Select your account
   - Link to existing project? → **N**
   - What's your project's name? → **bepresent** (or any name you want)
   - In which directory is your code located? → **.**
   - Want to override the settings? → **N**

4. **Done!**
   - You'll get a URL like: `https://bepresent.vercel.app`
   - Your PWA is now live on the internet!

### Method 2: Using Vercel Website (No CLI needed)

1. **Go to** [https://vercel.com](https://vercel.com)

2. **Sign up/Login** (free account)

3. **Click "Add New Project"**

4. **Import Git Repository** (recommended) or **Deploy from folder**:

   **Option A: Import Git Repository**
   - Push your code to GitHub first:
     ```bash
     cd /Users/xavi.zanatta/Documents/BePresent/gift-finder
     git init
     git add .
     git commit -m "Initial commit - BePresent PWA"
     # Create a new repo on GitHub, then:
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
   - In Vercel, click "Import" next to your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

   **Option B: Deploy pre-built folder**
   - Drag and drop the `dist` folder directly into Vercel
   - Your app will be deployed instantly!

5. **Done!** Your app is live and you'll get a URL.

## Deploying to Netlify (Alternative)

### Using Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd /Users/xavi.zanatta/Documents/BePresent/gift-finder
   netlify deploy --prod
   ```

4. When prompted, select:
   - Create a new site
   - Choose your team
   - Site name: bepresent (or any name)
   - Publish directory: **dist**

### Using Netlify Website

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag and drop the `dist` folder onto the deployment area
4. Done! Get your URL.

## Deploying to GitHub Pages

1. **Push to GitHub**
   ```bash
   cd /Users/xavi.zanatta/Documents/BePresent/gift-finder
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repo on GitHub, then:
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: GitHub Actions
   - The workflow is already configured (`.github/workflows/deploy.yml`)

3. **Push triggers automatic deployment**
   - Every push to main branch will automatically deploy
   - Your site will be at: `https://YOUR_USERNAME.github.io/gift-finder/`

## After Deployment

### Test Your PWA

1. Open your deployed URL in a mobile browser
2. Look for the "Install" or "Add to Home Screen" prompt
3. Install the PWA on your device
4. It should work offline!

### Custom Domain (Optional)

All platforms allow free custom domains:
- **Vercel**: Project Settings → Domains → Add your domain
- **Netlify**: Site Settings → Domain Management → Add custom domain
- **GitHub Pages**: Settings → Pages → Custom domain

### Environment Variables

If you need environment variables later:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **GitHub Pages**: Repo Settings → Secrets and Variables → Actions

## Troubleshooting

### PWA not working offline
- Make sure you're accessing via HTTPS (all platforms provide this automatically)
- Clear browser cache and reload
- Check browser console for service worker errors

### Build fails
- Verify `npm run build` works locally first
- Check build logs on the platform
- Ensure all dependencies are in `package.json`

## Quick Reference

**Current Build:**
- Production files are in: `dist/`
- Service worker: `dist/sw.js`
- Web manifest: `dist/manifest.webmanifest`

**Rebuild if needed:**
```bash
npm run build
```

**Test locally before deploying:**
```bash
npm run preview
```
This will serve the production build at http://localhost:4173

## Next Steps

1. Choose your deployment method above
2. Deploy your app
3. Share the URL!
4. Consider setting up a custom domain
5. Monitor usage with built-in analytics from your platform
