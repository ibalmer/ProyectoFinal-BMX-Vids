import { useContext, useState } from "react";
import { UserContext } from "../../../../Providers/Users/UserContext";
import { PopupMessage } from "../../../PopUpMessage/PopUpMessage";

export function ChangePassword({ user, cancel }) {
    const { validatePassword, modifyUserById } = useContext(UserContext);
    const [passwords, setPasswords] = useState({
        old_password: "",
        new_password: "",
        re_password: "",
    });
    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const sendData = () => {
        console.log('1. Iniciando sendData...');

        validatePassword(user.email, passwords.old_password)
            .then(result => {
                console.log('2. validatePassword resolvió:', result);

                const newErrors = [];

                if (!result) {
                    newErrors.push({ old_password: 'Contraseña incorrecta' });
                }

                if (passwords.new_password.length < 8 || passwords.new_password.length > 20) {
                    newErrors.push({ new_password: 'La nueva contraseña debe tener entre 8 y 20 caracteres' });
                }

                if (passwords.new_password !== passwords.re_password) {
                    newErrors.push({ new_password: 'Las contraseñas no coinciden.' });
                }

                if (newErrors.length > 0) {
                    setErrors(newErrors);
                    console.log('Errores:', newErrors);
                    return;
                }

                modifyUserById({ user_password: passwords.new_password }, user.id);
                setErrors([])
                setMessage(true);
            })
            .catch(error => {
                console.log('3. validatePassword falló con error:', error);
            });

    };

    const handleCloseMessage = () => {
        setMessage(false)
    }

    return (
        <section className="modal-overlay">
            <div className="edit-box">
                <h2>Cambiar Contraseña</h2>
                <form onSubmit={(e) => e.preventDefault()} className="flex column gap-1">
                    <label className="size-2 bold" htmlFor="old_password">Antigua Contraseña</label>
                    <input
                        className="concrete-input"
                        type="password"
                        name="old_password"
                        value={passwords.old_password}
                        placeholder="Tu Contraseña"
                        onChange={handleChange}
                    />
                    {errors.find(e => e.old_password) && (
                        <p className="bold text-alert-red">{errors.find(e => e.old_password).old_password}</p>
                    )}
                    <label className="size-2 bold" htmlFor="new_password">Nueva Contraseña</label>
                    <input
                        className="concrete-input"
                        type="password"
                        name="new_password"
                        value={passwords.new_password}
                        placeholder="Nueva Contraseña"
                        onChange={handleChange}
                    />
                    {errors.find(e => e.new_password) && (
                        <p className="bold text-alert-red">{errors.find(e => e.new_password).new_password}</p>
                    )}
                    <label className="size-2 bold" htmlFor="re_password">Repetir Contraseña</label>
                    <input
                        className="concrete-input"
                        type="password"
                        name="re_password"
                        value={passwords.re_password}
                        placeholder="Repetir Contraseña"
                        onChange={handleChange}
                    />
                    <div className="flex column gap-1 m-top-2">
                        <button className="street-blue-button width-content" type="button" onClick={sendData}>Cambiar Contraseña</button>
                        <button onClick={cancel} className="rust-button width-content" type="button">Cancelar</button>
                    </div>
                </form>
            </div>
            {message && (
                <PopupMessage
                    message={'Tu contraseña ha sido cambiada!!!'}
                    closeMessage={() => {
                        handleCloseMessage();
                        cancel();
                    }}
                />
            )}

        </section>
    );
}
