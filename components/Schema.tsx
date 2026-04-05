export default function Schema({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fastxera',
  alternateName: 'Fastxera Social Media Growth',
  url: 'https://fastxera.com',
  logo: 'https://res.cloudinary.com/ddb16ch5l/image/upload/v1774126008/logo_fmh1zs.png',
  sameAs: [
    'https://twitter.com/fastxera',
    'https://instagram.com/fastxera',
    'https://facebook.com/fastxera',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-1234567890',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: 'en',
  },
};
