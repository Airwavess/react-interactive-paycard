import React from "react";
import "./Card.styles.scss";
import { CardState } from "../../pages/Paycard/Paycard.page";

interface CardProps extends CardState {
  cardSide: string;
}

const Card: React.FC<CardProps> = ({ cardSide, ...props }) => {
  // 卡片號碼
  let cardNumberRow: Array<JSX.Element> = [];
  Array.from({ length: 16 }).forEach((_, idx) => {
    if (idx % 4 === 0 && idx > 0) {
      cardNumberRow.push(
        <span className="card__card-number--space" key={`space-${idx}`}></span>
      );
    }

    let cardNumber = "#";
    if (idx < props.cardNumber.length) {
      cardNumber = props.cardNumber[idx];
    }

    cardNumberRow.push(<span key={`number-${idx}`}>{cardNumber}</span>);
  });

  let cardExpirationDate = "MM/YY";
  cardExpirationDate = cardExpirationDate.replace(
    /MM/,
    props.cardExpirationMonth || "MM"
  );
  cardExpirationDate = cardExpirationDate.replace(
    /YY/,
    props.cardExpirationYear || "YY"
  );

  return (
    <div className="card">
      <div
        className={`card__front ${
          cardSide === "front" ? "card__front--active" : ""
        }`}
      >
        <div className="card__background">
          <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
        </div>
        <div className="card__top">
          <div className="card__chip-icon">
            <img src="https://i.imgur.com/7xhP2ZA.png" alt="" />
          </div>
          <div className="card__visa-icon">
            <img src="https://i.imgur.com/lokBLnp.png" alt="" />
          </div>
        </div>
        <div className="card__card-number">{cardNumberRow}</div>
        <div className="card__content">
          <div className="card__card-holder">
            <div className="card__card-holder-title">Card Holder</div>
            <div className="card__card-holder-name">
              {props.cardHolder || "FULL NAME"}
            </div>
          </div>
          <div className="card__expires">
            <div className="card__expires-title">Expires</div>
            <div className="card__expires-date">{cardExpirationDate}</div>
          </div>
        </div>
      </div>
      <div
        className={`card__back ${
          cardSide === "back" ? "card__back--active" : ""
        }`}
      >
        <div className="card__background">
          <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
        </div>
        <div className="card__top">
          <div className="card__black-line"></div>
        </div>
        <div className="card__card-cvv">
          <div className="card__card-cvv-title">{props.cardCVV || "CVV"}</div>
          <div className="card__card-cvv-number"></div>
        </div>
        <div className="card__bottom">
          <div className="card__visa-icon">
            <img src="https://i.imgur.com/lokBLnp.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
