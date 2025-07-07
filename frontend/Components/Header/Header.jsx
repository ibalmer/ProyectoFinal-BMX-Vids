import { Link } from "react-router-dom";
import { useContext } from "react";
import { InputSearcher } from '../Posts/Searcher/InputSearcher/InputSearcher'
import { Login } from "../Users/Login/Login";
import { UserContext } from "../../Providers/Users/UserContext";

export function Header() {
    const { userAuthenticated } = useContext(UserContext);

    return (
        <div className='header'>
            <Link to={'/posts'}>
                <img src="/bmxVidsLogo.svg" alt="" style={{width: "100px", fill:"red"}}/>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to={`/full videos`}>
                            <h5>Full Videos</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/web videos`}>
                            <h5>Web Videos</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/event videos`}>
                            <h5>Event Videos</h5>
                        </Link>
                    </li>
                    {userAuthenticated.user_type === 'admin' ? (<li>
                        <Link to={`/create`}>
                            <h5>Crear Post</h5>
                        </Link>
                    </li>) : null}
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <InputSearcher />
                    </li>
                    <li>
                        <Login />
                    </li>
                    {userAuthenticated.user_type === 'invitado' ? (<li>
                        <Link to={`/register`}>
                            <h5>Crear cuenta</h5>
                        </Link>
                    </li>) : null}
                </ul>
            </nav>
        </div>
    )
}