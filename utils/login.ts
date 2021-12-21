import firebase from "firebase";
import "firebase/auth";

const login = () => {
  const provider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithRedirect(provider);
};

export default login;
