import CryptoJS from "crypto-js";
import { VITE_ENCRYPTION_SECRET_KEY, VITE_TOKEN_KEY } from "../env";

// ---------------- encryptData ----------------
export const encryptData = (data: object | string) => {
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(
    stringData,
    VITE_ENCRYPTION_SECRET_KEY,
  );
  return encrypted.toString();
};

// ---------------- decryptData ----------------
export const decryptData = (
  encryptedData: string | null,
): object | string | null => {
  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedData, VITE_ENCRYPTION_SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (decrypted) {
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  }
  return null;
};
// ---------------- removeLocalToken ----------------
export const removeLocalToken = () => localStorage.removeItem(VITE_TOKEN_KEY);

// ---------------- saveLocalToken ----------------
export const saveLocalToken = (token: string) => {
  const encryptedToken = encryptData(token);
  localStorage.setItem(VITE_TOKEN_KEY, encryptedToken);
};

// ---------------- getUserToken ----------------
export const getUserToken = () => {
  const raw_token = localStorage.getItem(VITE_TOKEN_KEY);
  if (!raw_token) {
    // throw new Error("No Token found");
    return null;
  }

  const token = decryptData(raw_token);
  if (!token) {
    // throw new Error("No Token found");
    return null;
  }
  return token as string;
};

// ---------------- debounce ----------------
export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 300,
): ((...args: Args) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// LOCATION
export const getLocationFromCoords = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
  );
  const data = await res.json();

  return {
    state: data.address.state,
    district: data.address.city || data.address.town || data.address.county,
  };
};
