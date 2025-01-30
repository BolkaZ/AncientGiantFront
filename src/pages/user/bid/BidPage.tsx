// components/BidDetailsPage.tsx
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { staticLinks } from '../../../config/router-config.tsx';
import Plug from '../../../assets/img_empty-photo.png';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux.ts';
import {bidDelete, bidForm, bidGet, bidUpdate, periodInBidDelete, PeriodInBidDeleteData} from '../../../store/bidSlice';
import {BidFormInput, BidUpdateInput} from '../../../api/Api.ts'; // Путь к изображению плейсхолдера

interface TPeriod {
  id: number;
  name: string;
  start: string;
  end: string;
  image?: string;
  // Добавьте другие поля по необходимости
}

export const BidDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bidId } = useParams<{ bidId: string }>();
  const { bid, loading, error } = useAppSelector(state => state.bid);

  useEffect(() => {
    if (bidId) {
      dispatch(bidGet(bidId));
    }
  }, [bidId, dispatch]);

  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');

  useEffect(() => {
    if (bid) {
      setComment(bid.comment);
    }
  }, [bid]);

  const handleUpdateComment = async () => {
    if (bidId && bid) {
      const updatedBid: BidUpdateInput = {
        comment: comment,
      };

      const response = await dispatch(bidUpdate({ bidId, data: updatedBid }));

      if ('payload' in response && response.payload) {
        console.log('Bid updated successfully:', response.payload);
      }
    }
  };

  const handleFormBid = async () => {
    if (bidId && bid) {
      const formData: BidFormInput = {
        comment: comment,
        name: name,
        group: group
      };

      const response = await dispatch(bidForm({ bidId, data: formData }));

      if ('payload' in response && response.payload) {
        console.log('Bid formed successfully:', response.payload);
      }
    }
  };

  const handleDeleteBid = async () => {
    if (bidId) {
      const response = await dispatch(bidDelete(bidId));

      if ('payload' in response) {
        navigate(staticLinks.USER_BIDS);
      }
    }
  };

  const handleDeletePeriod = async (periodId: string) => {
    if (bidId && bid!.id) {
      const periodData: PeriodInBidDeleteData = {
        bid_id: bid!.id,
      };

      const response = await dispatch(periodInBidDelete({ periodId, data: periodData }));

      if ('payload' in response) {
        console.log('Period deleted successfully');
      }
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!bid) {
    return <p>Заявка не найдена</p>;
  }

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Детали заявки</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUpdateComment}>
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Комментарий к модератору</Form.Label>
              <Form.Control
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Введите комментарий"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Добавление животного</Form.Label>
              <Form.Control
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Введите название"
              />
              <Form.Control
                required
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                type="text"
                placeholder="Введите группу"
              />
            </Form.Group>
            <Button onClick={() => handleUpdateComment()} disabled={loading} variant="primary" type="submit" className="w-100 mb-3">
              {loading ? '...' : 'Обновить комментарий'}
            </Button>
            <Button onClick={() => handleFormBid()} disabled={loading} variant="success" type="button" className="w-100 mb-3">
              {loading ? '...' : 'Формировать заявку'}
            </Button>
            <Button onClick={() => handleDeleteBid()} disabled={loading} variant="danger" type="button" className="w-100 mb-3">
              {loading ? '...' : 'Удалить заявку'}
            </Button>
          </Form>

          <h2 className={'h2 mt-4'}>Список периодов</h2>
          {bid.periods.length === 0 ? (
            <p>Нет периодов</p>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {bid.periods.map(period => (
                <Col key={period.id}>
                  <Card onClick={() => handleDeletePeriod(period.id.toString())} className={'p-0'} style={{ maxWidth: '250px', borderColor: '#753526', backgroundColor: '#efeeec' }}>
                    <Card.Img
                      style={{ objectFit: 'cover', maxWidth: 250, width: '100%' }}
                      height={200}
                      variant='top'
                      src={period.image?.length === 0 || !period.image ? Plug : period.image}
                    />
                    <Card.Body>
                      <Card.Title>{period.name}</Card.Title>
                      <Card.Subtitle>Животные: {period.animals.toLocaleString()}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};