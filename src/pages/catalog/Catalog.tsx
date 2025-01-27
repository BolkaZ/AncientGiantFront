import { useEffect, useState } from "react"
import { TPeriod } from "../../api/types"
import { getPeriodCollection } from "../../api/endpoints/apiPeriodCollection"
import { useSearchParams} from 'react-router-dom'
import { mockPeriods } from "../../api/mock"
import {PeriodCard} from '../../components/product-card/PeriodCard.tsx';
import {Alert, Container, Form, InputGroup, Row, Spinner} from 'react-bootstrap';

import styles from './Catalog.module.css'
import { useDebouncedCallback} from 'use-debounce';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.ts';
import {changeEndDate, changeName, changeStartDate} from '../../store/filterSlice';
import {TFilterState} from '../../store/filterSlice/types.ts';

export const CatalogPage = () => {
    const [periods, setPeriods] = useState<TPeriod[]>(mockPeriods)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.filter)

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


        getData()
    },[filter])
    const getData =useDebouncedCallback( async () => {
        setLoading(true)
        const response = await getPeriodCollection(searchParams.toString());
        if('data' in response) {
            setPeriods(response.data.periods)
        } else {
            setPeriods(mockPeriods)
        }
        setLoading(false)
    }, 300)


    return <Container className="gap-3 p-3">
        <h1>Каталог</h1>

        <Form className={'d-flex flex-row justify-content-between'}>
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
        </Form>

        <Row title={'Каталог'} className="position-relative d-flex flex-row mb-3 gap-3 justify-content-center">
            {loading && <div className={styles.loadingBg}><Spinner animation="border"/></div>}
            {periods.length === 0 && <Alert variant='danger'>Ничего не найдено!</Alert>}
            {periods.map((item)=>{
                return <PeriodCard item={item} />
            })}
        </Row>
    </Container>
}