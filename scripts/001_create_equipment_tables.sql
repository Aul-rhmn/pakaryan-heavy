-- Create equipment categories table
CREATE TABLE IF NOT EXISTS equipment_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  category_id UUID REFERENCES equipment_categories(id) ON DELETE CASCADE,
  description TEXT,
  specifications JSONB,
  daily_rate DECIMAL(10,2) NOT NULL,
  weekly_rate DECIMAL(10,2),
  monthly_rate DECIMAL(10,2),
  location VARCHAR(100) NOT NULL,
  availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'rented', 'maintenance')),
  images TEXT[],
  features TEXT[],
  year_manufactured INTEGER,
  brand VARCHAR(100),
  model VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(200),
  company_name VARCHAR(200),
  phone VARCHAR(20),
  address TEXT,
  user_type VARCHAR(20) DEFAULT 'individual' CHECK (user_type IN ('individual', 'company')),
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  delivery_address TEXT,
  special_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for equipment and categories (no RLS needed)
-- These tables are publicly readable for browsing

-- Insert sample equipment categories
INSERT INTO equipment_categories (name, description, icon_name) VALUES
('Excavator', 'Heavy-duty excavators for digging and earthmoving', 'excavator'),
('Bulldozer', 'Powerful bulldozers for land clearing and grading', 'bulldozer'),
('Crane', 'Mobile and tower cranes for lifting operations', 'crane'),
('Loader', 'Wheel and track loaders for material handling', 'loader'),
('Compactor', 'Soil and asphalt compactors for construction', 'compactor');

-- Insert sample equipment
INSERT INTO equipment (name, category_id, description, daily_rate, weekly_rate, monthly_rate, location, brand, model, year_manufactured, features, images) VALUES
('Caterpillar 320D Excavator', 
 (SELECT id FROM equipment_categories WHERE name = 'Excavator'), 
 'Medium-sized hydraulic excavator perfect for construction and excavation work',
 2500000, 15000000, 50000000, 'Jakarta', 'Caterpillar', '320D', 2020,
 ARRAY['GPS Navigation', 'Air Conditioning', 'Hydraulic Hammer Ready', 'Fuel Efficient'],
 ARRAY['/placeholder.svg?height=400&width=600']),
 
('Komatsu D65PX Bulldozer',
 (SELECT id FROM equipment_categories WHERE name = 'Bulldozer'),
 'Heavy-duty bulldozer for large-scale earthmoving and land clearing',
 3000000, 18000000, 60000000, 'Surabaya', 'Komatsu', 'D65PX', 2019,
 ARRAY['Blade Control System', 'ROPS/FOPS Cabin', 'Low Ground Pressure', 'Powerful Engine'],
 ARRAY['/placeholder.svg?height=400&width=600']),
 
('Liebherr LTM 1050 Mobile Crane',
 (SELECT id FROM equipment_categories WHERE name = 'Crane'),
 'All-terrain mobile crane with 50-ton lifting capacity',
 4000000, 24000000, 80000000, 'Bandung', 'Liebherr', 'LTM 1050', 2021,
 ARRAY['50 Ton Capacity', 'All-Terrain', 'Telescopic Boom', 'Outriggers'],
 ARRAY['/placeholder.svg?height=400&width=600']);
