import { IoCloseSharp } from "react-icons/io5";

export function EditPost({
    setShowEditModal,
    post,
    handleEditChange,
    handleAddTag,
    handleRemoveTag,
    handleSubmitEdit,
    editTags,
    tagInput,
    setTagInput,
    editForm
}) {
    return (
        <div className="modal-overlay">
            <div className="edit-box">
                <h2>Editar Post</h2>
                <form className="flex column gap-1" onSubmit={(e) => e.preventDefault()}>
                    <input
                        name="title"
                        value={editForm.title || post.data[0].title}
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <textarea
                        name="description"
                        value={editForm.description || post.data[0].description}
                        rows="3"
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <textarea
                        name="content"
                        value={editForm.content || post.data[0].content}
                        rows="4"
                        className="concrete-input"
                        onChange={handleEditChange}
                    />

                    <input
                        name="video_link"
                        value={editForm.video_link || post.data[0].video_link}
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
                        value={editForm.type_id || ''}
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
        </div>
    );
}
