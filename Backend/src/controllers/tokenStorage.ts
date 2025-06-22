const tokenStore: { id: string; token: string }[] = [];

// Store token
export const storeToken = (id: string, token: string) => {
  // Remove existing token if exists
  const index = tokenStore.findIndex(t => t.id === id);
  if (index !== -1) tokenStore.splice(index, 1);
  tokenStore.push({ id, token });
};

// Retrieve token
export const getToken = (id: string): string | undefined => {
  const entry: any = tokenStore.find(t => String(t.id) === String(id));
  if (!entry) {
    return undefined;
  }
  return entry;
};
