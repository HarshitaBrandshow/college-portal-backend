const { PopularCollege } = require('../models');  // Assuming your model file is in models/PopularCollege.js

// CREATE - Add a new college
const createPopularCollege = async (req, res) => {
    try {
        const { img, ranking, placement_details, scholarship_details, location, ...otherFields } = req.body;
        
        // Set default empty arrays or objects where necessary
        const newCollege = new PopularCollege({
            ...otherFields,
            img: img || [],
            ranking: ranking || 0, // Default to 0 if no ranking is provided
            placement_details: placement_details || {},
            scholarship_details: scholarship_details || "",
            location: location || { latitude: 0, longitude: 0 }, // Default location if not provided
        });

        const savedCollege = await newCollege.save();
        res.status(201).json({
            status: 'success',
            message: 'College added successfully',
            data: savedCollege
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error adding college',
            error: error.message
        });
    }
};

// READ - Get all colleges with optional search and filter
const getPopularColleges = async (req, res) => {
    try {
        const { search, filter, page = 1, limit = 10 } = req.query;

        // Initialize the query object
        let query = {};

        // Build the search query for various fields
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for name
                    { city: { $regex: search, $options: 'i' } }, // Case-insensitive search for city
                    { state: { $regex: search, $options: 'i' } }, // Case-insensitive search for state
                    { country: { $regex: search, $options: 'i' } }, // Case-insensitive search for country
                    { college_type: { $regex: search, $options: 'i' } }, // Case-insensitive search for college_type
                    { courses_offered: { $regex: search, $options: 'i' } }, // Case-insensitive search for courses offered
                    { affiliation: { $regex: search, $options: 'i' } }, // Case-insensitive search for affiliation
                    { description: { $regex: search, $options: 'i' } }, // Case-insensitive search for description
                    { 'placement_details.highest_package': { $regex: search, $options: 'i' } }, // Searching inside placement details
                    { 'placement_details.avg_package': { $regex: search, $options: 'i' } } // Searching inside placement details
                ],
            };
        }

        // Apply dynamic filters
        if (filter) {
            try {
                const filterObj = JSON.parse(filter); // Parse filter JSON string from query params

                // Handle special cases like numeric filters or Boolean filters
                for (const key in filterObj) {
                    if (filterObj[key] === 'true' || filterObj[key] === 'false') {
                        filterObj[key] = filterObj[key] === 'true'; // Convert string 'true'/'false' to Boolean
                    }

                    // You can add more custom filter logic here if needed, for example for ranges, specific conditions etc.
                }

                query = { ...query, ...filterObj }; // Merge dynamic filters with the search query
            } catch (err) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid filter format',
                    error: err.message
                });
            }
        }

        // Pagination logic
        const skip = (page - 1) * limit;

        // Fetch colleges based on the query
        const colleges = await PopularCollege.find(query).skip(skip).limit(limit);

        // Get the total count of colleges matching the query for pagination
        const total = await PopularCollege.countDocuments(query);

        // Return the result with pagination details
        res.status(200).json({
            status: 'success',
            message: 'Colleges retrieved successfully',
            data: colleges,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error retrieving colleges',
            error: error.message
        });
    }
};

// READ - Get a single college by ID
const getPopularCollegeById = async (req, res) => {
    try {
        const college = await PopularCollege.findById(req.params.id);
        if (!college) {
            return res.status(404).json({
                status: 'error',
                message: 'College not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'College retrieved successfully',
            data: college
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error retrieving college',
            error: error.message
        });
    }
};

// UPDATE - Update a college by ID
const updatePopularCollege = async (req, res) => {
    try {
        const { img, ...otherFields } = req.body;  // Destructure img field and other fields
        const updatedCollege = await PopularCollege.findByIdAndUpdate(
            req.params.id,
            { ...otherFields, img: img || [] },  // Update img array (default to empty array if not provided)
            { new: true }
        );
        if (!updatedCollege) {
            return res.status(404).json({
                status: 'error',
                message: 'College not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'College updated successfully',
            data: updatedCollege
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error updating college',
            error: error.message
        });
    }
};

// DELETE - Delete a college by ID
const deletePopularCollege = async (req, res) => {
    try {
        const deletedCollege = await PopularCollege.findByIdAndDelete(req.params.id);
        if (!deletedCollege) {
            return res.status(404).json({
                status: 'error',
                message: 'College not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'College deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Error deleting college',
            error: error.message
        });
    }
};

module.exports = {
    createPopularCollege,
    getPopularColleges,
    getPopularCollegeById,
    updatePopularCollege,
    deletePopularCollege
};
