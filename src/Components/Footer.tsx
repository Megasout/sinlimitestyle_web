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
                        <input name="email" autoComplete="email" type="email" placeholder="Email" />
                        <input type="submit" value={'Suscribirse'} />
                    </form>
                    <p>Al suscribirse, usted confirma que ha leído y comprendido nuestra
                        {' '}<span>Declaracion de privacidad</span>{' '}
                        y que deseas recibir nuestro correo informativo.</p>
                    <div className="social">
                        <a href=""><i className="fa-brands fa-facebook"></i></a>
                        <a href=""><i className="fa-brands fa-square-instagram"></i></a>
                        <a href=""><i className="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>

                {width >= 1280 &&
                    <FullFooter />}
                {width < 970 &&
                    <div className="line"></div>}
                {width < 1280 &&
                    <Buttons />}
            </div>
            <div className="info">
                <h2>©Sin Límite 2024</h2>
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
                <h1>Servicios</h1>
                <Link to={''}>Servicio 1</Link>
                <Link to={''}>Servicio 2</Link>
                <Link to={''}>Servicio 3</Link>
            </div>
            <div className="block">
                <h1>Sin Límite</h1>
                <Link to={''}>Sobre nosotros</Link>
                <Link to={''}>Preguntas frecuentes</Link>
                <Link to={''}>Términos y condiciones de uso</Link>
                <Link to={''}>Declaración de privacidad</Link>
            </div>
            <div className="block">
                <h1>Contacto</h1>
                <IconButton to="" icon="fa-brands fa-whatsapp" text="WhatsApp" />
                <IconButton to="" icon="fa-regular fa-envelope" text="+598 98 912 284" />
                <IconButton to="" icon="fa-solid fa-phone" text="correo@correo.com" />
            </div>
        </>
    )
}

function Buttons() {
    return (
        <div className="buttons">
            <CustomButton
                title="Servicios"
                height={71}
                children={[
                    <Link key={1} to={''}>Servicio 1</Link>,
                    <Link key={2} to={''}>Servicio 2</Link>,
                    <Link key={3} to={''}>Servicio 3</Link>
                ]} />
            <CustomButton
                title="Sin Límite"
                height={97}
                children={[
                    <Link key={4} to={''}>Sobre nosotros</Link>,
                    <Link key={5} to={''}>Preguntas frecuentes</Link>,
                    <Link key={6} to={''}>Términos y condiciones de uso</Link>,
                    <Link key={7} to={''}>Declaración de privacidad</Link>
                ]} />
            <CustomButton
                title="Contacto"
                height={75}
                children={[
                    <IconButton key={8} to="" icon="fa-brands fa-whatsapp" text="WhatsApp" />,
                    <IconButton key={9} to="" icon="fa-regular fa-envelope" text="+598 98 912 284" />,
                    <IconButton key={10} to="" icon="fa-solid fa-phone" text="correo@correo.com" />
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

type IconButtonType = {
    icon: string,
    text: string,
    to: string
}

function IconButton(props: IconButtonType) {
    const { icon, text, to } = props

    return (
        <Link to={to}>
            <i style={{ fontSize: '1rem' }} className={icon}></i>
            {' ' + text}
        </Link >
    )
}