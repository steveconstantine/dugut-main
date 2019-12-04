import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mediaSize } from "../../../../utils/siteTools";
import LoadingSpinner from "../../../../static/img/loaders/default.svg";
import SiteContext from "../../../../utils/siteContext";
import * as ROUTES from "../../../../utils/siteRoutes";

import Modal from "../ModalComponent";
import Heading from "../../Heading/HeadingComponent";
import SDGTile from "./SDGTileComponent";

import SDG1 from "../../../../static/img/dashboard/sdgs/1.jpg";
import SDG2 from "../../../../static/img/dashboard/sdgs/2.png";
import SDG3 from "../../../../static/img/dashboard/sdgs/3.jpg";
import SDG4 from "../../../../static/img/dashboard/sdgs/4.png";
import SDG5 from "../../../../static/img/dashboard/sdgs/5.png";
import SDG6 from "../../../../static/img/dashboard/sdgs/6.png";
import SDG7 from "../../../../static/img/dashboard/sdgs/7.png";
import SDG8 from "../../../../static/img/dashboard/sdgs/8.png";
import SDG9 from "../../../../static/img/dashboard/sdgs/9.jpg";
import SDG10 from "../../../../static/img/dashboard/sdgs/10.png";
import SDG11 from "../../../../static/img/dashboard/sdgs/11.png";
import SDG12 from "../../../../static/img/dashboard/sdgs/12.png";
import SDG13 from "../../../../static/img/dashboard/sdgs/13.png";
import SDG14 from "../../../../static/img/dashboard/sdgs/14.png";
import SDG15 from "../../../../static/img/dashboard/sdgs/15.png";
import SDG16 from "../../../../static/img/dashboard/sdgs/16.png";
import SDG17 from "../../../../static/img/dashboard/sdgs/17.jpg";

import SDGLogo from "../../../../static/img/misc/sdgs.png";



const SDGTiles = {
  noPoverty: {
    value: 1,
    label: "No Poverty",
    gridArea: "a",
    backgroundImg: SDG1,
    disabled: false
  },
  zeroHunger: {
    value: 2,
    label: "Zero Hunger",
    gridArea: "b",
    backgroundImg: SDG2,
    color: "black",
    disabled: false
  },
  goodHealth: {
    value: 3,
    label: "Good Health & Well-Being",
    gridArea: "c",
    backgroundImg: SDG3
  },
  qualityEducation: {
    value: 4,
    label: "Quality Education",
    gridArea: "d",
    backgroundImg: SDG4
  },
  genderEquality: {
    value: 5,
    label: "Gender Equality",
    gridArea: "e",
    backgroundImg: SDG5,
    backgroundColor: "#e3a368",
    disabled: false
  },
  cleanWater: {
    value: 6,
    label: "Clean Water & Sanitation",
    gridArea: "f",
    backgroundImg: SDG6,
    backgroundColor: "#66ADEF",
    disabled: false
  },
  affordableEnergy: {
    value: 7,
    label: "Affordable & Clean Energy",
    gridArea: "g",
    backgroundImg: SDG7,
    backgroundColor: "#bb7cc1",
    disabled: false
  },
  decentWork: {
    value: 8,
    label: "Decent Work & Economic Growth",
    gridArea: "h",
    backgroundImg: SDG8,
    backgroundColor: "#1ec77a"
  },
  industryInnovation: {
    value: 9,
    label: "Industry, Innovation, & Infrastructure",
    gridArea: "i",
    backgroundImg: SDG9,
    backgroundColor: "#e9c24b",
    disabled: false
  },
  reducedInequalities: {
    value: 10,
    label: "Reduced Inequalities",
    gridArea: "j",
    backgroundImg: SDG10,
    disabled: false
  },
  sustainableCities: {
    value: 11,
    label: "Sustainable Cities & Communities",
    gridArea: "k",
    backgroundImg: SDG11,
    disabled: false
  },
  responsibleConsumption: {
    value: 12,
    label: "Responsible Consumption & Production",
    gridArea: "l",
    backgroundImg: SDG12,
    disabled: false
  },
  climateAction: {
    value: 13,
    label: "Climate Action",
    gridArea: "m",
    backgroundImg: SDG13,
    disabled: false
  },
  lifeBelowWater: {
    value: 14,
    label: "Life Below Water",
    gridArea: "n",
    backgroundImg: SDG14,
    disabled: false
  },
  lifeOnLand: {
    value: 15,
    label: "Life On Land",
    gridArea: "o",
    backgroundImg: SDG15,
    disabled: false
  },
  peaceJustice: {
    value: 16,
    label: "Peace, Justice, and Strong Institutions",
    gridArea: "p",
    backgroundImg: SDG16,
    disabled: false
  },
  partnerships: {
    value: 17,
    label: "Partnerships",
    gridArea: "q",
    backgroundImg: SDG17,
    disabled: false
  }
};


const userGoals = {
  HACKER: [
    SDGTiles.noPoverty,
    SDGTiles.zeroHunger,
    SDGTiles.goodHealth,
    SDGTiles.qualityEducation,
    SDGTiles.genderEquality,
    SDGTiles.cleanWater,
    SDGTiles.affordableEnergy,
    SDGTiles.decentWork,
    SDGTiles.industryInnovation,
    SDGTiles.reducedInequalities,
    SDGTiles.sustainableCities,
    SDGTiles.responsibleConsumption,
    SDGTiles.climateAction,
    SDGTiles.lifeBelowWater,
    SDGTiles.lifeOnLand,
    SDGTiles.peaceJustice,
    SDGTiles.partnerships
  ]
};

const ProfileModal = styled(Modal)`
  width: 80vw;
  height: 40vw;
  padding: 5vw;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  border-radius: ${props => props.theme.app.border.radius};

  ${mediaSize.tablet`
    width: 75vw;
    height: 85vw;
    padding: 6vw 5vw;
  `};

  ${mediaSize.phone`
    width: 90vw;
    height: 120vw;
    padding: 5vw;
  `};
`;

const Profile = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "label info";

  ${mediaSize.tablet`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      "label"
      "info";
  `};

  ${mediaSize.phone`
  `};
`;

const TilesContainer = styled.div`
  grid-area: tiles;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-areas:
  "a b c d"
  "e f g h"
  "i j k l"
  "m n o p"
  "q r s t";

  &::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  }

  grid-gap: 1.5em;
  grid-auto-flow: dense;

  ${mediaSize.desktop`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-areas:
  "a b c"
  "d e f"
  "g h i"
  "j k l"
  "m n o"
  "p q r";
  grid-gap: 1.5em;
  grid-auto-flow: dense;
  `};

  ${mediaSize.tablet`
    grid-auto-rows: 1fr;
    grid-gap: 1em;
    grid-template-areas:
    "a b"
    "c d"
    "e f"
    "g h"
    "i j"
    "k l"
    "m n"
    "o p"
    "q r";
  `};

  ${mediaSize.phone`
    grid-auto-rows: 1fr;
    grid-gap: 1em;
    grid-template-areas:
    "a b"
    "c d"
    "e f"
    "g h"
    "i j"
    "k l"
    "m n"
    "o p"
    "q r";
    margin-bottom: 2em;
  `};
`;


const Info = styled.div`
  grid-area: info;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoField = styled.div`
  grid-area: ${props => props.gridarea};

  & .infoFieldLabel {
    color: #d6d6d6;
    font-size: 0.8em;
    font-weight: 600;
  }

  & .infoFieldValue {
    border: none;
    outline: none;
    background: none;
    box-shadow: none;

    color: white;
    font-size: 2em;
    font-weight: 500;

    ${mediaSize.phone`
      font-size: 1.5em;
    `};
  }
`;

const CentredHeading = styled(Heading)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SDGImg = styled.img`
  text-align: center;
  margin: 20px auto;
  max-width: 85%;
`;

const ChangePasswordLabel = styled.div`
  display: inline-block;
  margin-bottom: 4vw;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const Loading = styled.div`
  width: 50%;
  height: 50%;
  margin: auto;
  background: center / contain no-repeat url(${LoadingSpinner});
`;

export default ({
  curUser,
  someUser,
  history,
  prevLoc,
  isCurUser,
  curUserName,
  updateAppInfo,
  submitAppInfo,
  appState,
  curAppInfo
}) => {
  const { state: { firebase } } = useContext(SiteContext);

  const [profileLoaded, setProfileLoaded] = useState(
    isCurUser ? curUser !== undefined && appState == "FETCHED" : someUser !== undefined
  );
  const [profileInfo, updateProfileInfo] = useState(
    isCurUser ? curUser : someUser
  );
  const [passwordFieldLabel, updatePasswordFieldLabel] = useState("CHANGE / RESET PASSWORD");

  useEffect(() => {
    const nowLoaded = isCurUser
      ? curUser !== undefined
      : someUser !== undefined;
    if (!profileLoaded && nowLoaded) {
      updateProfileInfo(isCurUser ? curUser : someUser);
      setProfileLoaded(true);
    }
  });
  
  return (
    <ProfileModal
      backgroundColor="#FAFAFA"
      handleClickOutside={() => submitAppInfo(curAppInfo.value, curAppInfo.label)}
      onClickCloseHandler={() => submitAppInfo(curAppInfo.value, curAppInfo.label)}
    >
      {profileLoaded ? (
      <>
        <CentredHeading size="big" color="black">
          Choose an SDG to Support
        </CentredHeading>
        <SDGImg src={SDGLogo} />
          <TilesContainer>
            {curUser && userGoals[curUser.role] &&
            userGoals[curUser.role].map(SDGInfo => (
                <SDGTile updateAppInfo={(data) => updateAppInfo(data)} submitAppInfo={(value, name) => submitAppInfo(value, name)} key={SDGInfo.label} {...SDGInfo} />
              ))}
          </TilesContainer>
      </>
      ) : (
        <Loading />
      )}
    </ProfileModal>
  );
};
