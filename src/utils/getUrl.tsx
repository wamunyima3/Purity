export const getURL = (): string => {
  let url = 
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';

  // Ensure the URL starts with 'http'
  if (!url.includes('http')) {
    url = `https://${url}`;
  }

  // Ensure the URL ends with a '/'
  if (url.charAt(url.length - 1) !== '/') {
    url = `${url}/`;
  }

  return url;
};
