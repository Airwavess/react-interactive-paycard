import React from "react";
import "./CardForm.styles.scss";
import { ReducerAction, CardState } from "../../pages/Paycard/Paycard.page";

interface CardFromProps extends CardState {
  handleRotateCard: (side: string) => void;
  dispatch: React.Dispatch<ReducerAction>;
  handleSetFocusSection: (section: string) => void;
}

const CardForm: React.FC<CardFromProps> = ({
  handleRotateCard,
  handleSetFocusSection,
  dispatch,
  ...props
}) => {
  const handleUpdateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^(\d{0,4}\s?){0,4}$/;

    let newCardNumber = e.target.value.trim();
    if ([5, 10, 15].includes(newCardNumber.length)) {
      newCardNumber =
        newCardNumber.slice(0, -1) + " " + newCardNumber.slice(-1);
    }
    if (newCardNumber === "" || re.test(newCardNumber)) {
      dispatch({ type: "updateCardNumber", payload: newCardNumber });
    }
  };

  const handleUpdateCardCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const re = /^\d+$/;
    if (newValue === "" || re.test(newValue)) {
      dispatch({ type: "updateCardCVC", payload: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <div className="form-group card-form__cc-number">
        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="card-number"
          autoComplete="off"
          maxLength={19}
          value={props.cardNumber}
          onChange={handleUpdateCardNumber}
          onFocus={() => {
            handleRotateCard("front");
            handleSetFocusSection("cc-number");
          }}
          onBlur={() => handleSetFocusSection("")}
          autoFocus
        />
      </div>
      <div className="form-group card-form__cc-name">
        <label htmlFor="card-holder">Card Holder</label>
        <input
          type="text"
          id="card-holder"
          autoComplete="off"
          maxLength={20}
          onChange={(e) => {
            dispatch({ type: "updateCardHolder", payload: e.target.value });
          }}
          onFocus={() => {
            handleRotateCard("front");
            handleSetFocusSection("cc-name");
          }}
          onBlur={() => handleSetFocusSection("")}
        />
      </div>
      <div className="form-group card-form__cc-exp">
        <label htmlFor="card-expiration-month">Expiration Date</label>
        <div className="row">
          <select
            name=""
            id="card-expiration-month"
            defaultValue="Month"
            onChange={(e) => {
              dispatch({
                type: "updateCardExpirationMonth",
                payload: e.target.value,
              });
            }}
            onFocus={() => {
              handleRotateCard("front");
              handleSetFocusSection("cc-exp");
            }}
            onBlur={() => handleSetFocusSection("")}
          >
            <option disabled>Month</option>
            {Array.from({ length: 12 }).map((_, idx) => (
              <option key={idx}>{idx + 1}</option>
            ))}
          </select>
          <select
            name=""
            id="card-expiration-year"
            defaultValue="Year"
            onChange={(e) => {
              dispatch({
                type: "updateCardExpirationYear",
                payload: e.target.value,
              });
            }}
            onFocus={() => {
              handleRotateCard("front");
              handleSetFocusSection("cc-exp");
            }}
            onBlur={() => handleSetFocusSection("")}
          >
            <option disabled>Year</option>
            {Array.from({ length: 12 }).map((_, idx) => (
              <option key={idx}>{2020 + idx}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group card-form__cc-cvc">
        <label htmlFor="card-cvC">CVC</label>
        <input
          type="text"
          id="card-cvc"
          maxLength={3}
          value={props.cardCVC}
          onChange={handleUpdateCardCVC}
          onFocus={() => {
            handleRotateCard("back");
            handleSetFocusSection("cc-cvc");
          }}
          onBlur={() => handleSetFocusSection("")}
        />
      </div>
      <button type="submit" className="card-form__submit-btn">
        Submit
      </button>
    </form>
  );
};

export default CardForm;
