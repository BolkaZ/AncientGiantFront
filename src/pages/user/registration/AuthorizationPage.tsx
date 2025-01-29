import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { staticLinks } from '../../../config/router-config.tsx';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.ts';
import { useEffect, useState } from 'react';
import { userRegister } from '../../../store/userSlice';
import {UserCreateInput} from '../../../api/Api.ts';


export const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector(state => state.user);

  const onSubmit = async () => {

    if (username && password) {
      const userData: UserCreateInput = {
        username,
        password,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        email: email || undefined,
      };

      const response = await dispatch(userRegister(userData));

      if ('payload' in response && response.payload) {
        if (isAuthenticated) {
          navigate(staticLinks.CATALOG);
        }
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(staticLinks.CATALOG);
    }
  }, [isAuthenticated]);

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Регистрация</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Введите имя пользователя"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Введите пароль"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Введите имя"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Введите фамилию"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Введите email"
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button onClick={() => onSubmit()} disabled={loading} variant="primary" type="submit" className="w-100">
              {loading ? '...' : 'Зарегистрироваться'}
            </Button>
            <p>
              Уже есть аккаунт? <Link to={staticLinks.AUTHORIZATION}>Авторизуйтесь</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};