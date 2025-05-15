import React, { useEffect, useState } from "react";
import { Header } from "../../shared/components/Header/Header";
import s from "./Profile.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser ,
  loginUser ,
  checkUser ,
  toggleLogin,
} from "./authSlice";
import { AppDispatch } from "../../store/store";

type AuthStateType = {
    isLogin: boolean;
    redirectToProfile: boolean;
    loginErrorMessage: string;
    registrationErrorMessage: string;
    successMessage: string;
}
type RootState = {
  auth: AuthStateType;
}

const validate = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Некорректный email";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Некорректный email";
  }
  if (!values.password) {
    errors.password = "Минимальная длина 8 символов";
  }
  return errors;
};

 const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isLogin,
  redirectToProfile,
  loginErrorMessage,
  registrationErrorMessage,
  successMessage,
  } = useSelector((state: RootState) => state.auth);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessageReg, setShowErrorMessageReg] = useState(false);
  const [showErrorMessageLog, setShowErrorMessageLog] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    dispatch(checkUser ());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (registrationErrorMessage) {
      setShowErrorMessageReg(true);
      const timer = setTimeout(() => {
        setShowErrorMessageReg(false);
        // Сбросить сообщение об ошибке
         // или другой метод для сброса сообщения
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [registrationErrorMessage]);
 
  useEffect(() => {
    if (loginErrorMessage) {
      setShowErrorMessageLog(true);
      const timer = setTimeout(() => {
        setShowErrorMessageLog(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loginErrorMessage]);

  const handleLoginClick = () => {
    setIsLoginForm(true);
  };

  const handleRegisterClick = () => {
    setIsLoginForm(false); 
  };

  if (redirectToProfile || isLogin) {
    return <Navigate to="/user-profile" />;
  }

  return (
    <>
      <Header />
      <div className={s.loginMainContainer}>
        <div className={s.login}>
          {isLoginForm ? (
            <>
              <h1>Авторизация</h1>
              {showErrorMessageLog && <div className={s.error}>{loginErrorMessage}</div>}
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={validate}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(loginUser (values)).then(() => {
                    setSubmitting(false);
                  });
                }}
              >
                <Form>
                  <div className={s.formGroup}>
                    <div className={s.labelField}>
                      <label className={s.label} htmlFor="email">Email</label>
                      <Field className={s.input} type="email" name="email" id="email" />
                    </div>
                    <ErrorMessage className={s.error} name="email" component="div" />
                    <div className={s.labelField}>
                      <label className={s.label} htmlFor="password">Пароль</label>
                      <Field className={s.input} type="password" name="password" id="password" />
                    </div>
                    <ErrorMessage className={s.error} name="password" component="div" />
                  </div>
                  <button className={s.button} type="submit">Войти</button>
                </Form>
              </Formik>
              <button type="button" className={s.button} onClick={handleRegisterClick}>У меня нет аккаунта</button>
            </>
          ) : (
            <>
              <h1>Регистрация</h1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={validate}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(registerUser (values)).then(() => {
                    setSubmitting(false);
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className={s.formGroup}>
                      <div className={s.labelField}>
                        <label className={s.label} htmlFor="email">
                          Email
                        </label>
                        <Field
                          className={s.input}
                          type="email"
                          name="email"
                          id="email"
                        />
                      </div>
                      <ErrorMessage
                        className={s.error}
                        name="email"
                        component="div"
                      />

                      <div className={s.labelField}>
                        <label className={s.label} htmlFor="password">
                          Пароль
                        </label>
                        <Field
                          className={s.input}
                          type="password"
                          name="password"
                          id="password"
                        />
                      </div>
                      <ErrorMessage
                        className={s.error}
                        name="password"
                        component="div"
                      />
                    </div>
                    {showErrorMessageReg && (
                    <div className={s.error}>{registrationErrorMessage}</div>
                  )}
                    {showSuccessMessage && (
                      <div className={s.success}>{successMessage}</div>
                    )}
                    <button
                      className={s.button}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Зарегистрироваться
                    </button>
                  </Form>
                )}
              </Formik>

              <button type="button" className={s.button} onClick={handleLoginClick}>
                У меня уже есть аккаунт
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;