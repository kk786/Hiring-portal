import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    state: "",
    country: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(
      (user) => user.email === formData.email
    );

    if (emailExists) {
      alert("User already exists!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    setFormData({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      state: "",
      country: "",
      password: ""
    });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="firstName" placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <input name="lastName" placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <input name="mobile" placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <input type="email" name="email" placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <input name="state" placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <input name="country" placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <input type="password" name="password" placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required />

          <button type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
