# ArticleHub Setup Guide

## Quick Start (5 minutes)

### 1. Create Firebase Project

Visit [Firebase Console](https://console.firebase.google.com/) and:
- Click **"Create a new project"**
- Name it "ArticleHub"
- Click **"Create project"** (wait ~30 seconds)

### 2. Enable Firebase Services

**Authentication:**
- Left sidebar → **Authentication**
- Click **"Get Started"** or **"Set up sign-in method"**
- Select **"Email/Password"**
- Toggle **"Enable"** both options
- Click **"Save"**

**Firestore Database:**
- Left sidebar → **Firestore Database**
- Click **"Create database"**
- Select **"Start in test mode"**
- Choose closest region (default OK)
- Click **"Create"**

### 3. Get Firebase Config

- Click gear icon (⚙️) → **"Project settings"**
- Scroll to **"Your apps"** section
- Click **"Web" (</> icon)**
- Copy the entire config object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

### 4. Update `.env.local`

Open file: `C:\Users\Arifa\article-site\.env.local`

Copy values from Firebase config above:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcd1234
```

### 5. Create Test User

In Firebase Console:
- **Authentication** → **Users** tab
- Click **"Add user"**
  - Email: `test@example.com`
  - Password: `test123456`
- Click **"Add user"**

### 6. Create Test Article

In Firebase Console:
- **Firestore Database**
- Click **"+ Start collection"**
- Collection ID: `articles`
- Document ID: leave empty (auto-generate)
- Click **"Auto ID"**

Add these fields:
- `title` (string): `My First Article`
- `content` (string): `This is a test article. You can edit this!`
- `author` (string): `test@example.com`
- `createdAt` (timestamp or string): `2026-03-06`
- `updatedAt` (timestamp or string): `2026-03-06`

Click **"Save"**

### 7. Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000
- Login: `test@example.com` / `test123456`
- Click article → Click "Edit Article"
- Make changes → Click "Save Changes"
- Refresh → See updated content!

---

## Deploy to Vercel (5 minutes)

### Option A: GitHub + Vercel (Recommended)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/article-site.git
git push -u origin main
```

**Step 2: Connect to Vercel**
- Visit [Vercel.com](https://vercel.com/)
- Sign up with GitHub
- Click **"New Project"**
- Select **"article-site"** repository
- Click **"Import"**

**Step 3: Add Environment Variables**
- In Vercel dashboard → **"Environment Variables"**
- Add all 6 variables from `.env.local`:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
- Click **"Deploy"**

Done! Your site is live at: `https://article-site-[random].vercel.app`

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow prompts and add environment variables when prompted.

---

## Project Structure

```
article-site/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page (article list)
│   │   ├── layout.tsx            # Root layout with auth
│   │   ├── articles/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Article view & edit
│   │   └── globals.css
│   ├── components/
│   │   ├── LoginForm.tsx         # Login UI
│   │   ├── NavBar.tsx            # Navigation
│   │   ├── LogoutButton.tsx      # Logout button
│   │   └── EditButton.tsx        # Edit modal
│   ├── context/
│   │   └── AuthContext.tsx       # Auth state & logic
│   └── lib/
│       └── firebase.ts           # Firebase config
├── .env.local                     # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## Common Issues

### ❌ "Articles not found"
- Check Firestore collection is named `articles` (case-sensitive)
- Verify documents have all required fields

### ❌ Login fails
- Check user created in Firebase → Authentication → Users
- Verify `.env.local` has correct Firebase config
- Try exact credentials: `test@example.com` / `test123456`

### ❌ Changes don't save
- Check Firestore security rules (test mode should allow all)
- Verify `author` field matches logged-in user's email
- Check browser console (F12) for errors

### ❌ Vercel deployment fails
- Verify all 6 env variables added in Vercel dashboard
- Run `npm run build` locally to test
- Check build logs in Vercel → Deployments → [recent]

---

## Customization

### Change Colors
Edit `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      primary: '#0066ff', // Change blue color
    }
  }
}
```

### Change App Name
1. Edit `src/components/NavBar.tsx` - change "ArticleHub" text
2. Edit `src/app/layout.tsx` - change page title

### Add More Users
Firebase Console → **Authentication** → **"+ Add user"**

Create articles with their email as `author` field.

---

## Production Checklist

- [ ] Changed test credentials (test@example.com)
- [ ] Set Firestore security rules
- [ ] Custom domain set up (optional)
- [ ] Updated README with your app name
- [ ] Added to GitHub for backup

---

## Next Steps

1. ✅ Local testing works
2. ✅ Deploy to Vercel
3. 📝 Add your articles
4. 🎨 Customize colors
5. 👥 Share with authorized users

---

## Need Help?

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vercel Docs](https://vercel.com/docs)
