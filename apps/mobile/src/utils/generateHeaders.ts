export const generateHeaders = async (
  getToken: () => Promise<string | null>
) => {
  const headers = new Map<string, string>();

  const token = await getToken();

  if (token) {
    headers.set("Authorization", token);
  }

  headers.set("Accept", "application/json");

  return Object.fromEntries(headers);
};
