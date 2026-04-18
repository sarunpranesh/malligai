import { supabase } from './supabase';
import { loyaltyService } from './loyaltyService';

export const orderService = {
  async placeOrder(userId, cartItems, cartTotal) {
    if (!userId) throw new Error('User not authenticated.');
    
    const { data, error } = await supabase.from('orders').insert([{
      user_id: userId,
      items: cartItems,
      total_price: cartTotal,
      status: 'pending_whatsapp'
    }]).select().single();

    if (error) {
      console.error('Order Error:', error);
      throw new Error(error.message);
    }
    
    // Background increment loyalty
    loyaltyService.incrementVisits(userId).catch(console.error);

    return data;
  },

  async fetchUserOrders(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw new Error(error.message);
    return data || [];
  }
};
