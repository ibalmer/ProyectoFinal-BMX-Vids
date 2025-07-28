import { useEffect, useState } from "react"

export function Content({ post, toggleResponse }) {

    const [offset, setOffset] = useState('');
    const [category, setCategory] = useState('');
    const [filter, setFilter] = useState('');
    const [id, setId] = useState('');
    const [url, setUrl] = useState('');
    const handleOffsetChange = (e) => {
        const value = e.target.value;
        setOffset(value);
        console.log("Nuevo offset:", value);
    }
    const handleCategoryChange = (e) => {
        const value = e.target.value
        let category;
        switch (value) {
            case '1':
                category = 'full%20videos'
                break;
            case '2':
                category = 'web%20videos'
                break;
            case '3':
                category = 'event%20videos'
                break
            default:
                break;
        }
        setCategory(category)
        console.log('Nueva categoria:', category)
    }
    const handleFilterChange = (e) => {
        const value = e.target.value
        setFilter(value)
        console.log('Nuevo filtro:', value)
    }
    const handleIdChange = (e) => {
        const value = e.target.value
        setId(value)
        console.log('Nuev id:', value)
    }
    const urlFormat = (baseUrl, pag, filter, cat, id) => {
        let resultUrl = baseUrl || '';

        // Agregar categoría si existe
        if (cat) {
            resultUrl += '/' + cat;
        }

        // Agregar ID si existe
        if (id) {
            resultUrl += '/' + id;
        }

        // Construir query parameters
        const queryParams = [];

        if (filter) {
            queryParams.push('filter=' + encodeURIComponent(filter));
        }

        if (pag) {
            queryParams.push('limit=10&offset=' + pag);
        }

        if (queryParams.length > 0) {
            resultUrl += '?' + queryParams.join('&');
        }

        return resultUrl;
    }

    // Función corregida para enviar datos
    const sendData = (pag, filter, cat, id) => {
        const baseUrl = post?.base_url || '';
        const endpointURL = urlFormat(baseUrl, pag, filter, cat, id);
        setCategory('');
        setFilter('');
        setOffset('');
        setId('');
        setUrl(endpointURL);
    }

    useEffect(() => {
        if (url) {
            toggleResponse(url);
        }
    }, [url])
    useEffect(() => {
        setUrl('')
    }, [post])
    return (
        <div className="content-div">
            {post && (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <p className="endpoint-text">{(url ? (url) : (post.base_url))}</p>
                    {post.type === 'posts' && (
                        <div>
                            <label htmlFor="offset">Offset</label>
                            <form>
                                <input
                                    type="text"
                                    name="offset"
                                    value={offset || ''}
                                    min={0}
                                    max={20}
                                    onChange={handleOffsetChange}
                                />
                                <button onClick={() => sendData(offset, null, null, null)} type='button'>Probar</button>
                            </form>
                        </div>
                    )}
                    {post.type === 'category' && (
                        <div>
                            <form className="cat-form">
                                <label htmlFor="cat">Categoría</label>
                                <select
                                    name="cat"
                                    value={category || ''}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value="" disabled>Seleccionar Categoría</option>
                                    <option value="1">Full Video</option>
                                    <option value="2">Web Video</option>
                                    <option value="3">Event Video</option>
                                </select>
                                <label htmlFor="offset">Offset</label>
                                <input
                                    type="text"
                                    name="offset"
                                    value={offset || ''}
                                    min={0}
                                    max={20}
                                    onChange={handleOffsetChange}
                                />
                                <button onClick={() => sendData(offset, null, category, null)} type='button'>Probar</button>
                            </form>
                        </div>
                    )}
                    {post.type === 'filter' && (
                        <div>
                            <label htmlFor="Filtro">Filtro</label>
                            <form>
                                <input
                                    type="text"
                                    name="filter"
                                    value={filter || ''}
                                    onChange={handleFilterChange}
                                />
                                <button onClick={() => sendData(null, filter, null, null)} type='button'>Probar</button>
                            </form>
                        </div>
                    )}
                    {post.type === 'id' && (
                        <div>
                            <label htmlFor="ID">ID</label>
                            <form>
                                <input
                                    type="text"
                                    name="id"
                                    value={id || ''}
                                    onChange={handleIdChange}
                                />
                                <button onClick={() => sendData(null, null, null, id)} type='button'>Probar</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}