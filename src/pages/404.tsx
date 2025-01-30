import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="mt-5 text-center">
      <h1>404</h1>
      <p>Не найдено.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Вернуться на главную страницу
      </Button>
    </Container>
  );
};
