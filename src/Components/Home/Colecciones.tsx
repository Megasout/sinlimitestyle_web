type ColeccionesType = {
    width: number
}

function Colecciones(props: ColeccionesType) {
    const { width } = props

    return (
        <div className="colecciones">
            <h1>{width < 530 ? 'Colecciones' : 'Explore nuestras colecciones'}</h1>
            <h2>Ver</h2>
        </div>
    )
}

export default Colecciones