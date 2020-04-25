import React from "react";
import "./Card.styles.scss";
import { CardState } from "../../pages/Paycard/Paycard.page";
import { SwitchTransition, CSSTransition } from "react-transition-group";

interface CardProps extends CardState {
  cardSide: string;
  focusSection: string;
  handleSetFocusSection: (section: string) => void;
  isInputFocused: boolean;
  handleSetIsInputFocused: (bool: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  cardSide,
  handleSetFocusSection,
  handleSetIsInputFocused,
  ...props
}) => {
  // 卡片號碼
  let cardNumberRow: Array<JSX.Element> = [];
  Array.from({ length: 19 }).forEach((_, idx) => {
    if ([4, 9, 14].includes(idx)) {
      cardNumberRow.push(
        <span className="card__card-number--space" key={`space-${idx}`}></span>
      );
    } else {
      // cardNumberRow.push(<span key={`card-number-${idx}`}>{cardNumber}</span>);
      cardNumberRow.push(
        <SwitchTransition key={`card-number-${idx}`}>
          <CSSTransition
            key={idx < props.cardNumber.length ? props.cardNumber[idx] : "#"}
            classNames="slide-up"
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <span>
              {idx < props.cardNumber.length ? props.cardNumber[idx] : "#"}
            </span>
          </CSSTransition>
        </SwitchTransition>
      );
    }
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

  const focusBoxClass = `card__focus-box--${props.focusSection}`;

  return (
    <div className={`card ${cardSide === "back" && "card--is-flipped"}`}>
      <div className="card__front">
        <div className={`card__focus-box ${focusBoxClass}`} />
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
        <div
          className="card__card-number"
          onClick={() => {
            handleSetFocusSection("cc-number");
            handleSetIsInputFocused(true);
          }}
        >
          {cardNumberRow}
        </div>
        <div className="card__content">
          <div
            className="card__card-holder"
            onClick={() => {
              handleSetFocusSection("cc-name");
              handleSetIsInputFocused(true);
            }}
          >
            <div className="card__card-holder-title">Card Holder</div>
            <div className="card__card-holder-name">
              {props.cardHolder || "FULL NAME"}
            </div>
          </div>
          <div
            className="card__expires"
            onClick={() => {
              handleSetFocusSection("cc-exp");
              handleSetIsInputFocused(true);
            }}
          >
            <div className="card__expires-title">Expires</div>
            <div className="card__expires-date">{cardExpirationDate}</div>
          </div>
        </div>
      </div>
      <div className="card__back">
        <div className={`card__focus-box ${focusBoxClass}`} />
        <div className="card__background">
          <img src="https://i.imgur.com/5XHCjPT.jpg" alt="" />
        </div>
        <div className="card__top">
          <div className="card__black-line"></div>
        </div>
        <div className="card__card-cvc">
          <div className="card__card-cvc-title">{props.cardCVC || "CVC"}</div>
          <div className="card__card-cvc-number"></div>
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
