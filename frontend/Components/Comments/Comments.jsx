import { useContext, useEffect, useState } from "react";
import { CommentsContext } from '../../Providers/Comments/CommentsContext';
import { UserContext } from '../../Providers/Users/UserContext';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function Comments({ id }) {
    const { getCommentsByPostID, createComment, deleteCommentByID } = useContext(CommentsContext);
    const { userAuthenticated } = useContext(UserContext);
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState({ content: '' });

    useEffect(() => {
        getComments();
    }, [id]);

    const getComments = async () => {
        const response = await getCommentsByPostID(id);
        console.log(response.data);

        const commentsWithTimeAgo = response.data.data.map(comment => ({
            ...comment,
            time_ago: formatDistanceToNow(new Date(comment.publish_date), {
                addSuffix: true,// agrega contexto a al resultado
                locale: es// para que el contexto sea en español
            })
        }));

        setComments({
            ...response.data,
            data: commentsWithTimeAgo
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendData = async (e) => {
        e.preventDefault();

        const commentToSend = {
            ...newComment,
            user_id: userAuthenticated.id,
            post_id: id
        };
        console.log(commentToSend);

        try {
            const response = await createComment(commentToSend);
            setNewComment({ content: '' });
            await getComments();
        } catch (err) {
            console.error('Error al crear el comentario:', err);
        }
    };

    const deleteComment = async (commentId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            try {
                const response = await deleteCommentByID(commentId);
                console.log('Comentario eliminado:', response);
                await getComments();
            } catch (err) {
                console.error('Error al eliminar el comentario:', err);
                alert('Error al eliminar el comentario');
            }
        }
    };

    // Función para determinar si el usuario puede eliminar el comentario
    const canDeleteComment = (comment) => {
        return userAuthenticated &&
            (userAuthenticated.user_type === 'admin' ||
                userAuthenticated.id === comment.user_id);
    };

    return (
        <div className="flex column p-2 flex-center align-center gap-3 radius-2 width-content bg-dark-blue p-2 m-top-2 right-0">
            <h1>Comentarios</h1>
            <form onSubmit={sendData}>
                <textarea
                    name="content"
                    placeholder="Dejá tu comentario..."
                    rows="4"
                    onChange={handleChange}
                    value={newComment.content}
                    required
                />
                {userAuthenticated.user_type != 'user' && userAuthenticated.user_type != 'admin' ? (
                    <h4>Inicia sesion para comentar</h4>
                ) : (
                    <button type="submit">Comentar</button>
                )}
            </form>
            {comments?.data?.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: '2px solid black',
                        borderRadius: '20px',
                        padding: '0.5rem',
                        marginTop: '.5rem'
                    }}
                >
                    <div className="flex column p-2 flex-center align-center gap-3 radius-2 width-content bg-dark-blue p-2 m-top-2 right-0">
                        <div style={{ flex: 1 }}>
                            <h3>{item.user_name}</h3>
                            <p>{item.content}</p>
                            <small style={{ color: '#666' }}>
                                Comentario de {item.time_ago}
                            </small>
                        </div>
                        {canDeleteComment(item) && (
                            <button
                                onClick={() => deleteComment(item.id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '0.25rem 0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                                title="Eliminar comentario"
                            >
                                🗑️ Eliminar
                            </button>
                        )}
                    </div>
                </div>
            ))
            }
        </div>
    );
}