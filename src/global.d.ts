declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SUPABASE_URL: string;
      REACT_APP_SUPABASE_KEY: string;
      REACT_APP_NEXT_PUBLIC_SITE_URL: null;
      REACT_APP_NEXT_PUBLIC_VERCEL_URL: null;
    }
  }

  declare module '*.jpg'
  