import Head from "next/head";
import Navbar from "../app/components/modules/Navbar/Navbar";
import Footer from "../app/components/modules/Footer/Footer";
import Button from "../app/components/elements/Button/Button";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { http, httpForm } from "../app/utils/apiMethods";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAppContext } from "../app/context/state";

export default function register2() {
  const router = useRouter();
  const globals = useAppContext();
  const [img, setImg] = useState({});
  const [imgPath, setImgPath] = useState("");

  const getAuth = () => {
    http("GET", "/api/getAuth")
      .then((data) => {
        if (data.success) {
          console.log("Redirecting to dashboard page");
          localStorage.setItem("auth", data.data);
          const userData = jwt_decode(data.data);
          globals.methods.setUser(userData);
          router.push("/dashboard");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const upload = () => {
    const form = new FormData();
    const fileName = img.name;
    const splittedFileName = fileName.split(".");
    const fileExtension = splittedFileName[splittedFileName.length - 1];
    const serviceId = globals.sharedState.user.serviceId;
    const newFileName = `${serviceId}.${fileExtension}`;

    if (fileExtension == "jpg") {
      form.append("media", img, newFileName);
      form.append("_id", globals.sharedState.user._id);

      httpForm("/api/serviceImg", form)
        .then((d) => {
          const data = d;
          if (data.success) {
            toast.success("Uploaded");
            getAuth();
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      toast.warning("Image should be of type jpg (.jpg)");
    }
  };
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
                      if (img && imgPath != "") {
                        upload();
                      }
                    }}
                    className={
                      "font-bold text-center w-full p-3.5 text-white " +
                      (!img || imgPath == ""
                        ? "cursor-not-allowed"
                        : "cursor-pointer")
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

      <Footer />
    </div>
  );
}
