import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import StatusService from "../../services/StatusService";

class CreateStatusComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      namestatus: '',
      }

    //Handlers
    this.changeNameStatusHandler = this.changeNameStatusHandler.bind(this);

    //void
    this.saveStatus = this.saveStatus.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    }//void Save Status
  saveStatus = (e) => {
    e.preventDefault();
    let statusjson = {
      namestatus: this.state.namestatus,
    };
    console.log("statusjson => " + JSON.stringify(statusjson));

    StatusService.createStatus(statusjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/status");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeNameStatusHandler = (event) => {
    this.setState({ namestatus: event.target.value });
  };

  cancel() {
    this.props.history.push("/status");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название статуса: </label>
                    <input
                      placeholder="Название статуса"
                      name="namestatus"
                      className="form-control"
                      value={this.state.namestatus}
                      onChange={this.changeNameStatusHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.saveStatus}>
                    <i class="fa-solid fa-floppy-disk"></i> Сохранить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fa-solid fa-xmark"></i> Закрыть
                  </button>
                </form>  <br></br>
                {this.state.errors && (
                  <div>
                    <Alert variant="danger">
                      <Alert.Heading>
                        Ошибка при добавлении элемента.
                      </Alert.Heading>
                      {Object.keys(this.state.errors).map((key) => (
                        <p>{this.state.errors[key]}</p>
                      ))}
                    </Alert>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStatusComponent;