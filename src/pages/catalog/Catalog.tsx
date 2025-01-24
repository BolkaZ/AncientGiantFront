import { useEffect, useState } from "react"
import { TPeriod } from "../../api/types"
import { getPeriodCollection } from "../../api/endpoints/apiPeriodCollection"
import { useSearchParams} from 'react-router-dom'
import { mockPeriods } from "../../api/mock"
import {PeriodCard} from '../../components/product-card/PeriodCard.tsx';
import {Alert, Container, Form, InputGroup, Row, Spinner} from 'react-bootstrap';

import styles from './Catalog.module.css'
import { useDebouncedCallback} from 'use-debounce';

export const CatalogPage = () => {
    const [periods, setPeriods] = useState<TPeriod[]>(mockPeriods)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        const getData = async () => {
            setLoading(true)
            const response = await getPeriodCollection(searchParams.toString());
            if('data' in response) {
                setPeriods(response.data.periods)
            } else {
                setPeriods(mockPeriods)
            }
            setLoading(false)
        }
        getData()
    },[searchParams])

    const setValueInput = useDebouncedCallback((value: string | number, name: string) => {
        searchParams.set(name, value.toString())
        setSearchParams(searchParams)
    }, 300)


    return <Container className="gap-3">
        <h1>Каталог</h1>

        <Form className={'d-flex flex-row gap-3'}>

            <Form.Group>
                <Form.Label>Поиск</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                      onChange={(e)=> setValueInput(e.target.value, 'name')}
                      placeholder="Введите название"
                      aria-label="name"
                      defaultValue={searchParams.get('name') ?? ''}
                      aria-describedby="basic-addon2"
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group>
                <Form.Label>Период времени до Н.Э.</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                      onChange={(e)=> setValueInput(e.target.value, 'date_start')}
                      placeholder="Начало"
                      aria-label="date_start"
                      aria-describedby="basic-addon2"
                      defaultValue={searchParams.get('date_start') ?? ''}
                      type={'number'}
                    />
                    <Form.Control
                      onChange={(e)=> setValueInput(e.target.value, 'date_end')}
                      placeholder="Конец"
                      aria-label="date_end"
                      aria-describedby="basic-addon2"
                      defaultValue={searchParams.get('date_end') ?? ''}
                      type={'number'}
                    />
                </InputGroup>
            </Form.Group>

        </Form>

        <Row title={'Каталог'} className="position-relative d-flex flex-row mb-3 gap-3">
            {loading && <div className={styles.loadingBg}><Spinner animation="border"/></div>}
            {periods.length === 0 && <Alert variant='danger'>Ничего не найдено!</Alert>}
            {periods.map((item)=>{
                return <PeriodCard item={item} />
            })}
        </Row>
    </Container>
}