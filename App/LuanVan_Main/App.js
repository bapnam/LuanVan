import React, { useEffect } from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./src/redux/store";

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
