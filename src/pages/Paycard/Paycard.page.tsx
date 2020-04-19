import React from "react";
import "./Paycard.styles.scss";
import Card from "../../components/Card/Card.component";
import CardForm from "../../components/CardForm/CardForm.component";

export interface CardState {
  cardNumber: string;
  cardHolder: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardCVV: string;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

function updateCardNumber(newCardNumber: string) {
  if (newCardNumber.length > 16) {
    return newCardNumber.substr(0, 16);
  }

  return newCardNumber;
}

function reducer(state: CardState, action: ReducerAction): CardState {
  switch (action.type) {
    case "updateCardNumber":
      return { ...state, cardNumber: updateCardNumber(action.payload) };
    case "updateCardHolder":
      return { ...state, cardHolder: action.payload };
    case "updateCardExpirationMonth":
      return {
        ...state,
        cardExpirationMonth: ("0" + action.payload).slice(-2),
      };
    case "updateCardExpirationYear":
      return { ...state, cardExpirationYear: action.payload.slice(2) };
    case "updateCardCVV":
      return { ...state, cardCVV: action.payload };
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
    cardCVV: "",
  };
  const [cardState, dispatch] = React.useReducer(reducer, initialCardState);

  const [cardSide, rotateCard] = React.useState("front");
  const handleRotateCard = (side: string) => {
    rotateCard(side);
  };

  return (
    <div className="paycard">
      <Card cardSide={cardSide} {...cardState} />
      <CardForm
        handleRotateCard={handleRotateCard}
        dispatch={dispatch}
        {...cardState}
      />
    </div>
  );
};

export default Paycard;
