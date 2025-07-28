import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InputSearcher() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?filter=${encodeURIComponent(input.trim())}`);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="buttons-nav flex flex-center width-100 gap-1">
      <input
        className="height-content concrete-input"
        type="text"
        placeholder="Buscar posts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}