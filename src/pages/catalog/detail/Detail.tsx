import { useParams } from "react-router-dom"
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux.ts';
import { getMockPeriod} from '../../../store/periodSlice';
import {useEffect} from 'react';
import Plug from '../../../assets/img_empty-photo.png'

export const DetailPage = () => {
 const { id} = useParams();
 const period = useAppSelector((state) => state.period.period);
 const dispatch = useAppDispatch();
 const getPeriod = async () => {
  if(id) {
   dispatch(getMockPeriod(+id));

  }
 }

 useEffect(() => {
  getPeriod()
 }, [id]);


 if(!period) {
  return null;
 }

 return <Container  className="p-2">
  <Row className="justify-content-center">
   <Col md={8}>
    <Card style={{borderColor: '#753526'}} className="shadow-lg">
       <Card.Img style={{objectFit: 'cover', maxHeight:400}} variant='top' src={period.image ?? Plug } alt={period.name} />
     <Card.Body>
      <Card.Title className="text-center mb-3" style={{ fontSize: '2rem' }}>
       {period.name}
      </Card.Title>
      <Card.Text className="text-muted mb-4">
       {period.detail_text}
      </Card.Text>
      <Row>
       <Col>
        <p className="mb-1"><strong>Начало:</strong> {period.start}</p>
       </Col>
       <Col>
        <p className="mb-1"><strong>Конец:</strong> {period.end}</p>
       </Col>
      </Row>
      <div className="text-center mt-4">
       
      </div>
     </Card.Body>
    </Card>
   </Col>
  </Row>
 </Container>
}