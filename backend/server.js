const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config(); // Load environment variables

const app = express(); // Initialize express app

// MongoDB Connection
connectDB(); // Establish MongoDB connection

// Middleware
app.use(express.json()); // For parsing application/json

app.use(
  cors({
    origin: "*", // or "*" to allow all origins
    methods: "GET,POST,PUT,DELETE", // Adjust as per your needs
    credentials: true,
  })
);

// Routes
const userRoutes = require("./routes/webapp-routes/userRoutes");
const internRoutes = require("./routes/webapp-routes/internshipPostRoutes");
const skillnaavRoute = require("./routes/skillnaavRoute");
const applicationRoutes = require("./routes/webapp-routes/applicationRoutes");
const partnerRoutes = require("./routes/webapp-routes/partnerRoutes"); // Import Partner routes
const adminRoutes = require("./routes/webapp-routes/adminRoutes");

// Define routes
app.use("/api/users", userRoutes); // User Web App routes
app.use("/api/interns", internRoutes); // Partner to Admin Intern Posts
app.use("/api/applications", applicationRoutes); // Add application routes
app.use("/api/skillnaav", skillnaavRoute); // Skillnaav routes
app.use("/api/contact", skillnaavRoute); // Contact route (Verify if this is correct)
app.use("/api/partners", partnerRoutes); // Partner routes for registration and login
app.use("/api/admin", adminRoutes); // Admin Web app Routes

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
