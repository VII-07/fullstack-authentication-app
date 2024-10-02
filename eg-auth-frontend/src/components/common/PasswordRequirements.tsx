import { Box, Text } from "@chakra-ui/react";

interface PasswordRequirementsProps {
  isPasswordValid: {
    length: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  isPasswordValid,
}) => (
  <Box mt={2}>
    <Text
      fontSize="sm"
      color={isPasswordValid.length ? "green.500" : "red.500"}
    >
      {isPasswordValid.length ? "✓" : "✗"} Minimum 8 characters
    </Text>
    <Text
      fontSize="sm"
      color={isPasswordValid.hasLetter ? "green.500" : "red.500"}
    >
      {isPasswordValid.hasLetter ? "✓" : "✗"} At least 1 letter
    </Text>
    <Text
      fontSize="sm"
      color={isPasswordValid.hasNumber ? "green.500" : "red.500"}
    >
      {isPasswordValid.hasNumber ? "✓" : "✗"} At least 1 number
    </Text>
    <Text
      fontSize="sm"
      color={isPasswordValid.hasSpecialChar ? "green.500" : "red.500"}
    >
      {isPasswordValid.hasSpecialChar ? "✓" : "✗"} At least 1 special character
    </Text>
  </Box>
);

export default PasswordRequirements;
