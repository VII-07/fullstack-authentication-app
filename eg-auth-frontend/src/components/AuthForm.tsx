import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useError } from "../context/ErrorContext";
import FormInput from "./common/FormInput";
import PasswordRequirements from "./common/PasswordRequirements";

interface AuthFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  isSignup?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isSignup = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ email: string; password: string; name?: string }>();

  const { error } = useError();
  const navigate = useNavigate();

  const onSubmitForm = async (data: {
    email: string;
    password: string;
    name?: string;
  }) => {
    await onSubmit(data);
  };

  const toggleAuthMode = () => {
    if (isSignup) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  const password = isSignup ? watch("password", "") : "";

  const isPasswordValid = {
    length: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmitForm)}
      maxW="md"
      mx="auto"
      mt="8"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Stack spacing={4}>
        {isSignup && (
          <FormInput
            id="name"
            label="Name"
            placeholder="Name"
            error={errors.name}
            register={register("name", { required: "Name is required" })}
          />
        )}
        <FormInput
          id="email"
          label="Email"
          placeholder="Email"
          error={errors.email}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          error={errors.password}
          register={register("password", {
            required: "Password is required",
            ...(isSignup && {
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: {
                hasLetter: (value) =>
                  /[a-zA-Z]/.test(value) ||
                  "Password must contain at least one letter",
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "Password must contain at least one number",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
              },
            }),
          })}
        />
        {isSignup && <PasswordRequirements isPasswordValid={isPasswordValid} />}
        {error && <Text color="red.500">{error}</Text>}
        <Button type="submit" colorScheme="teal">
          {isSignup ? "Sign Up" : "Login"}
        </Button>
        <Text textAlign="center">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link color="teal.500" onClick={toggleAuthMode}>
                Log in
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link color="teal.500" onClick={toggleAuthMode}>
                Sign up
              </Link>
            </>
          )}
        </Text>
      </Stack>
    </Box>
  );
};

export default AuthForm;
