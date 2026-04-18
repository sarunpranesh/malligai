import { supabase } from './supabase';

export const authService = {
  async getSession() {
    return await supabase.auth.getSession();
  },
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
  async signUp(email, password, fullName) {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
  },
  async signIn(email, password) {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  async signOut() {
    return await supabase.auth.signOut();
  },
  async getProfile(userId) {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }
    return data;
  }
};
