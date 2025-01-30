import { useEffect } from 'react';
import { Alert, Card, Container, Table } from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux.ts';
import {fetchBidList} from '../../../store/bidsSlice';
import {staticLinks} from '../../../config/router-config.tsx';
import {useNavigate} from 'react-router-dom';

export const UserBidListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bids, loading, error } = useAppSelector(state => state.bidsCollection);
  const {isAuthenticated} = useAppSelector(state => state.user);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate(staticLinks.AUTHORIZATION);
    }
  },[isAuthenticated]);

  useEffect(() => {
    dispatch(fetchBidList({}));
  }, [dispatch]);

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Список заявок</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>Дата создания</th>
                <th>Дата обновления</th>
                <th>Дата формирования</th>
                <th>Дата окончания</th>
                <th>Комментарий</th>
              </tr>
              </thead>
              <tbody>
              {bids.map(bid => (
                <tr key={bid.created_at}>
                  <td>{bid.created_at}</td>
                  <td>{bid.updated_at}</td>
                  <td>{bid.to_form_at}</td>
                  <td>{bid.finished_at}</td>
                  <td>{bid.comment}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};