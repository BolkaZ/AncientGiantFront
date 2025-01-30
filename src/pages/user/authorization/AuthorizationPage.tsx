import {Alert, Button, Card, Container, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { staticLinks} from '../../../config/router-config.tsx';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux.ts';
import {useEffect, useState} from 'react';
import  {userAuth} from '../../../store/userSlice';


export const AuthorizationPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useAppSelector(state => state.user)

  const onSubmit = async () => {
    if(!!username || !!password){
      const response = await dispatch(userAuth({username, password}))

      if('data' in response){
        if(isAuthenticated){
          navigate(staticLinks.CATALOG)
        }
      }
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      navigate(staticLinks.CATALOG);
    }
  }, [isAuthenticated]);

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Авторизация</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Введите email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Введите пароль"/>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button onClick={() => onSubmit()} disabled={loading} variant="primary" type="submit" className="w-100">
              {loading ? '...' : 'Войти'}
            </Button>
            <p>Еще нет аккаунта?<Link to={staticLinks.REGISTRATION}> Зарегистрируйтесь</Link></p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}