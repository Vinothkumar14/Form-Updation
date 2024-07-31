// // formHandling.js

// // Regular expressions for validation
// const nameRegex = /^[a-zA-Z]+$/;
// const phoneRegex = /^\d{10}$/;
// const designationRegex = /^[a-zA-Z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // Validate form data
// export const validateFormData = (formData) => {
//   const errors = {};

//   // First Name validation
//   if (!formData.firstName.trim() || !nameRegex.test(formData.firstName)) {
//     errors.firstName = 'Should contain only alphabets.';
//   }

//   // Last Name validation
//   if (!formData.lastName.trim() || !nameRegex.test(formData.lastName)) {
//     errors.lastName = 'Should contain only alphabets.';
//   }

//   // Phone validation
//   if (!formData.phone.trim()) {
//     errors.phone = 'Phone number is required.';
//   } else if (!phoneRegex.test(formData.phone)) {
//     errors.phone = 'Should contain exactly 10 digits.';
//   }

//   // Email validation
//   if (!formData.email.trim() || !emailRegex.test(formData.email)) {
//     errors.email = 'Invalid email format.';
//   }

//   // Designation validation
//   if (!formData.designation.trim() || !designationRegex.test(formData.designation)) {
//     errors.designation = 'Should contain only alphabets and spaces.';
//   }

//   return errors;
// };

// // Submit form data
// export const submitFormData = (formData, callback) => {
//   // Example: Call API or perform action with formData
//   console.log('Form data submitted:', formData);

//   // Example: Perform callback function after successful submission
//   callback();
// };
