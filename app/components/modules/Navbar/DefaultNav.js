import React from "react";
import Link from "next/link";
import SearchBar from "../../elements/SearchBar/SearchBar";
import LogButton from "./../../elements/LogButton/LogButton";

export default function DefaultNav() {
  return (
    <React.Fragment>
      <SearchBar />

      <Link href="/login">
        <a>
          <LogButton icon="/icons/login-black.svg" alt="Login" text="Login" />
        </a>
      </Link>
      <Link href="/register">
        <a>
          <LogButton
            icon="/icons/signup-black.svg"
            alt="Sign Up"
            text="Sign Up"
            textStyle={{
              color: "var(--secondary)",
            }}
          />
        </a>
      </Link>
    </React.Fragment>
  );
}
