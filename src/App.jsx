import { useState } from "react";
import Counter from "./components/Counter";
import Stats from "./components/Stats";

const initialState = [
  { id: 1, count: 0 },
  { id: 2, count: 0 },
];
export default function App() {
  const [state, setState] = useState(initialState);

  const totalCount = () => {
    return state.reduce((total, counter) => total + counter.count, 0);
  };

  const increment = (id) => {
    const updatedCounter = state.map((c) =>
      c.id === id ? { ...c, count: c.count + 1 } : c,
    );
    setState(updatedCounter);
  };

  const decrement = (id) => {
    const updatedCounter = state.map((c) =>
      c.id === id ? { ...c, count: c.count - 1 } : c,
    );
    setState(updatedCounter);
  };

  return (
    <div className="w-screen h-screen p-10 bg-gray-100 text-slate-700">
      <h1 className="max-w-md mx-auto text-center text-2xl font-bold">
        Simple Counter Application
      </h1>

      <div className="max-w-md mx-auto mt-10 space-y-5">
        {state.map((count) => (
          <Counter
            key={count.id}
            id={count.id}
            increment={increment}
            decrement={decrement}
            state={count.count}
          />
        ))}
      </div>
      <div className="max-w-md mx-auto mt-10 space-y-5">
        <Stats count={totalCount()} />
      </div>
    </div>
  );
}
