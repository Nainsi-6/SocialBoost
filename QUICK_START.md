# Quick Start Guide - 5 Minutes

## What You Got

✅ Professional Instagram services website
✅ Banners that auto-rotate every 5 seconds  
✅ Works perfectly on phones & tablets
✅ Easy to update without coding

---

## See Your Website

### Online (Already Deployed)
Visit your deployed Vercel URL

### Locally
```bash
npm run dev
# Open http://localhost:3000
```

---

## Update Your Banners (Easiest Way)

### Step 1: Open the file
```
/app/api/banners/route.ts
```

### Step 2: Find this section
```javascript
const mockBanners = [
  {
    id: 1,
    title: "WHAT'S NEW..?",
    // ... more fields
  }
];
```

### Step 3: Edit the fields

**Change the title:**
```javascript
title: "YOUR NEW TITLE HERE",
```

**Change the subtitle:**
```javascript
subtitle: "Your promotional message here",
```

**Change button text:**
```javascript
buttonText: "Click Me",
```

**Add a link:**
```javascript
buttonLink: "https://wa.me/919876543210",  // WhatsApp
buttonLink: "/instagram",                   // Your page
buttonLink: "https://example.com",          // External
```

**Add an image:**
```javascript
imageUrl: "https://your-image-url.jpg",
```

**Pick a color:**
```javascript
backgroundColor: "from-orange-400 to-orange-600",
// Other options:
// from-pink-400 to-rose-600
// from-blue-400 to-blue-600
// from-green-400 to-emerald-600
```

### Step 4: Save
File automatically updates!

---

## Add Another Banner

Copy & paste this inside the array:

```javascript
{
  id: 2,
  title: "SUMMER SALE",
  subtitle: "50% off all packages",
  buttonText: "Shop Now",
  buttonLink: "/instagram",
  imageUrl: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=1200&h=400&fit=crop",
  backgroundColor: "from-pink-400 to-rose-600",
  order: 2,
  active: true,
}
```

---

## Hide a Banner

Change `active: false`

```javascript
{
  id: 2,
  title: "...",
  // ... 
  active: false,  // ← Hidden!
}
```

---

## Banner Image Tips

**Get Free Images:**
- Unsplash.com
- Pexels.com
- Pixabay.com

**Right Size:**
- 1200 x 400 pixels (or close)
- JPG or PNG

**Get Link:**
1. Find image on website
2. Right-click → Copy Image Link
3. Paste in imageUrl field

---

## Test on Your Phone

1. Visit website on iPhone/Android
2. Check:
   - ✅ Banner looks nice
   - ✅ Text is readable
   - ✅ Button works
   - ✅ No weird scrolling

---

## Common Questions

**Q: How fast do banners change?**
A: Every 5 seconds (dots at bottom let you click to switch)

**Q: Can I add 5 banners?**
A: Yes! Just add more objects to the array with different IDs (id: 5, id: 6, etc)

**Q: Image won't show?**
A: 
- Copy the full link (like https://...)
- Try a different image
- Make sure the link works in browser

**Q: Where's the blue "Grow Instagram" box?**
A: Removed! (as you requested)

---

## Before You Go Live

- [ ] Test on your iPhone
- [ ] Test on Android
- [ ] Check all banner images load
- [ ] Click all buttons to verify links work
- [ ] Make sure banner colors look good

---

## Need Help?

1. Check `/CLIENT_GUIDE.md` for detailed info
2. Read `/BANNER_SETUP.md` for technical details
3. Contact your developer with questions

---

## Summary

**You can now:**
- 🎪 Create and update banners
- 📱 View perfect on phones
- 🖼️ Add custom images
- 🔗 Link anywhere
- 🎨 Pick colors
- ✅ All without coding!

**That's it! You're ready to go.** 🚀

---

## File Locations

**Banner settings:**
```
/app/api/banners/route.ts (lines 4-28)
```

**Home page:**
```
Visit: /
```

**Admin panel (future):**
```
Visit: /admin/banners
```

---

Good luck! Your website is live and ready! 🎉
