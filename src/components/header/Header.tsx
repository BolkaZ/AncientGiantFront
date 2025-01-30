import {Button, Nav, Navbar} from 'react-bootstrap'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { staticLinks } from "../../config/router-config"
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {logout, userLogout} from '../../store/userSlice';

export const Header = () => {

    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {isAuthenticated, user} = useAppSelector(state => state.user);

    const onLogout = () => {
        dispatch(userLogout());
        dispatch(logout());
        navigate(staticLinks.AUTHORIZATION)
    }

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
                <Nav.Item>
                    <Link className={getClassesLink(staticLinks.USER_BIDS)} to={staticLinks.USER_BIDS}>Заявки</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className={getClassesLink(staticLinks.USER_PROFILE)} to={staticLinks.USER_PROFILE}>Профиль</Link>
                </Nav.Item>
            </Nav>
            {!isAuthenticated
              ? (<> <Link to={staticLinks.AUTHORIZATION}><Button variant='info'>Войти</Button></Link>
                <Link to={staticLinks.AUTHORIZATION}><Button variant='link'>Регистрация</Button></Link></>)
              : (<> {user?.username} <Button onClick={onLogout} variant='outline-danger'>Выйти</Button>
                  </>)
            }
        </Navbar.Collapse>
    </Navbar>
    )
}

