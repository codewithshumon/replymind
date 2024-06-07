import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

import { BASE_URL } from "../../config";
import signupImg from "./../assets/images/signup.gif";
import uploadImageToCloudinary from "../utils/imageUpload";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    profession: "",
    category: "",
  });

  const handleInpurChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.profession ||
      !formData.photo ||
      !formData.category
    ) {
      setLoading(false);
      toast.success("Please filled all inputs");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.message);
      setLoading(false);
    }
  };

  console.log("formData", formData);
  return (
    <section className="px-5 lg:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* image box */}

          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="singupImg"
                className=" w-full rounded-l-lg"
              />
            </figure>
          </div>

          {/* image box */}

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className=" text-primaryColor">account</span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInpurChange}
                  required
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInpurChange}
                  required
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleInpurChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                />
              </div>

              <div className="mb-5 flex flex-col items-start">
                <label
                  htmlFor=""
                  className=" text-headingColor font-bold text-[16px] leading-7"
                >
                  Are you a:
                  <select
                    name="profession"
                    value={formData.profession}
                    required
                    onChange={handleInpurChange}
                    className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="marketer">Marketing Professional</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="creator">Content Creator</option>
                  </select>
                </label>
                {formData.profession === "" && (
                  <div>
                    <div></div>
                  </div>
                )}
                {formData.profession === "marketer" && (
                  <label
                    htmlFor=""
                    className=" text-headingColor font-bold text-[16px] leading-7"
                  >
                    Category:
                    <select
                      name="category"
                      value={formData.category}
                      required
                      onChange={handleInpurChange}
                      className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="Growth Marketing">Growth Marketing</option>
                      <option value="Digital Marketing">
                        Digital Marketing
                      </option>
                      <option value="Product Marketing">
                        Product Marketing
                      </option>
                      <option value="Paid marketing">Paid marketing</option>
                      <option value="Organic Marketin">Organic Marketin</option>
                      <option value="Other Marketing">Other Marketing</option>
                    </select>
                  </label>
                )}

                {formData.profession === "entrepreneur" && (
                  <label
                    htmlFor=""
                    className=" text-headingColor font-bold text-[16px] leading-7"
                  >
                    Category:
                    <select
                      name="category"
                      value={formData.category}
                      required
                      onChange={handleInpurChange}
                      className=" text-textColor font-semibold text-[16px]
                     leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="Startup Enthusiast">
                        Startup Enthusiast
                      </option>
                      <option value="SME">SME</option>
                      <option value="Product Enthusiast">
                        Product Enthusiast
                      </option>
                      <option value="Product Leader">Product Leader</option>
                      <option value="Product Owner">Product Owner</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                )}
                {formData.profession === "creator" && (
                  <label
                    htmlFor=""
                    className=" text-headingColor font-bold text-[16px] leading-7"
                  >
                    Category:
                    <select
                      name="category"
                      value={formData.category}
                      required
                      onChange={handleInpurChange}
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
                  </label>
                )}
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-purpleColor flex items-center justify-center">
                    <img
                      src={previewURL}
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
                    required
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
                  disabled={loading}
                  type="submit"
                  className="w-full px-4 py-3 bg-blue-600 text-white text-[18px]
               leading-[30px] rounded-lg"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <div className="mt-5 text-textColor text-center">
                Alredy have an accout?
                <Link
                  to="/login"
                  className="text-primaryColor font-semibold ml-1"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
