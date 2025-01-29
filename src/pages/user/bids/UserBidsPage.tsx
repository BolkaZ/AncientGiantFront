import { Container } from 'react-bootstrap';
import {useAppSelector} from '../../../hooks/redux.ts';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {staticLinks} from '../../../config/router-config.tsx';

export const UserBidsPage = () => {

  const {isAuthenticated, user} = useAppSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuthenticated) {
      navigate(staticLinks.AUTHORIZATION);
    }
  },[isAuthenticated]);

  return (
    <Container className={'p-5'}>

    </Container>
  )
}