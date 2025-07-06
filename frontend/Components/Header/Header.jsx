import { Link } from "react-router-dom";
import {InputSearcher} from '../Searcher/InputSearcher/InputSearcher'
import { Login } from "../Login/Login";

export function Header() {
    return (
        <div className='header'>
            <Link to={'/posts'}>
                <h3>BMX Vids</h3>
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
                    <li>
                        <Link to={`/create`}>
                            <h5>Crear Post</h5>
                        </Link>
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <InputSearcher />
                    </li>
                    <li>
                        <Login />
                    </li>
                </ul>
            </nav>
        </div>
    )
}