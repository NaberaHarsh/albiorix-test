const initialState = {
  userData: [],
  deletedData: [],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_DATA": {
      const { name, email, mobile, userId } = action.payload;
      return {
        ...state,
        userData: [
          ...state.userData,
          {
            name,
            email,
            mobile,
            userId,
          },
        ],
      };
    }
    case "EDIT_DATA": {
      const originalData = state.userData;
      const { name, email, mobile, userId } = action.payload;
      const newData = originalData.map((r: any) =>
        r.userId === action.payload.userId
          ? {
              name,
              email,
              mobile,
              userId,
            }
          : { ...r }
      );
      return {
        ...state,
        userData: newData,
      };
    }
    case "DELETE_DATA": {
      const val = action.payload;
      let index: any = "";
      const gotData = state.userData;
      state.userData.map((ele: any, i: number) =>
        ele.userId === val ? (index = i) : ""
      );
      const deleteData = gotData.splice(index, 1);
      return {
        ...state,
        userData: gotData,
        deletedData: [...state.deletedData, ...deleteData],
      };
    }
    case "RESTORE_DATA": {
      const val = action.payload;
      let index: any = "";
      const gotData = state.deletedData;
      state.deletedData.map((ele: any, i: number) =>
        ele.userId === val ? (index = i) : ""
      );
      const restoreData = gotData.splice(index, 1);
      return {
        ...state,
        deletedData: gotData,
        userData: [...state.userData, ...restoreData],
      };
    }
    default:
      return state;
  }
};

export default userReducer;
