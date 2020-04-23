import React from "react";
import "./Paycard.styles.scss";
import Card from "../../components/Card/Card.component";
import CardForm from "../../components/CardForm/CardForm.component";

export interface CardState {
  cardNumber: string;
  cardHolder: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCVC: string;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

function reducer(state: CardState, action: ReducerAction): CardState {
  switch (action.type) {
    case "updateCardNumber":
      return { ...state, cardNumber: action.payload };
    case "updateCardHolder":
      return { ...state, cardHolder: action.payload };
    case "updateCardExpirationMonth":
      return {
        ...state,
        cardExpirationMonth: ("0" + action.payload).slice(-2),
      };
    case "updateCardExpirationYear":
      return { ...state, cardExpirationYear: action.payload.slice(2) };
    case "updateCardCVC":
      return { ...state, cardCVC: action.payload };
    default:
      throw new Error();
  }
}

const Paycard = () => {
  const initialCardState: CardState = {
    cardNumber: "",
    cardHolder: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    cardCVC: "",
  };
  const [cardState, dispatch] = React.useReducer(reducer, initialCardState);

  const [cardSide, rotateCard] = React.useState("front");
  const [focusSection, setFocusSection] = React.useState("cc-number");
  const handleRotateCard = (side: string) => {
    rotateCard(side);
  };

  const handleSetFocusSection = (section: string) => {
    setFocusSection(section);
  };

  const cardProps = {
    cardSide,
    focusSection,
    ...cardState,
  };

  const cardFormProps = {
    handleRotateCard,
    handleSetFocusSection,
    dispatch,
    ...cardState,
  };

  return (
    <div className="paycard">
      <Card {...cardProps} />
      <CardForm {...cardFormProps} />
    </div>
  );
};

export default Paycard;
