import React from "react";
import Link from "next/link";
import LogButton from "./../../elements/LogButton/LogButton";

export default function UserNav() {
  return (
    <React.Fragment>
      <span>Logged in as</span>

      <Link href="/settings">
        <a>
          <span className="font-bold ml-2" title="Account Settings">
            Edrian Jose Ferrer
          </span>
        </a>
      </Link>
      <Link href="/logout">
        <a>
          <LogButton
            icon="/icons/logout-black.svg"
            alt="Log Out"
            text="Log Out"
            textStyle={{
              color: "var(--secondary)",
            }}
          />
        </a>
      </Link>
    </React.Fragment>
  );
}
