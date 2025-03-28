const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // To parse JSON request bodies
app.use(express.json()); // To parse JSON request bodies

// Import Routers
const { CollegeRouter, ProgramRouter, PropertyRouter, StreamRouter, AdminRouter, UserRouter, AffiliationRouter, 
  DepartmentsRouter, SearchRouter,EventRouter , AdvertisementRouter , ApiRouter, HostelRouter,  ReviewRouter
   ,AccommodationBookRouter, TestimonialRouter  ,
  EnquireNowRouter, CountryRouter, CityRouter,
  FaqRouter,  UniversityRouter, PropertyDetailRouter} = require("./routes"); 

const validateApiKey = require('./middlewares/authenticateMiddleware');

app.use(validateApiKey); 

// Routes Started
app.use("/api/college", CollegeRouter);
app.use("/api/program", ProgramRouter);
app.use("/api/property", PropertyRouter);
app.use("/api/stream", StreamRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/user" , UserRouter);
app.use("/api/affiliation" , AffiliationRouter);
app.use("/api/departments", DepartmentsRouter);
app.use("/api/search" , SearchRouter);
app.use("/api/events" , EventRouter);
app.use("/api/advertisement" , AdvertisementRouter);
app.use("/api", ApiRouter);
app.use("/api/hostel", HostelRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/accommodationBook", AccommodationBookRouter);
app.use("/api/testimonial", TestimonialRouter);
app.use("/api/enquireNow", EnquireNowRouter);
app.use("/api/faq", FaqRouter);
app.use("/api/country", CountryRouter);
app.use("/api/city", CityRouter);
app.use("/api/university", UniversityRouter);
app.use("/api/propertyDetail", PropertyDetailRouter);



// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
