import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./progresspage.scss";

const ProgressPage = () => {
  let arr = [
    {
      id: 1,
      unit: "Thành phố Hà Nội",
      progress: "18/30",
    },
    {
      id: 2,
      unit: "Thành phố Hải Phòng",
      progress: "21/30",
    },
    {
      id: 3,
      unit: "Thành phố Đầ Nẵng",
      progress: "25/28",
    },
    {
      id: 4,
      unit: "Thành phố Hà Hồ Chí Minh",
      progress: "24/24",
    },
    {
      id: 5,
      unit: "Thành phố Cần Thơ",
      progress: "17/21",
    },
    {
      id: 6,
      unit: "Tỉnh Nam Định",
      progress: "26/29",
    },
  ];

  const [listAcc, setListAcc] = useState(arr);

  return (
    <div className="progress_div">
      <div className="title">
        <h3>Tiến độ khảo sát</h3>
      </div>
      <div className="content">
        {listAcc.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Đơn vị</th>
                <th>Tiến độ</th>
              </tr>
            </thead>
            <tbody>
              {listAcc.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.unit}</td>
                  <td>{item.progress}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          "Không có tài khoản nào được tạo"
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
