import React from "react";
import Link from "next/link";
import LogButton from "./../../elements/LogButton/LogButton";
import { useRouter } from "next/router";

export default function UserNav({ user }) {
  const router = useRouter();
  const logout = () => {
    if (window) {
      localStorage.removeItem("auth");
      router.push("/logout");
    }
  };
  return (
    <React.Fragment>
      <span>Logged in as</span>

      <Link href="/settings">
        <a>
          <span className="font-bold ml-2" title="Account Settings">
            {user.name}
          </span>
        </a>
      </Link>

      <LogButton
        icon="/icons/logout-black.svg"
        alt="Log Out"
        text="Log Out"
        textStyle={{
          color: "var(--secondary)",
        }}
        onClick={() => logout()}
      />
    </React.Fragment>
  );
}
