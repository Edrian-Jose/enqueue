import React from "react";
import Link from "next/link";
import LogButton from "../../elements/LogButton/LogButton";

export default function DefaultNav() {
  return (
    <React.Fragment>
      <span>Already have an account? </span>
      <Link href="/login">
        <a>
          <LogButton icon="/icons/login-black.svg" alt="Login" text="Login" />
        </a>
      </Link>
    </React.Fragment>
  );
}
