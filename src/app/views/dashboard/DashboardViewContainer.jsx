import React, { useContext, useEffect, useRef, useState } from "react";
import { useDocument } from 'react-firebase-hooks/firestore';
import { compose } from "recompose";
import SiteContext, { connectSiteContext } from "../../../utils/siteContext";
import { accessIfAuthenticated } from "../../../utils/siteAuth";
import * as ROUTES from "../../../utils/siteRoutes";
import { withExceptionHandler } from "../../../utils/setupErrHandling";

import DashboardViewComponent from "./DashboardViewComponent";

import MapTileBG from "../../../static/img/dashboard/tiles/map.png";
import CalendarTileBG from "../../../static/img/dashboard/tiles/schedule.png";
import ApplicationTileBG from "../../../static/img/dashboard/tiles/application.png";
import HelpTileBG from "../../../static/img/dashboard/tiles/help.png";

import SDG1 from "../../../static/img/dashboard/sdgs/1.jpg";
import SDG2 from "../../../static/img/dashboard/sdgs/2.png";
import SDG3 from "../../../static/img/dashboard/sdgs/3.jpg";
import SDG4 from "../../../static/img/dashboard/sdgs/4.png";
import SDG5 from "../../../static/img/dashboard/sdgs/5.png";
import SDG6 from "../../../static/img/dashboard/sdgs/6.png";
import SDG7 from "../../../static/img/dashboard/sdgs/7.png";
import SDG8 from "../../../static/img/dashboard/sdgs/8.png";
import SDG9 from "../../../static/img/dashboard/sdgs/9.jpg";
import SDG10 from "../../../static/img/dashboard/sdgs/10.png";
import SDG11 from "../../../static/img/dashboard/sdgs/11.png";
import SDG12 from "../../../static/img/dashboard/sdgs/12.png";
import SDG13 from "../../../static/img/dashboard/sdgs/13.png";
import SDG14 from "../../../static/img/dashboard/sdgs/14.png";
import SDG15 from "../../../static/img/dashboard/sdgs/15.png";
import SDG16 from "../../../static/img/dashboard/sdgs/16.png";
import SDG17 from "../../../static/img/dashboard/sdgs/17.jpg";

import SDGLogo from "../../../static/img/misc/sdgs.png";

const SDGBG = {
  0: null,
  1: SDG1,
  2: SDG2,
  3: SDG3,
  4: SDG4,
  5: SDG5,
  6: SDG6,
  7: SDG7,
  8: SDG8,
  9: SDG9,
  10: SDG10,
  11: SDG11,
  12: SDG12,
  13: SDG13,
  14: SDG14,
  15: SDG15,
  16: SDG16,
  17: SDG17
}

const fetchSDG = firebase =>
  () => firebase.firestore.collection('SDGs').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid);

const createSDG = firebase =>
  () => firebase.firestore.collection('SDGs').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid).set({ sdg: { value: 0, label: 'none' } });

const dashboardTiles = {
  schedule: {
    label: "Event Schedule",
    linkTo: ROUTES.SCHEDULE,
    gridArea: "leftTop",
    backgroundImg: CalendarTileBG,
    disabled: true
  },
  map: {
    label: "",
    linkTo: ROUTES.SDG,
    gridArea: "leftBot",
    backgroundImg: null,
    color: "white",
    disabled: false
  },
  application: {
    label: "My Application",
    linkTo: ROUTES.APPLICATION,
    gridArea: "centerTop",
    backgroundImg: ApplicationTileBG
  },
  rsvp: {
    label: "Application Status",
    linkTo: ROUTES.APP_STATUS,
    gridArea: "centerTop",
    backgroundImg: ApplicationTileBG
  },
  app_review: {
    label: "Application Review",
    linkTo: ROUTES.APP_REVIEW,
    gridArea: "centerTop",
    backgroundColor: "#e3a368",
    disabled: true
  },
  attendee_list_volunteer: {
    label: "Check In Tool",
    linkTo: ROUTES.ATTENDEE_LIST_VOLUNTEER,
    gridArea: "rightTop",
    backgroundColor: "#66ADEF",
    disabled: true
  },
  attendee_list_organizer: {
    label: "Attendee List",
    linkTo: ROUTES.ATTENDEE_LIST_ORGANIZER,
    gridArea: "rightTop",
    backgroundColor: "#bb7cc1",
    disabled: true
  },
  profile: {
    label: "My Profile",
    linkTo: ROUTES.PROFILE,
    gridArea: "rightBot",
    backgroundColor: "#1ec77a"
  },
  judging_tool: {
    label: "Judging Tool",
    linkTo: ROUTES.JUDGING_TOOL,
    gridArea: "centerTop",
    backgroundColor: "#e9c24b",
    disabled: true
  },
  help: {
    label: "Info & Help",
    linkTo: ROUTES.HELP,
    gridArea: "rightTop",
    backgroundImg: HelpTileBG,
    disabled: true
  }
};

const userDashboards = {
  HACKER: [
    dashboardTiles.application,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.help,
    dashboardTiles.profile
  ],
  ORGANIZER: [
    dashboardTiles.app_review,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.attendee_list_organizer,
    dashboardTiles.profile
  ],
  VOLUNTEER: [
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.help,
    dashboardTiles.profile
  ],
  JUDGE: [
    dashboardTiles.judging_tool,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.help,
    dashboardTiles.profile
  ],
  GENERAL: [
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.help,
    dashboardTiles.profile
  ]
};

const mapContextStateToProps = ({ state: { firebase, dashboardInfo } }) => ({
  logOut: firebase.signOutUser,
  greetingInfo: dashboardInfo.greetingInfo,
  toastInfo: dashboardInfo.toastInfo,
  fetchAppFirestore: fetchSDG(firebase),
  createAppFirestore: createSDG(firebase)
});

const enhance = compose(
  withExceptionHandler,
  accessIfAuthenticated,
  connectSiteContext(mapContextStateToProps)
);

export default enhance(({ curUser, fetchAppFirestore, createAppFirestore, ...props }) => {
  const { dispatch } = useContext(SiteContext);
  const { value } = useDocument(fetchAppFirestore());
  const [ appState, updateAppState ] = useState("FETCHING");
  const [ localAppInfo, updateLocalAppInfo ] = useState({ sdg: { value: 0, label: 'none' } });
  const appRef = useRef();
  appRef.current = localAppInfo;

  var currentSDG;

  if(value && value.exists) {
    currentSDG = value.data().sdg;
    if(value.exists && ((appState === "FETCHING") || (value.data().sdg && appState === "SUBMITTING"))) {
      updateAppState("FETCHED");
      // dispatch({ type: "UPDATE_SDG", data: { value: value.data().sdg.value, label: value.data().sdg.name } });
    } else if(!value.exists && (appState === "FETCHING")) {
      createAppFirestore();
      console.log('sdg created as 0')
      updateAppState("FETCHED");
    }
  } else {
    currentSDG = { value: 0, label: 'none' };
  }

  if (curUser && curUser.role === "HACKER" && curUser.submitted) {
    userDashboards.HACKER.shift(); // remove application tile
    userDashboards.HACKER.unshift(dashboardTiles.rsvp); // add rsvp tile
  }

  console.log(currentSDG);
  console.log(SDGBG[currentSDG.value]);

  return (
    <DashboardViewComponent
      curUser={curUser}
      userDashboards={userDashboards}
      SDGBG={SDGBG[currentSDG.value]}
      {...props}
    />
  );
});
