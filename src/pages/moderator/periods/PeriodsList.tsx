// pages/PeriodListPage.tsx
import { useEffect } from 'react';
import { Alert, Button, Card, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { dynamicLinks, staticLinks } from '../../../config/router-config';
import { periodDelete, periodList } from '../../../store/periodModerationSlice';
import Plug from '../../../assets/img_empty-photo.png'
export const PeriodListModerationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { periods, loading, error } = useAppSelector(state => state.periodModeration);
  const { isAuthenticated, user } = useAppSelector(state => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(staticLinks.AUTHORIZATION);
      return;
    }
    if (user && !user.is_superuser) {
      navigate(staticLinks.GUEST);
      return;
    }
    dispatch(periodList({}));
  }, [isAuthenticated, user, dispatch, navigate]);

  const handleDeletePeriod = async (periodId: string) => {
    try {
      const response = await dispatch(periodDelete(periodId));

      if ('payload' in response) {
        console.log('Period deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete period:', error);
    }
  };

  const handleEditPeriod = (periodId: string) => {
    navigate(dynamicLinks.moderationPeriodUpdateCreate(periodId));
  };

  const handleCreatePeriod = () => {
    navigate(staticLinks.MODERATION_PERIOD_CREATE);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>Список периодов</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button onClick={handleCreatePeriod} disabled={loading} variant="success" className="mb-3">
            {loading ? '...' : 'Создать новый период'}
          </Button>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Изображение</th>
                <th>Название</th>
                <th>Начало</th>
                <th>Конец</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {periods.map(period => (
                <tr key={period.id}>
                  <td>{period.id}</td>
                  <td> <img style={{maxWidth: 100}} src={!!period.image ?period.image : Plug } alt="" /> </td>
                  <td>{period.name}</td>
                  <td>{period.start}</td>
                  <td>{period.end}</td>
                  {period !== undefined && <td>
                    <Button onClick={() => handleEditPeriod(period!.id!.toString())} disabled={loading} variant="warning" className="me-2">
                      {loading ? '...' : 'Изменить'}
                    </Button>
                    <Button onClick={() => handleDeletePeriod(period!.id!.toString())} disabled={loading} variant="danger">
                      {loading ? '...' : 'Удалить'}
                    </Button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};