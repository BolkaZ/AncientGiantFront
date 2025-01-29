import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux.ts';
import {UserUpdateInput} from '../../../api/Api.ts';
import {userUpdate} from '../../../store/userSlice';

export const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(state => state.user);

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const onSubmit = async () => {

    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const userData: UserUpdateInput = {
      first_name: firstName || undefined,
      last_name: lastName || undefined,
      email: email || undefined,
      password: password || undefined,
    };

    const response = await dispatch(userUpdate({ userId: user?.id?.toString() ?? '', data: userData }));

    if ('payload' in response && response.payload) {
      console.log('User updated successfully:', response.payload);
    }
  };

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Профиль пользователя</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Новый пароль</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Введите новый пароль"
              />
            </Form.Group>
            <Button onClick={() => onSubmit()} disabled={loading} variant="primary" type="submit" className="w-100">
              {loading ? '...' : 'Обновить профиль'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};