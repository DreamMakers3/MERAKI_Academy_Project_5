import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobName, setJobName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [field_id, setField_id] = useState("");
  const [role_id, setRole_id] = useState(1);

  const [allFields, setAllFields] = useState([]);

  const [registerLoader, setRegisterLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  const [message, setMessage] = useState("");

  /* ================== For upload on CV cloudenary ================================ */
  const [isUpload, setIsUpload] = useState(false);

  const [isLoader, setIsLoader] = useState(true);

  const [CV, setCV] = useState("");

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
        setCV(data.url);
        setUploadDone(true);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };
  /* ==================================================== */

  /* ============================================================= */
  const addNewUser = async () => {
    try {
      const result = await axios.post(
        "https://workedin.onrender.com/users/register",
        {
          firstName,
          lastName,
          jobName,
          country,
          email,
          password,
          about,
          CV,
          phoneNumber,
          skills,
          education,
          field_id,
          role_id,
        }
      );
      if (result.data.success) {
        setRegisterLoader(false);
        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setRegisterLoader(false);
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  /* ================================================================== */
  const getAllFields = async (e) => {
    try {
      const result = await axios.get(
        "https://workedin.onrender.com/roles/fields"
      );
      if (result.data.success) {
        setAllFields(result.data.Fields);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  useEffect(() => {
    getAllFields();
  }, []);

  /* ===================================================================== */
  return (
    <div className="bg-zinc-200 h-screen">
      <p className="h-20 font-bold text-3xl text-center pt-2">Register</p>

      <div className="flex justify-center items-center">
        <div>
          <div className="flex">
            {/* ===================== Left ======================================================== */}
            <div>
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="First Name**"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="Last Name**"
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="PhoneNumber**"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />{" "}
              <br />
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="email"
                placeholder="Email**"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="password"
                placeholder="Password**"
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <br />
            </div>
            {/* ================  Right ============================================================= */}
            <div className="ms-3">
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="Country**"
                onChange={(e) => setCountry(e.target.value)}
              />{" "}
              <br />
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="Education"
                onChange={(e) => setEducation(e.target.value)}
              />
              <br />{" "}
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="Recent Job Name"
                onChange={(e) => setJobName(e.target.value)}
              />
              <br />
              <input
                className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
                type="text"
                placeholder="Skills"
                onChange={(e) => setSkills(e.target.value)}
              />
              <br />
              <div className="flex">
                <p className="flex items-center w-40 h-10 bg-white border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none" style={{fontSize:"18px"}}>
              Your Field  <span style={{fontSize:"12px"}}>"Guest? choose IT"</span>{" "}
                </p>
                <select
                  className="mb-2 w-24 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg"
                  onChange={(e) => {
                    setField_id(e.target.value);
                  }}
                >
                  <option className=" text-slate-300">Choose</option>
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
            {/* ================================================================================== */}
          </div>
          {/* ********************** upload CV ******************************************* */}
          <div
            className="mb-3 cursor-pointer"
            onClick={() => {
              setUploadModal(true);
            }}
          >
            <div className="flex">
              <p className="flex justify-center items-center rounded-md rounded-e-none w-28 p-1 h-10  text-sm font-medium text-white dark:text-white bg-black">
                Upload CV
              </p>
              {uploadDone ? (
                <p className="flex justify-start ps-3 items-center rounded-md rounded-s-none w-full p-1 h-10  text-sm font-medium text-gray-700 bg-white">
                  CV Uploaded Successfully
                </p>
              ) : (
                <p className="flex justify-start ps-3 items-center rounded-md rounded-s-none w-full p-1 h-10  text-sm font-medium text-gray-400 bg-white">
                  PDF , WORD (MAX. 2MG).
                </p>
              )}
            </div>
          </div>
          {/* ************************** Check if company ******************************************/}
          <div className="flex">
            <p className="mb-2 text font-medium dark:text-gray-900">
              Company Account ?
            </p>
            <div className="flex items-center mb-3 ms-3">
              <input
                id="default-radio-1"
                type="radio"
                value="yes"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e) => {
                  setRole_id(2);
                  setModal(true);
                }}
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium dark:text-gray-900"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center mb-3 ms-3">
              <input
                id="default-radio-2"
                type="radio"
                value="no"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={(e) => {
                  setRole_id(1);
                }}
              />
              <label
                htmlFor="default-radio-2"
                className="ms-2 text-sm font-medium dark:text-gray-900"
              >
                No
              </label>
            </div>
          </div>
          {/* ************************************************** */}
          <p className="text-red-600 text-sm font-bold">{message}</p>
          <button
            onClick={() => {
              addNewUser();
              setRegisterLoader(true);
            }}
            className=" mt-3 bg-blue-950 text-white w-full h-10 border-2 rounded-md shadow-lg"
          >
            Register Now
          </button>{" "}
          <button
            className="mt-3 bg-black text-white w-full h-10 border-2 rounded-md shadow-lg"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Login
          </button>
        </div>
        {/* ============= loader login ================= */}
        {registerLoader && (
          <>
            {" "}
            <div
              id="myModal"
              className="modalLogin flex justify-center items-center pb-28"
            >
              <div className="loaderReg"></div>
            </div>
          </>
        )}
        {/* ===================== pop up to fill about ==================================== */}
        {modal && (
          <>
            {" "}
            <div id="myModal" className="modalReg">
              <div className="modal-contentReg">
                <p className="font-medium border-b-2 pb-2">
                  Write about your company
                </p>
                <textarea
                  placeholder="General description"
                  className="p-2 w-full border-2 mt-3"
                  rows={4}
                  style={{ outline: "none", resize: "none" }}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    className=" bg-black rounded shadow-lg w-28 h-10 text-white"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* ========================== upload CV =================================================== */}
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
                <p className="text-xl font-medium ms-2">Upload CV</p>

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
                    ) : CV ? (
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
        {/* ========================================================================================= */}
      </div>
    </div>
  );
};

export default Register;
