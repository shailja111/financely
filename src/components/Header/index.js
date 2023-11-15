import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  function logoutFunc() {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("Logged Out Successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="bg-blue-600 pl-2 pt-1 sticky top-0 left-0 w-[100%] flex justify-between items-center">
      <p className="text-white font-medium text-xl mt-0 pb-3">Financely.</p>
      {user && (
        <p
          onClick={logoutFunc}
          className="text-white font-medium text-xl mt-0 pb-3 opacity-80 hover:opacity-100 transition-opacity"
        >
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
