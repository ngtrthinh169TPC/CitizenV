import React, { useState, useEffect, useRef, useContext } from "react";
import { Table, Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import "./managepage.scss";
import ModalEdit from "../components/modals/ModalEdit";
import { UserContext } from "../UserContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const ManagePage = () => {
  const [token, setToken] = useCookies(["account-token"]);
  const [editPermistion, setEditPermistion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listAcc, setListAcc] = useState([]);
  const [createdForm, setCreatedForm] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
    classification: "",
    permission: false,
    username: "",
  });
  // const { user } = useContext(UserContext);
  const [loadPage, setLoadPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const preListAcc = [...listAcc];
  const [error, setError] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const modal = useRef();
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    setCreatedForm({
      name: "",
      id: "",
      password: "",
      classification: "",
      confirmPassword: "",
      permission: false,
      username: "",
    });
  };
  const history = useHistory();

  useEffect(() => {
    if (!token["account-token"]) {
      history.push("/login");
    }
  }, [token, history]);

  const onChangeTextForm = (value, index) => {
    switch (index) {
      case 0:
        setCreatedForm({ ...createdForm, classification: value });
        break;
      case 1:
        if (value.length > 2) {
          return;
        }
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
      case 6:
        setCreatedForm({ ...createdForm, username: value });
        break;
      default:
        return;
    }
  };

  const getListAcc = async () => {
    setLoadPage(true);
    let tokenCode = "Token " + token["account-token"];
    try {
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/children/",
        {
          method: "GET",
          headers: {
            authorization: tokenCode,
          },
          body: null,
        }
      );

      if (response.status == 200 || response.status == 201) {
        let resJson = await response.json();
        console.log({ resJson });
        setListAcc(resJson);
      } else {
        setError("???? c?? l???i x???y ra, vui l??ng th??? l???i!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoadPage(false);
  };

  const openPermistion = async () => {
    if (editPermistion) {
      return;
    }
    setEditPermistion(true);
  };

  const closePermistion = () => {
    setListAcc(preListAcc);
    setEditPermistion(false);
  };

  const createNewAcc = async () => {
    setError("");
    console.log({ createdForm });
    if (!createdForm.classification) {
      setError("Vui l??ng c???p b???c c???a ????n v??? mu???n t???o!");
      return;
    }

    if (!createdForm.name) {
      setError("Vui l??ng nh???p t??n ????n v???!");
      return;
    }
    if (!createdForm.id) {
      setError("Vui l??ng nh???p ID!");
      return;
    }

    if (createdForm.id.length != 2) {
      setError("ID ch??? g???m 2 ch??? s???!");
    }
    if (!createdForm.username) {
      setError("Vui l??ng nh???p t??n ????ng nh???p!");
      return;
    }
    if (!createdForm.password) {
      setError("Vui l??ng nh???p m???t kh???u!");
      return;
    }
    if (!createdForm.confirmPassword) {
      setError("Vui l??ng x??c nh???n m???t kh???u!");
      return;
    }
    if (createdForm.password !== createdForm.confirmPassword) {
      setError("X??c nh???n m???t kh???u kh??ng ch??nh x??c!");
      return;
    }
    let obj = {
      username: createdForm.username,
      password: createdForm.password,
      account_id: createdForm.id,
      name_of_unit: createdForm.name,
      classification: createdForm.classification,
      entry_permit: createdForm.permission,
    };
    setLoading(true);
    let tokenCode = "Token " + token["account-token"];
    try {
      let responsive = await fetch(
        "https://citizenv-backend-03.herokuapp.com/user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: tokenCode,
          },
          body: JSON.stringify(obj),
        }
      );
      console.log(obj, tokenCode);
      console.log(responsive);
      if (responsive.status == 200 || responsive.status == 201) {
        let resJson = await responsive.json();
        console.log({ resJson });
        await getListAcc();
        setShowModal(false);
      } else {
        setError("???? c?? l???i x???y ra, vui l??ng th??? l???i sau!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const changePermistion = async (item) => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let data = {
        account_id: item.account_id,
        entry_permit: item.entry_permit,
      };

      console.log(JSON.stringify(data));
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/entry/",
        {
          method: "PATCH",
          headers: {
            authorization: tokenCode,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);

      if (
        response.status == 200 ||
        response.status == 201 ||
        response.status == 204
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    modal.current.close();
  };

  const handleOpenModal = (item) => {
    setDataEdit(item);
    console.log({ dataEdit });
    modal.current.refesh(item);
    modal.current.open();
  };

  const handleSave = async (item) => {
    try {
      let tokenCode = "Token " + token["account-token"];
      let data = {
        account_id: item.account_id,
        name_of_unit: item.name_of_unit,
        classification: item.classification,
      };
      let response = await fetch(
        "https://citizenv-backend-03.herokuapp.com/account/children/",
        {
          method: "PATCH",
          headers: {
            authorization: tokenCode,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (
        response.status == 204 ||
        response.status == 201 ||
        response.status == 200
      ) {
        let perJson = await changePermistion(item);
        if (perJson) {
          modal.current.close();
          await getListAcc();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListAcc();
  }, []);

  useEffect(() => {
    return () => {};
  }, [preListAcc]);

  return (
    <>
      {loadPage ? (
        <div className="manage_page loading_div">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="manage_page">
            <div className="top-content">
              <p>T??i kho???n c???p d?????i ???? ???????c c???p</p>
              <div className="top_content_btn">
                <button onClick={openPermistion}>Ch???nh s???a</button>
                <button onClick={handleShow}>C???p m???i</button>
              </div>
            </div>
            <div className="content">
              {listAcc.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>????n v???</th>
                      <th>Id</th>
                      {/* <th>M???t kh???u</th> */}
                      <th>Quy???n kh???o s??t</th>
                      {editPermistion ? <th>Ch???nh s???a</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {listAcc.map((item, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{item.classification + " " + item.name_of_unit}</td>
                        <td>{item.account_id}</td>
                        {/* <td>{item.password}</td> */}
                        <td>
                          <input
                            type="checkbox"
                            // checked={item.permission}
                            value={item.entry_permit}
                            defaultChecked={item.entry_permit}
                            disabled={true}
                          />
                        </td>
                        {editPermistion ? (
                          <td>
                            <Button
                              disabled={!editPermistion}
                              onClick={() => {
                                handleOpenModal(item);
                              }}
                            >
                              <i className="bx bx-edit-alt" />
                            </Button>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="no_content">
                  Kh??ng c?? t??i kho???n n??o ???????c t???o!
                </div>
              )}
            </div>
            {editPermistion ? (
              <div className="bottom_content">
                <div className="btn">
                  <Button variant="primary" onClick={closePermistion}>
                    Ho??n th??nh
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Khai b??o ????n v??? v?? c???p m???i t??i kho???n</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicEmail"
                    as={Col}
                  >
                    <Form.Label>C???p b???c:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nh???p c???p b???c c???a ????n v??? (t???nh, huy???n,...)"
                      value={createdForm.classification}
                      onChange={(e) => onChangeTextForm(e.target.value, 0)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicEmail"
                    as={Col}
                  >
                    <Form.Label>T??n ????n v???:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nh???p t??n ????n v??? mu???n t???o"
                      value={createdForm.name}
                      onChange={(e) => onChangeTextForm(e.target.value, 2)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>ID:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nh???p ID c???a ????n v??? g???m hai ch??? s???"
                    value={createdForm.id}
                    onChange={(e) => onChangeTextForm(e.target.value, 1)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>T??n ????ng nh???p:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nh???p t??n ????ng nh???p"
                    value={createdForm.username}
                    onChange={(e) => onChangeTextForm(e.target.value, 6)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>M???t kh???u:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nh???p m???t kh???u"
                    value={createdForm.password}
                    onChange={(e) => onChangeTextForm(e.target.value, 3)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>X??c nh???n m???t kh???u:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="X??c nh???n m???t kh???u"
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
                    label="C???p ph??p kh???o s??t d??n s???"
                    value={createdForm.permission}
                    onChange={(e) => onChangeTextForm(e.target.checked, 5)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {loading ? (
                <Spinner animation="border" />
              ) : (
                <>
                  <Button variant="secondary" onClick={handleClose}>
                    H???y
                  </Button>
                  <Button variant="primary" onClick={createNewAcc}>
                    T???o m???i
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal>
          <ModalEdit
            ref={modal}
            data={dataEdit}
            handleClose={handleCloseModal}
            handleSave={handleSave}
          />
        </>
      )}
    </>
  );
};

export default ManagePage;
