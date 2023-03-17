import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./UserForm.css";

const UserForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    experience: "",
  };

  const validationSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      contact: Yup.string().length(10, "Invalid contact number"),
      department: Yup.string().required("Department is required"),
      designation: Yup.string().required("Designation is required"),
      // experience: Yup.string().required("Experience is required"),
      experience: Yup.string()
        .required("Experience is required")
        .matches(/^[0-9]*$/, "Experience is not valid"),
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
              <label className="form-label">First Name*</label>
              <Field name="firstName" type="text" id="firstName" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label className="form-label">Last Name</label>
              <Field name="lastName" type="text" id="lastName" />
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
              <label className="form-label">Department*</label>
              <Field name="department" type="text" id="department" />
              <ErrorMessage
                name="department"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label className="form-label">Designation*</label>
              <Field name="designation" type="text" id="designation" />
              <ErrorMessage
                name="designation"
                component="div"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label className="form-label">Experience*</label>
              <Field name="experience" type="number" id="experience" />
              <ErrorMessage
                name="experience"
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
                }
              >
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