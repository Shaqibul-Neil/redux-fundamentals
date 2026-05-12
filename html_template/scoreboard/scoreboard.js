//select dom elements
const matchContainer = document.querySelector(".all-matches");
const addBtn = document.querySelector(".lws-addMatch");
const resetBtn = document.querySelector(".lws-reset");

//action identifiers
// Redux এ action কে identify করার জন্য string constant use করা হয়
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "add_match";
const DELETE_MATCH = "delete_match";
const RESET = "reset";

const actionCreator = (type, payload) => {
  return { type, payload };
};

// Redux store এর initial data
const initialState = {
  matches: [{ id: 1, value: 0 }],
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATCH:
      return {
        ...state,
        matches: [...state.matches, { id: Date.now(), value: 0 }],
      };
    case DELETE_MATCH:
      return {
        ...state,
        matches: state.matches.filter((m) => m.id !== action.payload),
      };
    case INCREMENT:
      return {
        ...state,
        matches: state.matches.map((m) =>
          m.id === action.payload.id
            ? { ...m, value: m.value + action.payload.value }
            : m,
        ),
      };
    case DECREMENT:
      return {
        ...state,
        matches: state.matches.map((m) =>
          m.id === action.payload.id
            ? { ...m, value: Math.max(m.value - action.payload.value, 0) }
            : m,
        ),
      };
    case RESET:
      return {
        ...state,
        matches: state.matches.map((m) => ({ ...m, value: 0 })),
      };

    default:
      return state;
  }
};

//create store
/* global Redux */
// Redux store create
// store পুরো application state hold করে
const store = Redux.createStore(counterReducer);

//render ui
const render = () => {
  const currentState = store.getState();
  // প্রতিটা match এর জন্য HTML বানানো
  matchContainer.innerHTML = currentState.matches
    .map(
      (match, idx) =>
        `
   <div class="match" data-id="${match.id}">
  <div class="wrapper">
            <button class="lws-delete">
              <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="lws-matchName">Match ${idx + 1}</h3>
          </div>
          <div class="inc-dec">
            <form class="incrementForm">
              <h4>Increment</h4>
              <input type="number" name="increment" class="lws-increment" />
            </form>
            <form class="decrementForm">
              <h4>Decrement</h4>
              <input type="number" name="decrement" class="lws-decrement" />
            </form>
          </div>
          <div class="numbers">
            <h2 class="lws-singleResult"> ${match.value}</h2>
          </div></div>
  `,
    )
    .join("");
};

//initial render
// page load এ প্রথম UI দেখাবে
render();
//subscribe
// state change হলেই render run হবে
store.subscribe(render);
/*
Redux flow:

dispatch()
→ reducer
→ new state
→ subscribe fires
→ render()
→ UI update
*/

//add match
addBtn.addEventListener("click", () => {
  store.dispatch(actionCreator(ADD_MATCH));
});

//reset
resetBtn.addEventListener("click", () => {
  store.dispatch(actionCreator(RESET));
});

// ==============================
// INCREMENT + DECREMENT
// ==============================

// event delegation
// future dynamically added input ও কাজ করবে
matchContainer.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();

  // nearest parent .match
  const matchEl = e.target.closest(".match");
  if (!matchEl) return;

  // data-id read
  const id = Number(matchEl.dataset.id);

  //increment
  if (e.target.classList.contains("lws-increment")) {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return;
    store.dispatch(actionCreator(INCREMENT, { id, value }));
    e.target.value = "";
  }

  //decrement
  if (e.target.classList.contains("lws-decrement")) {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return;
    store.dispatch(actionCreator(DECREMENT, { id, value }));
    e.target.value = "";
  }
});

//Delete Match
matchContainer.addEventListener("click", (e) => {
  // check if delete button clicked
  const deleteBtn = e.target.closest(".lws-delete");
  if (!deleteBtn) return;

  // find the parent match card
  const matchEl = deleteBtn.closest(".match");
  const id = Number(matchEl.dataset.id);

  store.dispatch(actionCreator(DELETE_MATCH, id));
});
