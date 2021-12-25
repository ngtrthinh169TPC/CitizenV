import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import moment from "moment";
import "./modalinfo.scss";

export class ModalInfo extends Component {
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

  render() {
    return (
      <div className="modal_info">
        <Modal
          show={this.state.showModal}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông tin người dân</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content">
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Họ và tên:</Form.Label>
                    <Form.Text className="text-dark ml-1">
                      {this.state.data.full_name}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label className="fw-bold">Ngày sinh:</Form.Label>
                    <Form.Text className="text-dark ml-1">
                      {moment(this.state.data.date_of_birth).format(
                        "DD/MM/YYYY"
                      )}
                    </Form.Text>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Giới tính:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.gender == "Male" ? "Nam" : "Nữ"}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Số CMND/CCCD:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.citizen_id
                      ? this.state.data.citizen_id
                      : "Không có"}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Quê quán:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.place_of_birth}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Địa chỉ thường trú:
                  </Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.permanent_address}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Địa chỉ tạm trú:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.temporary_address}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Tôn giáo:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.religious}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Trình độ văn hóa:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.education}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nghề nghiệp:</Form.Label>
                  <Form.Text className="text-dark ml-1">
                    {this.state.data.occupation}
                  </Form.Text>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.setState({ showModal: false })}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalInfo;
