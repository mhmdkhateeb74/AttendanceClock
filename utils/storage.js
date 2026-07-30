import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'attendance_user';
const SHIFTS_KEY = 'attendance_shifts';
const ACTIVE_SHIFT_KEY = 'attendance_active_shift';
const PROFILE_IMAGE_KEY = 'attendance_profile_image';

export const DEFAULT_USER = {
  username: 'kinneret',
  password: '1234',
};

export async function getUser() {
  const value = await AsyncStorage.getItem(USER_KEY);
  if (!value) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
    return DEFAULT_USER;
  }
  return JSON.parse(value);
}

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getShifts() {
  const value = await AsyncStorage.getItem(SHIFTS_KEY);
  return value ? JSON.parse(value) : [];
}

export async function saveShifts(shifts) {
  await AsyncStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
}

export async function getActiveShift() {
  const value = await AsyncStorage.getItem(ACTIVE_SHIFT_KEY);
  return value ? JSON.parse(value) : null;
}

export async function saveActiveShift(shift) {
  await AsyncStorage.setItem(ACTIVE_SHIFT_KEY, JSON.stringify(shift));
}

export async function clearActiveShift() {
  await AsyncStorage.removeItem(ACTIVE_SHIFT_KEY);
}

export async function getProfileImage() {
  return AsyncStorage.getItem(PROFILE_IMAGE_KEY);
}

export async function saveProfileImage(uri) {
  await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri);
}
