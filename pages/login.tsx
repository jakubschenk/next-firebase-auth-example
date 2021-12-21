import React from "react";
import { NextPage } from "next";
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import FirebaseAuth from "../components/FirebaseAuth";

const LoginPage: NextPage = () => {
  return (
    <div>
      <div>login</div>
      <br />
      <div>this is not static, redirects if already logged in</div>
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(LoginPage);
