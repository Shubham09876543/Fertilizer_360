import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const { Pool } = pg;

// Configure PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  password: "Ram@1966",
  host:  "localhost",
  port: 5432,
  database:  "Fertilizer360",
});

const app = express();


// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// Test Database Connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Register User
app.post("/register", async (req, res) => {
  const { role, name, email, password } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (role, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, role, name, email",
      [role, name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
  
    try {
      const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: { id: user.id, role: user.role, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  
// Add a new shop
app.post("/shops", async (req, res) => {
  const { name, image, address, phone_number, work_time, description, state, district, village_or_taluka } = req.body;

  if (!name || !address || !phone_number || !state || !district || !village_or_taluka) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO shops (name, image, address, phone_number, work_time, description, state, district, village_or_taluka) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, image, address, phone_number, work_time, description, state, district, village_or_taluka]
    );
    res.status(201).json({ message: "Shop added successfully", shop: result.rows[0] });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get all shops
app.get("/shops", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM shops ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single shop by ID
app.get("/shops/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM shops WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Shop not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a shop
app.put("/shops/:id", async (req, res) => {
  const { id } = req.params;
  const { name, image, address, phone_number, work_time, description, state, district, village_or_taluka } = req.body;

  try {
    const result = await pool.query(
      `UPDATE shops SET name=$1, image=$2, address=$3, phone_number=$4, work_time=$5, description=$6, 
      state=$7, district=$8, village_or_taluka=$9 WHERE id=$10 RETURNING *`,
      [name, image, address, phone_number, work_time, description, state, district, village_or_taluka, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Shop not found" });
    res.json({ message: "Shop updated successfully", shop: result.rows[0] });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
