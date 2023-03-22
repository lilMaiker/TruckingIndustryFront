import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from "mdb-react-ui-kit";

function App() {
  return (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", width: "750px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "250px", borderRadius: "10px" }}
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Профиль</MDBCardTitle>
                    <MDBCardText>murka123</MDBCardText>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Код</p>
                        <p className="mb-0">3</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Токен</p>
                        <p className="mb-0">eyJhbGciOiJIUzUxMiJ9 ... mnNfugJ4RYj8LcR9BHFg</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Эл. почта</p>
                        <p className="mb-0">fuhega451@gmail.com</p>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Права</p>
                        <ul>asdasd</ul>
                        <ul>asdasd</ul>
                        <ul>asdasd</ul>
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  );
}

export default App;