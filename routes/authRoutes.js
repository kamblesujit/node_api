import express from "express";
import { db_connect } from "../db/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, contact, password } = req.body;

  try {
    const db = await db_connect();

    // check if username already exists or not
    const [existingUsers] = await db.query(
      "SELECT * FROM signup_tbl WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // insert new user into database
    await db.query(
      "INSERT INTO signup_tbl (name, email, contact, password) VALUES (?, ?, ?, ?)",
      [name, email, contact, hashPassword]
    );
    res.status(201).json({ message: "signup successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

export default router;
