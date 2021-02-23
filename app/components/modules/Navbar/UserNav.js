import React from "react";
import Link from "next/link";
import LogButton from "./../../elements/LogButton/LogButton";
import { useRouter } from "next/router";
import SearchBar from "./../../elements/SearchBar/SearchBar";
import { useAppContext } from "../../../context/state";

export default function UserNav({ user }) {
  const router = useRouter();
  const global = useAppContext();
  const logout = () => {
    if (window) {
      localStorage.removeItem("auth");
      global.sharedState.setUser(null);
      router.push("/logout");
    }
  };
  return (
    <React.Fragment>
      {user.type == "customer" ? <SearchBar /> : null}
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
