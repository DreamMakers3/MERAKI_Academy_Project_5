import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../service/redux/reducers/profile/profileSlice";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";
import { FaHeart } from "react-icons/fa";
import { VscRequestChanges } from "react-icons/vsc";
import { MdBorderColor } from "react-icons/md";
import { setAllLikedPosts } from "../../service/redux/reducers/posts/postsSlice";
import MyApp from "../../components/Extra/Calendar";
import { IoPeople } from "react-icons/io5";
import { BsSaveFill } from "react-icons/bs";

const HomeSide = () => {
  const [modal, setModal] = useState(false);
  const [allFields, setAllFields] = useState([]);
  const [field_id, setField_id] = useState("");
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  /* ========================================== */
  const dispatch = useDispatch();
  const { userId, userInfo, token, userLikes } = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
      token: state.log.token,
      userLikes: state.posts.userLikes,
    };
  });

  // ======================================
  useEffect(() => {
    axios
      .get(`https://workedin.onrender.com/users/search_1/${userId}`)
      .then((result) => {
        dispatch(setUserInfo(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // =======================================

  /*   useEffect(() => {
    axios
      .get("https://workedin.onrender.com/posts/allLikedPosts/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setAllLikedPosts(result.data.likes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */

  /* ======================================= */

  const getAllFields = () => {
    axios
      .get("https://workedin.onrender.com/roles/fields")
      .then((result) => {
        setAllFields(result.data.Fields);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* ============================================ */

  const createJob = () => {
    axios
      .post(
        "https://workedin.onrender.com/jobs/create",
        {
          title,
          discription,
          field_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // =========================================
  return (
    <div className="flex flex-col space-y-6 items-center w-60 ">
      <div className="  bg-white w-60 p-3 rounded-lg shadow-lg">
        <div>
          <p className="font-medium text-center text-gray-500">Welcome</p>
        </div>
        <h1 className="mt-1 mb-2 text-2xl text-center font-medium me-4">
          {userInfo.firstname} {userInfo.lastname}
        </h1>

        {userInfo.role_id === 2 ? (
          <div className="p-3 border-t-2">
            <button
              className="bg-black text-white w-full h-12 shadow-lg rounded font-medium text-xl"
              onClick={() => {
                setModal(true);
                getAllFields();
              }}
            >
              Share New Job
            </button>

            <div className="flex mt-4">
              <VscRequestChanges className="mt-0.5 ms-1 me-1" size={25} />
              <p>All Open Jobs</p>
            </div>

            <div className="flex mt-2">
              {" "}
              <MdBorderColor className="mt-0.5 ms-1 me-1" size={25} />
              <p>My All Applications</p>
            </div>
          </div>
        ) : (
          <div className="p-3">
            <p className="border-t font-medium pt-2 text-gray-600 text-xl mb-2">
              Last Activity
            </p>
            <div className="flex mt-2">
              <FaHeart size={25} className="text-slate-800 me-2 mt-1" />
              <p className=" text-gray-900">Interested Posts</p>
              {/*   <div className=" text-gray-700 ms-8">'{userLikes.length}'</div> */}
            </div>
            <div className="flex mt-2">
              <IoPeople size={25} className="text-slate-800 me-2 mt-1" />
              <p className=" text-gray-900">My Follows</p>
            </div>
            <div className="flex mt-2">
              <MdBorderColor size={25} className="text-slate-800 me-2 mt-1" />
              <p className=" text-gray-900">My Applied Jobs</p>
            </div>
            <div className="flex mt-2">
              <BsSaveFill size={25} className="text-slate-800 me-2 mt-1" />
              <p className=" text-gray-900">Saved Later</p>
            </div>
          </div>
        )}
      </div>
      {/* ===================== To Share Job ================ */}

      {modal && (
        <>
          {" "}
          <div id="myModal" class="modalJob">
            <div className="modal-contentJob">
              <span
                className="close cursor-pointer"
                onClick={() => {
                  setModal(false);
                }}
              >
                &times;
              </span>
              <p className="font-medium border-b-4 pb-2">Job Description</p>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Job Tilte"
                  className="border-2 border-gray-400 mb-2 p-2 w-full"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <textarea
                  placeholder="Job Details"
                  className="p-2 w-full border-2 border-gray-400"
                  rows={5}
                  style={{ outline: "none" }}
                  onChange={(e) => {
                    setDiscription(e.target.value);
                  }}
                ></textarea>
                <div className="mt-2 mb-2">
                  <label className="me-2" style={{ outline: "none" }}>
                    Job Field:
                  </label>
                  <select
                    className="mb-2 w-24 h-8 border-2 border-slate-500 rounded-md pl-2.5 shadow-lg"
                    onChange={(e) => {
                      setField_id(e.target.value);
                    }}
                  >
                    <option className=" text-slate-500">Choose</option>
                    {allFields.map((field, i) => {
                      return (
                        <option value={field.field_id} key={field.field_id}>
                          {field.field}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-black text-white rounded-md shadow-lg w-28 h-10 mt-2"
                  onClick={() => {
                    createJob();
                    setModal(false);
                  }}
                >
                  Share Job
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* ====================================================== */}
      <div>
        <div className="">
          <p className="flex items-center justify-center rounded-b-none text-center shadow-md bg-white rounded-md h-10 font-semibold text-black text-xl">
            Daily Reminders
          </p>
          <MyApp />
        </div>
      </div>
    </div>
  );
};

export default HomeSide;
