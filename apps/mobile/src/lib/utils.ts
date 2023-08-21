export const fetcher = async (url: string, userId: string) => {
  const response = await fetch(url, {
    headers: {
      "User-ID": userId,
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_CLERK_SECRET_KEY}`,
    },
  });

  if (response.ok) return response.json();
  else throw new Error(response.statusText);
};
