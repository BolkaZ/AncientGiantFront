import { useEffect } from 'react';
import { Alert, Button, Card, Container, Table } from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux.ts';
import {approveBid, fetchBidList, rejectBid} from '../../../store/bidsSlice';
import {staticLinks} from '../../../config/router-config.tsx';
import {useNavigate} from 'react-router-dom';

export const UserBidListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bids, loading, error } = useAppSelector(state => state.bidsCollection);
  const {isAuthenticated, user} = useAppSelector(state => state.user);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate(staticLinks.AUTHORIZATION);
    }
  },[isAuthenticated]);

  useEffect(() => {
    dispatch(fetchBidList({}));
  }, [dispatch]);

  const handleApproveBid = async (bidId: string) => {
    if (bidId) {
      const response = await dispatch(approveBid(bidId));

      if ('payload' in response && response.payload) {
        dispatch(fetchBidList({}))
        console.log('Bid approved successfully:', response.payload);
      }
    }
  };

  const handleRejectBid = async (bidId: string) => {
    if (bidId) {
      const response = await dispatch(rejectBid(bidId));

      if ('payload' in response && response.payload) {
        dispatch(fetchBidList({}));
        console.log('Bid rejected successfully:', response.payload);
      }
    }
  };

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body style={{overflowX: 'auto'}}>
          <h1 className={'h1 text-center'}>Список заявок</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
              <tr>
                <th>Дата создания</th>
                <th>Дата обновления</th>
                <th>Дата формирования</th>
                <th>Дата окончания</th>
                <th>Комментарий</th>
                {user?.is_superuser &&<th>Действие</th>}
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
                  {user?.is_superuser && !bid.finished_at &&<td><Button onClick={()=>handleApproveBid(bid.id)}>Одобрить</Button> <Button variant='danger' onClick={()=>handleRejectBid(bid.id) }>Отклонить</Button></td> }
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