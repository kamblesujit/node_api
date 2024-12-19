import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

// import { db_connect } from "./db/db.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/auth", authRouter);

// Signup API endpoint
// app.post("/auth/signup", async (req, res) => {
//   const { name, email, contact, password } = req.body;

//   try {
//     // Check if username already exists
//     const [existingUsers] = await db_connect.query(
//       "SELECT * FROM signup_tbl WHERE email = ?",
//       [email]
//     );
//     if (existingUsers.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);

//     // Insert the new user into the database
//     await db_connect.query(
//       "INSERT INTO signup_tbl (name, email, contact, password) VALUES (?, ?, ?, ?)",
//       [name, email, contact, hashedPassword]
//     );

//     res.status(201).json({ message: "Signup successfully" });
//   } catch (err) {
//     console.log("error", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Login API endpoint
// app.post("/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("Received signup_tbl request:", { email, password });

//     // Check if user exists
//     const [rows] = await db_connect.query(
//       "SELECT * FROM signup_tbl WHERE email = ?",
//       [email]
//     );

//     if (!rows || rows.length === 0) {
//       console.log("User not found");
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     const user = rows[0];
//     console.log("User found:", user);

//     // Check password
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       console.log("Invalid password");
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, "your_secret_key", {
//       expiresIn: "1h",
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Start the server
app.listen(process.env.PORT || 7000, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});
