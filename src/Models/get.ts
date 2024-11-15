export default async function getFromTable(url: string) {
    const response = await fetch(import.meta.env.VITE_URL + url)

    const result = await response.json()

    if (result.error) {
        throw new Response('', {
            status: result.status,
            statusText: result.message
        })
    }

    return result.status
}

export async function getFromTableQuery(url: string, param: string, query: any[]) {
    try {
        const queryText = query.join(',')

        const newURl = url + '?' + param + `=${queryText}`

        const response = await fetch(import.meta.env.VITE_URL + newURl)

        const result = await response.json()

        if(result.error){
            throw new Response('', {
                status: result.status,
                statusText: result.message
            })
        }

        return result.status
    }catch(error){
        console.error('Hubo un error:', error)
        throw error;
    }
}