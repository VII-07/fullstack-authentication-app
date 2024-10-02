import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  placeholder: string;
  error?: FieldError;
  type?: string;
  register: UseFormRegisterReturn;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  error,
  type = "text",
  register,
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input id={id} type={type} placeholder={placeholder} {...register} />
    {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
);

export default FormInput;
