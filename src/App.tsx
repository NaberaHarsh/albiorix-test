import React from "react";
import { Provider } from "react-redux";
import Home from "./Components/Home/Home";
import store from "./Components/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
