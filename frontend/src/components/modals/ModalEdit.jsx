import React, { Component } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";

export class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: this.props.data,
      error: "",
    };
  }

  open = () => {
    this.setState({ showModal: true });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  refesh = (item) => {
    this.setState({ data: item });
  };

  onChangeTextForm = (value, index) => {
    let data = this.state.data;
    switch (index) {
      case 1:
        data.id = value;
        this.setState({ data: data });
        break;
      case 2:
        data.name = value;
        this.setState({ data: data });
        break;
      case 3:
        data.password = value;
        this.setState({ data: data });
        break;
      case 4:
        data.permission = value;
        this.setState({ data: data });
        break;
      default:
        return;
    }
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Đơn vị hành chính:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên đơn vị muốn tạo"
                  value={this.state.data.name}
                  onChange={(e) => this.onChangeTextForm(e.target.value, 2)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập ID muốn tạo"
                  value={this.state.data.id}
                  onChange={(e) => this.onChangeTextForm(e.target.value, 1)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mật khẩu"
                  value={this.state.data.password}
                  onChange={(e) => this.onChangeTextForm(e.target.value, 3)}
                />
              </Form.Group>
              {this.state.error ? (
                <Form.Text className="text-danger">
                  {this.state.error}
                </Form.Text>
              ) : null}
              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Cấp phép khảo sát dân số"
                  value={this.state.data.permission}
                  onChange={(e) => this.onChangeTextForm(!e.target.value, 4)}
                  defaultChecked={this.state.data.permission}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.handleSave}>
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;
