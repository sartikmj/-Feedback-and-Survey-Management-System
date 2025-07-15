import React from "react";
import { useState} from "react";
import axios from "axios";
const Form = () => {

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    studentName: "",
    email: "",
    subject: "",
    teacherName: "",
    rating: "",
    comment: "",
  })

  const handleChange = (e) => {
    setForm({ ...form,[e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) =>{
    const payload = { ...form, rating: Number(form.rating) }; //converting the rating into Number from string
    //Because form inputs in HTML always return values as strings, even if the input type is number.
    e.preventDefault();
    // Here we can send the form data to the backend API
    try{
      await axios.post("http://localhost:5000/submit-feedback", form);
      setSubmitted(true);
      setForm({
        studentName: "",
        email: "",
        subject: "",
        teacherName: "",
        rating: "",
        comment: "",
      })
    }catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        {submitted ? (
          <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your Feedback has been submitted successfully !</p>
          <button 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={()=> setSubmitted(false)}
          >Submit Another Feedback</button>
        </div>
        ) : (
          <>
        
      <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
        Student Feeback Form
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium text-gray-700">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 mt-1 "
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Teacher's Name
          </label>
          <input
            name="teacherName"
            value={form.teacherName}
            onChange={handleChange}
            placeholder="e.g. Mr.Sharma"
            required
            className="w-full border rounded px-3 py-2 mt-1 "
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Rating(1 to 5)
          </label>
          <select name="rating" required value={form.rating} onChange={handleChange}>
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Comments</label>
          <textarea
            name="comment"
            rows="4"
            value={form.comment}
            onChange={handleChange}
            placeholder="Write your feedback here...."
            className="w-full border rounded px-3 py-2 mt-1"
          ></textarea>
        </div>

        <div className="grid md:grid-cols gap-4 ">
          <div>
            <label className="block font-medium text-gray-700">
              Your Name (optional)
            </label>
            <input
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 "
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Email (Optional)
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 "
            />
          </div>
        </div>
        <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit Feedback</button>
        {/* We will handle the functionality of Submit Feedback button on backend */}
      </form>
      </>
      )};
      </div>
    </div>
  );
};

export default Form;
