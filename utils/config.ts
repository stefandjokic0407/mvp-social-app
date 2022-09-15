export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const appUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_API_URL;

export const siteInfo = {
  title: 'totym.com | share the way',
  description: 'Create, request, and share lists with people you trust.',
  image:
    'https://res.cloudinary.com/di9t1lu8j/image/upload/v1642478333/logos/TYM-Logo-Tagline-whitebg-social-share_xcul5m.jpg',
};
