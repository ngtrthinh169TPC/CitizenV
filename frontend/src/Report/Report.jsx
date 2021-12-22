import React, { useState } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";

import "./report.scss";

const Report = () => {
  const [donvi, setDonvi] = useState("Bộ");
  const [maxInit, setMaxInit] = useState(20);
  const [minInit, setMinInit] = useState(0);
  const [form, setForm] = useState({
    initName: donvi,
    qualtity: 0,
    max: 20,
    success: false,
    annunciator: "",
  });

  return (
    <div className="report">
      <div className="title">
        <h3>Báo cáo tiến độ</h3>
      </div>

      <div className="content">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Đơn vị:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={form.initName}
                disabled={true}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" id="formGridMale">
              <Form.Label>Tiến độ:</Form.Label>
              <Form.Check
                type="checkbox"
                label="Hoàn thành"
                value={form.success}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridNumber">
              <Form.Label>Số lượng:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập tổng số đơn vị đã hoàn thành khảo sát"
                max={form.max}
                min={minInit}
                value={form.qualtity}
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridEmail" className="mb-5">
            <Form.Label>Người báo cáo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên người báo cáo"
              value={form.annunciator}
              // disabled={true}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Report;
