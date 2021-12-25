import React, { useState, useEffect, useContext } from "react";
import { Row, Form, Button, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../UserContext";

import "./report.scss";

const Report = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    initName: user.classification + " " + user.name_of_unit,
    success: false,
    annunciator: "",
  });
  const [token, setToken] = useCookies(["account-token"]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnName, setBtnName] = useState("Báo cáo");
  const history = useHistory();

  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const report = async () => {
    setLoading(true);
    let tokenCode = "Token " + token["account-token"];
    try {
      let data = {
        reporter: form.annunciator,
        completed: form.success,
      };

      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/report/",
        {
          method: "POST",
          headers: {
            authorization: tokenCode,
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status == 201) {
        setBtnName("Báo cáo thành công!");
        setSuccess(true);
        setTimeout(() => {
          setBtnName("Báo cáo");
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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

            <Form.Group as={Col} className="mb-3 ml-6" id="formGridMale">
              <Form.Label>Tiến độ:</Form.Label>
              <Form.Check
                type="checkbox"
                label="Hoàn thành"
                value={form.success}
                onClick={(e) => {
                  setForm({ ...form, success: e.target.checked });
                }}
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridEmail" className="mb-5">
            <Form.Label>Người báo cáo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên người báo cáo"
              value={form.annunciator}
              onChange={(e) => {
                setForm({ ...form, annunciator: e.target.value });
              }}
            />
          </Form.Group>

          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Button
              variant="primary"
              className={success ? "btn btn-success" : ""}
              onClick={report}
            >
              {btnName}
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Report;
