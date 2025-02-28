const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { 
      type: String 
  },  
    city: { type: String }, // City
    state: { type: String }, // State
    description: {
      type: String, 
      trim: true 
  },

  courses_offered: { type: [String], required: true }, // List of courses offered by the college
    established_year: { type: Number }, // Year established
    affiliated_university: { type: String }, // Affiliated university name
    isPopular: { type: Boolean, default: false }, 
    college_type: {
      type: String,
      enum: ["Public", "Private", "Government"],
      default: "Public",
    }, 
    ranking: { type: Number, default: 0 }, // Ranking
    accreditation: { type: String }, // Accreditation details
    placement_details: {
      highest_package: { type: Number }, // Highest package offered
      avg_package: { type: Number }, // Average package offered
    },
    hostel_availability: { type: Boolean, default: false }, 
    scholarship_details: {
      type : String
    },
    phone: { type: String }, 
    email: { type: String }, 
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    images: [{ type: String }], 
    datasheet_url: { type: String }, 
    website_url: { type: String }, 
    status: { type: Boolean, default: true },
    deleteflag: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const College = mongoose.model("College", collegeSchema);

module.exports = College;
