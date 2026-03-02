# Client Guide - Banner Management

## Welcome! 🎉

Your website now has a professional banner system that you can update anytime without technical help.

## What You Have

### ✨ Dynamic Banner Carousel
- Promotional banners automatically rotate on your homepage
- Works perfectly on phones, tablets, and computers
- Change banners, images, and text whenever you want

### 🎨 Modern Design
- Beautiful dark blue theme
- Fully optimized for mobile phones
- Professional look on all devices
- No blue "Grow Instagram" box (removed per your request)

### 🛠️ Easy Management
Currently, banners are managed via simple JSON format. Soon you'll have:
- Admin panel to create/edit/delete banners
- Image upload functionality
- No coding required - just fill in the form

## How to Update Banners Right Now

### Method 1: Quick Edit (Fastest)

1. **Log in or ask your developer to access:**
   ```
   /app/api/banners/route.ts
   ```

2. **Find the mockBanners array:**
   ```javascript
   const mockBanners = [
     {
       id: 1,
       title: "WHAT'S NEW..?",
       subtitle: "NOW YOU CAN PLACE YOUR ORDER EASILY THROUGH WHATSAPP!",
       buttonText: "Buy Now Via Whatsapp",
       buttonLink: "https://wa.me/...",
       // ... etc
     }
   ];
   ```

3. **Edit the fields you want:**
   - `title` - Main heading (large text)
   - `subtitle` - Secondary text
   - `buttonText` - What the button says
   - `buttonLink` - Where button takes people
   - `imageUrl` - Banner image URL
   - `backgroundColor` - Color (see color list below)

4. **Save and your website updates automatically!**

### Banner Colors Available

- `from-orange-400 to-orange-600` - Orange (like FameWala)
- `from-pink-400 to-rose-600` - Pink (sale/special)
- `from-blue-400 to-blue-600` - Blue (new feature)
- `from-purple-400 to-purple-600` - Purple (premium)
- `from-green-400 to-emerald-600` - Green (success)
- `from-red-400 to-red-600` - Red (urgent)

### Banner Order

The `order` number controls which banner shows first:
- `1` = First banner
- `2` = Second banner
- etc.

### Active/Inactive

Set `active: true` to show a banner, `active: false` to hide it.

## Example: Create a New Banner

```javascript
{
  id: 3,
  title: "LIMITED TIME OFFER",
  subtitle: "Get 1000 followers for just ₹99",
  buttonText: "Grab Deal Now",
  buttonLink: "/instagram",
  imageUrl: "https://your-image-url.jpg",
  backgroundColor: "from-pink-400 to-rose-600",
  order: 3,
  active: true,
}
```

## Image Guidelines

**Best image size:** 1200 x 400 pixels

**Where to get images:**
- Unsplash (free) - https://unsplash.com
- Pexels (free) - https://pexels.com
- Canva (design) - https://canva.com
- Your own photos

**Image URL:** Use the full link like `https://example.com/image.jpg`

## Mobile Testing

**Test on your phone:**
1. Open your website on iPhone or Android
2. Check that:
   - Banner displays nicely
   - Text is readable
   - Button is clickable
   - No text overlaps image

## Frequently Asked Questions

**Q: Can I change the banner rotation speed?**
A: Yes! Change `5000` to different milliseconds (5000 = 5 seconds)

**Q: Can I add more than 2 banners?**
A: Yes! Just add more objects to the array

**Q: My image isn't showing - what do I do?**
A: 
1. Check if URL is correct
2. Try a different image
3. Make sure image is publicly accessible

**Q: How do I add a banner that links to WhatsApp?**
A: Use `buttonLink: "https://wa.me/your-phone-number"` (e.g., https://wa.me/919876543210)

**Q: Can I remove the carousel dots?**
A: Yes, your developer can hide them in `/components/Banner.tsx`

## When Database is Ready

Once your database is set up:
1. You'll have a full admin panel at `/admin/banners`
2. You can upload images directly
3. No code editing needed
4. Changes happen instantly

## Need Help?

1. Check this guide first
2. Review examples above
3. Contact your developer with:
   - What you want to change
   - New image URL (if any)
   - New button text/link (if any)

## Checklist for Perfect Banners

- ✅ Title text is attention-grabbing
- ✅ Image is 1200x400px or larger
- ✅ Image URL is correct
- ✅ Button text is clear and action-oriented
- ✅ Button link works correctly
- ✅ Tested on mobile phone
- ✅ Active is set to `true` to show it

---

**You're all set! Your website is ready for mobile users and easy banner management.** 🚀
