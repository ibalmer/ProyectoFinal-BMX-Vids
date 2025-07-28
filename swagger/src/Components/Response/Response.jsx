import axios from "axios"
import { useState, useEffect } from "react"

export function Response({ response }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!response) return

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            
            try {
                const res = await axios.get(response)
                setData(res.data)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [response]) // Se ejecuta cada vez que cambia la prop 'response'

    if (loading) return <pre>Cargando...</pre>
    if (error) return <pre>Error: {error}</pre>
    if (!data) return <pre>No hay datos disponibles</pre>

    return (
        <div className="response-div">
            <pre className="response-json">{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}