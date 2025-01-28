import {Button, Card, Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {staticLinks} from '../../../config/router-config.tsx';


export const AuthorizationPage = () => {



  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Авторизация</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Введите email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль"/>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Войти
            </Button>
            <p>Еще нет аккаунта?<Link to={staticLinks.REGISTRATION}> Зарегистрируйтесь</Link></p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}