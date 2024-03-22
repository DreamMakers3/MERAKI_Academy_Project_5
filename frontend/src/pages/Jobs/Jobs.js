import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./Jobs.css";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [showJob, setShowJob] = useState(false);
  const [aPPLY, setAPPLY] = useState(false);
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
      userInfo: state.profile.userInfo,
    };
  });
  const sendEmail = (e) => {
    e.preventDefault();
    const serviceId = "service_tclbful";
    const templateId = "template_qhkw6b1";
    const publicKey = "3Z6VLfroPrdEEhWm8";
    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  useEffect(() => {
    axios
      .get("https://workedin.onrender.com/jobs/", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setJobs(result.data.jobs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  /* ========================================================= */
  return (
    <div className="flex bg-zinc-200">
      <div className="w-2/5 border-e-2 border-gray-600">
        {jobs.length === 0 ? (
          <div
            className="flex h-64 items-center justify-center"
            style={{ width: "650px" }}
          >
            <div className="text-gray-500 text-2xl">"No Jobs Recently"</div>
          </div>
        ) : (
          jobs?.map((job, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setShowJob(true);
                  setJobId(job.job_id);
                }}
              >
                <div class="">
                  <div class=" bg-zinc-200">
                    <div className="">
                      <div
                        className="container mx-auto p-2 "
                        style={{ width: "400px" }}
                      >
                        <div
                          className="bg-white rounded-md shadow p-3"
                          style={{ width: "400px" }}
                        >
                          <div className="flex">
                            <img
                              src={job.profileimage}
                              alt="Profile Picture"
                              className="w-12 h-12 rounded-full object-cover cursor-pointer"
                              onClick={() => {
                                navigate(`/friend/${job.user_id}`);
                              }}
                            />
                            <div className="ml-2">
                              <p
                                className="font-semibold cursor-pointer"
                                onClick={() => {
                                  navigate(`/friend/${job.user_id}`);
                                }}
                              >
                                {job.firstname} {job.lastname}
                              </p>

                              {/*  <h6>Amman,Jordan(Onsite)</h6> */}
                              <p className="text-gray-500 text-xs">
                                {" "}
                                Published{" "}
                                {job.created_at
                                  .split("T")
                                  .shift()
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                              </p>
                              <p className="font-medium mt-1 cursor-pointer">
                                <span className="me-1 font-medium text-blue-600">
                                  Hiring:
                                </span>
                                {job.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* =================    Form Job  Add (Email.Js here )  ======================== */}
      <div className="w-3/5">
        {jobs.map((job, index) => {
          return (
            <>
              {showJob && jobId === job.job_id && (
                <>
                  <div class=" bg-zinc-200">
                    <div className="container mx-auto p-3 relative">
                      <div class="bg-white  shadow rounded-md p-7 mb-6 max-w-2xl">
                        <div class="flex items-center justify-between container mx-auto border-b-4 pb-3">
                          <div className="flex w-96 items-center">
                            <img
                              src={job.profileimage}
                              alt="Profile Picture"
                              class="w-12 h-12 rounded-full object-cover"
                            />
                            <p class="font-semibold ms-2">
                              {job.firstname} {job.lastname}
                            </p>
                          </div>

                      {/*     <div>
                            <button className="bg-black rounded-md shadow-md w-20 h-8 text-white">
                              Follow
                            </button>
                          </div> */}
                        </div>
                        {/* ********** */}
                        <h2 className="text-2xl font-bold mt-3 mb-2">
                          {" "}
                          JOB TITLE
                        </h2>
                        <div className="bg-white shadow rounded-md p-3 mb-6 max-w-2xl">
                          <p className="text-gray-800 text-lg mb-4">
                            {" "}
                            {job.title}
                          </p>
                        </div>
                        {/* ********** */}
                        <h2 className="text-xl font-bold mt-1 mb-2">
                          {" "}
                          JOB DESCRIPITON{" "}
                        </h2>
                        <div className="bg-white shadow rounded-md p-3 mb-6 max-w-2xl">
                          <p className="text-gray-800 text-lg mb-4">
                            {" "}
                            {job.discription}
                          </p>
                        </div>
                        {/* *********** */}
                        {console.log(job)}

                        <div className="flex justify-between">
                          <div>
                            <button
                              className="bg-blue-600 hover:bg-blue-700 w-40 text-white font-bold py-2 px-4 rounded"
                              onClick={() => setAPPLY(true)}
                            >
                              APPLY Now
                            </button>
                          </div>
                          <button className="bg-gray-500 w-24 h-10 rounded text-center text-white">
                            Save Later
                          </button>
                        </div>
                        {aPPLY && (
                          <div id="myModal" class="modal2">
                            <div className="modal-content2 " id="app">
                              <span
                                className="close2"
                                onClick={() => {
                                  setAPPLY(false);
                                }}
                              >
                                &times;
                              </span>
                              <p>APPLY for {job.title}</p>
                              <form ref={form} onSubmit={sendEmail}>
                                <label className="inputForm">to</label>
                                <input
                                  type="text"
                                  name="to_name"
                                  className="inputForm w-6"
                                  value={job.firstname}
                                />

                                <label className="inputForm">subject</label>
                                <input
                                  type="text"
                                  name="job_title"
                                  className="inputForm w-6"
                                  value={job.title}
                                />

                                <label className="inputForm">CV</label>
                                <input
                                  type="text"
                                  name="CV"
                                  className="inputForm w-6"
                                  value="http://res.cloudinary.com/drkox9efz/image/upload/v1709064504/jsllldjm6l5wo3b1qfqa.pdf"
                                />

                                <label className="inputForm">from</label>
                                <input
                                  type="text"
                                  name="from_name"
                                  className="inputForm w-6"
                                  value={state.userInfo.firstname}
                                />

                                <label className="inputForm">email to</label>
                                <input
                                  type="email"
                                  name="to-email"
                                  className="inputForm w-6"
                                  value={job.email}
                                />
                                <label className="inputForm">from email</label>
                                <input
                                  type="text"
                                  name="from_email"
                                  className="inputForm w-6"
                                  value={state.userInfo.email}
                                />
                                <label className="inputForm">Message</label>

                                <textarea
                                  name="message"
                                  className="w-96 h-12 p-1 bg-gray-200 rounded-2xl"
                                  placeholder="  Write a massege with email"
                                />
                                <input
                                  type="submit"
                                  value="apply"
                                  className="mt-2 ms-2 mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                />
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          );
        })}

        {!showJob && (
          <div className="flex justify-center items-center mt-6">
            <img
              src="https://www.promoshin.com/wp-content/uploads/2022/10/Job-offers.gif"
              className="ml-20  mt-5 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
