CREATE DATABASE gym;

USE gym;

CREATE TABLE staff (
  staff_id INT PRIMARY KEY,
  name VARCHAR(50),
  role VARCHAR(50),
  salary DECIMAL(10, 2),
  hire_date DATE
);

INSERT INTO staff (staff_id, name, role, salary, hire_date)
VALUES
  (1, 'John Smith', 'Trainer', 50000.00, '2020-01-01'),
  (2, 'Jane Doe', 'Receptionist', 30000.00, '2020-02-01'),
  (3, 'Bob Johnson', 'Manager', 70000.00, '2019-01-01'),
  (4, 'Sara Lee', 'Trainer', 55000.00, '2021-03-01'),
  (5, 'Mike Brown', 'Janitor', 25000.00, '2022-05-01');

CREATE TABLE equipment (
  equipment_id INT PRIMARY KEY,
  name VARCHAR(50),
  type VARCHAR(50),
  purchase_date DATE,
  price DECIMAL(10, 2)
);

INSERT INTO equipment (equipment_id, name, type, purchase_date, price)
VALUES
  (1, 'Treadmill', 'Cardio', '2020-01-01', 2000.00),
  (2, 'Bench Press', 'Strength', '2020-02-01', 1500.00),
  (3, 'Elliptical', 'Cardio', '2019-01-01', 2500.00),
  (4, 'Leg Press', 'Strength', '2021-03-01', 1800.00),
  (5, 'Stationary Bike', 'Cardio', '2022-05-01', 1500.00);

CREATE TABLE clients (
  client_id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(20),
  membership_type VARCHAR(50),
  start_date DATE,
  end_date DATE
);

INSERT INTO clients (client_id, name, email, phone, membership_type, start_date, end_date)
VALUES
  (1, 'Alice Smith', 'alice@example.com', '555-1234', 'Premium', '2020-01-01', '2021-01-01'),
  (2, 'Bob Johnson', 'bob@example.com', '555-5678', 'Basic', '2020-02-01', '2021-02-01'),
  (3, 'Charlie Brown', 'charlie@example.com', '555-9012', 'Premium', '2019-01-01', '2020-01-01'),
  (4, 'David Lee', 'david@example.com', '555-3456', 'Basic', '2021-03-01', '2022-03-01'),
  (5, 'Emily Davis', 'emily@example.com', '555-7890', 'Premium', '2022-05-01', '2023-05-01');

CREATE TABLE schedule (
  schedule_id INT PRIMARY KEY,
  day_of_week VARCHAR(10),
  start_time TIME,
  end_time TIME,
  staff_id INT,
  equipment_id INT,
  client_id INT,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  FOREIGN KEY (equipment_id) REFERENCES equipment(equipment_id),
  FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

INSERT INTO schedule (schedule_id, day_of_week, start_time, end_time, staff_id, equipment_id, client_id)
VALUES
  (1, 'Monday', '08:00:00', '09:00:00', 1, 1, 1),
  (2, 'Tuesday', '10:00:00', '11:00:00', 4, 2, 2),
  (3, 'Wednesday', '12:00:00', '13:00:00', 1, 3, 3),
  (4, 'Thursday', '14:00:00', '15:00:00', 4, 4, 4),
  (5, 'Friday', '16:00:00', '17:00:00', 1, 5, 5);