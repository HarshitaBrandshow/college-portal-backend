const mongoose = require('mongoose');

// Define the schema for the College model
const PopularCollegeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    }, // College name
    city: { 
        type: String, 
        required: true, 
        trim: true 
    }, // City where the college is located
    state: { 
        type: String, 
        required: true, 
        trim: true 
    }, // State where the college is located
    country: { 
        type: String, 
        required: true, 
        trim: true 
    }, // Country where the college is located
    college_type: { 
        type: String, 
        required: true 
    }, // Type of the college (e.g., Government, Private, Deemed University)
    status: { 
        type: Boolean, 
        default: true 
    }, // Status of the college (true = active, false = inactive)
    courses_offered: { 
        type: [String], 
        required: true 
    }, // List of courses offered by the college
    ranking: { 
        type: Number, 
        min: 1 
    }, // College's national or state ranking
    website: { 
        type: String, 
        trim: true 
    }, // Official website URL of the college
    established_year: { 
        type: Number 
    }, // Year the college was established
    affiliation: { 
        type: String, 
        trim: true 
    }, // Affiliated university or board
    address: { 
        type: String 
    }, // Full address of the college
    contact_number: { 
        type: String 
    }, // Contact number for the college
    email: { 
        type: String 
    }, // Email address of the college
    img: { 
        type: [String], 
        trim: true 
    }, // List of image URLs (e.g., for college campus, events)
    
    ranking: { 
        type: Number, 
        default: 0 
    }, // National ranking, default is 0 if not ranked
    placement_details: {
        highest_package: { type: Number }, // Highest salary package offered during placement
        avg_package: { type: Number }, // Average salary package offered during placement
    },
    hostel_availability: { 
        type: Boolean, 
        default: false 
    }, // Availability of hostel facilities (true = available, false = not available)
    scholarship_details: {
        type: String 
    }, // Information about scholarships available at the college
    location: {
        latitude: { 
            type: Number 
        },
        longitude: { 
            type: Number 
        },
    }, // Geographic coordinates (latitude, longitude) of the college
    status: { 
        type: Boolean, 
        default: true 
    }, // Status of the college (active/inactive)
    deleteflag: { 
        type: Boolean, 
        default: false 
    }, // Used to mark the college as deleted or active in the system
    description: {
        type: String, 
        trim: true 
    }, // A detailed description of the college, its facilities, culture, etc.
}, {
    timestamps: true 
});

// Create and export the College model
module.exports = mongoose.model('PopularCollege', PopularCollegeSchema);
