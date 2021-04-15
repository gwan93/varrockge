import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../AuthProvider";

export default function Widget(props) {
  const { state, setState } = useContext(authContext);
  const { widgetID } = useParams();

  // Set local widget state
  const [widget, setWidget] = useState({});

  // Axios request using widgetID from params to get
  // widget details, then setWidget to the returned data
  useEffect(() => {
    axios.get(`/widgets/${widgetID}`).then((response) => {
      console.log(response.data);
      setWidget(response.data);
    });
  }, [widgetID]);

  const addToCart = () => {
    // Add this widget's id to state.itemsInCart
    const currentCart = [...state.itemsInCart];
    currentCart.push(widget.id);
    setState((prev) => ({
      ...prev,
      itemsInCart: currentCart,
    }));
    console.log("stateystate", state);
  };
  const checkCart = () => {
    const currentCart = [...state.itemsInCart];
    for (let cartItem of currentCart) {
      
    }
  }
  //this functions just checks if there's anything in the cart. In the jsx, we can 
  //do a for each, and then 
  //if card is owned and For_sale_by_owner is false, remove add to cart button, and (stretch) add message saying card is owned by
  //x
  //so once the button is clicked, we disable the button. That disabled button can be styled differently.
  return (
    <div>
      <h3>Widget ID is #{widgetID}</h3>
      <ul>
        <li>Name: {widget.name}</li>
        <li>Description: {widget.description}</li>
        <li>id: {widget.id}</li>
        <li>hash: {widget.hash}</li>
        <li>MSRP: {widget.msrp_cents}</li>
        <li>Rarity_id:{widget.rarity_id}</li>
        <li>Subcategory_id: {widget.subcategory_id}</li>
        <li>For_sale_by_owner: {widget.for_sale_by_owner}</li>
        <li>Current_sell_price_cents: {widget.current_sell_price_cents}</li>
      </ul>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
