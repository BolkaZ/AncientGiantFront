import { useParams } from "react-router-dom"
import { Button } from "react-bootstrap";


export const DetailPage = () => {
 const { id} = useParams();

 return <div><Button  title="btn">{id}</Button> </div>
}