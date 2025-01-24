import {Nav, Navbar} from 'react-bootstrap'
import { useLocation} from 'react-router-dom'
import { staticLinks } from "../../config/router-config"

export const Header = () => {

    const location = useLocation()

    return(
    <Navbar collapseOnSelect bg='dark' expand="lg" variant='dark'>
        <Navbar.Brand>LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="underline" className="m-auto" defaultActiveKey={location.pathname} activeKey={location.pathname}>
                <Nav.Item>
                    <Nav.Link href={staticLinks.GUEST}> Главная </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={staticLinks.CATALOG}>Каталог</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )

}

