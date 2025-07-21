import { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { PostThumbnail } from "../PostThumbnail/PostThumbnail";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";


export function Searcher() {
  const { getPostsByFilters } = useContext(PostsContext);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 12;


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
    <section className="flex flex-center align-center column p-5 gap-5">
      <h2>Resultados para: "{filter}"</h2>
      <div className="flex flex-center align-center wrap gap-6">
        {loading ? (
          <p>Cargando...</p>
        ) : results.length > 0 ? (
          <>
            {results.length > 0 ? results.map((item) => (
              <Link key={item.id} to={`/post/${item.id}`}>
                <div>
                  <PostThumbnail post={item} />
                </div>
              </Link>
            )) : <p>No hay resultados.</p>}
          </>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setOffset(offset - limit)}
          disabled={offset === 0}
          className='street-blue-button'
          title='Arterior'
        >
          <MdOutlineArrowBackIos className="size-2 flex flex-center align-center" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            className={`size-2 flex flex-center align-center ${currentPage === i + 1 ? 'selected-page' : 'rust-button'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setOffset(offset + limit)}
          disabled={offset + limit >= total}
          className='street-blue-button'
          title='Siguiente'
        >
          <MdOutlineArrowForwardIos className="size-2 flex flex-center align-center" />
        </button>
      </div>
    </section>
  );
}
