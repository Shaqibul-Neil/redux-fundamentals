const Button = ({ label, onClick }) => {
  return (
    <button
      className="bg-indigo-400 text-white px-3 py-2 rounded shadow"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
