/* eslint-disable react/prop-types */
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";

const SideBar = ({ tab, setTab, user }) => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/user/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({ type: "LOGOUT" });
      toast.success(result.message);
      window.location.href = "/";
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className=" lg:flex flex-col gap-2 p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("editprofile")}
          className={`${
            tab === "editprofile"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Edit Profile
        </button>

        <div className="mt-[100px] w-full text-white font-semibold">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] rounded-full "
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 mt-4 p-3 text-[16px] rounded-full"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
