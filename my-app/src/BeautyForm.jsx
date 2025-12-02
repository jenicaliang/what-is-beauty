import { useState } from "react";
import "./BeautyForm.css";

export default function BeautyForm() {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Replace with your Google Apps Script URL
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzX1vvUVWigP4Sma9YK6stELtiohbZvFlYcR_j76UX-oVH45-fQkqsbqsbhSm6gqjA-/exec';
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: text,
          timestamp: new Date().toISOString()
        })
      });

      setMessage("Thank you for sharing!");
      setText("");
    } catch {
      setMessage("Error submitting. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="beauty-form-section">
        <div className="beauty-intro">
            So now that you’ve learned a little about beauty, it's time to look within.
        </div>
        <label htmlFor="beauty-input" className="beauty-prompt">
            What do <i>you</i> find beautiful?
          </label>
      <div className="beauty-form-container">
        <form onSubmit={handleSubmit} className="beauty-form">
          
          <textarea
            id="beauty-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            placeholder="Share your thoughts..."
            className="beauty-textarea"
            required
          />
          
          <div className="beauty-form-footer">
            <span className="character-count">
              {text.length}/200
            </span>
            <button 
              type="submit" 
              className="beauty-submit"
              disabled={isSubmitting || text.trim().length === 0}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>

          {message && <p className="beauty-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}