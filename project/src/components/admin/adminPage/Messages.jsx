import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

function Messages() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await emailjs.send(
        'your_service_id',
        'your_template_id',
        {
          from_name: data.name,
          to_email: data.to,
          subject: data.subject,
          message: data.message,
        },
        'your_public_key'
      );

      const newMessage = {
        id: Date.now(),
        ...data,
        timestamp: new Date().toLocaleString()
      };

      setHistory([newMessage, ...history]);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      reset();
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to send message. Try again.' });
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact & Messaging</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full border px-4 py-2 rounded"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Recipient Email</label>
            <input
              type="email"
              {...register('to', { required: 'Recipient email is required' })}
              className="w-full border px-4 py-2 rounded"
              placeholder="admin@example.com"
            />
            {errors.to && <p className="text-red-500 text-sm">{errors.to.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              {...register('subject', { required: 'Subject is required' })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Issue with product / General message"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              className="w-full border px-4 py-2 rounded"
              rows="5"
              placeholder="Write your message here..."
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status Message */}
          {status && (
            <p className={`mt-2 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </p>
          )}
        </form>

        {/* Message History */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Sent Messages</h2>
          {history.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((msg) => (
                <li key={msg.id} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{msg.timestamp}</span>
                    <span>To: {msg.to}</span>
                  </div>
                  <h3 className="font-semibold">{msg.subject}</h3>
                  <p className="mt-1 text-gray-700">{msg.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
