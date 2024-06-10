// "use client";
// import React, { useState } from 'react';

// export default function TithesAndOfferingForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     label: '',
//     value: 0,
//     date: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     // Reset form fields
//     setFormData({
//       label: '',
//       value: 0,
//       date: ''
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="label">Label:</label>
//         <input type="text" id="label" name="label" value={formData.label} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="value">Value:</label>
//         <input type="number" id="value" name="value" value={formData.value} onChange={handleChange} />
//       </div>
//       <div>
//         <label htmlFor="date">Date:</label>
//         <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
//       </div>
//       <button type="submit">Upload</button>
//     </form>
//   );
// }
