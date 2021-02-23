import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import Button from "./../app/components/elements/Button/Button";
import { useState } from "react";

export default function register2() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <Head>
        <title>Enqueue - Login</title>
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
                    value={openTime}
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
                    className="cursor-pointer font-bold text-center w-full p-3.5 text-white"
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    Save
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
