import React from "react";
import styled from "styled-components";
import { mediaSize } from "../../../utils/siteTools";

import PageHeader from "../dashboard/components/PageHeader/PageHeaderComponent";
import LoginSignupFormsComponent from "./components/LoginSignupForm/LoginSignupFormsComponent";
import WavesComponent from "./components/Waves/WavesComponent";

const ViewContainer = styled.div`
  height: 100vh;
  padding: 5vh 10vw;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaSize.phone`
    height: 100vh;
  `}
`;

const LoginSignupViewComponent = ({
  logIn,
  signUp,
  getNewDashboardGreeting,
  validationSchemas,
  errorTable
}) => (
  <ViewContainer>
    <PageHeader
      logoClickHandler={() => window.open("https://www.dugut.app", "_self")}
    />
    <LoginSignupFormsComponent
      logIn={logIn}
      signUp={signUp}
      getNewDashboardGreeting={getNewDashboardGreeting}
      validationSchemas={validationSchemas}
      errorTable={errorTable}
    />
    <WavesComponent />
  </ViewContainer>
);

export default LoginSignupViewComponent;
