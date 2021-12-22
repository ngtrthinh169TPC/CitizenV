import React, { useState, useEffect } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
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

  useEffect(() => {
    console.log({ today });
    return () => {};
  }, []);

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

  const handleSubmit = () => {
    setError("");
    console.log({ form });
    if (!form.hoTen) {
      setError("Vui lòng nhập Họ tên");
      return;
    }
    if (!form.ngaySinh) {
      setError("Vui lòng nhập Ngày sinh");
      return;
    }
    if (!form.cccd) {
      setError("Vui lòng nhập số CCCD/CMND");
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
                  type="checkbox"
                  label="Nam"
                  defaultChecked={form.gioiTinh}
                  value={form.gioiTinh}
                  onClick={(e) =>
                    setForm({ ...form, gioiTinh: !form.gioiTinh })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" id="formGridFemale">
                <Form.Check
                  type="checkbox"
                  label="Nữ"
                  defaultChecked={!form.gioiTinh}
                  value={!form.gioiTinh}
                  onClick={(e) =>
                    setForm({ ...form, gioiTinh: !form.gioiTinh })
                  }
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
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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

          {error ? (
            <Form.Group className="mb-3">
              <Form.Text className="text-danger">{error}</Form.Text>
            </Form.Group>
          ) : null}

          <Button
            variant="primary"
            type={success ? "submit" : null}
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default InsertInformation;
