import React from "react";
import MuiCard from "@mui/material/Card";
import CardHead from "./CardHead";
import CardInterface from "../../interfaces/CardInterface";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

type Props = {
  card: CardInterface;
  onDelete: (x: string) => void;
  onEdit: (x: string) => void;
  onLike: () => void;
};

const Card: React.FC<Props> = ({ card, onDelete, onEdit, onLike }) => {
  const navigate = useNavigate();

  return (
    <MuiCard sx={{ minWidth: 280 }}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.CARD_DETAIL}/${card._id}`)}
      >
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>

      <CardActionBar
        onLike={onLike}
        onDelete={onDelete}
        cardId={card._id}
        cardLikes={card.likes}
        cardUserId={card.user_id}
      />
    </MuiCard>
  );
};

export default Card;
