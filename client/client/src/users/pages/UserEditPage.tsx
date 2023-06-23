import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import { useUser } from "../providers/UserProviders";
import useHandleUsers from "../hooks/useHandleUsers";
import { initialEditUserForm } from "../helpers/initialForms/initialEditUserForm";
import EditUserForm from "../components/EditUserForm";
import mapUserToModel from "../helpers/normalization/mapUserToModel";
import EditUserSchema from "../models/Joi/editUserSchema";
const SignupPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { handelEditUser, handelGetUser } = useHandleUsers();
  const { value, ...rest } = useForm(
    initialEditUserForm,
    EditUserSchema,
    handelEditUser
  );
  const { handleInputChange, handleReset, onSubmit, validateForm, setData } = rest;
  useEffect(() => {
    if(!user){navigate(ROUTES.ROOT)}
    if (user)
      handelGetUser(user._id).then((userFromClient) => {
        if (user?._id !== userFromClient!._id) return navigate(ROUTES.ROOT);
        const modeledUser = mapUserToModel(userFromClient!);
        setData(modeledUser);
        console.log(modeledUser);
      });
  }, [user]);

  // if (user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EditUserForm
        title="register user"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleInputChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
  );
};

export default SignupPage;
