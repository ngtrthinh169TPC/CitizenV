import React, { useState } from "react";
import "./populationlist.scss";
import { Table, Button } from "react-bootstrap";

const PopulationList = () => {
  let arr = [
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
    {
      id: 1,
      hoTen: "Nguyen Van A",
      ngaySinh: "2/9/1971",
      gioiTinh: "Nam",
      cccd: "123456789789",
      thuongTru: "Ho Tung Mau, Mai Dich, Cau Giay, Ha Noi",
    },
  ];

  const [listAcc, setListAcc] = useState(arr);

  return (
    <div className="population">
      <div className="title">
        <h3>Danh sách dân cư trong địa bàn</h3>
      </div>
      <div className="content">
        {listAcc.length > 0 ? (
          <div className="table-wrapper-scroll my-custom-scrollbar">
            <Table striped bordered hover responsive className="">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Số CMND/CCCD</th>
                  <th>Địa chỉ thường trú</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {listAcc.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.ngaySinh}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{item.cccd}</td>
                    <td>{item.thuongTru}</td>
                    <td>
                      <Button>
                        <i className="bx bx-show" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          "Chưa có thông tin người dân"
        )}
      </div>
    </div>
  );
};

export default PopulationList;
