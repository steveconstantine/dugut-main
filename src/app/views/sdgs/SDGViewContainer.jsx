import React, { useContext, useEffect, useRef, useState } from "react";
import { useDocument } from 'react-firebase-hooks/firestore';
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { accessIfAuthenticated, accessIfRole } from "../../../utils/siteAuth";
import { HOME as ROUTE_DASHBOARD } from "../../../utils/siteRoutes";
import SiteContext, { connectSiteContext } from "../../../utils/siteContext";
import { withPageWrapper } from "../../shared/PageWrapper/PageWrapperComponent";

import SDGModal from "../../shared/Modal/SDGModal/SDGModalComponent";

const fetchSDG = firebase =>
  () => firebase.firestore.collection('SDGs').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid);

const createSDG = firebase =>
  () => firebase.firestore.collection('SDGs').doc(firebase.auth.currentUser && firebase.auth.currentUser.uid).set({ sdg: { value: 0, label: 'none' } });

const updateSDG = firebase => updatedSDG => {
  if(firebase.auth.currentUser)
    firebase.firestore.collection('SDGs').doc(firebase.auth.currentUser.uid)
      .update(updatedSDG);
}

const mapContextStateToProps = ({ state: { firebase } }) => ({
  fetchAppFirestore: fetchSDG(firebase),
  createAppFirestore: createSDG(firebase),
  updateAppFirestore: updateSDG(firebase),
  submitAppFirestore: updateSDG(firebase)
});

const enhance = compose(
  accessIfAuthenticated,
  withRouter,
  connectSiteContext(mapContextStateToProps),
  withProps({
    prevLoc: ROUTE_DASHBOARD,
    isCurUser: true
  })
);

const SDGViewContainer = ({
  curUser,
  fetchAppFirestore,
  createAppFirestore,
  updateAppFirestore,
  submitAppFirestore,
  someUser,
  history,
  prevLoc,
  isCurUser
}) => {

  const { dispatch } = useContext(SiteContext);
  const { value } = useDocument(fetchAppFirestore());
  const [ appState, updateAppState ] = useState("FETCHING");
  const [ localAppInfo, updateLocalAppInfo ] = useState({ value: 0, label: 'none' });
  const appRef = useRef();
  appRef.current = localAppInfo;

  const updateAppInfo = newAppInfo => {
    const newLocalAppInfo = {
      ...localAppInfo,
      ...newAppInfo,
    };

    // updateLocalAppInfo(newLocalAppInfo);
//    if(!newLocalAppInfo.value) dispatch({ type: "UPDATE_DASHBOARD_TOAST", data: { toastName: "appModified" } });
  }

  const submitAppInfo = (value, label) => {
    submitAppFirestore({ sdg: { value: value, label: label } });
    updateAppState("SUBMITTING");
  //   dispatch({ type: "UPDATE_SDG", data: { sdg: { value: value, label: label } } });
    history.replace(prevLoc);
  }

  if(value) {
    if(value.exists && ((appState === "FETCHING") || (value.data().sdg && appState === "SUBMITTING"))) {
      updateAppState("FETCHED");
      // updateLocalAppInfo(value.data().sdg)
      // dispatch({ type: "UPDATE_SDG", data: { value: value.data().sdg.value, label: value.data().sdg.name } });
    } else if(!value.exists && (appState === "FETCHING")) {
      createAppFirestore();
      updateAppState("FETCHED");
    }
  }


  // save to firestore before component unmounts or page unloads
  useEffect(() => {
    window.addEventListener('beforeunload', () => updateAppFirestore(appRef.current));
    dispatch({ type: "UPDATE_TITLE", data: { title: "My Application" }});

    return () => {
      window.removeEventListener('beforeunload', () => updateAppFirestore(appRef.current))
      // updateAppFirestore(appRef.current);
    }
  }, [])


  return (
      <SDGModal curUser={curUser} someUser={someUser} history={history} prevLoc={prevLoc} isCurUser={isCurUser} curUserName={curUser && curUser.name} updateAppInfo={updateAppInfo} submitAppInfo={submitAppInfo} appState={appState} curAppInfo={localAppInfo} />
  );
};

export default enhance(SDGViewContainer);
