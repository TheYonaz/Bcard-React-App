import React, { useState } from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { useUser } from "../../../users/providers/UserProviders";
import useCards from "../../hooks/useCards";
import { useSnack } from "../../../providers/SnackbarProvider";
import CardDeleteDialog from "./CardDeleteDialog";

type Props = {
  onDelete: (x: string) => void;
  cardId: string;
  onLike: () => void;
  cardUserId: string;
  cardLikes: string[];
};

const CardActionBar: React.FC<Props> = ({
  onDelete,
  cardId,
  onLike,
  cardUserId,
  cardLikes,
}) => {
  const { user } = useUser();
  const { handleLikeCard } = useCards();
  const [isDialogOpen, setDialog] = useState(false);
  const [isLiked, setLike] = useState(() => {
    if (!user) return false;
    return !!cardLikes.find((id) => id === user?._id);
  });
  const showSnack = useSnack();
  const handleLike = async () => {
    if (!user) {
      showSnack("info", "please log in to like this card");
      return;
    }
    setLike((prev) => !prev);
    await handleLikeCard(cardId);
    onLike();
  };
  const navigate = useNavigate();
  const handleDialog = (term: string | undefined) => {
    if (term === "open") return setDialog(true);
    setDialog(false);
  };
  const handleDeleteCard = () => {
    handleDialog(undefined);
    onDelete(cardId);
  };
  const handleEditCard = () => navigate(`${ROUTES.EDIT_CARD}/${cardId}`);

  return (
    <>
      <CardActions
        disableSpacing
        sx={{ pt: 0, justifyContent: "space-between" }}
      >
        <Box>
          {user && (user.isAdmin || user._id === cardUserId) && (
            <>
              <IconButton
                onClick={() => handleDialog("open")}
                aria-label="delete card"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleEditCard} aria-label="edit card">
                <EditIcon />
              </IconButton>
            </>
          )}
        </Box>
        <Box>
          <IconButton aria-label="call business">
            <CallIcon />
          </IconButton>
          <IconButton aria-label="add to fav" onClick={handleLike}>
            <FavoriteIcon
              color={user ? (isLiked ? "error" : "inherit") : undefined}
            />
          </IconButton>
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteCard}
      />
    </>
  );
};

export default CardActionBar;
