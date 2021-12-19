import React, { useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import "./managepage.css";

const ManagePage = () => {
  let arr = [
    {
      id: "01",
      name: "Thành phố Hà Nội",
      password: "123456",
      permission: false,
    },
    {
      id: "02",
      name: "Tỉnh Vĩnh Phúc",
      password: "123456",
      permission: true,
    },
    {
      id: "03",
      name: "Tỉnh Hưng Yên",
      password: "123456",
      permission: true,
    },
    {
      id: "04",
      name: "Thành phố Hải Phòng",
      password: "123456",
      permission: false,
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [listAcc, setListAcc] = useState(arr);
  const [createdForm, setCreatedForm] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
    permission: false,
  });
  const [error, setError] = useState("");
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    setCreatedForm({
      name: "",
      id: "",
      password: "",
      confirmPassword: "",
      permission: false,
    });
  };

  const onChangeTextForm = (value, index) => {
    switch (index) {
      case 1:
        setCreatedForm({ ...createdForm, id: value });
        break;
      case 2:
        setCreatedForm({ ...createdForm, name: value });
        break;
      case 3:
        setCreatedForm({ ...createdForm, password: value });
        break;
      case 4:
        setCreatedForm({ ...createdForm, confirmPassword: value });
        break;
      case 5:
        setCreatedForm({ ...createdForm, permission: value });
        console.log({ value });
        break;
      default:
        return;
    }
  };

  const selectedPermistion = (item) => {
    let arr = listAcc;
    console.log({ arr });
    arr.forEach((element) => {
      if (element.id === item.id) {
        element.permission = !item.permission;
      }
    });
    console.log({ arr });
    setListAcc(arr);
  };

  const createNewAcc = () => {
    setError("");
    if (!createdForm.name) {
      setError("Vui lòng nhập tên đơn vị!");
      return;
    }
    if (!createdForm.id) {
      setError("Vui lòng nhập ID!");
      return;
    }
    if (!createdForm.password) {
      setError("Vui lòng nhập mật khẩu!");
      return;
    }
    if (!createdForm.confirmPassword) {
      setError("Vui lòng xác nhận mật khẩu!");
      return;
    }
    let arr = listAcc;
    let obj = {
      id: createdForm.id,
      name: createdForm.name,
      password: createdForm.password,
      permission: createdForm.permission,
    };
    arr.push(obj);
    setListAcc(arr);
    setCreatedForm({
      name: "",
      id: "",
      password: "",
      confirmPassword: "",
      permission: false,
    });
  };

  return (
    <>
      <div className="manage_page">
        <div className="top-content">
          <p>Tài khoản cấp dưới đã được cấp</p>
          <button onClick={handleShow}>Cấp mới</button>
        </div>
        <div className="content">
          {listAcc.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Đơn vị</th>
                  <th>Id</th>
                  <th>Mật khẩu</th>
                  <th>Quyền khảo sát</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                <td>1</td>
                <td>Thành phố Hà Nội</td>
                <td>01</td>
                <td>123456</td>
                <td>
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                  />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Thành phố Hà Nội</td>
                <td>01</td>
                <td>123456</td>
                <td>
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                  />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Thành phố Hà Nội</td>
                <td>01</td>
                <td>123456</td>
                <td>
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                  />
                </td>
              </tr> */}
                {listAcc.map((item, index) => (
                  <tr key={index}>
                    <td>1</td>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.password}</td>
                    <td>
                      <input
                        type="checkbox"
                        // checked={item.permission}
                        value={item.permission}
                        onClick={() => {
                          selectedPermistion(item);
                        }}
                        checked={item.permission}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            "Không có tài khoản nào được tạo"
          )}
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Khai báo đơn vị và cấp mới tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Đơn vị hành chính:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đơn vị muốn tạo"
                value={createdForm.name}
                onChange={(e) => onChangeTextForm(e.target.value, 2)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập ID muốn tạo"
                value={createdForm.id}
                onChange={(e) => onChangeTextForm(e.target.value, 1)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mật khẩu"
                value={createdForm.password}
                onChange={(e) => onChangeTextForm(e.target.value, 3)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Xác nhận mật khẩu:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Xác nhận mật khẩu"
                value={createdForm.confirmPassword}
                onChange={(e) => onChangeTextForm(e.target.value, 4)}
              />
            </Form.Group>
            {error ? (
              <Form.Text className="text-danger">{error}</Form.Text>
            ) : null}
            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Cấp phép khảo sát dân số"
                value={createdForm.permission}
                onChange={(e) => onChangeTextForm(!e.target.value, 5)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={createNewAcc}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagePage;
