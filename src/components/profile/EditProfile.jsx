/* eslint-disable react/prop-types */
import { useState } from "react";
import uploadImageToCloudinary from "../../utils/imageUpload";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../config";

const EditProfile = ({ profileData }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: profileData?.name,
    email: profileData?.email,
    password: profileData?.password,
    profession: profileData?.profession,
    category: profileData?.category,
    photo: profileData?.photo,
    bio: profileData?.bio,
  });

  const handleBioInputChange = (e) => {
    const { name, value } = e.target;
    const words = value.trim().split(/\s+/);

    if (name === "bio" && words.length > 50) {
      setError("Bio cannot exceed 50 words");
    } else {
      setError("");
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/user/${profileData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-[24px] text-headingColor font-bold leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_label">Name *</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input focus:outline-none bg-green-200 p-2 rounded-md"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email *</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input bg-red-300 p-2 rounded-md"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <textarea
            type="bio"
            placeholder="Write a short bio"
            name="bio"
            value={formData.bio}
            required
            onChange={handleBioInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Profession *</p>
              <select
                name="profession"
                value={formData.profession}
                required
                onChange={handleInputChange}
                className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="marketer">Marketing Professional</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="creator">Content Creator</option>
              </select>
            </div>
            <div>
              <p className="form_label">Ctegory *</p>

              {formData.profession === "marketer" && (
                <select
                  name="category"
                  value={formData.category}
                  required
                  onChange={handleInputChange}
                  className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="Growth Marketing">Growth Marketing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Product Marketing">Product Marketing</option>
                  <option value="Paid marketing">Paid marketing</option>
                  <option value="Organic Marketin">Organic Marketin</option>
                  <option value="Other Marketing">Other Marketing</option>
                </select>
              )}
              {formData.profession === "entrepreneur" && (
                <select
                  name="category"
                  value={formData.category}
                  required
                  onChange={handleInputChange}
                  className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="Startup Enthusiast">Startup Enthusiast</option>
                  <option value="SME">SME</option>
                  <option value="Product Enthusiast">Product Enthusiast</option>
                  <option value="Product Leader">Product Leader</option>
                  <option value="Product Owner">Product Owner</option>
                  <option value="other">Other</option>
                </select>
              )}
              {formData.profession === "creator" && (
                <select
                  name="category"
                  value={formData.category}
                  required
                  onChange={handleInputChange}
                  className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Video Content">Video Content</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purpleColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="avatar"
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className=" relative w-[160px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="customFile"
              className=" absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.357rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={handleUpdateProfile}
            className=" bg-blue-700 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-full"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
