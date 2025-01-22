import { useEffect, useState } from "react"
import { TPeriod } from "../../api/types"
import { getPeriodCollection } from "../../api/endpoints/apiPeriodCollection"
import { useSearchParams } from "react-router-dom"
import { Card } from "react-bootstrap"
import { mockPeriods } from "../../api/mock"

export const CatalogPage = () => {
    const [periods, setPeriods] = useState<TPeriod[]>(mockPeriods)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        const getData = async () => {
            const response = await getPeriodCollection(searchParams.toString());
            if('data' in response) {
                setPeriods(response.data.periods)
            }
        }
        getData()
    },[searchParams])


    return <div>
        <h1>Каталог</h1>
        <div className="flex center row">
            {periods.map((item)=>{
                return <Card style={{maxWidth:' 18em'}}>
                    <Card.Img variant='top' src={item.image ?? undefined} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle>Начало:{item.start}</Card.Subtitle>
                        <Card.Subtitle>Конец:{item.end}</Card.Subtitle>
                    </Card.Body>
                </Card>
            })}
        </div>
    </div>
}