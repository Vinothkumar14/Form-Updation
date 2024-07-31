import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CreateUsers.css';

const CreateUsers = ({ addUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    designation: '',
    department: '',
    gender: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
  });

  const nameRegex = /^[a-zA-Z]+$/;
  const phoneRegex = /^\d{10}$/;
  const designationRegex = /^[a-zA-Z ]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation for firstName, lastName, designation, email, and phone fields
    switch (name) {
      case 'firstName':
        setErrors({ ...errors, firstName: value.match(nameRegex) ? '' : <p style={{alignItems:"center", textAlign:"center", color:"red"}}><h5>Should contain only alphabets.</h5> </p>});
        break;
      case 'lastName':
        setErrors({ ...errors, lastName: value.match(nameRegex) ? '' : <p style={{alignItems:"center", textAlign:"center", color:"red"}}><h5>Should contain only alphabets.</h5> </p> });
        break;
      case 'designation':
        setErrors({ ...errors, designation: value.match(designationRegex) ? '' : <p style={{alignItems:"center", textAlign:"center", color:"red"}}><h5>Should contain only alphabets and spaces.</h5> </p> });
        break;
      case 'email':
        setErrors({ ...errors, email: value.match(emailRegex) ? '' : <p style={{alignItems:"center", textAlign:"center", color:"red"}}><h5>Invalid email format.</h5> </p> });
        break;
      case 'phone':
        setErrors({ ...errors, phone: value.match(phoneRegex) ? '' : <p style={{alignItems:"center", textAlign:"center", color:"red"}}><h5>Should contain exactly 10 digits.</h5> </p> });
        break;
      default:
        break;
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'Should contain only alphabets.';
      valid = false;
    } else {
      newErrors.firstName = '';
    }

    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Should contain only alphabets.';
      valid = false;
    } else {
      newErrors.lastName = '';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Should contain exactly 10 digits.';
      valid = false;
    } else {
      newErrors.phone = '';
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.designation.trim() || !designationRegex.test(formData.designation)) {
      newErrors.designation = 'Should contain only alphabets and spaces.';
      valid = false;
    } else {
      newErrors.designation = '';
    }

    setErrors(newErrors);

    if (valid) {
      addUser(formData);
      Swal.fire('User created successfully!', '', 'success');
      setFormData({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        designation: '',
        department: '',
        gender: '',
      });
      navigate('/'); // Navigate to view users page
    } else {
      let errorMessage = '';
      if (newErrors.firstName) errorMessage += `- ${newErrors.firstName}\n`;
      if (newErrors.lastName) errorMessage += `- ${newErrors.lastName}\n`;
      if (newErrors.phone) errorMessage += `- ${newErrors.phone}\n`;
      if (newErrors.email) errorMessage += `- ${newErrors.email}\n`;
      if (newErrors.designation) errorMessage += `- ${newErrors.designation}\n`;

      Swal.fire('Please correct the following errors:', errorMessage, 'error');
    }
  };

  return (
    <div className="create-users">
      <h2 style={{textAlign:"center"}}>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error-input' : ''}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error-input' : ''}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error-input' : ''}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={errors.designation ? 'error-input' : ''}
            required
          />
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="IT">IT</option>
            <option value="Data">Data</option>
            <option value="UI">UI</option>
            <option value="Cloud">Cloud</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className='radio'>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUsers;
