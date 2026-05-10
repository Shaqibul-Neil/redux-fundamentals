//select dom elements
const counterElement = document.querySelector("#counter");
const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");

//initial state
const initialState = {
  value: 0,
};

//create reducer function
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return { ...state, value: state.value + 1 };
  } else if (action.type === "decrement") {
    return { ...state, value: state.value - 1 };
  } else {
    return state;
  }
};

//create store
/* global Redux */
const store = Redux.createStore(counterReducer);

//dom update
const render = () => {
  const currentState = store.getState();
  counterElement.innerText = currentState.value.toString();
};
//update ui initially
render();

//subscribe to store
store.subscribe(render);

//button click listener
incrementButton.addEventListener("click", () => {
  //call dispatch
  store.dispatch({ type: "increment" });
});

decrementButton.addEventListener("click", () => {
  store.dispatch({ type: "decrement" });
});
