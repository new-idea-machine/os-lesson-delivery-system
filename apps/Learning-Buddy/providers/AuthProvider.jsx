// https://github.com/codingki/react-native-expo-template/blob/master/template-typescript-bottom-tabs-supabase-auth-flow/src/provider/AuthProvider.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import React, { createContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';

if (Platform.OS !== 'web') {
  setupURLPolyfill();
}

const supabase_URL = Constants.manifest.extra.supabaseURL;
const supabase_Key = Constants.manifest.extra.supabaseKEY;

const options = {
  auth: {
    localStorage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false
  }
};
const supabase = createClient(supabase_URL, supabase_Key, options);

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [sessionState, setSessionState] = useState(null);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSessionState(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => await supabase.auth.signOut();

  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return error.message;
    } else return 'SignedIn';
  };

  const handleSignUp = async (email, password, fullName, phoneNumber) => {
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
        session: sessionState,
        signOut,
        signInWithEmail,
        handleSignUp
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
