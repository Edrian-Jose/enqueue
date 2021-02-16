import React from "react";
import Link from "next/link";
import LogButton from "./../../elements/LogButton/LogButton";

export default function DefaultNav() {
  return (
    <React.Fragment>
      <span>New to Enqueue? </span>
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
