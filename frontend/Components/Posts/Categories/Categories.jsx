import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { useParams, Link } from "react-router-dom";

export function Category() {
    const { param } = useParams();
    const { getPostsByParams } = useContext(PostsContext);

    const [category, setCategory] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await getPostsByParams(param, { limit, offset });
            setCategory(response.data || []);
            setTotal(response.total || 0);
        };
        fetchCategory();
    }, [param, offset]);

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page) => {
        setOffset((page - 1) * limit);
    };

    return (
        <>
            <h3>{param}</h3>

            {category.length > 0 ? category.map((item) => (
                <Link key={item.id} to={`/post/${item.id}`}>
                    <h5>{item.title}</h5>
                </Link>
            )) : <p>No hay resultados.</p>}

            <div style={{ marginTop: '1rem' }}>
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
    );
}
