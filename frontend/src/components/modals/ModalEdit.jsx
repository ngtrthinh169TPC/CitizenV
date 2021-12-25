import React, { Component } from "react";
import { Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";

export class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: this.props.data,
      error: "",
      loading: false,
    };
  }

  open = () => {
    this.setState({ showModal: true });
  };

  close = () => {
    this.setState({ showModal: false, loading: false });
  };

  refesh = (item) => {
    this.setState({ data: item });
  };

  onChangeTextForm = (value, index) => {
    let data = this.state.data;
    switch (index) {
      case 1:
        data.account_id = value;
        this.setState({ data: data });
        break;
      case 2:
        data.name_of_unit = value;
        this.setState({ data: data });
        break;
      case 3:
        data.classification = value;
        this.setState({ data: data });
        break;
      case 4:
        data.entry_permit = value;
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
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Cấp bậc:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập cấp bậc của đơn vị"
                    value={this.state.data.classification}
                    onChange={(e) => this.onChangeTextForm(e.target.value, 3)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Đơn vị hành chính:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên đơn vị "
                    value={this.state.data.name_of_unit}
                    onChange={(e) => this.onChangeTextForm(e.target.value, 2)}
                  />
                </Form.Group>
              </Row>
              {this.state.error ? (
                <Form.Text className="text-danger">
                  {this.state.error}
                </Form.Text>
              ) : null}
              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Cấp phép khảo sát dân số"
                  value={this.state.data.entry_permit}
                  onChange={(e) => this.onChangeTextForm(e.target.checked, 4)}
                  defaultChecked={this.state.data.entry_permit}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {this.state.loading ? (
              <Spinner animation="border" />
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  this.setState({ loading: true });
                  this.props.handleSave(this.state.data);
                }}
              >
                Lưu
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalEdit;
