import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {staticLinks} from '../../config/router-config.tsx';

export const GuestPage = () => {

    const navigate = useNavigate();

    return <div style={{minHeight: 'calc(100vh - 58px)'}}>
        <div
          style={{
              background: 'url(https://kudaufa.ru/uploads/169caf5d843288d53e486f7b36b231cc.jpg) center/cover',
              color: 'white',
              textAlign: 'center',
              padding: '100px 0',
              height: 'max-content',
              minHeight: '100vh',
              // @ts-ignore
              color: 'ActiveBorder'
          }}
        >
            <h1 className={'1'}>Путешествие в прошлое Земли</h1>
            <p>Узнайте больше о жизни динозавров и древних экосистемах.</p>
            <Button onClick={()=>navigate(staticLinks.CATALOG)} variant="primary" size="lg">Узнать больше</Button>
        </div>

        {/* Main Content */}
        <Container className="p-5">
            <h2 id="about" className="text-center">Что такое палеонтология?</h2>
            <p className="text-center">
                Палеонтология — это наука, изучающая историю жизни на Земле через
                ископаемые останки.
            </p>

            <Row className="gap-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Древние существа</Card.Title>
                            <Card.Text>
                                Изучение динозавров, морских существ и других древних форм жизни.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Ископаемые</Card.Title>
                            <Card.Text>
                                Как окаменелости рассказывают нам о прошлом Земли.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Эволюция</Card.Title>
                            <Card.Text>
                                Понимание эволюции и взаимосвязи видов на протяжении миллионов лет.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
}