import { supabase } from './supabase';
import { loyaltyService } from './loyaltyService';

export const bookingService = {
  async reserveTable(userId, bookingDetails) {
    if (!userId) throw new Error('User not authenticated.');

    const { data, error } = await supabase.from('bookings').insert([{
      user_id: userId,
      ...bookingDetails
    }]).select().single();

    if (error) {
      console.error('Booking Error:', error);
      throw new Error(error.message);
    }
    
    // Background increment loyalty
    loyaltyService.incrementVisits(userId).catch(console.error);

    return data;
  },

  async fetchUserBookings(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
      
    if (error) throw new Error(error.message);
    return data || [];
  }
};
