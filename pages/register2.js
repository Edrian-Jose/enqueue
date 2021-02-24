import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import Button from "./../app/components/elements/Button/Button";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { http } from "../app/utils/apiMethods";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function register2() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [address, setAddress] = useState("");

  const save = () => {
    const user = jwt_decode(localStorage.getItem("auth"));

    const req = {
      name,
      serviceType: type,
      ownerId: user._id,
      ownerName: user.name,
      opentime,
      address,
    };

    http("POST", "/api/services", req)
      .then((data) => {
        if (data.success) {
          router.push("/dashboard");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const disabled = !name || !type;
  return (
    <div>
      <Head>
        <title>Enqueue - Service Registration</title>
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
                  <div className="font-medium">Open Time</div>
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
                      if (!disabled) {
                        save();
                      }
                    }}
                    className={
                      "font-bold text-center w-full p-3.5 text-white " +
                      (disabled ? "cursor-not-allowed" : "cursor-pointer")
                    }
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    Proceed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
