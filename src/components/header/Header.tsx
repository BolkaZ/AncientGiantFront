import {Nav, Navbar} from 'react-bootstrap'
import { useLocation} from 'react-router-dom'
import { staticLinks } from "../../config/router-config"
import {LoginModal} from '../login-modal/Login.tsx';
import {RegistrationModal} from '../registration-modal/Registration.tsx';

export const Header = () => {

    const location = useLocation()

    return(
    <Navbar className={'p-1'} collapseOnSelect expand="lg" variant='light' style={{borderBottom:'2px solid #753526', backgroundColor: '#efeeec'}}>
        <Navbar.Brand>AncientGiant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  id="responsive-navbar-nav">
            <Nav variant="underline" className="m-auto" defaultActiveKey={location.pathname} activeKey={location.pathname}>
                <Nav.Item>
                    <Nav.Link href={staticLinks.GUEST}> Главная </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={staticLinks.CATALOG}>Каталог</Nav.Link>
                </Nav.Item>
            </Nav>
            <RegistrationModal />
            <LoginModal />
        </Navbar.Collapse>
    </Navbar>
    )

}

