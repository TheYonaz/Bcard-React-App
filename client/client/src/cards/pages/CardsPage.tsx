import React, { useEffect } from "react";
import Cards from "../components/Cards";
import CardInterface from "../interfaces/CardInterface";
import { Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";

const CardsPage = () => {
  const { value, handleGetCards,handleDeleteCard } = useCards();
  const { cards, error, isLoading,filteredCard } = value;
  useEffect(() => {
    handleGetCards();
  }, []);
  const onDeleteCards = async (cardId:string) =>{
    await handleDeleteCard(cardId);
    await handleGetCards();
  }

  return (
    <Container>
      <PageHeader
        title="Cards Page"
        subtitle="Here you can find all types of business cards"
      />

      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={filteredCard}
        onLike={()=> null}
        onDelete={onDeleteCards}
      />
    </Container>
  );
};

export default CardsPage;
