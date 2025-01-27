import {Nav, Navbar} from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom'
import { staticLinks } from "../../config/router-config"
import {LoginModal} from '../login-modal/Login.tsx';
import {RegistrationModal} from '../registration-modal/Registration.tsx';
import clsx from 'clsx';

export const Header = () => {

    const location = useLocation()

    const getClassesLink = (path: string) =>  clsx('nav-link', {['active']: location.pathname === path})
    return(
    <Navbar className={'p-1'} collapseOnSelect expand="lg" variant='light' style={{borderBottom:'2px solid #753526', backgroundColor: '#efeeec'}}>
        <Navbar.Brand>AncientGiant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  id="responsive-navbar-nav">
            <Nav variant="underline" className="m-auto" defaultActiveKey={location.pathname} activeKey={location.pathname}>
                <Nav.Item>
                    <Link className={getClassesLink(staticLinks.GUEST)} to={staticLinks.GUEST}>Главная</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className={getClassesLink(staticLinks.CATALOG)} to={staticLinks.CATALOG}>Каталог</Link>
                </Nav.Item>
            </Nav>
            <RegistrationModal />
            <LoginModal />
        </Navbar.Collapse>
    </Navbar>
    )

}

