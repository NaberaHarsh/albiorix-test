import React from "react";
import { Button } from "@material-ui/core";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

interface IProps {
  user: any;
  restoreData: any;
}

const DeleteUserList: React.FC<IProps> = ({ user, restoreData }) => {
  const handleRestore = (id: number) => {
    restoreData(id);
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
            variant="contained"
            color="primary"
            onClick={() => handleRestore(props.value)}
          >
            Restore
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <br />
      <br />
      <ReactTable
        data={user.deletedData}
        columns={tableColumns}
        pageSize={user.deletedData.length}
        showPagination={false}
      />
    </div>
  );
};

export default DeleteUserList;
