-- Add more equipment items to populate all categories

-- More Excavators
INSERT INTO equipment (name, category_id, description, daily_rate, weekly_rate, monthly_rate, location, brand, model, year_manufactured, features, images) VALUES
('Komatsu PC200-8 Excavator', 
 (SELECT id FROM equipment_categories WHERE name = 'Excavator'), 
 'Versatile mid-size excavator with advanced hydraulic system and fuel efficiency',
 2200000, 13200000, 44000000, 'Semarang', 'Komatsu', 'PC200-8', 2021,
 ARRAY['Eco Mode', 'Auto Idle', 'Hydraulic Quick Coupler', 'LED Work Lights'],
 ARRAY['/images/excavator-2.jpg', '/images/excavator-1.jpg']),

('Volvo EC380E Excavator',
 (SELECT id FROM equipment_categories WHERE name = 'Excavator'),
 'Large excavator with superior digging force and operator comfort',
 3200000, 19200000, 64000000, 'Medan', 'Volvo', 'EC380E', 2020,
 ARRAY['Care Track System', 'Climate Control', 'Boom Suspension', 'Fuel Efficiency'],
 ARRAY['/images/excavator-3.jpg', '/images/excavator-2.jpg']),

('Hitachi ZX200-6 Excavator',
 (SELECT id FROM equipment_categories WHERE name = 'Excavator'),
 'Reliable excavator with excellent fuel economy and low maintenance costs',
 2300000, 13800000, 46000000, 'Yogyakarta', 'Hitachi', 'ZX200-6', 2019,
 ARRAY['HIOS III System', 'Auto Idle Stop', 'Reinforced Structure', 'Easy Maintenance'],
 ARRAY['/images/excavator-1.jpg', '/images/excavator-3.jpg']);

-- More Bulldozers  
INSERT INTO equipment (name, category_id, description, daily_rate, weekly_rate, monthly_rate, location, brand, model, year_manufactured, features, images) VALUES
('Caterpillar D6T Bulldozer',
 (SELECT id FROM equipment_categories WHERE name = 'Bulldozer'),
 'Medium bulldozer with advanced blade control and excellent maneuverability',
 2800000, 16800000, 56000000, 'Palembang', 'Caterpillar', 'D6T', 2020,
 ARRAY['Blade Assist', 'Differential Steering', 'ROPS/FOPS', 'Eco Mode'],
 ARRAY['/images/bulldozer-2.jpg', '/images/bulldozer-1.jpg']),

('John Deere 850K Bulldozer',
 (SELECT id FROM equipment_categories WHERE name = 'Bulldozer'),
 'Powerful crawler dozer with intelligent blade control system',
 3200000, 19200000, 64000000, 'Makassar', 'John Deere', '850K', 2021,
 ARRAY['SmartGrade Ready', 'PowerTech Engine', 'Sealed Track', 'CommandView Cab'],
 ARRAY['/images/bulldozer-3.jpg', '/images/bulldozer-2.jpg']);

-- More Cranes
INSERT INTO equipment (name, category_id, description, daily_rate, weekly_rate, monthly_rate, location, brand, model, year_manufactured, features, images) VALUES
('Grove RT540E Rough Terrain Crane',
 (SELECT id FROM equipment_categories WHERE name = 'Crane'),
 '40-ton rough terrain crane perfect for construction sites',
 3500000, 21000000, 70000000, 'Denpasar', 'Grove', 'RT540E', 2020,
 ARRAY['40 Ton Capacity', 'Rough Terrain', '94 ft Boom', 'CCS Controls'],
 ARRAY['/images/crane-2.jpg', '/images/crane-1.jpg']),

('Tadano GR-1000XL Crane',
 (SELECT id FROM equipment_categories WHERE name = 'Crane'),
 'All-terrain crane with exceptional lifting performance',
 4500000, 27000000, 90000000, 'Balikpapan', 'Tadano', 'GR-1000XL', 2019,
 ARRAY['100 Ton Capacity', 'All-Terrain', 'HELLO-NET', 'AML-C System'],
 ARRAY['/images/crane-3.jpg', '/images/crane-2.jpg']);

-- Add Loaders
INSERT INTO equipment (name, category_id, description, daily_rate, weekly_rate, monthly_rate, location, brand, model, year_manufactured, features, images) VALUES
('Caterpillar 950M Wheel Loader',
 (SELECT id FROM equipment_categories WHERE name = 'Loader'),
 'Versatile wheel loader for material handling and loading operations',
 2000000, 12000000, 40000000, 'Jakarta', 'Caterpillar', '950M', 2021,
 ARRAY['Load Sensing Hydraulics', 'Ride Control', 'Auto Dig', 'Fuel Efficiency'],
 ARRAY['/images/loader-1.jpg', '/images/loader-2.jpg']),

('Volvo L120H Wheel Loader',
 (SELECT id FROM equipment_categories WHERE name = 'Loader'),
 'High-performance wheel loader with excellent fuel economy',
 2100000, 12600000, 42000000, 'Surabaya', 'Volvo', 'L120H', 2020,
 ARRAY['OptiShift', 'Load Assist', 'Contronic System', 'ROPS/FOPS'],
 ARRAY['/images/loader-2.jpg', '/images/loader-3.jpg']),

('JCB 457 Wheel Loader',
 (SELECT id FROM equipment_categories WHERE name = 'Loader'),
 'Compact wheel loader ideal for tight spaces and versatile applications',
 1800000, 10800000, 36000000, 'Bandung', 'JCB', '457', 2019,
 ARRAY['Single Arm Design', 'Side Entry Door', 'EcoMAX Engine', 'CommandPlus Cab'],
 ARRAY['/images/loader-3.jpg', '/images/loader-1.jpg']);

-- Add Compactors
INSERT INTO equipment (name, category_id, description, daily_rate, weekly_rate, monthly_rate, location, brand, model, year_manufactured, features, images) VALUES
('Caterpillar CS56B Soil Compactor',
 (SELECT id FROM equipment_categories WHERE name = 'Compactor'),
 'Vibratory soil compactor for earthwork and foundation preparation',
 1500000, 9000000, 30000000, 'Semarang', 'Caterpillar', 'CS56B', 2020,
 ARRAY['Vibratory System', 'ROPS/FOPS', 'Eco Mode', 'Easy Maintenance'],
 ARRAY['/images/compactor-1.jpg', '/images/compactor-2.jpg']),

('Bomag BW 213 D-5 Road Roller',
 (SELECT id FROM equipment_categories WHERE name = 'Compactor'),
 'Double drum vibratory roller for asphalt and soil compaction',
 1600000, 9600000, 32000000, 'Medan', 'Bomag', 'BW 213 D-5', 2021,
 ARRAY['Dual Amplitude', 'Articulated Steering', 'ROPS Cabin', 'Water Sprinkler'],
 ARRAY['/images/compactor-2.jpg', '/images/compactor-1.jpg']),

('Dynapac CA2500D Compactor',
 (SELECT id FROM equipment_categories WHERE name = 'Compactor'),
 'Single drum compactor with excellent compaction performance',
 1400000, 8400000, 28000000, 'Yogyakarta', 'Dynapac', 'CA2500D', 2019,
 ARRAY['Variable Amplitude', 'Automatic Vibration', 'Ergonomic Design', 'Low Emissions'],
 ARRAY['/images/compactor-1.jpg', '/images/compactor-2.jpg']);
