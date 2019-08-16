import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginPhoneValidate, verifyCodeValidate } from '../../common/validatorFormik';
// import enhanceWithClickOutside from 'react-click-outside';

class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowVerifyDialog: false,
      confirmationResult: null,
      isHideCaptcha: false,
    };
  }

  componentDidMount() {
    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //   'size': 'invisible',
    //   'callback': function(response) {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     onSignInSubmit();
    //   }
    // });

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  getVerifyCode = (phoneNumber) => {
    let appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber);
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with conffirmationResult.confirm(code).
        this.setState({
          isHideCaptcha: true,
          isShowVerifyDialog: true,
          confirmationResult,
        });

        console.log(confirmationResult);
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
        console.log(error);
        grecaptcha.reset(window.recaptchaWidgetId);

        // Or, if you haven't stored the widget ID:
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  }

  loginHandle = (verifyCode) => {
    console.log(verifyCode);
    this.state.confirmationResult.confirm(verifyCode + '').then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log(user);
      // ...
    }).catch(function (error) {
      console.log(error);
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  hideVerifyCodeDialog = () => {
    this.setState({ isShowVerifyDialog: false })
  }

  render() {
    const hideCaptcha = {
      display: 'none'
    };

    return (
      <div className="login--normal">
        <Formik
          initialValues={{ phoneNumber: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              this.getVerifyCode(`+84${values.phoneNumber}`);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="theme__input-item">
                <label htmlFor="userPhone" className="theme-label--primary">UserPhone</label>
                <div className="theme-input--02-wrapper">
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone number"
                    className="theme-input--primary theme-input--02"
                    validate={value => loginPhoneValidate(value, 'Phone number')}
                    id="userPhone" />
                  <div className="theme__input-border"></div>
                </div>
                <ErrorMessage name="phoneNumber" component="div" className="theme__error-message" />
              </div>
              <button className="theme__submit" type="submit" disabled={isSubmitting}>Send</button>
              <div id="recaptcha-container" style={this.state.isHideCaptcha ? hideCaptcha : {}}></div>
            </Form>
          )}
        </Formik>

        {/* verify code here */}
        <div className={"login-verify-code" + (this.state.isShowVerifyDialog ? ' show' : '')}>
          <div className="login-verify-code__background" onClick={this.hideVerifyCodeDialog}></div>
          <div className="login-verify-code__content">
            <p className="login-verify-code__title">Verify code</p>
            <Formik
              initialValues={{ verifyCode: '' }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(values);
                  this.loginHandle(values.verifyCode);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="theme__input-item">
                    <Field
                      autoComplete="off"
                      type="text"
                      name="verifyCode"
                      placeholder="OTP code ... "
                      className="theme-input--primary"
                      validate={value => verifyCodeValidate(value, 'Code')}
                      id="verifyCode" />
                    <div className="theme__input-border"></div>
                    <ErrorMessage name="verifyCode" component="div" className="theme__error-message" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="theme__submit">Login</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneLogin;