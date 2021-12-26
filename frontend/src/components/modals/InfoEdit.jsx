import React, { Component } from "react";
import { Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import moment from "moment";
import "./infoedit.scss";

export class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: this.props.data,
      error: "",
      loading: false,
      token: this.props.token,
      today: moment(new Date()).format("YYYY-MM-DD"),
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

  handleChange = (event, index) => {
    let data = this.state.data;
    switch (index) {
      case 1:
        data.full_name = event.target.value;
        this.setState({ data: data });
        break;
      case 2:
        data.date_of_birth = event.target.value;
        this.setState({ data: data });
        break;
      case 3:
        data.citizen_id = event.target.value;
        this.setState({ data: data });
        break;
      case 4:
        data.place_of_birth = event.target.value;
        this.setState({ data: data });
        break;
      case 5:
        data.permanent_address = event.target.value;
        this.setState({ data: data });
        break;
      case 6:
        data.temporary_address = event.target.value;
        this.setState({ data: data });
        break;
      case 7:
        data.religious = event.target.value;
        this.setState({ data: data });
        break;
      case 8:
        data.occupation = event.target.value;
        this.setState({ data: data });
        break;
      default:
        return;
    }
  };

  handleSubmit = async () => {
    this.setState({ error: "" });
    console.log(this.state.data);
    if (!this.state.data.full_name) {
      this.setState({ error: "Vui lòng nhập Họ tên" });
      return;
    }
    if (!this.state.data.date_of_birth) {
      this.setState({ error: "Vui lòng nhập Ngày sinh" });
      return;
    }
    if (!this.state.data.place_of_birth) {
      this.setState({ error: "Vui lòng nhập Quê quán" });
      return;
    }
    if (!this.state.data.permanent_address) {
      this.setState({ error: "Vui lòng nhập Địa chỉ thường trú" });
      return;
    }
    if (!this.state.data.temporary_address) {
      this.setState({ error: "Vui lòng nhập Địa chỉ tạm trú" });
      return;
    }
    if (!this.state.data.religious) {
      this.setState({ error: "Vui lòng nhập Tôn giáo" });
      return;
    }
    if (!this.state.data.education) {
      this.setState({ error: "Vui lòng chọn Trình độ học vấn" });
      return;
    }

    if (!this.state.data.occupation) {
      this.setState({ error: "Vui lòng nhập Nghề nghiệp" });
      return;
    }
    this.setState({ loading: true });
    try {
      let tokenCode = "Token " + this.state.token;
      let data = {
        object_id: this.state.data.object_id,
        citizen_id: this.state.data.citizen_id
          ? this.state.data.citizen_id
          : null,
        full_name: this.state.data.full_name,
        gender: this.state.data.gender ? "Male" : "Female",
        date_of_birth: this.state.data.date_of_birth,
        place_of_birth: this.state.data.place_of_birth,
        place_of_origin: "",
        permanent_address: this.state.data.permanent_address,
        temporary_address: this.state.data.temporary_address,
        religious: this.state.data.religious,
        occupation: this.state.data.occupation,
        education: this.state.data.education,
      };
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/citizen/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: tokenCode,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        this.close();
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };
  handleSelected = (event) => {
    let data = this.state.data;
    data.education = event.target.value;
    this.setState({ data });
  };

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.props.handleClose}
        backdrop="static"
        // keyboard={false}
        className="w-52"
      >
        <>
          {this.state.data ? (
            <div className="info_edit">
              <div className="title">
                <h3>Chỉnh sửa thông tin người dân</h3>
              </div>
              <div className="content">
                <Form className="mb-3">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Họ và tên:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={this.state.data.full_name}
                        onChange={(event) => this.handleChange(event, 1)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGrid">
                      <Form.Label>Ngày sinh:</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Chọn ngày sinh"
                        max={this.state.today}
                        value={this.state.data.date_of_birth}
                        onChange={(event) => this.handleChange(event, 2)}
                      />
                    </Form.Group>

                    <Row as={Col}>
                      <Form.Label>Giới tính:</Form.Label>
                      <Form.Group as={Col} className="mb-3" id="formGridMale">
                        <Form.Check
                          type="radio"
                          label="Nam"
                          defaultChecked={this.state.data.gender}
                          value={this.state.data.gender}
                          name="sex"
                          onClick={(e) => {
                            let data = this.state.data;
                            data.gender = e.target.value;
                            this.setState(data);
                          }}
                        />
                      </Form.Group>

                      <Form.Group as={Col} className="mb-3" id="formGridFemale">
                        <Form.Check
                          type="radio"
                          label="Nữ"
                          name="sex"
                          defaultChecked={!this.state.data.gender}
                          value={this.state.data.gender}
                          onClick={(e) => {
                            let data = this.state.data;
                            data.gender = !e.target.value;
                            this.setState(data);
                          }}
                        />
                      </Form.Group>
                    </Row>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridID">
                    <Form.Label>Số CMND/CCCD:</Form.Label>
                    <Form.Control
                      placeholder="Nhập số CMND/CCCD (nếu có)"
                      value={this.state.data.citizen_id}
                      onChange={(event) => this.handleChange(event, 3)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridPlace">
                    <Form.Label>Quê quán</Form.Label>
                    <Form.Control
                      placeholder="Nhập quê quán"
                      value={this.state.data.place_of_birth}
                      onChange={(event) => this.handleChange(event, 4)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Địa chỉ thường trú</Form.Label>
                    <Form.Control
                      placeholder="Nhập địa chỉ thường trú"
                      value={this.state.data.permanent_address}
                      onChange={(event) => this.handleChange(event, 5)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Địa chỉ tạm trú</Form.Label>
                    <Form.Control
                      placeholder="Nhập địa chỉ tạm trú"
                      value={this.state.data.temporary_address}
                      onChange={(event) => this.handleChange(event, 6)}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPlace">
                      <Form.Label>Tôn giáo:</Form.Label>
                      <Form.Control
                        placeholder="Nhập tôn giáo"
                        value={this.state.data.religious}
                        onChange={(event) => this.handleChange(event, 7)}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress">
                      <Form.Label>Trình độ văn hóa:</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={this.state.data.education}
                        onChange={this.handleSelected}
                      >
                        <option>Chọn</option>
                        <option value="Tiểu học">Tiểu học</option>
                        <option value="Trung học cơ sở">Trung học cơ sở</option>
                        <option value="Trung học phổ thông">
                          Trung học phổ thông
                        </option>
                        <option value="Cao đẳng/Đại học">
                          Cao đẳng/Đại học
                        </option>
                        <option value="Khác">Khác</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress">
                      <Form.Label>Nghề nghiệp:</Form.Label>
                      <Form.Control
                        placeholder="Nhập nghề nghiệp"
                        value={this.state.data.occupation}
                        onChange={(event) => this.handleChange(event, 8)}
                      />
                    </Form.Group>
                  </Row>

                  {this.state.error ? (
                    <Form.Group className="mb-3">
                      <Form.Text className="text-danger">
                        {this.state.error}
                      </Form.Text>
                    </Form.Group>
                  ) : null}

                  {this.state.loading ? (
                    <Spinner animation="border" />
                  ) : (
                    <Button variant="primary" onClick={this.handleSubmit}>
                      Gửi
                    </Button>
                  )}
                </Form>
              </div>
            </div>
          ) : null}
        </>
      </Modal>
    );
  }
}

export default ModalEdit;
