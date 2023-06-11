import React from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";

class ReportDurationTime extends React.Component {
  downloadExcel = () => {
    axios({
      url: 'https://localhost:7094/api/Bids/ReportDurationTime',
      method: 'GET',
      responseType: 'blob', // указываем, что ожидаем данные в виде blob
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  
  render() {
    return (
      <div>
      <br/>
        <button className="btn btn-success" onClick={this.downloadExcel}>
          <i class="fa-solid fa-file-excel"></i> Отчёт по затратам времени на заявки
        </button>
      </div>
    );
  }
}

export default ReportDurationTime;
