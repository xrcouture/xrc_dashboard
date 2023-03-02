import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./asset.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import Multiple from "../components/Multiple";

const Comment = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [single, setSingle] = useState(false);

  return (
    <div>

      <h1>UPLOAD</h1>

      <div className="asset-header">
        {/* <h1 className="asset-header_text">Upload Files</h1> */}

        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="assest-haeder_drop">
            <span className="text-dropdown">Type of file entry</span>
            <RiArrowDropDownLine className="mr-4" />
          </DropdownToggle>
          <DropdownItem divider />
          <DropdownMenu>
            <DropdownItem onClick={() => setSingle(true)}>Single</DropdownItem>
            <DropdownItem onClick={() => setSingle(false)}>
              Multiple
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </div>
      {/* {single ? (
        <>
          <h1>single</h1>
        </>
      ) : (
        <Multiple />
      )} */}
    </div>
  );
};

export default Comment;
