import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./CardForm.styles.scss";
import { ReducerAction, CardState } from "../../pages/Paycard/Paycard.page";
import { toRefKey } from "../../utils";

interface CardFromProps extends CardState {
  handleRotateCard: (side: string) => void;
  dispatch: React.Dispatch<ReducerAction>;
  focusSection: string;
  handleSetFocusSection: (section: string) => void;
  isInputFocused: boolean;
  handleSetIsInputFocused: (bool: boolean) => void;
}

const CardForm: React.FC<CardFromProps> = ({
  handleRotateCard,
  focusSection,
  handleSetFocusSection,
  dispatch,
  isInputFocused,
  handleSetIsInputFocused,
  ...props
}) => {
  const isInputFocusedRef = useRef(isInputFocused);
  isInputFocusedRef.current = isInputFocused;

  const ccNumberRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const ccNameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const ccExpMonthRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const ccExpYearRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const ccCVCRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  type InputRefs = {
    [index: string]: React.MutableRefObject<
      HTMLInputElement | HTMLSelectElement
    >;
  };

  const inputRefs: InputRefs = useMemo(
    () => ({
      ccNumberRef,
      ccNameRef,
      ccExpMonthRef,
      ccExpYearRef,
      ccCVCRef,
    }),
    [ccNumberRef, ccNameRef, ccExpMonthRef, ccExpYearRef, ccCVCRef]
  );

  const setInputRefFocus = useCallback(
    (focusSection: string) => {
      if (!focusSection) return;
      let key = toRefKey(focusSection);
      if (key === "ccExpRef") {
        key = "ccExpMonthRef";
      }
      inputRefs[key]?.current.focus();
    },
    [inputRefs]
  );

  const handleUpdateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^(\d{0,4}\s?){0,4}$/;

    const newCardNumber = e.target.value.replace(/\s/g, "");
    let cardNumber = "";

    for (let i = 0; i < newCardNumber.length; i++) {
      cardNumber += newCardNumber.charAt(i);
      if ([3, 7, 11].includes(i)) {
        cardNumber += " ";
      }
    }
    cardNumber = cardNumber.trim();
    if (newCardNumber === "" || re.test(newCardNumber)) {
      dispatch({ type: "updateCardNumber", payload: cardNumber });
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

  useEffect(() => {
    setInputRefFocus(focusSection);
  }, [focusSection, setInputRefFocus]);

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!isInputFocusedRef.current) {
        handleSetFocusSection("");
      }
    }, 300);
    handleSetIsInputFocused(false);
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
            handleSetIsInputFocused(true);
          }}
          onBlur={handleInputBlur}
          ref={
            inputRefs.ccNumberRef as React.MutableRefObject<HTMLInputElement>
          }
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
            handleSetIsInputFocused(true);
          }}
          onBlur={handleInputBlur}
          autoFocus={focusSection === "cc-name"}
          ref={inputRefs.ccNameRef as React.MutableRefObject<HTMLInputElement>}
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
              handleSetIsInputFocused(true);
            }}
            onBlur={handleInputBlur}
            ref={
              inputRefs.ccExpMonthRef as React.MutableRefObject<
                HTMLSelectElement
              >
            }
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
              handleSetIsInputFocused(true);
            }}
            onBlur={handleInputBlur}
            ref={
              inputRefs.ccExpYearRef as React.MutableRefObject<
                HTMLSelectElement
              >
            }
          >
            <option disabled>Year</option>
            {Array.from({ length: 12 }).map((_, idx) => (
              <option key={idx}>{2020 + idx}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group card-form__cc-cvc">
        <label htmlFor="card-cvc">CVC</label>
        <input
          type="text"
          id="card-cvc"
          maxLength={3}
          value={props.cardCVC}
          onChange={handleUpdateCardCVC}
          onFocus={() => {
            handleRotateCard("back");
            handleSetFocusSection("cc-cvc");
            handleSetIsInputFocused(true);
          }}
          onBlur={handleInputBlur}
          ref={inputRefs.ccCVCRef as React.MutableRefObject<HTMLInputElement>}
        />
      </div>
      <button type="submit" className="card-form__submit-btn">
        Submit
      </button>
    </form>
  );
};

export default CardForm;
