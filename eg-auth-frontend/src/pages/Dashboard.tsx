import { Box, Button, Heading } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading mb="6">Welcome to the Dashboard</Heading>
      <Button onClick={logout} colorScheme="teal">
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
