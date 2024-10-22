CREATE TABLE activities (
  activity_id NUMBER PRIMARY KEY,
  user_id NUMBER NOT NULL,
  activity_name VARCHAR2(255),
  activity_time TIMESTAMP,
  co2_emissions NUMBER,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
