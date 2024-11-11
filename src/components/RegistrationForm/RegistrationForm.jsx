import { ErrorMessage, Field, Form, Formik } from "formik";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "The password must consist of at least 8 characters!")
    .required("Required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        actions.resetForm();
      })
      .catch(() => {
        console.log("Email is already in use");
      });

    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Name:</span>
            <Field
              type="text"
              name="name"
              className={css.input}
              placeholder="Ivan Ivanov"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="name"
              component="span"
            />
          </label>
          <label className={css.label}>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              className={css.input}
              placeholder="example.email@example.com"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </label>
          <label className={css.label}>
            <span>Password:</span>
            <Field
              type="password"
              name="password"
              className={css.input}
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={css.errorMessage}
              name="password"
              component="span"
            />
          </label>

          <button type="submit">🤷‍♂️ Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
