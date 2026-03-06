# ArticleHub - Personal Article Management System

A modern article website with authentication, paragraph editing, and free hosting. Only you can edit articles from any device.

## Features

- 📝 **Secure Article Management**: Create and edit articles with authentication
- 🔐 **User Authentication**: Login required to view and edit articles
- ✏️ **Edit Paragraphs**: Update article content from any device
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🌐 **Free Hosting**: Deploy on Vercel (recommended) or any Node.js host
- ⚡ **Real-time Updates**: Changes saved instantly to Firebase

## Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore Database)
- **Hosting**: Vercel (Free)

## Prerequisites

- Node.js 18+ (installed)
- Firebase Account (Free tier works)
- Vercel Account (Free tier works)
- Git (optional, for version control)

## Setup Instructions

### Step 1: Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter project name (e.g., "ArticleHub")
4. Disable Google Analytics (optional)
5. Click "Create project"
6. Wait for project to be created

#### Enable Authentication:
1. Go to **Authentication** → **Sign-in method**
2. Click **Email/Password**
3. Enable both "Email/Password" and "Password less sign-in"
4. Save

#### Enable Firestore Database:
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (or production with proper rules)
4. Choose closest region
5. Click **Enable**

#### Get Firebase Config:
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click "</>" (Web)
4. Register app with name "ArticleHub"
5. Copy the Firebase config object

### Step 2: Configure Environment Variables

1. Open `.env.local` in the project root
2. Replace placeholder values with your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxx
```

### Step 3: Create Test User

1. In Firebase Console, go to **Authentication**
2. Click **Users** tab
3. Click **Add user**
4. Email: `test@example.com`
5. Password: `test123456`
6. Click **Add user**

### Step 4: Create Test Article

1. In Firebase Console, go to **Firestore Database**
2. Click **Start collection**
3. Collection ID: `articles`
4. Document ID: `article-1` (auto-generated OK)
5. Add fields:
   - `title` (string): "My First Article"
   - `content` (string): "This is a sample article. You can edit this from any device!"
   - `author` (string): "test@example.com"
   - `createdAt` (string): Current date/time
   - `updatedAt` (string): Current date/time
6. Click **Save**

### Step 5: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
- Login with: test@example.com / test123456
- Click on article to view
- Click "Edit Article" to make changes

## Deploy to Vercel (Free)

### Option 1: Using Vercel Dashboard (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/article-site.git
   git push -u origin main
   ```

2. Go to [Vercel.com](https://vercel.com/)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - Click "Environment Variables"
   - Add all 6 environment variables from `.env.local`
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
# Follow prompts and add environment variables when asked
```

## Usage

### Login
- Email: `test@example.com`
- Password: `test123456`

### View Articles
- All articles display on home page after login
- Click on any article to view full content

### Edit Articles
- Click "Edit Article" button (only visible to author)
- Update title and content
- Click "Save Changes"
- Changes sync to all devices instantly

### Add More Articles

In Firebase Console:
1. Go to Firestore Database
2. In `articles` collection, click **Add document**
3. Add same fields (title, content, author, createdAt, updatedAt)

## Create Admin User

To create additional users for editing:

1. In Firebase Console → Authentication → Users
2. Click **Add user**
3. Use their email and password
4. Create articles with their email as author

They can then:
- Login with their credentials
- Edit only articles where `author` = their email

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Home page with article list
│   ├── articles/
│   │   └── [id]/
│   │       └── page.tsx    # Article detail and edit page
│   └── globals.css
├── components/
│   ├── LoginForm.tsx       # Login component
│   ├── NavBar.tsx          # Navigation bar
│   ├── LogoutButton.tsx    # Logout button
│   └── EditButton.tsx      # Edit article modal
├── context/
│   └── AuthContext.tsx     # Authentication context
└── lib/
    └── firebase.ts         # Firebase configuration
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

## Free Hosting Options

1. **Vercel** (Recommended) - Optimized for Next.js
   - Free tier: Unlimited deployments
   - Auto-deploy from GitHub

2. **Netlify** - Alternative
   - Free tier: Unlimited static builds
   - Need to export as static

3. **Railway** - Simple deployment
   - Free tier: $5 credit/month
   - Easy GitHub integration

## Firestore Security Rules

For production, add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{article=**} {
      // Anyone can read
      allow read: if true;
      // Only author can write
      allow write: if request.auth.uid != null && 
                      resource.data.author == request.auth.token.email;
    }
  }
}
```

## Troubleshooting

### "Articles not found"
- Check Firestore has `articles` collection
- Verify article documents have required fields

### Login fails
- Verify user created in Firebase Authentication
- Check .env.local has correct Firebase config
- Try test@example.com / test123456

### Changes not saved
- Check Firestore security rules allow writes
- Verify author email matches logged-in user
- Check browser console for errors (F12)

### Deploy fails
- Verify all environment variables in Vercel dashboard
- Check Node.js version (18+)
- Run `npm run build` locally to test

## Next Steps

1. Change test user credentials
2. Add your own articles in Firestore
3. Customize colors in Tailwind config
4. Add categories or tags to articles
5. Set up custom domain on Vercel

## Support

For issues:
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vercel Docs](https://vercel.com/docs)

## License

MIT - Feel free to use for personal projects
