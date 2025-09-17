-- Update existing equipment with new images

-- Update Caterpillar 320D Excavator
UPDATE equipment 
SET images = ARRAY['/images/excavator-1.jpg', '/images/excavator-2.jpg', '/images/excavator-3.jpg', '/images/excavator-4.jpg' ]
WHERE name = 'Caterpillar 320D Excavator';

-- Update Komatsu D65PX Bulldozer  
UPDATE equipment
SET images = ARRAY['/images/bulldozer-1.jpg', '/images/bulldozer-2.jpg', '/images/bulldozer-3.jpg']
WHERE name = 'Komatsu D65PX Bulldozer';

-- Update Liebherr LTM 1050 Mobile Crane
UPDATE equipment
SET images = ARRAY['/images/crane-1.jpg', '/images/crane-2.jpg', '/images/crane-3.jpg'] 
WHERE name = 'Liebherr LTM 1050 Mobile Crane';
