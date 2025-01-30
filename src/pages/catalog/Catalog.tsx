import { useEffect } from "react"
import { Link, useSearchParams} from 'react-router-dom'
import {PeriodCard} from '../../components/product-card/PeriodCard.tsx';
import {Alert, Button, Container, Form, InputGroup, Row, Spinner} from 'react-bootstrap';

import styles from './Catalog.module.css'
import { useDebouncedCallback} from 'use-debounce';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {changeEndDate, changeName, changeStartDate} from '../../store/filterSlice';
import {TFilterState} from '../../store/filterSlice/types.ts';
import { fetchPeriodCollection } from "../../store/periodCollectionSlice/index.ts";
import { dynamicLinks, staticLinks } from "../../config/router-config.tsx";
import Icon from '../../assets/icon.png'

export const CatalogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.filter)

    const {periods, loading, error, bidInfo} = useAppSelector(state=> state.periodCollection);
    const {bid} = useAppSelector(state=> state.bid);

    useEffect(()=>{
        const filterKeys: (keyof TFilterState)[] = Object.keys(filter) as (keyof TFilterState)[];

        filterKeys.forEach((key: keyof TFilterState)=> {
            if(filter[key]) {
                searchParams.set(key, String(filter[key]))
            } else {
                searchParams.delete(key)
            }
        });
        setSearchParams(searchParams)
        console.log(bidInfo);
        

        getData()
    },[filter])
    const getData =useDebouncedCallback( async () => {
        dispatch(fetchPeriodCollection({search: filter.name}));
    
    }, 300)


    return <Container className="gap-3 p-3">
        <h1>Каталог</h1>

        <Form className={'d-flex flex-row justify-content-between align-items-center'}>
            <Form.Group>
                <Form.Label>Период времени до Н.Э.</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                      onChange={(e)=>dispatch(changeStartDate(e.target.value))}
                      placeholder="Начало"
                      aria-label="startDate"
                      aria-describedby="basic-addon2"
                      defaultValue={searchParams.get('startDate') ?? ''}
                      type={'number'}
                    />
                    <Form.Control
                      onChange={(e)=> dispatch(changeEndDate(e.target.value))}
                      placeholder="Конец"
                      aria-label="endDate"
                      aria-describedby="basic-addon2"
                      defaultValue={searchParams.get('endDate') ?? ''}
                      type={'number'}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group>
                <Form.Label>Поиск</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                      onChange={(e)=> dispatch(changeName(e.target.value))}
                      placeholder="Введите название"
                      aria-label="name"
                      defaultValue={searchParams.get('name') ?? ''}
                      aria-describedby="basic-addon2"
                    />
                </InputGroup>
            </Form.Group>
           {bid?.id && <Link style={{maxHeight:60}} to={dynamicLinks.userBid(bid?.id)} ><img style={{maxWidth: 60}} src={Icon} alt="" /> </Link>} 
        </Form>

        <Row title={'Каталог'} className="position-relative d-flex flex-row mb-3 gap-3 justify-content-center">
            {loading && <div className={styles.loadingBg}><Spinner animation="border"/></div>}
            {periods.length === 0 && !loading && error &&  <Alert variant='danger'>Ничего не найдено!</Alert>}
            {periods.map((item)=>{
                return <PeriodCard item={item} />
            })}
        </Row>
    </Container>
}