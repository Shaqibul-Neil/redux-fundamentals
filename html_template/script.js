//select dom elements
const counterElement = document.querySelector("#counter");
const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");

//action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";

//action creator
const actionCreator = (type, payload) => {
  return { type, payload };
};

//initial state
const initialState = {
  value: 0,
};

//create reducer function
const counterReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { ...state, value: state.value + action.payload };
  } else if (action.type === DECREMENT) {
    return { ...state, value: state.value - action.payload };
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
  store.dispatch(actionCreator(INCREMENT, 5));
});

decrementButton.addEventListener("click", () => {
  store.dispatch(actionCreator(DECREMENT, 2));
});
