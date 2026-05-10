import Button from "./Button";
import Count from "./Count";

export default function Counter({ id, state, increment, decrement }) {
  return (
    <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
      <Count count={state} />

      <div className="flex space-x-3">
        <Button label="Increment" onClick={() => increment(id)} />
        <Button label="Decrement" onClick={() => decrement(id)} />
      </div>
    </div>
  );
}
