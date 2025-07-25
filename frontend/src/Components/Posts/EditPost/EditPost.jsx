import { useContext, useEffect, useState } from "react";
import { usePopupMessage } from "../../../Hooks/usePopupMessage";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../Providers/Post/PostContext";
import { PopupMessage } from "../../PopUpMessage/PopUpMessage";
import { ConfirmAlert } from "../../ConfirmAlert/ConfirmAlert";
import { IoCloseSharp } from "react-icons/io5";



export function EditPost({ setShowEditModal, post }) {

    const { modifyPostById } = useContext(PostsContext)
    const [showEditConfirm, setShowEditConfirm] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [editTags, setEditTags] = useState([]);
    const [tagInput, setTagInput] = useState();
    const navigate = useNavigate();
    const { message: errorMessage, showMessage, hideMessage } = usePopupMessage(4000);

    useEffect(() => {
        setEditForm({});
        setEditTags(post.data[0].tags?.split(',').map(t => t.trim()) ?? []);
    }, [])

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitEdit = () => {
        setShowEditConfirm(true);
    };

    const handleCancelEdit = () => {
        setShowEditConfirm(false)
    }

    useEffect(() => {
        console.log(showEditConfirm)
    }, [showEditConfirm])

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !editTags.includes(trimmed)) {
            setEditTags(prev => [...prev, trimmed]);
        }
        setTagInput('');
    };

    const handleRemoveTag = (index) => {
        const updated = [...editTags];
        updated.splice(index, 1);
        setEditTags(updated);
    };

    const handleConfirmEdit = async () => {
        const original = post.data[0];
        const modifiedFields = {};

        if (editForm.title && editForm.title !== original.title) modifiedFields.title = editForm.title;
        if (editForm.description && editForm.description !== original.description) modifiedFields.description = editForm.description;
        if (editForm.content && editForm.content !== original.content) modifiedFields.content = editForm.content;
        if (editForm.video_link && editForm.video_link !== original.video_link) modifiedFields.video_link = editForm.video_link;
        if (editForm.type_id && Number(editForm.type_id) !== original.type_id)
            modifiedFields.type_id = Number(editForm.type_id);


        const currentTags = original.tags?.split(',').map(t => t.trim()).join(',') ?? '';
        const newTags = editTags.join(',');
        if (newTags !== currentTags) modifiedFields.tags = newTags;

        if (Object.keys(modifiedFields).length === 0) {
            setShowEditConfirm(false);
            showMessage('Parece que no se cambió nada en el post.');
            return;
        }

        try {
            console.log("Enviando a modifyPostById:", modifiedFields, original.id);
            await modifyPostById(modifiedFields, original.id);
            setShowEditModal(false);
            setShowEditConfirm(false);
            navigate(0); // recarga
        } catch (err) {
            console.error("Error al modificar el post:", err?.response?.data ?? err?.message ?? err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="edit-box">
                <h2>Editar Post</h2>
                <form className="flex column gap-1" onSubmit={(e) => e.preventDefault()}>
                    <input
                        name="title"
                        value={editForm.title ?? post.data[0].title}
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <textarea
                        name="description"
                        value={editForm.description ?? post.data[0].description}
                        rows="3"
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <textarea
                        name="content"
                        value={editForm.content ?? post.data[0].content}
                        rows="4"
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <input
                        name="video_link"
                        value={editForm.video_link ?? post.data[0].video_link}
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <div>
                        <label>Tags</label>
                        <div className="flex gap-1">
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="concrete-input"
                            />
                            <button type="button" onClick={handleAddTag} className="street-blue-button">Agregar</button>
                        </div>
                        <ul className="flex wrap gap-1 m-top-1">
                            {editTags.map((tag, i) => (
                                <li key={i} className="flex gap-1 align-center">
                                    <span>{tag}</span>
                                    <button type="button" onClick={() => handleRemoveTag(i)} className="rust-button"><IoCloseSharp /></button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <select
                        name="type_id"
                        className="concrete-input"
                        onChange={handleEditChange}
                        value={editForm.type_id ?? ''}
                    >
                        <option value="">Seleccionar Categoría</option>
                        <option value="1">Full Video</option>
                        <option value="2">Web Video</option>
                        <option value="3">Event Video</option>
                    </select>

                    <div className="flex gap-2 m-top-2">
                        <button type="button" className="street-blue-button" onClick={handleSubmitEdit}>Guardar</button>
                        <button type="button" className="rust-button" onClick={() => setShowEditModal(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
            {errorMessage && (
                <PopupMessage message={errorMessage} closeMessage={hideMessage} />
            )}
            {showEditConfirm && (
                <>
                    <ConfirmAlert question={'¿Guardar los cambios en este post?'} infoMessage={'Esta acción sobrescribirá la información anterior.'} confirm={handleConfirmEdit} cancel={handleCancelEdit} />
                </>
            )}
        </div>
    );
}
