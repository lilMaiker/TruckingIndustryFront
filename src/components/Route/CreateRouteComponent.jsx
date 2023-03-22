import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import RouteService from "../../services/RouteService";
import Select from "react-select";
import BidService from "../../services/BidService";

class CreateRouteComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsBid: [],
      oIdBid: "",
      oNameBid: "",


id: this.props.match.params.id, errors: null,
      pointa: '',
      pointb: '',
      }

    //Handlers
    this.changePointAHandler = this.changePointAHandler.bind(this);
    this.changePointBHandler = this.changePointBHandler.bind(this);

    //void
    this.saveRoute = this.saveRoute.bind(this);
  }

  //#region Handlers For Select

  handleChangeBid(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdBid: e.value, oNameBid: e.label });
  }

  //#endregion

  componentDidMount() {
    //Bid
    BidService.getBid().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.id,
      }));
      this.setState({ selectOptionsBid: options });
    });

    }//void Save Route
  saveRoute = (e) => {
    e.preventDefault();
    let routejson = {
        pointA: this.state.pointa,
        pointB: this.state.pointb,
        bidsId: this.state.oIdBid,
    };
    console.log("routejson => " + JSON.stringify(routejson));

    RouteService.createRoute(routejson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/route");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changePointAHandler = (event) => {
    this.setState({ pointa: event.target.value });
  };

  changePointBHandler = (event) => {
    this.setState({ pointb: event.target.value });
  };

  cancel() {
    this.props.history.push("/route");
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
                    <label> Пункт А: </label>
                    <input
                      placeholder="Пункт А"
                      name="pointa"
                      className="form-control"
                      value={this.state.pointa}
                      onChange={this.changePointAHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Пункт Б: </label>
                    <input
                      placeholder="Пункт Б"
                      name="pointb"
                      className="form-control"
                      value={this.state.pointb}
                      onChange={this.changePointBHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите заявку:
                      <Select
                        placeholder={<div>Выберите заявку</div>}
                        options={this.state.selectOptionsBid}
                        onChange={this.handleChangeBid.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.saveRoute}>
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

export default CreateRouteComponent;