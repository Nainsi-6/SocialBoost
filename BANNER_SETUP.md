# Banner Management System

## Overview

Your website now has a dynamic banner system that allows you to manage promotional banners without changing code. Banners automatically rotate on the homepage and can be managed through an admin panel.

## Features

✅ **Dynamic Banner Carousel** - Multiple banners rotate every 5 seconds on homepage
✅ **Fully Responsive** - Optimized for mobile, tablet, and desktop screens
✅ **Admin Panel** - Easy management of banners (create, edit, delete, activate/deactivate)
✅ **Database Integration** - Banners stored in Neon PostgreSQL (ready to use)
✅ **No Code Changes Required** - Update banner content without touching code

## Current Implementation

### Mock Data (Default)
The system currently uses mock data stored in `/app/api/banners/route.ts`. This allows the banner system to work immediately while you set up the database.

### Database Setup (Optional but Recommended)

Once your Neon database is ready, follow these steps:

1. **Run the migration script:**
   ```bash
   psql [your_neon_connection_string] < scripts/init-banners-db.sql
   ```

2. **Update `/app/api/banners/route.ts`** to use database queries instead of mock data:
   ```typescript
   // Replace the mock data fetch with:
   const banners = await db.query(
     'SELECT * FROM banners WHERE active = true ORDER BY "order" ASC'
   );
   ```

## Banner Structure

Each banner contains:

```typescript
{
  id: number;
  title: string;                 // Main heading (e.g., "WHAT'S NEW..?")
  subtitle: string;               // Secondary text
  buttonText: string;             // CTA button text (e.g., "Buy Now Via Whatsapp")
  buttonLink: string;             // Where button links to
  imageUrl: string;              // Background image URL
  backgroundColor: string;        // Tailwind gradient class (e.g., "from-orange-400 to-orange-600")
  order: number;                 // Display order (1, 2, 3...)
  active: boolean;               // Show/hide this banner
}
```

## How to Add New Banners

### Option 1: Via Admin Panel (Coming Soon)
Access `/admin/banners` to create and manage banners with a user interface.

### Option 2: Direct Database Insert
```sql
INSERT INTO banners (title, subtitle, button_text, button_link, image_url, background_color, "order", active)
VALUES (
  'YOUR TITLE',
  'Your subtitle text',
  'Button Text',
  'https://your-link.com',
  'https://image-url.jpg',
  'from-pink-400 to-rose-600',
  2,
  true
);
```

### Option 3: Update Mock Data
Edit `/app/api/banners/route.ts` mockBanners array for quick testing.

## Tailwind Gradient Classes

Use these pre-defined gradients for banners:

- `from-orange-400 to-orange-600` - Orange (promotional)
- `from-pink-400 to-rose-600` - Pink (sale/special)
- `from-blue-400 to-blue-600` - Blue (new feature)
- `from-purple-400 to-purple-600` - Purple (premium)
- `from-green-400 to-emerald-600` - Green (success/special)
- `from-red-400 to-red-600` - Red (urgent/limited)

## Image Recommendations

For best results:
- **Size**: 1200 x 400 pixels (or larger)
- **Format**: JPG or PNG
- **Quality**: High quality, optimized for web
- **Visibility**: Ensure text is readable over the image
- **Alt text**: Descriptive for accessibility

## Mobile Optimization

The banner system is fully optimized for mobile devices:

- **Mobile**: Full-width, single column layout
- **Tablet**: Image hidden, text centered
- **Desktop**: Side-by-side layout with image on left

### Responsive Breakpoints
- `sm`: 640px - Mobile landscape
- `md`: 768px - Tablet
- `lg`: 1024px - Desktop

## API Endpoints

### GET /api/banners
Fetch all active banners
```json
{
  "success": true,
  "data": [{ banner objects }]
}
```

### POST /api/banners (Future)
Create a new banner (requires authentication)

### PATCH /api/banners/:id (Future)
Update banner details

### DELETE /api/banners/:id (Future)
Delete a banner

## Troubleshooting

**Banners not showing?**
- Check if `active: true` in the banner record
- Verify image URL is accessible
- Clear browser cache

**Images not loading on mobile?**
- Check image URL is publicly accessible
- Verify CORS headers if using external images
- Try a different image URL

**Carousel not auto-rotating?**
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify you have more than 1 banner

## Customization

### Change rotation speed
Edit `/components/Banner.tsx` line ~47:
```typescript
5000  // milliseconds (5000 = 5 seconds)
```

### Adjust banner height
Edit `/components/Banner.tsx`:
```typescript
h-48 sm:h-64 md:h-96  // Mobile: 192px, Tablet: 256px, Desktop: 384px
```

### Modify carousel indicators
Update the dot styles in `/components/Banner.tsx` line ~105+

## Support

For questions or issues:
1. Check this documentation first
2. Review the code comments in `/components/Banner.tsx`
3. Check `/app/api/banners/route.ts` for API logic
4. Contact support if database integration needed

## Next Steps

1. ✅ Test banners on mobile devices
2. ⏳ Set up Neon database when ready
3. ⏳ Run database migration script
4. ⏳ Update API route to use database queries
5. ⏳ Access admin panel to manage banners
