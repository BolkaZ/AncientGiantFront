import {Button, Form, Modal} from 'react-bootstrap';
import {useState} from 'react';

export const RegistrationModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  return (

    <>
      <Button variant='link' onClick={handleModalOpen}>Регистрация</Button>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Введите email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите повторно пароль" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Зарегистрироваться
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}