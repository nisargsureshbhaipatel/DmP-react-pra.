import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },

    validationSchema: Yup.object({
      login: Yup.string()
        .required("Email or Mobile is required")
        .test(
          "email-or-phone",
          "Enter valid email or 10-digit mobile",
          function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9]{10}$/;

            return emailRegex.test(value) || phoneRegex.test(value);
          },
        ),

      password: Yup.string()
        .min(6, "Min 6 characters")
        .required("Password required"),
    }),

    onSubmit: (values) => {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
        alert("No user found");
        return;
      }

      const loginMatch =
        values.login === savedUser.email || values.login == savedUser.number;

      const passwordMatch = values.password === savedUser.password;

      if (loginMatch && passwordMatch) {
        localStorage.setItem("isLoggedIn", "true");

        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          name="login"
          placeholder="Email or Mobile Number"
          className="w-full border p-2 mb-1 rounded"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
        />

        {formik.touched.login && formik.errors.login && (
          <p className="text-red-500 text-sm mb-2">{formik.errors.login}</p>
        )}

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
          <p className="text-red-500 text-sm mb-2">{formik.errors.password}</p>
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
