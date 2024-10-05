import { useState } from "react"
import "../Styles/home.scss"
import ProgressBar from "../Components/ProgressBar"

function Home() {
    const [select, setSelect] = useState(4)
    const [pause, setPause] = useState<boolean>(false)

    return (
        <div className="home">
            <div className="banner">

                <ProgressBar
                    length={6}
                    select={select}
                    setSelect={setSelect}
                    pause={pause} />
            </div>
            <center>
                {/* <h1>Home</h1> */}
            </center>
            <div className="block"></div>
        </div>
    )
}

export default Home