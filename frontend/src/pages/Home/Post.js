import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  allPost,
  allComments,
  addComment,
  allLikes,
  addLike,
  removeLike,
} from "../../service/redux/reducers/posts/postsSlice";
import { IoIosCloseCircle } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import PostLoader from "../../components/PostsLoader/PostLoader";

export const Post = () => {
  const [comment, setComment] = useState(""); //
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState("");
  const [likes, setLikes] = useState(false);
  const [show, setShow] = useState("");
  const [commentWind, setCommentWind] = useState(false);
  const [interested, setInterested] = useState(false);
  const [noPosts, setNoPosts] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
      userLikes: state.posts.userLikes,
      userInfo:state.profile.userInfo
    };
  });

  // ===============================
  useEffect(() => {
    axios
      .get("https://workedin.onrender.com/posts/followsPosts", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(allPost(result.data.posts));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  ///get comments
  const getCommentsByPost = async (post_id) => {
    try {
      const result = await axios.get(
        `https://workedin.onrender.com/comments/comment/${post_id}`
      );
      if (result.data.success) {
        const comments = result.data.comments;
        dispatch(allComments({ comments, post_id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  const createComment = async (post_id) => {
    try {
      const result = await axios.post(
        `https://workedin.onrender.com/comments/comment/${post_id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        const newCommet = result.data.results;
        dispatch(addComment({ newCommet, post_id }));
        getCommentsByPost(post_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* =============================== */
  /*   const getlikes = async (post_id) => {
    try {
      const result = await axios.get(
        `https://workedin.onrender.com/posts/getLikes/${post_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        const likes = result.data.likes;

        dispatch(allLikes({ likes, post_id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  }; */

  /* ============================================== */

  /*   const like = async (post_id) => {
    try {
      const result = await axios.post(
        `https://workedin.onrender.com/posts/addLike`,
        {
          post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        setLikes(true);
        dispatch(addLike({ post_id }));
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  /* ============================================== */
  /* 
  const unlike = async (like_id) => {
    try {
      const result = await axios.post(
        `https://workedin.onrender.com/posts/removeLike/${like_id}`,

        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        setLikes(true);
        dispatch(removeLike({ like_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };
 */
  setTimeout(() => {
    setNoPosts(true);
  }, 3000);
  // ================================

  return (
    <div className="bg-zinc-200">
      {state.posts.length !== 0 ? (
        state.posts?.map((post, index) => {
          return (
            <div key={post.post_id} className="">
              <div
                className="container mt-3 relative"
                style={{ width: "600px" }}
              >
                <div
                  className="bg-white rounded-lg shadow p-4"
                  style={{ width: "600px" }}
                >
                  <div className=" flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.profileimage}
                      alt="Profile Picture"
                      className="w-12 h-12 rounded-full cursor-pointer object-cover"
                      onClick={() => {
                        navigate(`/friend/${post.user_id}`);
                      }}
                    />
                    <div className="ml-2">
                      <p
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                          navigate(`/friend/${post.user_id}`);
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
                  
                  {post.user_id===state.userInfo.user_id&& (
                    <div class="  h-8  rounded-3xl flex items-center p-2 ms-2 mt-3 me-3 cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg></div>
                  )}
                  
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
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          {
                            interested
                              ? setInterested(false)
                              : setInterested(true);
                            setPost_id(post.post_id);
                          }
                        }}
                      >
                        {interested && post_id === post.post_id ? (
                          <div className="mt-1 me-1" onClick={() => {}}>
                            {" "}
                            <FaHeart />
                          </div>
                        ) : (
                          <div className="mt-1 me-1" onClick={() => {}}>
                            {" "}
                            <FaRegHeart />
                          </div>
                        )}
                        <div>Interested</div>
                      </div>

                      {/* ======*******===== */}

                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          getCommentsByPost(post.post_id);
                          setShow(post.post_id);
                          setCommentWind(true);
                          setPost_id(post.post_id);
                        }}
                      >
                        <div className="me-1 mt-1">
                          <TfiCommentAlt />
                        </div>
                        <div>Reviews</div>
                      </div>
                    </div>
                    {/* ========== */}

                    {commentWind && post_id === post.post_id && (
                      <>
                        {" "}
                        <div id="myModal" class="modal2">
                          <div className="modal-content2">
                            <span
                              className="close2"
                              onClick={() => {
                                setCommentWind(false);
                              }}
                            >
                              &times;
                            </span>
                            <p>Commets</p>
                            <div>
                              {post.comments?.map((comment, i) => {
                                return (
                                  <div className="mb-3 border-b-2">
                                    <div className="flex items-center ms-2 mt-2">
                                      <img
                                        src={comment.profileimage}
                                        alt="Profile Picture"
                                        className="w-10 h-10 rounded-full object-cover"
                                      />
                                      <div className="ml-2">
                                        <p className="font-semibold">
                                          {comment.firstname} {comment.lastname}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="comment ms-12 pb-2" key={i}>
                                      {comment.comment}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-4">
                              <textarea
                                id="comment-textarea"
                                className="w-96 h-12 p-1 bg-gray-200 rounded-2xl"
                                placeholder="  Write a comment"
                                onChange={(e) => {
                                  setComment(e.target.value);
                                }}
                              ></textarea>
                              <button
                                id="post-comment-button"
                                className="mt-2 ms-2 mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  if (comment) createComment(post.post_id);
                                  document.getElementById(
                                    "comment-textarea"
                                  ).value = "";
                                }}
                              >
                                Add Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : noPosts ? (
        <div
          className="flex h-64 items-center justify-center"
          style={{ width: "600px" }}
        >
          <div className="text-gray-500 text-2xl">"No Posts Yet"</div>
        </div>
      ) : (
        <PostLoader />
      )}
    </div>
  );
};

export default Post;
