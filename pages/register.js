import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import Button from "./../app/components/elements/Button/Button";
import { useState } from "react";

export default function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

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
            <div className="flex flex-1 flex-col px-28 py-14">
              <div className="font-extrabold text-3xl text-center mb-8">
                Getting Started
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
                  <div className="font-medium">Email</div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="m-2 flex-1">
                  <div className="font-medium">Sign up as </div>
                </div>
              </div>
              <div className="flex">
                <div className="m-2 flex-1">
                  <div
                    className="cursor-pointer font-bold text-center w-full p-3.5 text-white"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    Customer
                  </div>
                </div>
                <div className="m-2 flex-1">
                  <div
                    className="cursor-pointer font-bold text-center w-full p-3.5 text-white"
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    Provider
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
