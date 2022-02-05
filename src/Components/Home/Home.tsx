import React, { useState } from "react";
import { Container, AppBar, Tab, Tabs } from "@material-ui/core";
import CreateUser from "../Container/CreateUser";
import { connect } from "react-redux";
import {
  setData,
  editData,
  deleteData,
  restoreData,
} from "../redux/User/userAction";
import DeleteUserList from "../Container/DeleteUserList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

const Home = (props: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (i: number) => {
    setValue(i);
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Tabs value={value} aria-label="simple tabs example">
          <Tab label="User" onClick={() => handleChange(0)} />
          <Tab label="Delete User" onClick={() => handleChange(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CreateUser
          user={props.user}
          setData={props.setData}
          editData={props.editData}
          deleteData={props.deleteData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeleteUserList restoreData={props.restoreData} user={props.user} />
      </TabPanel>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setData,
  editData,
  deleteData,
  restoreData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
