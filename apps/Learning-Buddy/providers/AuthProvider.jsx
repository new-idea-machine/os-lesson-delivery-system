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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeWhnbHFkbWpvemF6YnhqYnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4MTY4NzAsImV4cCI6MjAwMzM5Mjg3MH0.nMvj03npPEBhUycgz81f6m22uuhr3rl_KFcByQhJZao',
  options
);

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [sessionState, setSessionState] = useState(null);

  useEffect(() => {
    // const getauth = async () => {
    //   const { data: session } = await supabase.auth.getSession();
    //   console.log('getauth session', session);
    //   setSessionState(session);
    //   setUser(session ? true : false);
    // };
    // if (supabase) getauth();

    console.log('use effect in auth');
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        console.log('hello session', session);
        setSessionState(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const signOut = async () => await supabase.auth.signOut();

  const signInWithEmail = async (email, password) => {
    console.log('email', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log(error.message);
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
      console.log(error.message);
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
