import { supabase } from './supabase';

export const loyaltyService = {
  async getLoyaltyState(userId) {
    if (!userId) return null;
    
    // First try to fetch the loyalty row
    const { data: fetch, error: fetchError } = await supabase
      .from('loyalty')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code === 'PGRST116') {
      // Row doesn't exist, we should create it (could happen if triggers failed or old user)
      const { data: insert, error: insertError } = await supabase
        .from('loyalty')
        .insert([{ user_id: userId, visits: 0, points: 0 }])
        .select()
        .single();
      
      if (insertError) throw new Error(insertError.message);
      return insert;
    }
    
    if (fetchError) throw new Error(fetchError.message);
    return fetch;
  },

  async incrementVisits(userId) {
    if (!userId) return;
    try {
      // Supabase RPC or simple fetch and update
      const { data: current } = await supabase
        .from('loyalty')
        .select('visits')
        .eq('user_id', userId)
        .single();
        
      const newVisits = (current?.visits || 0) + 1;
      
      await supabase
        .from('loyalty')
        .update({ visits: newVisits, last_visit: new Date().toISOString() })
        .eq('user_id', userId);
    } catch (e) {
      console.error('Failed to increment loyalty:', e);
    }
  }
};
