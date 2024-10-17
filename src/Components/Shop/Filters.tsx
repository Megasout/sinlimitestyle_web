import { Link } from "react-router-dom"

function Filters() {
    return (
        <div className="filters">
            <FilterBlock
                title="Tipo de producto"
                children={[
                    <Link to={''}>Prendas</Link>,
                    <Link to={''}>Accesorios</Link>
                ]} />
            <FilterBlock
                title="Filtrar por precio"
                children={[
                    <form>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <input type="number" placeholder="Mínimo" min={0} />
                            <div className="line"></div>
                            <input type="number" min={0} placeholder="Máximo" />
                        </div>
                        <input type="submit" value={'Filtrar'}></input>
                    </form>
                ]} />
            <FilterBlock
                title="Categorias"
                children={[
                    <Link to={''}>Categoria 1</Link>,
                    <Link to={''}>Categoria 2</Link>,
                    <Link to={''}>Categoria 3</Link>,
                    <Link to={''}>Categoria 4</Link>,
                    <Link to={''}>Categoria 5</Link>,
                    <Link to={''}>Categoria 6</Link>,
                    <Link to={''}>Categoria 7</Link>,
                    <Link to={''}>Categoria 8</Link>
                ]} />
        </div>
    )
}

export default Filters

type FilterBlockType = {
    title: string,
    children: React.ReactNode[]
}

function FilterBlock(props: FilterBlockType) {
    const { title, children } = props

    return (
        <div className="block">
            <h1>{title}</h1>
            {children}
        </div>
    )
} 