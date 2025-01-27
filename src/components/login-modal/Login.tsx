import {Button, Form, Modal} from 'react-bootstrap';
import {useState} from 'react';

export const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  return (

    <>
      <Button variant="primary" onClick={handleModalOpen}>Войти</Button>
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

            <Button variant="primary" type="submit" className="w-100">
              Войти
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}