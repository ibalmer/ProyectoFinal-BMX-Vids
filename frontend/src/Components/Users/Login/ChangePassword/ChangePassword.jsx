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
            
            if (!result) {
                console.log('3. Contraseña incorrecta');
                return; // Esto sale del .then(), no de sendData
            }
            
            if (passwords.new_password !== passwords.re_password) {
                console.log('4. Las contraseñas no coinciden');
                return;
            }
    modifyUserById({user_password: passwords.new_password},user.id)
    setMessage(true)
            
        })
        .catch(error => {
            console.log('3. validatePassword falló con error:', error);
        });
    
    console.log('4. Código después de validatePassword (aparece inmediatamente)');
};

const handleCloseMessage = () =>{
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
                    <label className="size-2 bold" htmlFor="new_password">Nueva Contraseña</label>
                    <input
                        className="concrete-input"
                        type="password"
                        name="new_password"
                        value={passwords.new_password}
                        placeholder="Nueva Contraseña"
                        onChange={handleChange}
                    />
                    <label className="size-2 bold" htmlFor="re_password">Repetir Contraseña</label>
                    <input
                        className="concrete-input"
                        type="password"
                        name="re_password"
                        value={passwords.re_password}
                        placeholder="Repetir Contraseña"
                        onChange={handleChange}
                    />
                    <button className="street-blue-button" type="button" onClick={sendData}>Cambiar Contraseña</button>
                    <button onClick={cancel} className="rust-button" type="button">Cancelar</button>
                </form>
            </div>
            {message &&(
                <PopupMessage message={'Tu contraseña ha sido cambiada!!!'} closeMessage={handleCloseMessage}/>
            )}
        </section>
    );
}
