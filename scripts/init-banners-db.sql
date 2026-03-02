-- Create banners table for managing promotional banners
CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),
  button_text VARCHAR(100),
  button_link VARCHAR(500),
  image_url TEXT NOT NULL,
  background_color VARCHAR(50),
  text_color VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample banners
INSERT INTO banners (title, subtitle, button_text, button_link, image_url, background_color, text_color, display_order) VALUES
('What''s New?', 'Now you can place your order easily through WhatsApp!', 'Buy Now Via WhatsApp', 'https://wa.me/919876543210', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80', 'from-orange-400 to-orange-600', 'text-white', 1),
('Discover Instagram Plans', 'Followers, likes, and more.', 'Explore Plans', '/instagram', 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&q=80', 'from-pink-300 to-pink-500', 'text-slate-900', 2),
('Limited Time Offer', 'Get 30% off on all packages this week!', 'Claim Offer', '/instagram', '', 'from-purple-500 to-indigo-600', 'text-white', 3);

-- Create index for faster queries
CREATE INDEX idx_banners_active_order ON banners(is_active, display_order);
