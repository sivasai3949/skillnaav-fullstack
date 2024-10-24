import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserProfileForm = () => {
  const location = useLocation();
  const userData = location.state?.userData || {}; // Access user data

  const [formData, setFormData] = useState({
    universityName: "",
    dob: "",
    educationLevel: "",
    fieldOfStudy: "",
    ...userData // Initialize formData with userData if available
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Validate form on every change
  useEffect(() => {
    const { universityName, dob, educationLevel, fieldOfStudy } = formData;
    if (universityName && dob && educationLevel && fieldOfStudy) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form Data:", formData); 
      navigate("/user-profile-picture", { state: { formData } }); 
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-poppins">
      <div className="w-full max-w-xl p-8 space-y-6 bg-white shadow-md rounded-lg">
        <div className="space-y-4">
          <div className="w-full h-12 p-3 bg-[#F9F0FF] border-b border-[#E6C4FB]">
            <h2 className="text-16px font-bold text-gray-700">BASIC INFORMATION</h2>
          </div>
          <div>
            <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
              University Name
            </label>
            <input
              id="universityName" // Updated id
              type="text"
              name="universityName" // Updated name
              value={formData.universityName} // Updated value
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formData.universityName ? "border-gray-300" : "border-gray-200"
              } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Enter your University Name" // Updated placeholder
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formData.dob ? "border-gray-300" : "border-gray-200"
              } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-full h-12 p-3 bg-[#F9F0FF] border-b border-[#E6C4FB]">
            <h2 className="text-16px font-bold text-gray-700">EDUCATIONAL INFORMATION</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current level of education
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="highschool"
                  name="educationLevel"
                  value="highschool"
                  checked={formData.educationLevel === "highschool"}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="highschool" className="ml-3 block text-sm text-gray-700">
                  Highschool
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="undergraduate"
                  name="educationLevel"
                  value="undergraduate"
                  checked={formData.educationLevel === "undergraduate"}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="undergraduate" className="ml-3 block text-sm text-gray-700">
                  Undergraduate
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="graduate"
                  name="educationLevel"
                  value="graduate"
                  checked={formData.educationLevel === "graduate"}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="graduate" className="ml-3 block text-sm text-gray-700">
                  Graduate
                </label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">
              Field of Interest
            </label>
            <select
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className={`mt-2 block w-full px-3 py-2 border ${
                formData.fieldOfStudy ? "border-gray-300" : "border-gray-200"
              } bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
            >
              <option value="">Select Your Field</option>
              <option value="space">Space Internships</option>
              <option value="aero">Aeronautical Internships</option>
              <option value="tech">Tech Internships</option>
              <option value="research">Research Internships</option>
              <option value="education">Education Internships</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isFormValid ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-300 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
