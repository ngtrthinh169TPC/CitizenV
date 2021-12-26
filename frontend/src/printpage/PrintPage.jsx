import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./printpage.scss";

const pdfFile = "mau-phieu-thu-thap-thong-tin-dan-cu.pdf";

export default class PrintPage extends Component {
  handlePrint = () => {
    // is getElementById an anti pattern even if I'm not modyfying the DOM?
    const node = document.getElementById("print-file");
    node.contentWindow.focus();
    node.contentWindow.print();
  };

  render() {
    return (
      <div className="print_page">
        <div className="title">
          <h3>In phiếu khảo sát</h3>
        </div>
        <div className="content">
          <object data={pdfFile} type="application/pdf">
            <iframe
              title="pdf document"
              id="print-file"
              src={`https://docs.google.com/viewer?url=${pdfFile}&embedded=true`}
            />
          </object>
        </div>
        <div className="footer">
          {/* <Button variant="primary" onClick={this.handlePrint}>
            Print
          </Button> */}
        </div>
      </div>
    );
  }
}
