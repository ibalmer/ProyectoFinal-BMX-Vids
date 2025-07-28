import { useState } from "react";
import { UserContext } from "./UserContext";
import { AxiosApi } from "../../Utils/axiosApi";

export function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const api = AxiosApi();
    const [userAuthenticated, setUserAuthenticated] = useState({
        id: null,
        user_name: null,
        name: null,
        last_name: null,
        email: null,
        user_type: 'invitado'
    });

    

    const getUsers = async ({ limit = 20, offset = 0 }) => {
        try {
            const res = await api.get('/users', {
                params: { limit, offset }
            });
            return res.data;
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUserById = async (id) => {
        try {
            const res = await api.get(`/users/${id}`);
            return res;
        } catch (error) {
            console.error('Error al cargar el Usuario:', error);
        }
    };

    const createUser = async (newUser) => {
        try {
            const res = await api.post("/users/register", newUser);

            if (!res.data || typeof res.data !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }
            return res.data;
        } catch (err) {
            console.error("Error al crear usuario:", err.response?.data || err.message);
            throw err;
        }
    };

    const modifyUserById = async (userData, id) => {
        const isFullUserUpdate = [
            "user_name",
            "name",
            "last_name",
            "user_password",
            "email",
            "user_type",
            "favs"
        ].every(key => key in userData);
        console.log(userData)
        const url = `/users/${id}`;
        try {
            const res = await api[isFullUserUpdate ? "put" : "patch"](url, userData);
            console.log(res)
            if (!res.data || typeof res.data !== "object") {
                console.warn("Respuesta no válida:", res.data);
                return;
            }
            if (userAuthenticated && userAuthenticated.id === id) {
                setUserAuthenticated(prevUser => ({
                    ...prevUser,
                    ...userData
                }));
            }
            return res.data;
        } catch (err) {
            console.error("Error al modificar el usuario:", err.response?.data || err.message);
            throw err;
        }
    }

    const loginUser = async (userLogin) => {
        try {
            const res = await api.post('/users/login', userLogin, {
                withCredentials: true,
                timeout: 3000
            });
            console.log('res provider:', res)
            const user = res.data.data;

            if (!user || typeof user !== "object") {
                console.warn("La respuesta no contiene un Usuario válido:", res.data);
                return;
            }
            const authData = await api.get('/users/auth', { withCredentials: true })
            const authUserData = authData.data.data
            if (user.id === authUserData.id) {
                const authUser = {
                    ...user,
                    ...authUserData
                };
                setUserAuthenticated(authUser);
                return authUser;
            }
        } catch (err) {
            console.error("Error al ingresar el usuario:", err.response?.data || err.message);
            throw err;
        }
    };

    const validatePassword = async (email, password) => {
    console.log('validatePassword iniciando...', { email, password });
    
    const user = { email, user_password: password };
    
    try {
        const res = await api.post('/users/validate_password', user, {
            withCredentials: true
        });
        
        console.log('Respuesta del servidor:', res.data);
        const verifyUser = res.data.data;
        console.log('verifyUser:', verifyUser);
        console.log('Comparando emails:', verifyUser.email, '===', email);
        
        if (verifyUser.email === email) {
            console.log('Emails coinciden, retornando true');
            return true;
        } else { 
            console.log('Emails NO coinciden, retornando false');
            return false; 
        }
    } catch (err) {
        console.log('Error capturado:', err);
        console.error("Contraseña incorrecta:", err.response?.data || err.message);
        return false;
    }
}
    const auth = async () => {
        try {
            const authData = await api.get('/users/auth', { withCredentials: true })
            const authUserData = authData.data.data
            const userData = await getUserById(authUserData.id)

            const user = {
                id: userData.data.data[0].id,
                user_name: userData.data.data[0].user_name,
                name: userData.data.data[0].name,
                last_name: userData.data.data[0].last_name,
                email: userData.data.data[0].email,
                favs: userData.data.data[0].favs
            }

            if (user.id === authUserData.id) {
                const authUser = {
                    ...user,
                    ...authUserData
                };
                setUserAuthenticated(authUser);
                return authUser;
            }

        } catch (error) {
            console.log(error)
        }

    }

/*     const logOutUser = async () => {
        console.log('el logou')
        try {
            const response = await api.post('/users/closeSession', null, { withCredentials: true });

            if (response.ok) {
                console.log("¡Sesión cerrada!");
            }
        } catch (err) {
            console.log("Error al cerrar la sesión: ", err);
        }
    }
 */
// En UserProvider.js - Función logOutUser corregida
const logOutUser = async () => {
    console.log('Iniciando logout...');
    try {
        const response = await api.post('/users/closeSession', {}, { 
            withCredentials: true 
        });

        // Verificar el status de la respuesta correctamente
        if (response.status === 200 || response.status === 204) {
            console.log("¡Sesión cerrada exitosamente!");
            
            // Resetear el estado del usuario autenticado
            setUserAuthenticated({
                id: null,
                user_name: null,
                name: null,
                last_name: null,
                email: null,
                user_type: 'invitado'
            });
            
            return true;
        } else {
            console.warn("Respuesta inesperada del servidor:", response.status);
            return false;
        }
    } catch (err) {
        console.error("Error al cerrar la sesión:", err.response?.data || err.message);
        
        // Incluso si hay error, resetear el estado local
        setUserAuthenticated({
            id: null,
            user_name: null,
            name: null,
            last_name: null,
            email: null,
            user_type: 'invitado'
        });
        
        return false;
    }
};

    return (
        <UserContext.Provider
            value={{
                loading,
                userAuthenticated,
                setUserAuthenticated,
                getUsers,
                getUserById,
                createUser,
                logOutUser,
                loginUser,
                validatePassword,
                modifyUserById,
                auth
            }}
        >
            {children}
        </UserContext.Provider>
    );

};