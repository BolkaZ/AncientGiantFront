import {Card} from 'react-bootstrap';
import {TPeriod} from '../../api/types.ts';

import Plug from '../../assets/img_empty-photo.png'

export const PeriodCard =({item}: {item: TPeriod}) => {

  return (<Card style={{maxWidth:' 250px'}}>
  <Card.Img style={{objectFit: 'cover', maxWidth: 250, width: '100%'}} height={200}  variant='top' src={item.image ?? Plug} />
  <Card.Body>
    <Card.Title>{item.name}</Card.Title>
    <Card.Subtitle>Начало:{item.start}</Card.Subtitle>
    <Card.Subtitle>Конец:{item.end}</Card.Subtitle>
  </Card.Body>
</Card>)
}