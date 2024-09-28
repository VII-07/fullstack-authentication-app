import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data: {
    email: string;
    name?: string;
    password: string;
  }) => {
    try {
      await signup(data);
      navigate("/login");
    } catch (err) {
      console.error("Singup failed:", err);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading mb="6">Sign Up</Heading>
      <AuthForm onSubmit={handleSignup} isSignup />
    </Box>
  );
};

export default Signup;
