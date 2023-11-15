import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            // ..
            toast.error(errorMessage);
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    if (!user) return;
    setLoading(true);
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      //toast.error("Doc already exists.");
      setLoading(false);
    }
  }
  function loginUsingEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Logged In", user);
          navigate("/dashboard");
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User authenticated");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          setLoading(false);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          toast.error(errorMessage);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  }
  return (
    <>
      {loginForm ? (
        <>
          <div className="w-[70%] max-w-[500px] h-auto hover:bg-blend-darken shadow-current shadow-2xl border rounded-2xl p-6 px-10">
            <h2 className="font-bold text-sm text-center m-0 mb-0">
              Login on <span className="text-blue-600 ">Financely.</span>
            </h2>
            <form>
              <Input
                type="email"
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"youremail@gmail.com"}
              />
              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Example@123"}
              />

              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Email and Password"}
                color="white"
                onClick={loginUsingEmail}
              />
              <p className="text-center m-0">or</p>
              <Button
                onClick={googleAuth}
                text={loading ? "Loading..." : "Login Using Google"}
                color="blue"
              />
              <p
                className="text-center m-0 font-light text-sm cursor-pointer"
                onClick={() => setLoginForm(!loginForm)}
              >
                or Don't Have An Account ? Click here
              </p>
            </form>
          </div>
        </>
      ) : (
        <div className="w-[70%] max-w-[500px] h-auto hover:bg-blend-darken shadow-current shadow-2xl border rounded-2xl p-6 px-10">
          <h2 className="font-bold text-sm text-center m-0 mb-0">
            Sign Up on <span className="text-blue-600 ">Financely.</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Enter your Full Name"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"youremail@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              color="white"
              onClick={signupWithEmail}
            />
            <p className="text-center m-0">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"}
              color="blue"
            />
            <p
              className="text-center m-0 font-light text-sm cursor-pointer"
              onClick={() => setLoginForm(!loginForm)}
            >
              or Have an Account Already? Click here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
