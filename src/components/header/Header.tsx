import { Nav } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { staticLinks } from "../../config/router-config"

export const Header = () => {

    const location = useLocation()

    return(
    <header>
        <Nav variant="underline" className="justify-content-center" defaultActiveKey={location.pathname} activeKey={location.pathname}>
            <Nav.Item>
                <Nav.Link href={staticLinks.GUEST}>Главная</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href={staticLinks.CATALOG}>Каталог</Nav.Link>
            </Nav.Item>
        </Nav>
    </header>
    )

}

