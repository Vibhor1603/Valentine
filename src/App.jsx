import { useState, useRef } from "react";
import Confetti from "react-confetti";
import emailjs from "emailjs-com";

export default function App() {
  const [noPosition, setNoPosition] = useState({ top: "auto", left: "auto" });
  const [isYesClicked, setIsYesClicked] = useState(false);
  const audioRef = useRef(null);

  // Initialize EmailJS with your user ID
  emailjs.init("yml93xgOVi8b0-JtP"); // Replace with your actual User ID from EmailJS

  const handleNoHover = () => {
    const randomTop = Math.floor(Math.random() * 60) + "vh";
    const randomLeft = Math.floor(Math.random() * 60) + "vw";
    setNoPosition({ top: randomTop, left: randomLeft });
  };

  const handleYesClick = () => {
    setIsYesClicked(true);

    // Play the audio when "Yes" is clicked
    if (audioRef.current) {
      audioRef.current.play();
    }

    // Send the email using EmailJS with your custom template
    emailjs
      .send(
        "service_1ujuw8v", // Your Service ID
        "template_b8f72s7", // Template ID (the template you created)
        {
          // No need to pass dynamic parameters, because the template is hardcoded
          to_email: "deekshapoojary512@gmail.com", // Static recipient email (the one you want)
        },
        "yml93xgOVi8b0-JtP" // Your User ID from EmailJS
      )
      .then(
        (result) => {
          console.log("Email sent successfully: ", result.text);
        },
        (error) => {
          console.error("Error sending email: ", error.text);
        }
      );
  };

  const handleNoClick = () => {
    if (noPosition.top !== "auto" && noPosition.left !== "auto") {
      alert("You can't click No anymore!");
    }
  };

  if (isYesClicked) {
    return (
      <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-t from-purple-300 to-pink-500">
        <Confetti />
        <audio ref={audioRef} loop>
          <source src="/audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div className="grid grid-cols-3 gap-4 p-8 mt-6 pb-0">
          {Array.from({ length: 9 }).map((_, index) => (
            <img
              key={index}
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW52Z2E3OTNrYXZhZGhsaHo4cXNlNTNtdmNkNHZlNHlhZ3pqNWI3cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tHIRLHtNwxpjIFqPdV/giphy.gif"
              alt="celebration-gif"
              className="w-46 h-46 rounded-lg shadow-xl"
            />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold text-pink-600 mb-1 mt-1 pt-0 drop-shadow-lg text-center">
          Yay! Wohoooo!
        </h2>
        <h2 className="text-2xl font-extrabold text-pink-900 mb-10 drop-shadow-lg text-center">
          You cannot backout now! Confirmation email has been sent on your
          email.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-orange-100 to-pink-500">
      <h1 className="text-4xl font-extrabold text-pink-200 mb-6 drop-shadow-lg text-center">
        Hello, Pookie!
      </h1>
      <img
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWpxeXZ3dmZ4bmdhejg3OHg0d29nMXZidTFjbHAxc3VkZ2F4bWMwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vbmbi3SbYkgX1MkvMy/giphy.gif"
        alt="cat-gif"
        className="mb-6 rounded-lg shadow-xl"
      />
      <h2 className="text-4xl font-extrabold text-pink-600 mb-6 drop-shadow-lg text-center">
        Will you be my Valentine this year?
      </h2>
      <div className="flex space-x-6 mb-4">
        <button
          onClick={handleYesClick}
          className={`px-8 py-3 bg-orange-700 ml-28 text-white rounded-lg shadow-lg transition-all duration-300 ${
            isYesClicked
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-orange-900"
          }`}
          disabled={isYesClicked}
        >
          Yes
        </button>
        <button
          onClick={handleNoClick}
          onMouseEnter={handleNoHover}
          className="px-8 py-3 bg-purple-900 text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-red-700"
          style={{
            position: "absolute",
            top: noPosition.top,
            left: noPosition.left,
            transition: "top 0.1s, left 0.1s",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
