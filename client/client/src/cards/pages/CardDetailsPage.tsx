import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
// import CardInterface from "../interfaces/CardInterface";
import Card from "../components/card/Card";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  console.log("useParams:", useParams());

  const { value, handleGetCard } = useCards();
  const {error, isLoading,card } = value;
  useEffect(() => {
    if (cardId) handleGetCard(cardId);
    console.log(`in use effect ${!!cardId}`);
  }, []);

  console.log("isLoading:", isLoading);
  if (isLoading) {
    console.log("Rendering Spinner");
    return <Spinner />;
  }

  console.log("error:", error);
  if (error) {
    console.log("Rendering Error");
    return <Error errorMessage={error} />;
  }

  console.log("card:", card);
  if (!card) {
    console.log("No card to display...");
    return (
      <>
        <p>no card to display...</p>
      </>
    );
  }

  console.log("Rendering Card Details");
  console.log(` card${card}`);
  return (
    <Container>
      <PageHeader
        title="Business Details"
        subtitle="Here you can see details of the business"
      />
      <div>
        Details of card: {cardId}
        <Card
          card={card}
          onLike={()=> null}
          onEdit={console.log}
          onDelete={console.log}
        />
      </div>
    </Container>
  );
};

export default CardDetailsPage;


