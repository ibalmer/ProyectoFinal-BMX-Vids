import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { useParams, Link } from "react-router-dom";
import { PostThumbnail } from "../PostThumbnail/PostThumbnail";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

export function Category() {
    const { param } = useParams();
    const { getPostsByParams } = useContext(PostsContext);

    const [category, setCategory] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 12;
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
        <section className="flex flex-center align-center column p-5 gap-5">
            <div className="flex flex-center align-center wrap gap-6">
                {category.length > 0 ? category.map((item) => (
                    <Link key={item.id} to={`/post/${item.id}`}>
                        <div>
                            <PostThumbnail post={item} />
                        </div>
                    </Link>
                )) : <p>No hay resultados.</p>}

            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset === 0}
                    className='street-blue-button'
                >
                    <MdOutlineArrowBackIos className="size-2 flex flex-center align-center"/>
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
                >
                    <MdOutlineArrowForwardIos className="size-2 flex flex-center align-center"/>
                </button>
            </div>
        </section>
    );
}
