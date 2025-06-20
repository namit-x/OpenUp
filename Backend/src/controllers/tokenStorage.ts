const patientTokenStore: { patientId: string; token: string }[] = [];

// Store token
export const storePatientToken = (patientId: string, token: string) => {
  // Remove existing token if exists
  const index = patientTokenStore.findIndex(t => t.patientId === patientId);
  if (index !== -1) patientTokenStore.splice(index, 1);

  patientTokenStore.push({ patientId, token });
};

// Retrieve token
export const getPatientToken = (patientId: string): string | undefined => {
  const entry = patientTokenStore.find(t => t.patientId === patientId);
  return entry?.token;
};
