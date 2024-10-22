import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data);
      navigate("/application");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading mb="6">Login</Heading>
      <AuthForm onSubmit={handleLogin} />
    </Box>
  );
};

export default Login;
