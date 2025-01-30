import {Button, Card} from 'react-bootstrap';
import {TPeriod} from '../../api/types.ts';

import Plug from '../../assets/img_empty-photo.png'
import {useNavigate} from 'react-router-dom';
import {dynamicLinks} from '../../config/router-config.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {periodInBidCreate} from '../../store/bidSlice';

export const PeriodCard =({item}: {item: TPeriod}) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {bid} = useAppSelector(state => state.bid);

  const handleAddPeriodToBid = async () => {
    try {
      const periodData: { bid_id?: number } = {
        bid_id: bid?.id ? bid?.id : undefined,
      };

      const response = await dispatch(periodInBidCreate({ periodId: item.id.toString(), data:bid?.id ? periodData : {} }));

      if ('payload' in response && response.payload) {
        console.log('Period added to bid successfully:', response.payload);
        // Можно добавить дополнительную логику, например, обновление состояния или навигацию
      }
    } catch (error) {
      console.error('Failed to add period to bid:', error);
    }
  };

  return (<Card key={item.id} className={'p-0'} style={{maxWidth:' 250px',borderColor: '#753526', backgroundColor:'#efeeec'}}>
    <Card.Img style={{objectFit: 'cover', maxWidth: 250, width: '100%'}} height={200}  variant='top' src={item.image?.length === 0 || !item.image ? Plug : item?.image} />
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Subtitle>Начало:{item.start}</Card.Subtitle>
      <Card.Subtitle>Конец:{item.end}</Card.Subtitle>
      <div className='d-flex gap-1 mt-1'>
        <Button className='' variant="primary" onClick={()=> handleAddPeriodToBid()}>Добавить</Button>
        <Button className='' variant="outlined" onClick={()=>navigate(dynamicLinks.catalogDetail(item.id))} >Подробнее</Button>
      </div>
    </Card.Body>
  </Card>)
}