import { ChakraProvider } from "@chakra-ui/react";
import { useRoutes } from "react-router-dom";
import { ErrorProvider } from "./context/ErrorContext";
import routes from "./routes/routes";

const App = () => {
  const element = useRoutes(routes);
  return (
    <ChakraProvider>
      <ErrorProvider>{element}</ErrorProvider>
    </ChakraProvider>
  );
};

export default App;
