import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { server } from "./../app/utils/config";
import { http, httpForm } from "./../app/utils/apiMethods";
import { useAppContext } from "../app/context/state";

export default function Settings() {
  const globals = useAppContext();
  const [userToken, setUserToken] = useState({
    type: "customer",
  });
  const [serviceId, setServiceId] = useState("TEMP");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState({});
  const [imgPath, setImgPath] = useState("/serviceImages/TEMP.jpg");

  const [loadingAccount, setLoadingAccount] = useState(false);
  const [loadingService, setLoadingService] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const disabled =
    !firstName || !lastName || password != cpassword || loadingAccount;
  const disabled2 = !name || !type || loadingService;
  const disabled3 = loadingUpload || !img;

  const loadAccount = (user) => {
    http("GET", `${server}/api/users?id=${user._id}`)
      .then((d) => {
        if (d.success) {
          const user = d.data;
          setFirstName(user.name.first);
          setLastName(user.name.last);
        } else {
          toast.error("Failed to load account data");
        }
      })
      .catch((e) => console.error(e));
  };

  const loadService = (user) => {
    http("GET", `${server}/api/service?id=${user._id}&type=provider`)
      .then((d) => {
        if (d.success) {
          const service = d.data;
          setServiceId(service._id);
          setName(service.name);
          setType(service.serviceType);
          setOpenTime(service.opentime);
          setAddress(service.address);
          setImgPath(service.photo || `serviceImages/TEMP.jpg`);
        } else {
          toast.error("Failed to load service data");
        }
      })
      .catch((e) => console.error(e));
  };

  const getAuth = () => {
    http("GET", "/api/getAuth")
      .then((data) => {
        if (data.success) {
          console.log("Redirecting to dashboard page");
          localStorage.setItem("auth", data.data);
          const userData = jwt_decode(data.data);
          globals.methods.setUser(userData);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const saveAccount = () => {
    const req = {
      _id: userToken._id,
      name: {
        first: firstName,
        last: lastName,
      },
    };
    if (password) {
      req["password"] = password;
    }
    setLoadingAccount(true);
    http("PUT", "/api/users", req)
      .then((d) => {
        setLoadingAccount(false);
        if (d.success) {
          const user = d.data;
          setFirstName(user.name.first);
          setLastName(user.name.last);
          getAuth();
          toast.success("Account info saved");
        } else {
          toast.error("Failed to save account data");
        }
      })
      .catch((e) => {
        setLoadingAccount(false);
        console.error(e);
      });
  };

  const upload = () => {
    const form = new FormData();
    const fileName = img.name;
    const splittedFileName = fileName.split(".");
    const fileExtension = splittedFileName[splittedFileName.length - 1];
    const serviceId = globals.sharedState.user.serviceId;

    if (fileExtension == "jpg" || fileExtension == "png") {
      setImgPath(`/serviceImages/TEMP.jpg`);
      form.append("media", img);
      form.append("serviceId", serviceId);
      setLoadingUpload(true);
      httpForm("/api/serviceImg", form)
        .then((d) => {
          setLoadingUpload(false);
          const data = d;
          if (data.success) {
            setImgPath(data.data);
            toast.success("Uploaded");
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          setLoadingUpload(false);
          console.error("Error:", error);
        });
    } else {
      toast.warning("Image should be of type jpg (.jpg)");
    }
  };

  const saveService = () => {
    const req = {
      _id: serviceId,
      serviceType: type,
      name,
      opentime,
      address,
    };
    setLoadingService(true);
    http("PUT", "/api/service", req)
      .then((d) => {
        setLoadingService(false);
        if (d.success) {
          const service = d.data;
          setName(service.name);
          setType(service.serviceType);
          setOpenTime(service.opentime);
          setAddress(service.address);
          toast.success("Service info saved");
        } else {
          toast.error("Failed to save service data");
        }
      })
      .catch((e) => {
        setLoadingService(false);
        console.error(e);
      });
  };

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const user = jwt_decode(auth);
      setUserToken(user);
      if (user.type == "provider") {
        loadService(user);
      }

      loadAccount(user);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Enqueue - Settings</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />

      <div className="container mx-auto">
        <div
          className="h-auto mx-auto flex border shadow-sm mt-16"
          style={{ maxWidth: "42rem" }}
        >
          <div className="flex items-center flex-1">
            <div className="flex flex-1 flex-col p-14">
              <div className="font-extrabold text-3xl text-center mb-8">
                Account Settings
              </div>
              <div className="flex">
                <div className="m-2 flex-1">
                  <div className="font-medium">First Name</div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-transparent border p-2 w-full"
                  />
                </div>
                <div className="m-2 flex-1">
                  <div className="font-medium">Last Name</div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-transparent border p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-2 flex-1">
                  <div className="font-medium">Password</div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-2 flex-1">
                  <div className="font-medium">Confirm Password</div>
                  <input
                    type="password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    className="bg-transparent border p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-2 mt-8 flex-1">
                  <div
                    onClick={() => {
                      if (!disabled) {
                        saveAccount();
                      }
                    }}
                    className={
                      "select-none font-bold text-center w-full p-3.5 text-white " +
                      (disabled ? "cursor-not-allowed" : "cursor-pointer")
                    }
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    SAVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Service */}
        {userToken.type == "provider" ? (
          <div
            className="h-auto mx-auto flex border shadow-sm mt-16"
            style={{ maxWidth: "42rem" }}
          >
            <div className="flex items-center flex-1">
              <div className="flex flex-1 flex-col p-14">
                <div className="font-extrabold text-3xl text-center mb-8">
                  Service Registration
                </div>
                <div className="flex">
                  <div className="m-2 flex-1">
                    <div className="font-medium">Service Name</div>
                    <input
                      type="text"
                      value={name}
                      placeholder="e.g. ABC Dental Clinic"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="m-2 flex-1">
                    <div className="font-medium">Service Type</div>
                    <input
                      type="text"
                      value={type}
                      placeholder="e.g. Dental Clinic, Repair Shop"
                      onChange={(e) => setType(e.target.value)}
                      className="bg-transparent border p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="m-2 flex-1">
                    <div className="font-medium">Available Time</div>
                    <input
                      type="text"
                      value={opentime}
                      placeholder="e.g. 8:00 AM - 12:00 PM, 1:00 PM - 5:00 PM"
                      onChange={(e) => setOpenTime(e.target.value)}
                      className="bg-transparent border p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="m-2 flex-1">
                    <div className="font-medium">Address</div>
                    <input
                      type="text"
                      value={address}
                      placeholder="e.g. 123 New Street, Brgy. ABC, Pasig, Metro Manila"
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-transparent border p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex mt-4">
                  <div className="m-2 flex-1">
                    <div
                      onClick={() => {
                        if (!disabled2) {
                          saveService();
                        }
                      }}
                      className={
                        "select-none font-bold text-center w-full p-3.5 text-white " +
                        (disabled2 ? "cursor-not-allowed" : "cursor-pointer")
                      }
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      SAVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {userToken.type == "provider" ? (
          <div className="container mx-auto">
            <div
              className="h-auto mx-auto flex border shadow-sm mt-16"
              style={{ maxWidth: "42rem" }}
            >
              <div className="flex items-center flex-1">
                <div className="flex flex-1 flex-col p-14">
                  <div className="font-extrabold text-3xl text-center mb-8">
                    Service Photo
                  </div>
                  <div className="flex">
                    <div className="m-2 flex-1">
                      <div className="font-medium">Upload File</div>
                      <input
                        type="file"
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                          setImgPath(URL.createObjectURL(e.target.files[0]));
                        }}
                        className="bg-transparent border p-2 w-full"
                      />
                    </div>
                  </div>
                  {imgPath ? (
                    <div className="flex">
                      <div className="m-2 flex-1">
                        <div className="font-medium">Photo Preview (16:9)</div>
                        <img
                          src={imgPath}
                          className="object-cover mx-auto"
                          style={{
                            width: "33.778rem",
                            height: "19rem",
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex mt-4">
                    <div className="m-2 flex-1">
                      <div
                        onClick={() => {
                          if (!disabled3) {
                            upload();
                          }
                        }}
                        className={
                          "select-none font-bold text-center w-full p-3.5 text-white " +
                          (disabled3 ? "cursor-not-allowed" : "cursor-pointer")
                        }
                        style={{ backgroundColor: "var(--secondary)" }}
                      >
                        Upload
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/*  */}
      </div>

      <Footer />
    </div>
  );
}
