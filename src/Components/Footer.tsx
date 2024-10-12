import { Link } from "react-router-dom"
import useWindowWidth from "../Hooks/useWindowWidth"
import React, { useState } from "react"

function Footer() {
    const width = useWindowWidth()

    return (
        <div className="footer">
            <div className="footer_body">
                <div className="block large">
                    <h1>Suscríbete para recibir ofertas y noticias</h1>
                    <form>
                        <input type="email" placeholder="Direccion de correo electronico" />
                        <input type="submit" value={'Suscribirse'} />
                    </form>
                    <p>Al suscribirse, usted confirma que ha leído y comprendido nuestra
                        {' '}<span>Declaracion de privacidad</span>{' '}
                        y que deseas recibir nuestro correo informativo.</p>
                </div>
                {width >= 1480 &&
                    <FullFooter />}
                {width < 970 &&
                    <div className="line"></div>}
                {width < 1480 &&
                    <Buttons />}
            </div>
            <div className="info">
                <h2>©Sin Limite 2024</h2>
            </div>
        </div>

    )
}

export default Footer

function FullFooter() {
    return (
        <>
            <div className="line"></div>
            <div className="block">
                <h1>Redes sociales</h1>
                <a href="http://www.facebook.com">Facebook</a>
                <a href="http://www.facebook.com">Instagram</a>
                <a href="http://www.facebook.com">WhatsApp</a>
            </div>
            <div className="block">
                <h1>Servicios</h1>
                <Link to={''}>Servicio 1</Link>
                <Link to={''}>Servicio 2</Link>
                <Link to={''}>Servicio 3</Link>
            </div>
            <div className="block">
                <h1>Sobre nosotros</h1>
                <Link to={''}>Llámenos al <span style={{ textWrap: "nowrap" }}>+598 98 912 284</span></Link>
                <Link to={''}>Contáctanos por WhatsApp</Link>
                <Link to={''}>correo@correo.com</Link>
                <Link to={''}>Preguntas frecuentes</Link>
            </div>
            <div className="block">
                <h1>Legal</h1>
                <Link to={''}>Términos y condiciones de uso</Link>
                <Link to={''}>Declaración de privacidad</Link>
            </div>
        </>
    )
}

function Buttons() {
    return (
        <div className="buttons">
            <CustomButton
                title="Redes sociales"
                height={70}
                children={[
                    <a href="http://www.facebook.com">Facebook</a>,
                    <a href="http://www.facebook.com">Instagram</a>,
                    <a href="http://www.facebook.com">WhatsApp</a>
                ]} />
            <CustomButton
                title="Servicios"
                height={70}
                children={[
                    <Link to={''}>Servicio 1</Link>,
                    <Link to={''}>Servicio 2</Link>,
                    <Link to={''}>Servicio 3</Link>
                ]} />
            <CustomButton
                title="Sobre nosotros"
                height={95}
                children={[
                    <Link to={''}>Llámenos al <span style={{ textWrap: "nowrap" }}>+598 98 912 284</span></Link>,
                    <Link to={''}>Contáctanos por WhatsApp</Link>,
                    <Link to={''}>correo@correo.com</Link>,
                    <Link to={''}>Preguntas frecuentes</Link>
                ]} />
            <CustomButton
                title="Legal"
                height={46}
                children={[
                    <Link to={''}>Términos y condiciones de uso</Link>,
                    <Link to={''}>Declaración de privacidad</Link>
                ]} />
        </div>
    )
}

type CustomButtonType = {
    title: string,
    children: React.ReactNode[],
    height: number
}

function CustomButton(props: CustomButtonType) {
    const { title, height, children } = props
    const [isActive, setIsActive] = useState(false)

    const handleOnClick = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="list">
            <div className={`button ${isActive ? 'active' : ''}`} onClick={handleOnClick}>
                <h1>{title}</h1>
                <span
                    translate="no"
                    className="material-symbols-outlined">
                    chevron_right
                </span>
            </div>
            <div
                style={{ "--block-height": `${height}px` } as React.CSSProperties}
                className={`block ${isActive ? 'active' : ''}`}>
                {children}
            </div>
        </div>
    )
}