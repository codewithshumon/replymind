/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BASE_URL, token } from "../../config";
import useFetchData from "../hooks/useFetchData";
import Error from "../components/error/Error";
import Loading from "../components/loader/Loading";

import SideBar from "../components/profile/SideBar";
import EditProfile from "../components/profile/EditProfile";

const Profile = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/user/profile`);
  const [tab, setTab] = useState("overview");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <SideBar tab={tab} setTab={setTab} user={data} />
            <div className="lg:col-span-2">
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px] ">
                        <img
                          src={data.photo}
                          alt="user-photo"
                          className="w-full"
                        />
                      </figure>

                      <div className="flex flex-col">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded-lg text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.profession?.toUpperCase() || ""}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>

                        <p className="text-para font-[15px] lg:max-w-[390px] leading-6">
                          {data.category || ""}
                        </p>
                        <p className="text-para text-[13px] lg:max-w-[490px] text-gray-700 leading-2 mt-2">
                          {data.bio || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {tab === "editprofile" && <EditProfile profileData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
