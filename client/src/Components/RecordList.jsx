import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector, useDispatch } from "react-redux";
import { privateRequest } from "../utils/useFetch";
import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
        


export default function RecordList() {
  const [checked, setChecked] = useState([]);
  const [values, setValues] = useState([0, 1, 2, 3]);
  const user = useSelector((state) => state.user);
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const makeRequest = privateRequest(user.accessToken, user.refreshToken);
  console.log(makeRequest);

  const fetchRecords = async () => {
    try {
      const res = await makeRequest.get("/reservation/details");
      console.log(res.data);
      setRecords(res.data.reservations);
    } catch (err) {
      // toast(err.response.data);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const dispatch = useDispatch();
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    if (value === "#") {
      if (currentIndex === -1) {
        setChecked([...values, "#"]);
      } else {
        setChecked([]);
      }

      return;
    }

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className=" flex p-5 px-0 w-full">
      <List
        sx={{ width: "100%", padding: "0px" }}
        className="bg-gray-50 rounded-md overflow-hidden"
      >
        <ListItem
          className=" bg-[#365899] text-white"
          key="#"
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              {/* <CommentIcon /> */}
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense sx={{ paddingY: "10px" }}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf("#") !== -1}
                onClick={handleToggle("#")}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": "checkbox-list-label-header" }}
              />
            </ListItemIcon>
            <ListItemText
              id="checkbox-list-label-header"
              className=" text-wrap w-12"
              sx={{ overflow: "hidden" }}
              primary="Name"
            />
            <ListItemText
              id="checkbox-list-label-header"
              className=" text-wrap w-8 text-center"
              primary="Number of Guests"
            />
            <ListItemText
              id="checkbox-list-label-header"
              className=" text-wrap w-8 text-center"
              primary="Number of Rooms"
            />
            <ListItemText
              id="checkbox-list-label-header"
              className=" text-wrap w-10 text-center"
              primary="Category"
            />
            <ListItemText
              id="checkbox-list-label-header"
              className="w-20 text-center"
              primary="Arrival Date"
            />
            <ListItemText
              id="checkbox-list-label-header"
              className="w-20 text-center"
              primary="Departure Date"
            />
            <ListItemText
              id="checkbox-list-label-header"
              className="w-20 text-center"
              primary="Room Type"
            />
            {user.role === "ADMIN" ? (
              <ListItemText
                id="checkbox-list-label-header"
                className="w-10"
                primary="Status"
              />
            ) : null}
          </ListItemButton>
        </ListItem>

        {records.map((record) => {
          const labelId = `checkbox-list-label-${record._id}`;

          return (
            <ListItem
              key={record._id}
              className="border-b"
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <InsertDriveFileIcon color="black"/>
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                className=""
                sx={{ paddingY: "10px" }}
                role={undefined}
                onClick={() => navigate(`/${record._id}`)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(record._id) !== -1}
                    tabIndex={-1}
                    onClick={handleToggle(record._id)}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>

                <ListItemText
                  id="checkbox-list-label-header"
                  className=" text-wrap w-12"
                  sx={{ overflow: "hidden" }}
                  primary={record.guestName}
                />
                <ListItemText
                  id="checkbox-list-label-header"
                  className=" text-wrap w-10 text-center"
                  primary={record.numberOfGuests}
                />
                <ListItemText
                  id="checkbox-list-label-header"
                  className=" text-wrap w-10 text-center"
                  primary={record.numberOfRooms}
                />
                <ListItemText
                  id="checkbox-list-label-header"
                  className=" text-wrap w-10"
                  primary={record.category}
                />
                <ListItemText
                  id="checkbox-list-label-header"
                  className="w-20 text-center"
                  primary={new Date(record.arrivalDate).toLocaleDateString()}
                />
                <ListItemText
                  id="checkbox-list-label-header"
                  className="w-20 text-center"
                  primary={new Date(record.departureDate).toLocaleDateString()}
                />
                <ListItemText
                  id="checkbox-list-label-header"
                  className="w-20 text-center"
                  primary={record.roomType}
                />
                {user.role === "ADMIN" ? (
                  <ListItemText
                    id="checkbox-list-label-header"
                    className="w-10"
                    primary={record.status}
                  />
                ) : null}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
