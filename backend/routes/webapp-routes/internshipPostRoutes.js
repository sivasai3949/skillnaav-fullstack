const express = require("express");
const InternshipPosting = require("../../models/webapp-models/internshipPostModel.js");
const router = express.Router();

// GET all internship postings
router.get("/", async (req, res) => {
  try {
    const internships = await InternshipPosting.find({});
    res.json(internships);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error: Unable to fetch internships" });
  }
});

// POST create a new internship posting
router.post("/", async (req, res) => {
  try {
    const newInternship = new InternshipPosting({
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      location: req.body.location,
      jobType: req.body.jobType,
      jobDescription: req.body.jobDescription,
      startDate: req.body.startDate,
      endDateOrDuration: req.body.endDateOrDuration,
      stipendOrSalary: req.body.stipendOrSalary,
      qualifications: req.body.qualifications,
      preferredExperience: req.body.preferredExperience,
      applicationDeadline: req.body.applicationDeadline,
      applicationProcess: req.body.applicationProcess,
      contactInfo: req.body.contactInfo,
      applicationLinkOrEmail: req.body.applicationLinkOrEmail,
      imgUrl: req.body.imgUrl,
      studentApplied: req.body.studentApplied || false,
      adminApproved: req.body.adminApproved || false,
    });

    const createdInternship = await newInternship.save();
    res.status(201).json(createdInternship);
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(400)
      .json({ message: "Error: Unable to create internship post" });
  }
});

// GET a single internship posting by ID
router.get("/:id", async (req, res) => {
  try {
    const internship = await InternshipPosting.findById(req.params.id);

    if (internship) {
      res.json(internship);
    } else {
      res.status(404).json({ message: "Internship not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update an internship posting by ID
router.put("/:id", async (req, res) => {
  const {
    jobTitle,
    companyName,
    location,
    jobType,
    jobDescription,
    startDate,
    endDateOrDuration,
    stipendOrSalary,
    qualifications,
    preferredExperience,
    workingHours,
    applicationDeadline,
    applicationProcess,
    companyWebsite,
    contactInfo,
    internshipBenefits,
    department,
    applicationLinkOrEmail,
    workAuthorization,
    skillsToBeDeveloped,
    numberOfOpenings,
    imgUrl,
    studentApplied,
    adminApproved,
  } = req.body;

  try {
    // Use findByIdAndUpdate for better efficiency and only update fields that are provided in the request
    const updatedInternship = await InternshipPosting.findByIdAndUpdate(
      req.params.id,
      {
        // Only update fields that are present in the request
        ...(jobTitle && { jobTitle }),
        ...(companyName && { companyName }),
        ...(location && { location }),
        ...(jobType && { jobType }),
        ...(jobDescription && { jobDescription }),
        ...(startDate && { startDate }),
        ...(endDateOrDuration && { endDateOrDuration }),
        ...(stipendOrSalary && { stipendOrSalary }),
        ...(qualifications && { qualifications }),
        ...(preferredExperience && { preferredExperience }),
        ...(workingHours && { workingHours }),
        ...(applicationDeadline && { applicationDeadline }),
        ...(applicationProcess && { applicationProcess }),
        ...(companyWebsite && { companyWebsite }),
        ...(contactInfo && { contactInfo }),
        ...(internshipBenefits && { internshipBenefits }),
        ...(department && { department }),
        ...(applicationLinkOrEmail && { applicationLinkOrEmail }),
        ...(workAuthorization && { workAuthorization }),
        ...(skillsToBeDeveloped && { skillsToBeDeveloped }),
        ...(numberOfOpenings && { numberOfOpenings }),
        ...(imgUrl && { imgUrl }),
        ...(studentApplied !== undefined && { studentApplied }),
        ...(adminApproved !== undefined && { adminApproved }),
      },
      { new: true } // Return the updated document
    );

    // Check if internship was found and updated
    if (updatedInternship) {
      res.json(updatedInternship);
    } else {
      res.status(404).json({ message: "Internship not found" });
    }
  } catch (error) {
    console.error("Error updating internship:", error.message);
    res.status(500).json({
      message: "Error: Unable to update internship post",
      error: error.message,
    });
  }
});

// DELETE an internship posting by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Log the ID to verify
    console.log("ID to delete:", id);

    // Find and delete the internship in one step
    const deletedInternship = await InternshipPosting.findByIdAndDelete(id);

    if (!deletedInternship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json({ message: "Internship deleted successfully" });
  } catch (error) {
    console.error("Error during deletion:", error); // Log the actual error
    res.status(500).json({
      message: "Server Error: Unable to delete the internship",
      error: error.message,
    });
  }
});

// POST approve an internship posting by ID
router.patch("/:id/approve", async (req, res) => {
  try {
    const internship = await InternshipPosting.findById(req.params.id);

    if (internship) {
      internship.adminApproved = true; // Mark as approved
      await internship.save(); // Save changes
      res.json({ message: "Internship approved successfully", internship });
    } else {
      res.status(404).json({ message: "Internship not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error: Unable to approve internship" });
  }
});

// POST reject an internship posting by ID
router.patch("/:id/reject", async (req, res) => {
  try {
    const internship = await InternshipPosting.findById(req.params.id);

    if (internship) {
      internship.adminApproved = false; // Mark as rejected
      await internship.save(); // Save changes
      res.json({ message: "Internship rejected successfully", internship });
    } else {
      res.status(404).json({ message: "Internship not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error: Unable to reject internship" });
  }
});

// GET approved internships
router.get("/approved", async (req, res) => {
  try {
    const approvedInternships = await InternshipPosting.find({
      adminApproved: true,
    });
    res.json(approvedInternships);
  } catch (error) {
    console.error("Error fetching approved internships:", error); // Log the error
    res.status(500).json({
      message: "Error fetching approved internships",
      error: error.message,
    });
  }
});

module.exports = router;
