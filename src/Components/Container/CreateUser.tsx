import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import "./table.css";

interface IProps {
  user: any;
  setData: any;
  editData: any;
  deleteData: any;
}

const CreateUser: React.FC<IProps> = ({
  user,
  setData,
  editData,
  deleteData,
}) => {
  const [open, setOpen] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState<any>("");
  const [userId, setUserId] = useState<any>("");
  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    mobile: string;
    uniqueEmail: string;
  }>({
    name: "",
    email: "",
    mobile: "",
    uniqueEmail: "",
  });

  const handleReset = () => {
    setEmail("");
    setName("");
    setMobile("");
    setUserId("");
  };

  const handleOpen = (val: any) => {
    setOpen(val);
  };

  const handleClose = () => {
    setOpen(null);
    handleReset();
  };

  const handleSubmit = () => {
    const userId = Math.random();
    const emailList: string[] = [];
    user.userData.map((r: any) => emailList.push(r.email));

    const payload = {
      name,
      email,
      mobile,
      userId,
    };
    let errors = {
      name: "",
      email: "",
      mobile: "",
      uniqueEmail: "",
    };
    if (emailList.includes(email)) {
      errors.uniqueEmail = "Email must be unique";
    }
    if (!email) {
      errors.email = "Email is Required";
    }

    if (!name) {
      errors.name = "Name is Required";
    }
    if (!mobile) {
      errors.mobile = "Mobile number is Required";
    }

    setErrors(errors);

    if (name)
      if (mobile)
        if (email)
          if (!errors.uniqueEmail) {
            setData(payload);
            handleClose();
          }
  };

  const handleEdit = () => {
    const payload = {
      name,
      email,
      mobile,
      userId,
    };
    const emailList: string[] = [];
    user.userData.map((r: any) => emailList.push(r.email));

    let errors = {
      name: "",
      email: "",
      mobile: "",
      uniqueEmail: "",
    };

    if (emailList.includes(email)) {
      errors.uniqueEmail = "Email must be unique";
    }
    if (!email) {
      errors.email = "Email is Required";
    }
    if (!name) {
      errors.name = "Name is Required";
    }
    if (!mobile) {
      errors.mobile = "Mobile number is Required";
    }
    setErrors(errors);

    if (email)
      if (name)
        if (mobile)
          if (!errors.uniqueEmail) {
            editData(payload);
            handleClose();
          }
  };

  const updateData = (id: string) => {
    const data = user.userData.find((r: any) => r.userId === id);
    setOpen(id);
    setEmail(data.email);
    setName(data.name);
    setMobile(data.mobile);
    setUserId(data.userId);
  };

  const handleDelete = (id: number) => {
    deleteData(id);
  };

  const tableColumns = [
    {
      accessor: "name",
      Header: "Name",
      Cell: (props: any) => <div className="center">{props.value}</div>,
    },
    {
      accessor: "email",
      Header: "Email",
      Cell: (props: any) => <div className="center">{props.value}</div>,
    },
    {
      accessor: "mobile",
      Header: "Mobile",
      Cell: (props: any) => <div className="center">{props.value}</div>,
    },
    {
      accessor: "userId",
      Header: "Action",
      Cell: (props: any) => (
        <div className="center">
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateData(props.value)}
          >
            Edit
          </Button>
          <Button variant="contained" onClick={() => handleDelete(props.value)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen(true)}
      >
        Add New User
      </Button>
      <br />
      <br />
      <ReactTable
        data={user.userData}
        columns={tableColumns}
        pageSize={user.userData.length}
        showPagination={false}
      />

      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
              setErrors({ ...errors, uniqueEmail: "" });
            }}
          />
          {errors.email && !email && (
            <div className="error">{errors.email} </div>
          )}
          {errors.uniqueEmail && (
            <div className="error">{errors.uniqueEmail} </div>
          )}
          <br />
          <br />
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          {errors.name && !name && <div className="error">{errors.name} </div>}
          <br />
          <br />
          <TextField
            label="Mobile"
            fullWidth
            type="number"
            variant="outlined"
            value={mobile}
            onChange={(e: any) => setMobile(e.target.value)}
          />
          {errors.mobile && !mobile && (
            <div className="error">{errors.mobile} </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={userId ? () => handleEdit() : () => handleSubmit()}
          >
            Submit
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateUser;
