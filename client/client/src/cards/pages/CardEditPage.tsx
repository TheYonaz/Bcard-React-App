import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProviders";
import useForm from "../../forms/hooks/useForm";
import initialCreateCardObject from "../helpers/initialForms/initialCreateCardObject";
import cardSchema from "../models/Joi/cardSchema";
import normalizeCard from "../helpers/normalizations/normalizeCard";
import ROUTES from "../../routes/routesModel";
import mapCardToModel from "../helpers/normalizations/mapCardToModel";
import CardForm from "../components/CardForm";
import cardEditSchema from "../models/Joi/cardEditSchema";

const CardEditPage = () => {
  const { cardId } = useParams();
  const { handleUpdateCard, handleGetCard,card } = useCards();

  const { user } = useUser();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(
    initialCreateCardObject,
    cardEditSchema,
    () => {
      if (card) {
        handleUpdateCard(card._id, {
          ...normalizeCard({ ...value.data }),
          bizNumber: card?.bizNumber,
          user_id: card?.user_id,
        });
      }
    }
  );
  const { handleInputChange, handleReset, onSubmit, validateForm, setData } =
    rest;
    useEffect(() => {
      if (cardId)
      handleGetCard(cardId).then(cardFromServer => {
        if (user?._id !== cardFromServer!.user_id && !user?.isAdmin ) return navigate(ROUTES.ROOT);
        const modeledCard = mapCardToModel(cardFromServer!);
        setData(modeledCard);
      });
    }, []);
    
    if (!user) return <Navigate replace to={ROUTES.CARDS} />;
    
    return (
      <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      >
      <PageHeader title="edit card" subtitle={`Details of card: ${cardId}`} />
      <div>
        <CardForm
          title="title"
          onReset={handleReset}
          onFormChange={validateForm}
          data={value.data}
          onInputChange={handleInputChange}
          errors={value.errors}
          onSubmit={onSubmit}
          
          />
      </div>
    </Container>
  );
};

export default CardEditPage;

