import 'react-native-url-polyfill/auto'
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: () => {
    return SecureStore.getItemAsync(key)
  },
  setItem: () => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: () => {
    SecureStore.deleteItemAsync(key)
  },
}

const supabase_URL = Constants.manifest.extra.supabaseURL;
const supabase_Key = Constants.manifest.extra.supabaseKEY_PUBLIC;

export const supabase = createClient(supabase_URL, supabase_Key, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})