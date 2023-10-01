INSERT INTO public.products (name, price, inventory, description, imageUrl, category)
VALUES
    ('Product 1', 19.99, 50, 'This is the first product.', '', 'Electronics'),
    ('Product 2', 24.99, 30, 'This is the second product.', '', 'Clothing'),
    ('Product 3', 9.99, 10, 'This is the third product.', '', 'Home & Kitchen');


INSERT INTO public.customers (name, email, address, zipcode)
VALUES
  ('John Smith', 'john.smith@example.com', '123 Main St', '12345'),
  ('Sarah Johnson', 'sarah.j@example.com', '456 Elm Ave', '45678'),
  ('Michael Davis', 'mike.davis@example.com', '789 Oak Dr', '78901'),
  ('Emily Wilson', 'emily.wilson@example.com', '101 Pine Rd', '10101'),
  ('David Lee', 'david.lee@example.com', '555 Maple Ln', '55555'),
  ('Linda Brown', 'linda.brown@example.com', '777 Cedar Rd', '77777');