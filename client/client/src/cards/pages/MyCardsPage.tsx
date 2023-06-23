import React, { useEffect } from "react";

import useCards from "../hooks/useCards";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import CardsFeedback from "../components/CardsFeedback";
import PageHeader from "../../components/PageHeader";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../../users/providers/UserProviders";

const MyCardsPage = () => {
  const { user } = useUser();
  const { value, handleGetBusinessCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;
  const navigate = useNavigate();

  useEffect(() => {
    !user ? navigate(ROUTES.CARDS) : handleGetBusinessCards();
  }, [user]);

  const onDeleteCard = async (cardId: string) => {
    await handleDeleteCard(cardId);
    await handleGetBusinessCards();
  };

  if (!user || !user.isBusiness)
    return <Navigate replace to={ROUTES.MY_CARDS} />;

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader
        title="My Cards Page"
        subtitle="Here you can find your business cards"
      />

      {cards && (
        <Fab
          onClick={() => {
            console.log(user);
            navigate(ROUTES.CREATE_CARD);
          }}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: 75,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={console.log}
      />
    </Container>
  );
};

export default MyCardsPage;
