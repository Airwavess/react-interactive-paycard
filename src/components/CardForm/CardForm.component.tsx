import React from "react";
import "./CardForm.styles.scss";
import { ReducerAction, CardState } from "../../pages/Paycard/Paycard.page";

interface CardFromProps extends CardState {
  handleRotateCard: (side: string) => void;
  dispatch: React.Dispatch<ReducerAction>;
}

const CardForm: React.FC<CardFromProps> = ({
  handleRotateCard,
  dispatch,
  ...props
}) => {
  const handleUpdateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const re = /^\d+$/;
    if (newValue === "" || re.test(newValue)) {
      dispatch({ type: "updateCardNumber", payload: e.target.value });
    }
  };

  const handleUpdateCardCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const re = /^\d+$/;
    if (newValue === "" || re.test(newValue)) {
      dispatch({ type: "updateCardCVV", payload: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="card-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            autoComplete="off"
            maxLength={16}
            value={props.cardNumber}
            onChange={handleUpdateCardNumber}
            onFocus={() => handleRotateCard("front")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="card-holder">Card Holder</label>
          <input
            type="text"
            id="card-holder"
            autoComplete="off"
            maxLength={20}
            onChange={(e) => {
              dispatch({ type: "updateCardHolder", payload: e.target.value });
            }}
            onFocus={() => handleRotateCard("front")}
          />
        </div>
        <div className="row">
          <div className="form-group card-form__expiration-date">
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
                onFocus={() => handleRotateCard("front")}
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
                onFocus={() => handleRotateCard("front")}
              >
                <option disabled>Year</option>
                {Array.from({ length: 12 }).map((_, idx) => (
                  <option key={idx}>{2020 + idx}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group card-form__card-cvv">
            <label htmlFor="card-cvv">CVV</label>
            <input
              type="text"
              id="card-cvv"
              maxLength={3}
              value={props.cardCVV}
              onChange={handleUpdateCardCVV}
              onFocus={() => handleRotateCard("back")}
            />
          </div>
        </div>
        <button type="submit" className="card-form__submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CardForm;
