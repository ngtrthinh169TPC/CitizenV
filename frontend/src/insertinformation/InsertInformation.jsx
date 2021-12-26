import React, { useState, useEffect } from "react";
import { Row, Form, Button, Col, Spinner, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./insert.scss";

const InsertInformation = () => {
  const [today, setToday] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [form, setForm] = useState({
    hoTen: "",
    cccd: "",
    gioiTinh: true,
    ngaySinh: "",
    queQuan: "",
    thuongTru: "",
    tamTru: "",
    tonGiao: "",
    vanHoa: null,
    ngheNghiep: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useCookies(["account-token"]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("Tạo thông tin người dân thành công!");

  const history = useHistory();

  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSelected = (event) => {
    setForm({ ...form, vanHoa: event.target.value });
  };

  const handleChange = (event, index) => {
    switch (index) {
      case 1:
        setForm({ ...form, hoTen: event.target.value });
        break;

      case 2:
        setForm({ ...form, ngaySinh: event.target.value });
        break;

      case 3:
        setForm({ ...form, cccd: event.target.value });
        break;

      case 4:
        setForm({ ...form, queQuan: event.target.value });
        break;

      case 5:
        setForm({ ...form, thuongTru: event.target.value });
        break;

      case 6:
        setForm({ ...form, tamTru: event.target.value });
        break;

      case 7:
        setForm({ ...form, tonGiao: event.target.value });
        break;

      case 8:
        setForm({ ...form, ngheNghiep: event.target.value });
        break;

      default:
        return;
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.hoTen) {
      setError("Vui lòng nhập Họ tên");
      return;
    }
    if (!form.ngaySinh) {
      setError("Vui lòng nhập Ngày sinh");
      return;
    }
    if (!form.queQuan) {
      setError("Vui lòng nhập Quê quán");
      return;
    }
    if (!form.thuongTru) {
      setError("Vui lòng nhập Địa chỉ thường trú");
      return;
    }
    if (!form.tamTru) {
      setError("Vui lòng nhập Địa chỉ tạm trú");
      return;
    }
    if (!form.tonGiao) {
      setError("Vui lòng nhập Tôn giáo");
      return;
    }
    if (!form.vanHoa) {
      setError("Vui lòng chọn Trình độ học vấn");
      return;
    }

    if (!form.ngheNghiep) {
      setError("Vui lòng nhập Nghề nghiệp");
      return;
    }

    setSuccess(true);
    setLoading(true);
    try {
      let tokenCode = "Token " + token["account-token"];
      let data = {
        citizen_id: form.cccd ? form.cccd : null,
        full_name: form.hoTen,
        gender: form.gioiTinh ? "Male" : "Female",
        date_of_birth: form.ngaySinh,
        place_of_birth: form.queQuan,
        place_of_origin: "",
        permanent_address: form.thuongTru,
        temporary_address: form.tamTru,
        religious: form.tonGiao,
        occupation: form.ngheNghiep,
        education: form.vanHoa,
      };
      console.log(data);
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/citizen/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tokenCode,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        setShowModal(true);
        setMessage("Tạo thông tin thành công!");
        setForm({
          hoTen: "",
          cccd: "",
          gioiTinh: true,
          ngaySinh: "",
          queQuan: "",
          thuongTru: "",
          tamTru: "",
          tonGiao: "",
          vanHoa: null,
          ngheNghiep: "",
        });
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setMessage("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
    setLoading(false);
  };

  return (
    <div className="insert">
      <div className="title">
        <h3>Nhập thông tin người dân</h3>
      </div>
      <div className="content">
        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Họ và tên:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={form.hoTen}
                onChange={(event) => handleChange(event, 1)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGrid">
              <Form.Label>Ngày sinh:</Form.Label>
              <Form.Control
                type="date"
                placeholder="Chọn ngày sinh"
                max={today}
                value={form.ngaySinh}
                onChange={(event) => handleChange(event, 2)}
              />
            </Form.Group>

            <Row as={Col}>
              <Form.Label>Giới tính:</Form.Label>
              <Form.Group as={Col} className="mb-3" id="formGridMale">
                <Form.Check
                  type="radio"
                  label="Nam"
                  defaultChecked={form.gioiTinh}
                  value={form.gioiTinh}
                  name="sex"
                  onClick={(e) => {
                    setForm({ ...form, gioiTinh: e.target.checked });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" id="formGridFemale">
                <Form.Check
                  type="radio"
                  label="Nữ"
                  name="sex"
                  defaultChecked={!form.gioiTinh}
                  value={form.gioiTinh}
                  onClick={(e) => {
                    setForm({ ...form, gioiTinh: !e.target.checked });
                  }}
                />
              </Form.Group>
            </Row>
          </Row>

          <Form.Group className="mb-3" controlId="formGridID">
            <Form.Label>Số CMND/CCCD:</Form.Label>
            <Form.Control
              placeholder="Nhập số CMND/CCCD (nếu có)"
              value={form.cccd}
              onChange={(event) => handleChange(event, 3)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPlace">
            <Form.Label>Quê quán</Form.Label>
            <Form.Control
              placeholder="Nhập quê quán"
              value={form.queQuan}
              onChange={(event) => handleChange(event, 4)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Địa chỉ thường trú</Form.Label>
            <Form.Control
              placeholder="Nhập địa chỉ thường trú"
              value={form.thuongTru}
              onChange={(event) => handleChange(event, 5)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Địa chỉ tạm trú</Form.Label>
            <Form.Control
              placeholder="Nhập địa chỉ tạm trú"
              value={form.tamTru}
              onChange={(event) => handleChange(event, 6)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPlace">
              <Form.Label>Tôn giáo:</Form.Label>
              <Form.Control
                placeholder="Nhập tôn giáo"
                value={form.tonGiao}
                onChange={(event) => handleChange(event, 7)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Trình độ văn hóa:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={form.vanHoa}
                onChange={handleSelected}
              >
                <option>Chọn</option>
                <option value="Tiểu học">Tiểu học</option>
                <option value="Trung học cơ sở">Trung học cơ sở</option>
                <option value="Trung học phổ thông">Trung học phổ thông</option>
                <option value="Cao đẳng/Đại học">Cao đẳng/Đại học</option>
                <option value="Khác">Khác</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Nghề nghiệp:</Form.Label>
              <Form.Control
                placeholder="Nhập nghề nghiệp"
                value={form.ngheNghiep}
                onChange={(event) => handleChange(event, 8)}
              />
            </Form.Group>
          </Row>

          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text">{message}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>

          {error ? (
            <Form.Group className="mb-3">
              <Form.Text className="text-danger">{error}</Form.Text>
            </Form.Group>
          ) : null}

          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Button
              variant="primary"
              type={success ? "submit" : null}
              onClick={handleSubmit}
            >
              Gửi
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default InsertInformation;
