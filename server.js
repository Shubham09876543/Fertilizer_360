import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import crypto from 'crypto';
import Razorpay from "razorpay";


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

// Delete a shop
app.delete("/shops/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First, check if the shop exists
    const check = await pool.query("SELECT * FROM shops WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Delete the shop
    await pool.query("DELETE FROM shops WHERE id = $1", [id]);

    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new user
app.post("/api/users", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
      [name, email, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await pool.query("UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4", [name, email, role, id]);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Update user profile
app.post("/api/update-profile", async (req, res) => {
  const { email, name, currentPassword, newPassword } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const user = userResult.rows[0];

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(401).json({ error: "Incorrect current password" });

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await pool.query("UPDATE users SET name = $1, password = $2 WHERE email = $3", [
        name,
        hashedNewPassword,
        email,
      ]);
    } else {
      await pool.query("UPDATE users SET name = $1 WHERE email = $2", [name, email]);
    }

    res.json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Get all fertilizers
app.get("/fertilizers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.*, s.name AS shop_name FROM fertilizers f
      JOIN shops s ON f.shop_id = s.id
      ORDER BY f.id DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching fertilizers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new fertilizer
app.post("/fertilizers", upload.single("image"), async (req, res) => {
  const { shop_id, name, price, description, stocks } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!shop_id || !name || !price || !description || !stocks) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO fertilizers (shop_id, name, image, price, description, stocks) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [shop_id, name, image, price, description, stocks]
    );

    res.status(201).json({ message: "Fertilizer added successfully", fertilizer: result.rows[0] });
  } catch (error) {
    console.error("Error adding fertilizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Edit a fertilizer
app.put("/fertilizers/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { shop_id, name, price, description, stocks } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const existingFertilizer = await pool.query("SELECT * FROM fertilizers WHERE id = $1", [id]);
    if (existingFertilizer.rows.length === 0) {
      return res.status(404).json({ error: "Fertilizer not found" });
    }

    const updatedFertilizer = await pool.query(
      `UPDATE fertilizers 
       SET shop_id = $1, name = $2, image = COALESCE($3, image), price = $4, description = $5, stocks = $6
       WHERE id = $7 RETURNING *`,
      [shop_id, name, image, price, description, stocks, id]
    );

    res.json({ message: "Fertilizer updated successfully", fertilizer: updatedFertilizer.rows[0] });
  } catch (error) {
    console.error("Error updating fertilizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a fertilizer
app.delete("/fertilizers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM fertilizers WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Fertilizer not found" });
    }
    res.json({ message: "Fertilizer deleted successfully" });
  } catch (error) {
    console.error("Error deleting fertilizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//-----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));






app.get("/filters", async (req, res) => {
  try {
    const states = await pool.query("SELECT DISTINCT state FROM shops");
    const districts = await pool.query("SELECT DISTINCT district, state FROM shops");
    const cities = await pool.query("SELECT DISTINCT village_or_taluka, district FROM shops");

    res.json({
      states: states.rows.map(row => row.state),
      districts: districts.rows.map(row => ({ name: row.district, state: row.state })),
      cities: cities.rows.map(row => ({ name: row.village_or_taluka, district: row.district }))
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});












// Fetch a single shop by ID
app.get("/shop/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM shops WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching shop details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch fertilizers for a specific shop
app.get("/fertilizers/:shopId", async (req, res) => {
  const { shopId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM fertilizers WHERE shop_id = $1",
      [shopId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching fertilizers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});







// 🧪 Get Fertilizer Details by ID
app.get("/fertilizer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM fertilizers WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Fertilizer not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching fertilizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});








// 🚀 PLACE ORDER
app.post("/place-order", async (req, res) => {
  const { customer_name, customer_email, fertilizer_name, quantity, total_price } = req.body;
  if (!customer_name || !customer_email || !fertilizer_name || !quantity || !total_price) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      await pool.query(
          "INSERT INTO orders (customer_name, customer_email, fertilizer_name, quantity, total_price) VALUES ($1, $2, $3, $4, $5)",
          [customer_name, customer_email, fertilizer_name, quantity, total_price]
      );
      res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});



// 📌 GET ALL ORDERS (For Admin Panel)
app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✏ UPDATE ORDER STATUS
app.put("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [status, id]);
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🗑 DELETE ORDER
app.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});









// POST route to send email
app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL, // Your Gmail address
        pass: process.env.MY_PASS   // Your Gmail App Password
      }
    });

    const mailOptions = {
      from: email,
      to: 'sgajera934@rku.ac.in',
      subject: subject || 'Contact Form Submission',
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});











// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS,
  },
});
// === FORGOT PASSWORD ROUTE ===
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
      [token, expires, email]
    );

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// === RESET PASSWORD ROUTE ===
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Token is invalid or expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = $2',
      [hashedPassword, token]
    );

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});




// Update fertilizer stock after order
app.put("/fertilizer/:id/update-stock", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const current = await pool.query("SELECT stocks FROM fertilizers WHERE id = $1", [id]);

    if (current.rows.length === 0) {
      return res.status(404).json({ error: "Fertilizer not found" });
    }

    const currentStock = parseInt(current.rows[0].stocks);
    const newStock = currentStock - parseInt(quantity);

    if (newStock < 0) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    const result = await pool.query(
      "UPDATE fertilizers SET stocks = $1 WHERE id = $2 RETURNING *",
      [newStock, id]
    );

    res.json({ message: "Stock updated", fertilizer: result.rows[0] });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




//razor pay
const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_SECRET",
});

app.post("/create-razorpay-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "order_rcptid_" + Math.random(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
