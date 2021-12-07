import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../api/StateProvider.js";
import "./Subtotal.css";
import { getBasketTotal } from "../../api/reducer";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
  const history = useHistory();

  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This Order Contains a gift
            </small>
          </>
        )}
        decimalState={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      {/* history.push does the same work as giving a Link but 
      its use is that it doesnt give that default link
      styling so no need to style */}

      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
