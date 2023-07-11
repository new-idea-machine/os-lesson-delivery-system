// Source: https://supabase.com/docs/guides/getting-started/tutorials/with-expo
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import React, { createContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';

if (Platform.OS !== 'web') {
  setupURLPolyfill();
}

const supabase_URL = Constants.expoConfig.extra.supabaseURL;
const supabase_KeyPublic = Constants.expoConfig.extra.supabaseKEY_PUBLIC;

const options = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
};
const supabase = createClient(supabase_URL, supabase_KeyPublic, options);

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
  }, []);

  const signOut = async () => await supabase.auth.signOut();

  const signInWithEmail = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return error.message;
    } else return 'SignedIn';
  };

  const signUpWithEmail = async (email, password, fullName, phoneNumber) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          phoneNumber
        }
      }
    });

    if (error) {
      return error.message;
    } else return 'SignedUp';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signOut,
        signInWithEmail,
        signUpWithEmail
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
