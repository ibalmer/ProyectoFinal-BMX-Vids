
import { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";

export function Searcher() {
  const { getPostsByFilters } = useContext(PostsContext);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    if (filter) {
      setLoading(true);
      getPostsByFilters(filter, { limit, offset })
        .then((res) => {
          setResults(res.data || []);
          setTotal(res.total || 0);
        })
        .catch((err) => console.error("Error al buscar:", err))
        .finally(() => setLoading(false));
    }
  }, [filter, offset]);

  useEffect(() => {
    setOffset(0);
  }, [filter]);

  if (!filter) return <p>Ingresá un término de búsqueda.</p>;

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    setOffset((page - 1) * limit);
  };

  return (
    <div>
      <h2>Resultados para: "{filter}"</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : results.length > 0 ? (
        <>
          <ul style={{ display: "flex", flexWrap: "wrap" }}>
            {results.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => setOffset(offset - limit)}
              disabled={offset === 0}
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setOffset(offset + limit)}
              disabled={offset + limit >= total}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
}
