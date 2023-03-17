import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./UserForm.css";

const UserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    contact: "",
  };

  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      contact: Yup.string().length(10, "Invalid contact number"),
    });
  };

  const handleSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="outer-div">
      <div className="user-heading">User Registration</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialErrors={initialValues}
      >
        {({ errors, touched, resetForm }) => (
          <Form>
            <div className="form-div">
              <label className="form-label">Name*</label>
              <Field name="name" type="text" id="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label className="form-label" htmlFor="email">
                {" "}
                Email*{" "}
              </label>
              <Field name="email" type="email" id="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label className="form-label" htmlFor="contact">
                {" "}
                Contact{" "}
              </label>
              <Field name="contact" type="text" id="contact" />
              <ErrorMessage
                name="contact"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <button
                type="submit"
                id="submit"
                disabled={
                  Array.isArray(errors) ||
                  Object.values(errors).toString() != ""
                }>
                Add User
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
