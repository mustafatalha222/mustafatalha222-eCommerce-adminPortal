INSERT INTO public.products (name, price, inventory, description, imageUrl, category)
VALUES
    ('Tablet', 20.00, 50, 'This is the Tablet product.', '', 'Electronics'),
    ('Shirt',10.00, 30, 'This is the Shirt.', '', 'Clothing'),
    ('Blender', 30.01, 1000, 'This is the Blender machine.', '', 'Home & Kitchen');
    ('Electric bulb', 12.49, 2, 'This is the Electric bulb product.', '', 'Electronics'),
    ('Jeans', 12.39, 5, 'This is the Jeans shirt', '', 'Clothing');


INSERT INTO public.customers (name, email, address, zipcode)
VALUES
  ('John Smith', 'john.smith@example.com', '123 Main St', '12345'),
  ('Sarah Johnson', 'sarah.j@example.com', '456 Elm Ave', '45678'),
  ('Michael Davis', 'mike.davis@example.com', '789 Oak Dr', '78901'),
  ('Emily Wilson', 'emily.wilson@example.com', '101 Pine Rd', '10101'),
  ('David Lee', 'david.lee@example.com', '555 Maple Ln', '55555'),
  ('Linda Brown', 'linda.brown@example.com', '777 Cedar Rd', '77777');

INSERT INTO public.sales (quantity, total_price, customer, product)
VALUES
  (3,60, 1,1),
  (2,40, 1,1),
  (10,100, 2,2),
  (3,30, 3,2),
  (10,100, 2,2),
  (10,100, 3,2),
  (9,90, 1,2),
  (10,100.02, 3,3),
  (30,900.12, 4,2),
  (112,122021.34, 4,3);

INSERT INTO public.stores (name, address, timings, description)
VALUES
('K&NS store', 'California Road', 'Mon-Fri', 'we deliver best quality food'),
('TechZone Electronics', '123 Gadget Street, Techville, CA 12345', 'Mon-Sat: 10 AM - 8 PM', 'Your one-stop shop for all your tech needs.'),
('Healthy Haven', '456 Wellness Avenue, Fitville, NY 54321', 'Mon-Sun: 7 AM - 9 PM', 'A health food store promoting wellness through quality products.'),
('Books & Beyond', '789 Reading Lane, Booksville, TX 67890', 'Tue-Sat: 10 AM - 6 PM', 'A bookstore with a vast collection of books for all ages and interests.'),
('Fashion Frenzy', '101 Style Street, Trendyville, CA 98765', 'Mon-Fri: 11 AM - 7 PM, Sat: 10 AM - 8 PM', 'A trendy fashion store for the fashion-forward.');



