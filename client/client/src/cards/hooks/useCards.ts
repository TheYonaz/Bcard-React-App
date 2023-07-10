import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProviders";
import normalizeCard from "../helpers/normalizations/normalizeCard";
import CardInterface from "../interfaces/CardInterface";
import {
  CardFromClientType,
  CardMapToModelType,
  NormalizedEditCard,
} from "../models/types/cardTypes";

import {
  getCards,
  getCard,
  editCard,
  changeLikeStatus,
  createCard,
  deleteCard,
  getMyCards,
} from "../services/cardApi";

type ErrorType = null | string;
type CardsType = null | CardInterface[];
type CardType = null | CardInterface;

export const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [cards, setCards] = useState<CardsType>(null);
  const [card, setCard] = useState<CardType>(null);
  const [filteredCard, setFilter] = useState<CardsType>(null);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const { user } = useUser();
  const snack = useSnack();
  const navigate = useNavigate();

  useAxios();

  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    cards: CardsType,
    card: CardType
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);
  useEffect(() => {
    if (cards) {
      setFilter(
        cards.filter(
          (card) =>
            card?.title.includes(query) ||
            String(card?.bizNumber).includes(query)
        )
      );
    }
  }, [cards, query]);

  const handleGetCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);
  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);

  const handleGetCard = useCallback(async (cardId: string) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      if (typeof error === "string")
        return requestStatus(false, error, null, null);
    }
  }, []);
  const handleCreateCard = useCallback(
    async (cardFromClient: CardFromClientType) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeCard(cardFromClient);
        const card = await createCard(normalizedCard);
        requestStatus(false, null, null, card);
        snack("success", "A new business card has been created");
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    []
  );
  const handleUpdateCard = useCallback(
    async (cardId: string, cardFromClient: NormalizedEditCard) => {
      try {
        setLoading(true);
        const card = await editCard(cardId, cardFromClient);
        snack("success", "edited succesfully");
        requestStatus(false, null, null, card);
        navigate(ROUTES.MY_CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null, null);
      }
    },
    []
  );
  const handleDeleteCard = useCallback(async (cardId: string) => {
    try {
      setLoading(true);
      const card = await deleteCard(cardId);
      snack("success", "Business card has been deleted");
      requestStatus(false, null, null, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);
  const handleLikeCard = useCallback(async (cardId: string) => {
    try {
      setLoading(true);
      const card = await changeLikeStatus(cardId);
      const cards = await getCards();
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);

  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);

      // const cards = await handleGetCards();
      const cards = await getCards();
      const favCards: CardInterface[] = cards.filter(
        (card: CardInterface) =>
          !!card.likes.find((id: string) => id === user?._id)
      );
      requestStatus(false, null, favCards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, []);
  const handleGetBusinessCards = useCallback(async () => {
    try {
      setLoading(true);
      const allCards = await getCards();
      const businessCards = allCards.filter(
        (card: CardInterface) => card.user_id === user?._id
      );
      requestStatus(false, null, businessCards, null);
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null, null);
    }
  }, [user]);

  const value = useMemo(() => {
    return { isLoading, cards, card, error, filteredCard };
  }, [isLoading, cards, card, error, filteredCard]);
  return {
    value,
    card,
    handleGetCards,
    handleGetCard,
    handleCreateCard,
    handleUpdateCard,
    handleDeleteCard,
    handleLikeCard,
    handleGetFavCards,
    handleGetBusinessCards,
    handleGetMyCards,
  };
};

export default useCards;
