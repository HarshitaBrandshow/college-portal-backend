const  { College } = require('../models'); // Import the College model
const  { PopularCollege } = require('../models'); // Import the PopularCollege model

// 1. Add a new College (with isPopular logic)
async function addCollege(req, res) {
  const collegeData = req.body;

  try {
    // Create a new College document
    const newCollege = new College(collegeData);
    await newCollege.save(); // Save to College API

    // If the college is marked as popular, also add it to the Popular College collection
    if (newCollege.isPopular) {
      await addToPopularCollege(newCollege); // Save to PopularCollege API if popular
    }

    res.status(200).json({ message: 'College added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding college', error: err });
  }
}

// Helper function to add to Popular College API
async function addToPopularCollege(college) {
  const newPopularCollege = new PopularCollege({
    name: college.name,
    city: college.city,
    state: college.state,
    country: "India", // Modify as needed
    college_type: college.college_type,
    courses_offered: college.courses_offered,
    ranking: college.ranking,
    website: college.website_url,
    established_year: college.established_year,
    affiliation: college.affiliated_university,
    address: college.address,
    contact_number: college.phone,
    email: college.email,
    img: college.images,
    placement_details: college.placement_details,
    hostel_availability: college.hostel_availability,
    scholarship_details: college.scholarship_details,
    location: college.location,
    status: college.status,
    description: college.description,
  });

  await newPopularCollege.save(); // Save to Popular College API
}

// 2. Update College (with isPopular logic)
async function updateCollege(req, res) {
  const collegeId = req.params.id;
  const updateData = req.body;

  try {
    const updatedCollege = await College.findByIdAndUpdate(collegeId, updateData, { new: true });

    // If the college is marked as popular after the update, add it to the Popular College collection
    if (updatedCollege.isPopular) {
      await addToPopularCollege(updatedCollege); // Save to PopularCollege API if popular
    }

    res.status(200).json({ message: 'College updated successfully!', updatedCollege });
  } catch (err) {
    res.status(500).json({ message: 'Error updating college', error: err });
  }
}

// 3. Get All Colleges
async function getAllColleges(req, res) {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching colleges', error: err });
  }
}

// 4. Get All Popular Colleges
async function getAllPopularColleges(req, res) {
  try {
    const popularColleges = await PopularCollege.find();
    res.status(200).json(popularColleges);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching popular colleges', error: err });
  }
}

// 5. Delete College
async function deleteCollege(req, res) {
  const collegeId = req.params.id;

  try {
    const deletedCollege = await College.findByIdAndDelete(collegeId);
    res.status(200).json({ message: 'College deleted successfully!', deletedCollege });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting college', error: err });
  }
}

// 6. Delete Popular College
async function deletePopularCollege(req, res) {
  const popularCollegeId = req.params.id;

  try {
    const deletedPopularCollege = await PopularCollege.findByIdAndDelete(popularCollegeId);
    res.status(200).json({ message: 'Popular College deleted successfully!', deletedPopularCollege });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting popular college', error: err });
  }
}

module.exports = {
  addCollege,
  updateCollege,
  getAllColleges,
  getAllPopularColleges,
  deleteCollege,
  deletePopularCollege,
};
