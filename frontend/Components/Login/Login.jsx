import { use, useEffect, useState } from "react";

export function Login() {

    const [isOn, setIsOn] = useState(false)
    const [userLogin, setUserLogin] = useState({
        email: '',
        user_password: ''
    })

    return (
        <>
            <button onClick={() => setIsOn(true)}>
                Ingresar
            </button>
            {isOn && (
                <div style={{
                    border: '2px solid black',
                    borderRadius: '4px'
                }}>
                    <h3>Ingresa Email y contraseña</h3>
                    <form>
                        <input
                            type="email"
                            name="Email"
                            placeholder="Ingresa tu email"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Tu contraseña"
                        />
                        <button type="submit">Iniciar sesion</button>
                        <button onClick={() => setIsOn(false)}> X </button>
                    </form>
                </div>
            )}
        </>
    )
}