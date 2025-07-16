import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";

import './InputSearcher.css'

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
    <form onSubmit={handleSubmit} className="flex flex-center gap-1">
      <input
        className="searcher-input concrete-input"
        type="text"
        placeholder="Buscar posts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="street-blue-button" type="submit"><IoSearchSharp className="size-2 flex flex-center align-center"/></button>
    </form>
  );
}