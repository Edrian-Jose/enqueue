import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import Button from "./../app/components/elements/Button/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../app/utils/apiMethods";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useAppContext } from "../app/context/state";

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const globals = useAppContext();
  const login = () => {
    const req = {
      email,
      password,
    };
    http("POST", "/api/login", req)
      .then((data) => {
        if (data.success) {
          localStorage.setItem("auth", data.data);
          const userData = jwt_decode(data.data);
          globals.methods.setUser(userData);
          if (userData.type == "provider" && userData.completed == 0) {
            router.push("/register2");
          } else if (userData.type == "provider" && userData.completed == 1) {
            router.push("/register3");
          } else if (userData.type == "provider" && userData.completed == 2) {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const disabled = !email || !password;
  return (
    <div>
      <Head>
        <title>Enqueue - Login</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <div className="container mx-auto">
        <div
          className="h-auto  mx-auto flex border shadow-sm mt-16"
          style={{ maxWidth: "56rem" }}
        >
          <div className="flex-1 bg-transparent">
            <img src="/images/login-bg.png" className="w-full h-auto" />
          </div>
          <div
            className="flex-1 flex items-center"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <div className="flex flex-1 flex-col text-white">
              <div className="text-center text-2xl font-extrabold mb-10">
                SIGN IN
              </div>
              <div className="mx-auto m-2">
                <div className="font-medium">Email Address</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border p-2 w-72"
                />
              </div>
              <div className="mx-auto m-2">
                <div className="font-medium">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border p-2 w-72"
                />
              </div>
              <div className="mx-auto m-2 mt-10">
                <div
                  onClick={() => {
                    if (!disabled) {
                      login();
                    }
                  }}
                  className={
                    "font-bold text-center w-72 p-3.5 " +
                    (disabled ? "cursor-not-allowed" : "cursor-pointer")
                  }
                  style={{ backgroundColor: "var(--secondary)" }}
                >
                  LOGIN
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
