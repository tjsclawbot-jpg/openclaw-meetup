# Adding Studio Photos to the Landing Page

## How to Add Your Images

The landing page has placeholders for the Workhorse Collective studio photos. To add the real images:

### Step 1: Add Images to Public Folder
1. Resize your images to ~600x400px (web-optimized)
2. Save them as:
   - `/public/studio-sign.jpg` (H&H sign / entrance)
   - `/public/studio-interior.jpg` (interior workspace)

### Step 2: Update Image URLs
Edit `pages/index.tsx` and change:

```jsx
// Line ~52 - Studio Sign
backgroundImage: "url('/studio-sign.jpg')"

// Line ~65 - Studio Interior  
backgroundImage: "url('/studio-interior.jpg')"
```

### Step 3: Deploy
```bash
git add public/studio-*.jpg pages/index.tsx
git commit -m "Add studio photos"
git push
```

## Styling Applied
- Yellow monochrome overlay (grayscale + sepia)
- Dark overlay (60% brightness, 40% opacity)
- Halftone texture pattern
- Arcade-yellow borders
- Images are secondary to content (not too bright)

The effect makes photos atmospheric without overwhelming the text.
