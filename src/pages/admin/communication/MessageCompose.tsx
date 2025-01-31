import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunicationStore } from '../../../store/useCommunicationStore';

export function MessageCompose() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSend = async () => {
    setIsSending(true);
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    
    // Start countdown
    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        navigate('/admin/communication');
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Compose Message</h1>
        <p className="mt-2 text-gray-600">
          Write your message to send to all selected recipients
        </p>
      </div>

      {isSending ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium text-gray-900">
            Your message has been sent!
          </p>
          <p className="mt-2 text-gray-600">
            Redirecting in {countdown} seconds...
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={500}
            />
            <div className="mt-2 text-right text-sm text-gray-500">
              {message.length}/500 characters
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-gray-700">
                  I agree to send messages to selected contacts
                </span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate('/admin/comm/review')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/admin/communication')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={!message || !agreed}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}