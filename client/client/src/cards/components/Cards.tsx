import React from "react";
import Typography from "@mui/material/Typography";
import CardInterface from "./../interfaces/CardInterface";
import Card from "./card/Card";
import Grid from "@mui/material/Grid";

type Props = {
  cards: CardInterface[];
  onDelete:(x: string) => void;
  onLike:() => void;
};

const Cards: React.FC<Props> = ({ cards,onDelete,onLike }) => {
  const handleDelete = (id: string) =>
    console.log(`You clicked card no: ${id}`);
  const handleLike = () =>
    console.log(`You clicked card no:`);
  const handleEdit = (id: string) =>
    console.log(`You clicked card no: ${id}`);

  if (!cards.length)
    return (
      <Typography>
        Opss... it seems that there are no business cards to display...
      </Typography>
    );

  return (
    <Grid container spacing={4} pb={2}>
      {cards.map((card: CardInterface) => (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
          <Card onLike={onLike} onDelete={onDelete} onEdit={handleEdit} card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
