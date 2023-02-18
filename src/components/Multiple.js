import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import decenterland from "../assets/decenterland.png";
import snap from "../assets/snap.png";
import snapar from "../assets/snapar.png";
import zepeto from "../assets/zepeto.png";
import clonex from "../assets/clonex.png";
function Multiple() {
  const [csv, setCsv] = useState(null);
  const [platform, setPlatform] = useState([]);

  useEffect(() => {
    setPlatform(platforms);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = platforms.map((user) => {
        return { ...user, isChecked: checked };
      });
      setPlatform(tempUser);
    } else {
      let tempUser = platforms.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setPlatform(tempUser);
    }
  };

  const platforms = [
    { name: "decenterland" },
    { name: "snap" },
    { name: "snapar" },
    { name: "zepeto" },
    { name: "clonex" },
  ];

  let formData = new FormData(); //formdata object
  const handlefilechange = (e) => {
    setCsv(e.target.files[0]);
    formData.append("csv", csv);
    formData.append("name", "ABC"); //append the values with key, value pair
    formData.append("age", 20);
    for (const [key, value] of formData) {
      console.log("»", key, value);
    }
  };

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const data = [
    {
      id: 1,
      image: decenterland,
      name: "Decenterland",
    },
    {
      id: 2,
      image: snap,
      name: "Snap",
    },
    {
      id: 3,
      image: snapar,
      name: "Snap AR",
    },
    {
      id: 4,
      image: zepeto,
      name: "Zepeto",
    },
    {
      id: 5,
      image: clonex,
      name: "CloneX",
    },
  ];

  return (
    <div>
      <Row className="mt-4">
        <Col>
          <h1 className="multiple-label">Name</h1>
          <input
            type="text"
            className="multiple-input"
            placeholder="Asset Name"
          />
        </Col>
        <Col>
          <h1 className="multiple-label">URL Link</h1>
          <input
            type="text"
            className="multiple-input"
            placeholder="URL link of files"
          />
        </Col>
        <Col>
          <h1 className="multiple-label">Manual Upload</h1>
          <label for="file-upload" class="custom-file-upload">
            <span>
              <i class="fa fa-cloud-upload"></i> Upload .csv files
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => handlefilechange(e)}
          />
        </Col>
      </Row>
      <div>
        <h1 className="multiple-label">Choose Platforms</h1>
        <div className="platform-container">
          <Row className="platform-avatar-row">
            {data.map((e, index) => (
              <Col
                className="d-flex flex-column platform-col col-sm-2"
                key={index}
              >
                <img src={e.image} alt="" className="platform-logo" />
                <div className="d-flex mt-2">
                  <div class="round mr-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={e.name}
                      checked={e?.isChecked || false}
                      onChange={handleChange}
                    />
                    {/* <input 
            type="checkbox"
            onChange={handleChange}
            value={e.id}
            selected={platform.includes(e.id)}
            /> */}
                    <label for="checkbox"></label>
                  </div>
                  <span className="platform-text">{e.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Multiple;
