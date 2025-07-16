import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { UserContext } from "../../../Providers/Users/UserContext";
import { CommentsProvider } from "../../../Providers/Comments/CommentsProvider";
import { Comments } from "../../Comments/Comments";

export function Post() {
    const { param } = useParams();
    const navigate = useNavigate();
    const { getPostByParams, deletePostById } = useContext(PostsContext);
    const { userAuthenticated } = useContext(UserContext)
    const [post, setPost] = useState(null);
    const [postID, setPostID] = useState();
    const [deleteAlert, setDeleteAlert] = useState(false)


    useEffect(() => {

        const getPost = async () => {
            const response = await getPostByParams(param);
            setPost(response.data);
        };

        getPost();
    }, [param]);

    const deletePost = (id) => {
        deletePostById(id)
        setDeleteAlert(true)
    };

    return (
        <div>
            <h1>Post</h1>
            {post ? (
                <>
                    <h2>{post.data[0].title}</h2>
                    {post.data[0].video_link && (
                        <div style={{ marginTop: "1rem" }}>
                            <iframe
                                width="560"
                                height="315"
                                src={post.data[0].video_link.replace("watch?v=", "embed/")}
                                title="Video de YouTube"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                    <h5>Tags:{post.data[0].tags?.split(",").join(" · ")}</h5>
                    <h5>{post.data[0].description}</h5>
                    <CommentsProvider><Comments key={post.data[0].title} id={post.data[0].id} /></CommentsProvider>
                </>
            ) : (
                <p>Cargando post...</p>
            )}
            
            {userAuthenticated.user_type === 'admin' ? (
                <>
                    <button className="dirty-white-submit flex flex-center align-center" onClick={() => deletePost(post.data[0].id)}>Eliminar Post</button>
                    <button>Modificar Post</button>
                    {deleteAlert ? (
                        <div style={{
                            border: '2px solid black',
                            borderRadius: '20px',
                            padding: '0.5rem',
                            marginTop: '.5rem'
                        }}>
                            <h4>El post numero {post.data[0].id} ha sido eliminado</h4>
                            <button className="dirty-white-submit flex flex-center align-center"
                                onClick={() => {
                                setDeleteAlert(false);
                                navigate('/')
                            }}>
                                Aceptar
                            </button>
                        </div>
                    ) : (null)}
                </>
            ) : (null)}

        </div>
    );
};