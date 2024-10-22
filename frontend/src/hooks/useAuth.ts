import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { signUpUser, userLogin } from "../api/auth";
import { useError } from "../context/ErrorContext";
import { AuthResponse } from "../utils/interface";

const useAuth = () => {
  const [co, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { setError } = useError();

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data: AuthResponse) => {
      console.log(">>>>", data.access_token);
      setCookie("token", data.access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "strict",
      });
      setError(null);
      navigate("/dashboard");
      console.log(">>> ia mhere");
    },
    onError: (error: unknown) => {
      if (error instanceof Error && error.message) {
        setError(error.message || "Login failed");
      } else {
        setError("An unknown error occurred during login.");
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      setError(null);
    },
    onError: (error: unknown) => {
      if (error instanceof Error && error.message) {
        setError(error.message || "Signup failed");
      } else {
        setError("An unknown error occurred during signup.");
      }
    },
  });

  const logout = () => {
    removeCookie("token", { path: "/" });
  };

  return {
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout,
  };
};

export default useAuth;
