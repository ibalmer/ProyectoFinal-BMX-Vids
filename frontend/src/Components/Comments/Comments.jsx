import { useContext, useEffect, useState } from "react";
import { usePopupMessage } from "../../Hooks/usePopupMessage";
import { CommentsContext } from '../../Providers/Comments/CommentsContext';
import { UserContext } from '../../Providers/Users/UserContext';
import { formatDistanceToNow } from 'date-fns';
import { PopupMessage } from "../PopUpMessage/PopUpMessage";
import { es } from 'date-fns/locale';
import { scrollToHeader } from "../../Utils/scrollToHeader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './Comments.css';
import { ConfirmAlert } from "../ConfirmAlert/ConfirmAlert";

export function Comments({ id }) {
    const { getCommentsByPostID, createComment, deleteCommentByID, modifyCommentById } = useContext(CommentsContext);
    const { userAuthenticated } = useContext(UserContext);
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState({ content: '' });
    const [commentToDeleteId, setCommentToDeleteId] = useState(null);
    const [modifyComment, setModifyComment] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const { message: errorMessage, showMessage, hideMessage } = usePopupMessage(4000);

    useEffect(() => {
        getComments();
    }, [id]);

    const getComments = async () => {
        try {
            const response = await getCommentsByPostID(id);
            const commentsWithTimeAgo = response.data.data.map(comment => ({
                ...comment,
                time_ago: formatDistanceToNow(new Date(comment.publish_date), {
                    addSuffix: true,
                    locale: es
                })
            }));

            setComments({
                ...response.data,
                data: commentsWithTimeAgo
            });
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
            setComments({ data: [] });
        }
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

        try {
            await createComment(commentToSend);
            setNewComment({ content: '' });
            await getComments();
        } catch (err) {
            console.error('Error al crear el comentario:', err);
            alert('Error al crear el comentario');
        }
    };

    const confirmDelete = (commentId) => {
        setCommentToDeleteId(commentId);
    };

    const cancelDelete = () => {
        setCommentToDeleteId(null);
    };

    const executeDelete = async () => {
        if (commentToDeleteId) {
            try {
                await deleteCommentByID(commentToDeleteId);
                setCommentToDeleteId(null);
                await getComments();
            } catch (err) {
                console.error('Error al eliminar el comentario:', err);
                alert('Error al eliminar el comentario');
                setCommentToDeleteId(null);
            }
        }
    };

    const canEditComment = (comment) => {
        return userAuthenticated &&
            (userAuthenticated.user_type === 'admin' || userAuthenticated.id === comment.user_id);
    };

    const handleModify = (e) => {
        const { name, value } = e.target;
        setModifyComment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const openEditForm = (comment) => {
        setModifyComment(comment);
        setShowEditForm(true);
    };

    const cancelModify = () => {
        setModifyComment(null);
        setShowEditForm(false);
    };

    const confirmModify = () => {
        setShowEditForm(false);
    };

    const modifyData = async () => {
        if (modifyComment) {
            try {
                await modifyCommentById({ content: modifyComment.content }, modifyComment.id);
                setModifyComment(null);
                await getComments();
            } catch (err) {
                console.error('Error al modificar el comentario', err);
                showMessage('Parece que no se cambió nada en el comentario.');
                setModifyComment(null);
            }
        }
    };

    return (
        <div className="flex column flex-center align-center gap-3 width-100">
            <h3 className="comment-title">Comentarios</h3>
            <form className="flex column flex-center align-center gap-3 width-75" onSubmit={sendData}>
                <textarea
                    name="content"
                    placeholder="Dejá tu comentario..."
                    rows="4"
                    onChange={handleChange}
                    value={newComment.content}
                    className="concrete-input"
                    required
                />
                {userAuthenticated && (userAuthenticated.user_type === 'user' || userAuthenticated.user_type === 'admin') ? (
                    <button className="street-blue-button" title='Comentar' type="submit">Comentar</button>
                ) : (
                    <h4 className="pointer" onClick={() => scrollToHeader()}>Inicia sesión para comentar</h4>
                )}
            </form>

            <div className="flex column gap-1 width-75 border-right-3 border-left-3 border-coal-black">
                {comments?.data?.length > 0 ? (
                    comments.data.map((item) => (
                        <div className="comment-box text-coal-black radius-1 relative m-top-4" key={item.id}>
                            <h3 className="comment-title">{item.user_name}</h3>
                            <p className="comment-content text-street-blue bold size-3 p-block-1">{item.content}</p>
                            <small className="bold">Comentario de {item.time_ago}</small>
                            {canEditComment(item) && (
                                <div className="absolute top-0 right-0 m-2 flex gap-1">
                                    <button
                                        onClick={() => confirmDelete(item.id)}
                                        className="rust-button"
                                        title="Eliminar comentario"
                                    >
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() => openEditForm(item)}
                                        className="street-blue-button"
                                        title="Editar comentario"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No hay comentarios en esta publicación.</p>
                )}
            </div>
            {showEditForm && modifyComment && (
                <div className="modal-overlay">
                    <div className="edit-box">
                        <h3 className="text-warning-yellow">Editar Comentario</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                confirmModify();
                            }}
                            className="flex column gap-2 width-100"
                        >
                            <textarea
                                name="content"
                                rows="4"
                                className="concrete-input width-100"
                                onChange={handleModify}
                                value={modifyComment.content}
                                required
                            />
                            <div className="flex gap-2 justify-center">
                                <button type="submit" className="street-blue-button">
                                    Modificar
                                </button>
                                <button type="button" className="rust-button" onClick={cancelModify}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {errorMessage && (
                <PopupMessage message={errorMessage} closeMessage={hideMessage}/>
            )}

            {modifyComment && !showEditForm && (
                 <ConfirmAlert question={'¿Estás seguro de que quieres modificar este comentario?'} confirm={modifyData} cancel={cancelModify} />
            )}
            {commentToDeleteId && (
                <ConfirmAlert question={'¿Estás seguro de que quieres eliminar este comentario?'} infoMessage={'Esta acción es permanente.'} confirm={executeDelete} cancel={cancelDelete} />

            )}
        </div>
    );
}
