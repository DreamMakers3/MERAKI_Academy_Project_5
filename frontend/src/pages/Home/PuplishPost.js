import React, { useEffect, useState } from "react";
import "./Home.css";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import CircleLoader from "../../components/Extra/CircleLoader";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
const PuplishPost = () => {
  const [modal, setModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [allFields, setAllFields] = useState([]);
  const [field_id, setField_id] = useState("");
  const [post, setPost] = useState("");
  const [myHomePosts, setMyHomePosts] = useState([]);

  /* ========================================================== */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      userId: state.log.userId,
    };
  });

  /* ================== For upload on cloudenary ================================ */
  const [isUpload, setIsUpload] = useState(false);

  const [isLoader, setIsLoader] = useState(true);

  const [postImage, setPostImage] = useState("");

  const [image, setImage] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "szb3g9r3");
    data.append("cloud_name", "drkox9efz");
    fetch("https://api.cloudinary.com/v1_1/drkox9efz/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPostImage(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  /* ==================================================== */

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

  /* ================================================================ */
  const createPost = () => {
    axios
      .post(
        "https://workedin.onrender.com/posts/create",
        {
          body: post,
          image: postImage,
          field_id: field_id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        getMyPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* ========================================================= */

  const getMyPosts = () => {
    axios
      .get(`https://workedin.onrender.com/posts/search_1?user=${state.userId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setMyHomePosts(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  /* ========================================================= */

  return (
    <div className="container relative" style={{ width: "600px" }}>
      {" "}
      <div
        className="bg-white border-2 shadow-md border-gray-200 rounded flex-col "
        style={{ width: "600px" }}
        onClick={() => {
          setModal(true);
          getAllFields();
        }}
      >
        <div className="flex-none">
          <textarea
            id="sharePost"
            rows="1"
            className="p-5 mt-1 w-full cursor-pointer"
            style={{ outline: "none", resize: "none" }}
            placeholder="Ask, Search, Share Here.."
          ></textarea>
        </div>

        <div className="flex justify-end mt-3 mb-2">
          <div className="bg-black h-9 rounded-3xl flex items-center p-2 ms-2 mt-2 cursor-pointer">
            <IoVideocamOutline size="30" className="text-white me-1" />{" "}
            <div className=" text-white">Video</div>
          </div>

          <div className="bg-black h-9 rounded-3xl flex items-end p-2 ms-2 mt-2 cursor-pointer">
            <MdOutlinePhotoCamera size="26" className="text-rose-800 me-1" />
            <div className="text-white">Photo</div>
          </div>

          <div className="bg-black h-8 text-white rounded-3xl flex items-center p-2 ms-2 mt-3 me-3 cursor-pointer">
            <HiDotsHorizontal />
          </div>
        </div>
      </div>
      {/* ========= window of share a post =============== */}
      {modal && (
        <>
          {" "}
          <div id="myModal" class="modal">
            <div className="modal-content">
              <span
                className="close cursor-pointer"
                onClick={() => {
                  setModal(false);
                }}
              >
                &times;
              </span>
              <p>Publish Post Here</p>
              <textarea
                placeholder="What do you want to share"
                className="p-2 w-full border-2"
                rows={3}
                style={{ outline: "none", resize: "none" }}
                onChange={(e) => {
                  setPost(e.target.value);
                }}
              ></textarea>

              <div className="mt-2 mb-2">
                <label className="me-2" style={{ outline: "none" }}>
                  Field of Post:
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

              <div className="flex justify-between">
                <div
                  className="bg-gray-200 w-28 h-10 rounded-3xl flex items-center p-2 ms-2 mt-2 cursor-pointer"
                  onClick={() => {
                    setUploadModal(true);
                  }}
                >
                  <MdOutlinePhotoCamera
                    size="28"
                    className="text-rose-800 ms-2 me-1 mt-1"
                  />
                  <div className="text-slate-600 text-xl">Photo</div>
                </div>

                <button
                  className="bg-black text-white rounded-md shadow-lg w-28 h-10 mt-2"
                  onClick={() => {
                    createPost();
                    setModal(false);
                    document.getElementById("sharePost").value = "";
                  }}
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* ========= window of upload post photo =============== */}
      {uploadModal && (
        <>
          {" "}
          <div id="myModal" class="modalUploadImage">
            <div className="modal-UploadImage">
              <span
                className="close  cursor-pointer"
                onClick={() => {
                  setUploadModal(false);
                  setIsLoader(true);
                  setIsUpload(false);
                }}
              >
                &times;
              </span>
              <p className="text-xl font-medium ms-2">Upload Image</p>

              <div className="mt-5 pt-3 border-t-2 ">
                <input
                  type="file"
                  className="borde"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setIsUpload(true);
                  }}
                ></input>

                {isUpload && (
                  <div className="mt-4">
                    <button
                      className="bg-black text-white rounded-md shadow-lg w-24 h-10 mt-2"
                      onClick={() => {
                        uploadImage();
                        setIsLoader(false);
                      }}
                    >
                      Upload
                    </button>
                  </div>
                )}

                <div className="flex justify-end">
                  {isLoader ? (
                    <></>
                  ) : postImage ? (
                    <button
                      className="bg-blue-700 text-white rounded-md shadow-lg w-28 h-10 mt-8"
                      onClick={() => {
                        setIsUpload(false);
                        setIsLoader(true);
                        setUploadModal(false);
                      }}
                    >
                      Done
                    </button>
                  ) : (
                    <div className="flex justify-center items-center bg-blue-300 cursor-not-allowed text-white rounded-md shadow-lg w-28 h-10 mt-8">
                      <div className="loaderHome"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* ------------------------- My posts ----------------------------------- */}
      <div className="mt-6">
        {myHomePosts?.map((post, index) => {
          return (
            <div key={post.post_id}>
              <div
                className=" container mt-3 relative"
                style={{ width: "650px" }}
              >
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <img
                      src={post.profileimage}
                      alt="Profile Picture"
                      className="w-12 h-12 rounded-full cursor-pointer object-cover"
                      onClick={() => {
                        navigate(`/profile`);
                      }}
                    />
                    <div className="ml-2">
                      <p
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                          navigate(`/profile`);
                        }}
                      >
                        {post.firstname} {post.lastname}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {" "}
                        Posted{" "}
                        {post.created_at
                          .split("T")
                          .shift()
                          .split("-")
                          .reverse()
                          .join("-")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p>{post.body}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post Image"
                        className="mt-4 object-cover"
                      />
                    )}
                  </div>

                  <div className="items-center mt-4 pt-2 border-t-2">
                    <div className="flex justify-around">
                      <div className="flex items-center cursor-pointer">
                        <div className="mt-1 me-1">
                          {" "}
                          <FaRegHeart />
                        </div>
                        <div>Interested</div>
                      </div>

                      {/* ======*******===== */}

                      <div className="flex items-center cursor-pointer">
                        <div className="me-1 mt-1">
                          <TfiCommentAlt />
                        </div>
                        <div>Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* -------------------------------------------------------------------------- */}
    </div>
  );
};

export default PuplishPost;
