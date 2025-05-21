import React from 'react'

const quotes = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    role: "Management Consultant"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    role: "Co-founder of Apple"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    role: "Co-founder of Apple"
  }
];

const Quote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center h-screen px-6 invisible md:visible">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <div className="relative">
          <svg
            className="absolute -top-6 -left-6 w-12 h-12 text-blue-200 transform -rotate-12"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
            {randomQuote.text}
          </blockquote>
        </div>
        
        <div className="flex flex-col">
          <cite className="text-lg font-semibold text-gray-800 not-italic">
            {randomQuote.author}
          </cite>
          <span className="text-gray-600">
            {randomQuote.role}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-8">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Join thousands of readers today
          </p>
        </div>
      </div>
    </div>
  )
}

export default Quote