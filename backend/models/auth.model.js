import { query } from "../config/db.js";

export const createTable = async () => {
  await query(`CREATE TABLE IF NOT EXISTS USERS(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(30) NOT NULL
       )`);
  console.log("table created");
};

export const updateTable = async () => {
  await query(`ALTER TABLE USERS
    ALTER COLUMN password TYPE VARCHAR(100)`);

  console.log("table updated");
};

export const createUser = async (name, email, hashedPassword) => {
  const { rows } = await query(
    `
        INSERT INTO USERS(name,email,password)VALUES($1,$2,$3)RETURNING *`,
    [name, email, hashedPassword]
  );
  return rows[0];
};

export const findbyId = async (email) => {
  const { rows } = await query(` SELECT * from USERS where email=$1`, [email]);
  return rows[0];
};
