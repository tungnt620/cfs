export const apiUrl =
  process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_API_URL_CLIENT_SIDE
    : process.env.NEXT_PUBLIC_BASE_API_URL_SERVER_SIDE;
