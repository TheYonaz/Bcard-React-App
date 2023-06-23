import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import FormLink from "../../forms/components/FormLink";

import loginSchema from "../models/Joi/loginSchema";
import useHandleUsers from "../hooks/useHandleUsers";
import { initialLogInForm } from "../helpers/initialForms/initialLoginForm";



const LoginPage = () => {
  const {
    handleLogin,
    value: { user },
  } = useHandleUsers();

  const { value, ...rest } = useForm(
    initialLogInForm,
    loginSchema,
    handleLogin
  );
  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, validateForm } = rest;

  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        title="Login"
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        spacing={1}
        styles={{ maxWidth: "450px" }}>
        <Input
          label="email"
          name="email"
          type="email"
          data={data}
          error={errors.email}
          onInputChange={handleInputChange}
        />
        <Input
          label="password"
          name="password"
          type="password"
          data={data}
          error={errors.password}
          onInputChange={handleInputChange}
        />

        <FormLink text="Did not registered yet?" to={ROUTES.SIGNUP} />
      </Form>
    </Container>
  );
};

export default LoginPage;
