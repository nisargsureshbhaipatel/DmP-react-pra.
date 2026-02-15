import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    
    Swal.fire({
      title: "Registered!",
      text: "You have successfully registered 🎉",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too short")
      .required("First name required"),

    lastName: Yup.string()
      .min(2, "Too short")
      .required("Last name required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be 10 digits")
      .required("Mobile required"),

    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: (values) => {
      // ✅ Save full name
      const fullName = `${values.firstName} ${values.lastName}`;
      localStorage.setItem("username", fullName);

      console.log(values);
      setSuccess(true);

      // Redirect after 1.5 sec
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 shadow-lg rounded-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Register
          </h2>

          {/* First + Last Name */}
          <div className="flex gap-3 mb-2">
            <div className="w-1/2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full border p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full border p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border p-2 mb-1 rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mb-2">
              {formik.errors.email}
            </p>
          )}

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full border p-2 mb-1 rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="text-red-500 text-sm mb-2">
              {formik.errors.mobile}
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 mb-1 rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {formik.errors.password}
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-2 mb-1 rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-2">
                {formik.errors.confirmPassword}
              </p>
            )}

          <button
            onClick={handleRegister}
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Register
          </button>
        </form>
    </div>
  );
};

export default Register;
