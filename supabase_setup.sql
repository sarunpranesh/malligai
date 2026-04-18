-- Malligai Restaurant Supabase Setup (v2 Production Ready)

-- 1. Create Profiles Table (Triggered automatically on signup)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 2. Create Loyalty Table
CREATE TABLE public.loyalty (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  visits INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  last_visit TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.loyalty DISABLE ROW LEVEL SECURITY;

-- 3. Create Orders Table
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total_price DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending_whatsapp',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- 4. Create Bookings Table
CREATE TABLE public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.bookings DISABLE ROW LEVEL SECURITY;

-- 5. Trigger to automatically create a profile & loyalty row on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.loyalty (user_id, visits, points)
  VALUES (new.id, 0, 0);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: In Supabase SQL Editor, run this trigger creation:
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Development Environment Configuration:
-- Ensure "Confirm email" is turned OFF in Authentication -> Providers -> Email for testing.
