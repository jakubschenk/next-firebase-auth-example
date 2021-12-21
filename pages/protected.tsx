import React from "react";
import { NextPage } from "next";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import getAbsoluteURL from "../utils/getAbsoluteURL";

const ProtectedPage: NextPage<{
  favoriteColor: string;
}> = ({ favoriteColor }) => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <p>This is a protected page, only auth user can see it</p>
      <div>
        server color: {favoriteColor} user: {AuthUser.email}
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  // Optionally, get other props.
  // You can return anything you'd normally return from
  // `getServerSideProps`, including redirects.
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  const token = await AuthUser.getIdToken();

  return {
    props: {
      favoriteColor: "red",
    },
  };
});

export default withAuthUser<{ favoriteColor: string }>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(ProtectedPage);
