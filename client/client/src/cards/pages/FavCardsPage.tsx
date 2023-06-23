import { useCallback } from "react";
import useCards from "./../hooks/useCards";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedback";

const FavCardsPage = () => {
  const { value, ...rest } = useCards();
  const { cards, error, isLoading } = value;
  const { handleDeleteCard, handleGetFavCards } = rest;

  useEffect (() => {
    const fetchData = async()=>{ await handleGetFavCards();}
    fetchData()
  }, []);

  const onDeleteCard = useCallback(
    async (cardId:string) => {
      await handleDeleteCard(cardId);
      await handleGetFavCards();
    },
    [handleDeleteCard]
  );

  const changeLikeStatus = useCallback(async () => {
    await handleGetFavCards();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Favorite Cards Page"
        subtitle="Here you can find all your favorite business cards"
      />

      <CardsFeedback
        isLoading={isLoading}
        error={error}
        cards={cards}
        onDelete={onDeleteCard}
        onLike={changeLikeStatus}
      />
    </Container>
  );
};

export default FavCardsPage;
