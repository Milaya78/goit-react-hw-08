import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const initialValues = { email: "", password: "" };

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(8, "The password must consist of at least 8 characters!")
    .required("Required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor="email">
          Email
        </label>
        <Field className={css.field} type="email" name="email" id="email" />
        <ErrorMessage className={css.error} name="email" component="div" />
        <label className={css.label} htmlFor="password">
          Password
        </label>
        <Field
          className={css.field}
          type="password"
          name="password"
          id="password"
        />
        <ErrorMessage className={css.error} name="password" component="div" />
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};
