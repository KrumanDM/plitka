import react from 'react';
import { Header } from '../Header';
import s from './Profile.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';



interface LogInValues {
  // Define the values for the form fields
  email: string;
  password: string;
}

// Define the validation function for the form fields
const validate = (values: LogInValues) => {
  const errors: Partial<LogInValues> = {};
  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неверный формат email';
  }
  if (!values.password) {
    errors.password = 'Обязательное поле';
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть не менее 8 символов';
  }
  return errors;
};

// Define the function to handle the form submission
const onSubmit = (values: LogInValues) => {
  
  // Set the URL, method and body of the request
  const url = 'https://example.com/api/login'; // Change this to your API endpoint
  const method = 'POST'; // Change this to the appropriate HTTP method
  const body = JSON.stringify(values); // Change this to the format your API expects

  // Use fetch API to send the request
  fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json', // Change this to the appropriate content type
    },
  })
    .then((response) => {
      // Handle the response
      if (response.ok) {
        // The request was successful
        return response.json(); // Parse the response as JSON
      } else {
        // The request failed
        throw new Error(response.statusText); // Throw an error with the status text
      }
    })
    .then((data) => {
      // Do something with the data
      console.log(data); // Log the data to the console
      // You can also update the state, redirect the user, show a message, etc.
    })
    .catch((error) => {
      // Handle the error
      console.error(error); // Log the error to the console
      // You can also show an error message, retry the request, etc.
    });
};


// Define the component function
export const Profile: React.FC = () => {
  return (<>
  <Header/>
  <div className={s.loginMainContainer}>
    
     <div className={s.login}>
      
      <h1>Вход</h1>
      <Formik
      
        initialValues={{ email: '', password: '' }} // Set the initial values for the form fields
        validate={validate} // Set the validation function for the form fields
        onSubmit={onSubmit} // Set the function to handle the form submission
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={s.formGroup}>
              <div className={s.labelField}>
              <label className={s.label} htmlFor="email">Email</label>
              <Field className={s.input} type="email" name="email" id="email" />
              </div>
              <ErrorMessage className={s.error}  name="email" component="div"  />
              
            
            
            <div className={s.labelField}>
              <label className={s.label} htmlFor="password">Пароль</label>
              <Field className={s.input} type="password" name="password" id="password" />
              </div>
              <ErrorMessage className={s.error} name="password" component="div" />
            
            </div>
            <button className={s.button} type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  
    </div>
    
    </>);
};