import { compose, withProps } from "recompose";
import * as Yup from "yup";
import { accessIfNotAuthenticated } from "../../../utils/siteAuth";
import { connectSiteContext } from "../../../utils/siteContext";
import { withExceptionHandler } from "../../../utils/setupErrHandling";

import LoginSignupViewComponent from "./LoginSignupViewComponent";

const errorTable = {
  "auth/user-not-found": "There was a problem logging you in.",
  "auth/email-already-exists":
    "This email is already associated with an account.",
  DEFAULT: "An error occurred. Please try again."
};

const loginValidationSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email("Make sure your email is typed correctly.")
    .required("Make sure to provide an email."),
  loginPassword: Yup.string().required("Make sure to provide a password.")
});

const signupValidationSchema = Yup.object().shape({
  signupName: Yup.string()
    .min(2, "Make sure to provide your full name.")
    .max(40, "Make sure your name is less than 40 characters.")
    .required("No name provided."),
  signupEmail: Yup.string()
    .email("Make sure your email is typed correctly.")
    .required("Make sure to provide an email."),
  signupPassword: Yup.string()
    .min(8, "Make sure your password is at least 8 characters.")
    .required("Make sure to provide a password."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("signupPassword"), null], "Make sure the passwords match.")
    .required("Make sure to confirm your password.")
});

const getNewDashboardGreeting = () => {
  let greeting = "Good morning";
  const hourOfDay = parseFloat(new Date().getHours());
  if (hourOfDay >= 12 && hourOfDay < 18) {
    greeting = "Good afternoon";
  } else if (hourOfDay >= 18) {
    greeting = "Good evening";
  }

  let subgreeting = "Today's the day! Happy hacking!";
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const curDate = new Date();
  const eventDate = new Date(curDate.getFullYear(), 4, 3);
  const daysUntilEvent = Math.ceil(
    (eventDate.getTime() - curDate.getTime()) / oneDay
  );

  if (daysUntilEvent) {
    subgreeting = `Thank you for joining DuGut!`;
  }

  return {
    greeting,
    subgreeting
  };
};

const mapContextToProps = ({ state: { firebase } }) => ({
  logIn: firebase.signInUser,
  signUp: firebase.createUser
});

const enhance = compose(
  withExceptionHandler,
  accessIfNotAuthenticated,
  connectSiteContext(mapContextToProps),
  withProps({
    validationSchemas: {
      login: loginValidationSchema,
      signup: signupValidationSchema
    },
    errorTable,
    getNewDashboardGreeting
  })
);

export default enhance(LoginSignupViewComponent);
