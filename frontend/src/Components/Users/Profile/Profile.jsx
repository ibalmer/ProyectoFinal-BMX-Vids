import { useContext, useState } from "react";
import { UserContext } from "../../../Providers/Users/UserContext";
import { ConfirmAlert } from "../../ConfirmAlert/ConfirmAlert";
import { ChangePassword } from "../Login/ChangePassword/ChangePassword";

export function Profile({ setShowProfileModal, user }) {

    const [editProfile, setEditProfile] = useState({});
    const [errors, setErrors] = useState([]);
    const [showProfileConfirm, setShowProfileConfirm] = useState(false);
    const { modifyUserById } = useContext(UserContext);
    const [showFormChange, setShowFormChange] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileConfirm = (e) => {
        e.preventDefault();
        setShowProfileConfirm(true);
    };
    const handleProfileCancel = () => {
        setShowProfileConfirm(false)
    };

    const handleConfirmEdit = async () => {

        const original = user;
        const modifiedFields = {};

        if (editProfile.email && editProfile.email !== original.email)
            modifiedFields.email = editProfile.email;

        if (editProfile.name && editProfile.name !== original.name)
            modifiedFields.name = editProfile.name;

        if (editProfile.last_name && editProfile.last_name !== original.last_name)
            modifiedFields.last_name = editProfile.last_name;

        if (editProfile.user_name && editProfile.user_name !== original.user_name)
            modifiedFields.user_name = editProfile.user_name;

        if (editProfile.user_type && editProfile.user_type !== original.user_type)
            modifiedFields.user_type = editProfile.user_type;

        if (Object.keys(modifiedFields).length === 0) {
            setShowProfileConfirm(false);

            showMessage('Parece que no se cambió nada en el usuario.');
            return;
        }
        try {
            await modifyUserById(modifiedFields, original.id);
            setShowProfileModal(false);
            setShowProfileConfirm(false);
        } catch (err) {
            setErrors(err.response.data.errors)
            setShowProfileConfirm(false)
            console.error("Error al modificar el usuario:", err?.response?.data ?? err?.message ?? err);
        }
    };

    const handleShowChangePassword = () => {
        setShowFormChange(true)
    };

    const handleCloseChangePassword = () => {
        setShowFormChange(false)
    };

    return (
        <section className="modal-overlay">
            <div className="edit-box">
                <h2>Perfil</h2>
                <form className="flex column gap-1" onSubmit={handleProfileConfirm}>
                    <label className="size-2 bold" htmlFor="user_name">Nombre de usuario</label>
                    <input
                        className="concrete-input"
                        type="text"
                        name="user_name"
                        value={editProfile.user_name ?? user.user_name}
                        placeholder="Nombre de usuario"
                        onChange={handleChange}
                    />
                    {errors.find(e => e.user_name) && (
                        <p className="bold text-alert-red">{errors.find(e => e.user_name).user_name}</p>
                    )}
                    <label className="size-2 bold" htmlFor="name">Nombre</label>
                    <input
                        className="concrete-input"
                        type="text"
                        name="name"
                        value={editProfile.name ?? user.name}
                        placeholder="Nombre"
                        onChange={handleChange}
                    />
                    {errors.find(e => e.name) && (
                        <p className="bold text-alert-red">{errors.find(e => e.name).name}</p>
                    )}
                    <label className="size-2 bold" htmlFor="last_name">Apellido</label>
                    <input
                        className="concrete-input"
                        type="text"
                        name="last_name"
                        value={editProfile.last_name ?? user.last_name}
                        placeholder="Apellido"
                        onChange={handleChange}
                    />
                    {errors.find(e => e.last_name) && (
                        <p className="bold text-alert-red">{errors.find(e => e.last_name).last_name}</p>
                    )}
                    {showFormChange && (
                        <ChangePassword user={user} cancel={handleCloseChangePassword} />
                    )}
                    <div className="flex gap-1 m-top-2 column">
                        <button onClick={handleShowChangePassword} className="rust-button width-content" type="button">Cambiar Contraseña</button>
                        <div className=" flex gap-1">
                            <button className="street-blue-button width-content" type="submit">
                                Editar perfil
                            </button>
                            <button
                                type="button"
                                className="rust-button width-content"
                                title="Cancelar"
                                onClick={() => setShowProfileModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {showProfileConfirm && (
                <ConfirmAlert question={user.user_name} infoMessage={'¿Confirmar cambios?'} confirm={handleConfirmEdit} cancel={handleProfileCancel} />
            )}
        </section>
    )
};