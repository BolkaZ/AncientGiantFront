// pages/PeriodFormPage.tsx
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { clearPeriod, periodCreate, periodGet, periodImageUpdate, periodUpdate } from '../../../store/periodModerationSlice';
import { PeriodUpdateInput } from '../../../api/Api';
import { staticLinks } from '../../../config/router-config';

export const PeriodFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { periodId } = useParams<{ periodId?: string }>();
  const { period, loading, error } = useAppSelector(state => state.periodModeration);
    const location = useLocation()


  const [name, setName] = useState('');
  const [detailedText, setDetailedText] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [ setNewImageUrl] = useState<string | null>(null)

    useEffect(()=>{setName('')
        setDetailedText('')
        setStart('')
        setEnd('')
        setImage(null)
        setNewImage(null)
        dispatch(clearPeriod())
    },[location.pathname, periodId])

  useEffect(() => {
    
    if (periodId) {
      dispatch(periodGet(periodId));
    }
  }, [periodId, dispatch]);

  useEffect(() => {
    if (period) {
      setName(period.name);
      setStart(period.start);
      setEnd(period.end);
    }
  }, [period]);

  const handleSubmit = async () => {


    const formData: PeriodUpdateInput = {
      name,
      start,
      end,
      detail_text: detailedText,
      // @ts-ignore
      image: image || undefined,
    };

    if (periodId) {
      // Обновление существующего периода
      const response = await dispatch(periodUpdate({ periodId, data: formData }));

      if ('payload' in response && response.payload) {
        console.log('Period updated successfully:', response.payload);
        navigate(staticLinks.MODERATION_PERIODS);
      }
    } else {
      // Создание нового периода
      const response = await dispatch(periodCreate(formData));

      if ('payload' in response && response.payload) {
        console.log('Period created successfully:', response.payload);
        navigate(staticLinks.MODERATION_PERIODS);
      }
    }
  };
  const handleNewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        // @ts-ignore
      setNewImageUrl(event!.target!.result)
    }
    if (file) {
      setNewImage(file);
      setImage(file);
    }
  };

  const handleUpdateImage = async () => {
    if (!periodId || !newImage) {
      console.error('Period ID or new image is missing');
      return;
    }

    const imageData = new FormData();
    imageData.append('image', newImage);

    const response = await dispatch(periodImageUpdate({ periodId, data: { image: newImage } }));

    if ('payload' in response) {
      console.log('Period image updated successfully');
      // Обновляем состояние period после успешного обновления изображения
      if (period) {
        dispatch(periodGet(periodId)); // Перезагружаем детальную информацию о периоде
      }
    }
  };

  const pageTitle = periodId ? 'Редактирование периода' : 'Создание нового периода';
  const submitButtonText = periodId ? 'Обновить период' : 'Создать период';

  return (
    <Container className={'p-5'}>
      <Card>
        <Card.Body>
          <h1 className={'h1 text-center'}>{pageTitle}</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Введите название"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                required
                value={detailedText}
                onChange={(e) => setDetailedText(e.target.value)}
                type="text"
                placeholder="Введите описание"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStart">
              <Form.Label>Начало</Form.Label>
              <Form.Control
                required
                value={start}
                onChange={(e) => setStart(e.target.value)}
                type="text"
                placeholder="Введите начало"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEnd">
              <Form.Label>Конец</Form.Label>
              <Form.Control
                required
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                type="text"
                placeholder="Введите конец"
              />
            </Form.Group>

            {periodId && <Form.Group className="mb-3 flex-column gap-1" controlId="formBasicImage">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleNewImageChange}
              />
              {period && period.image && !newImage &&(
                <img
                  src={period.image}
                  alt={period.name}
                  style={{ maxWidth: '250px', marginTop: '10px', marginBottom: '10px' }}
                />
              )}
              <Button onClick={handleUpdateImage} disabled={loading || !newImage} variant="secondary" className="w-100 mb-3">
                  {loading ? '...' : 'Обновить изображение'}
                </Button>
            </Form.Group>}
            <Button onClick={() => handleSubmit()} disabled={loading} variant="primary" type="submit" className="w-100">
              {loading ? '...' : submitButtonText}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};