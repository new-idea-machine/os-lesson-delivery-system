// https://github.com/codingki/react-native-expo-template/blob/master/template-typescript-bottom-tabs-supabase-auth-flow/src/provider/AuthProvider.tsx
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { createClient } from '@supabase/supabase-js';

if (Platform.OS !== 'web') {
  setupURLPolyfill();
}

const options = {
  auth: {
    localStorage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false
  }
};
// Better put your these secret keys in .env file, not really a secret.
const supabase = createClient(
  'https://pfyhglqdmjozazbxjbvt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeWhnbHFkbWpvemF6YnhqYnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MzY5OTksImV4cCI6MjAwMzUxMjk5OX0.GLgA7gLbIRyklOHpkvHaYfvNcCkkzlXit75e98HlZyo',
  options
);

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
