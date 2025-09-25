"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type ReservationDetails = {
  name: string;
  hamsterName: string;
  dropOff: string;
  pickUp: string;
  notes: string;
};

const initialState: ReservationDetails = {
  name: "",
  hamsterName: "",
  dropOff: "",
  pickUp: "",
  notes: ""
};

export function ReservationForm() {
  const [details, setDetails] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    // Placeholder for real booking API.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setStatus("submitted");
  };

  const resetForm = () => {
    setDetails(initialState);
    setStatus("idle");
  };

  if (status === "submitted") {
    return (
      <div className="reservation-card success">
        <h2>Reservation request received!</h2>
        <p>
          Our caretakers will confirm availability for {details.hamsterName} within the
          hour. We just sent a confirmation email to {details.name}.
        </p>
        <button type="button" onClick={resetForm}>
          Book another stay
        </button>
      </div>
    );
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="reservation-grid">
        <label>
          Your name
          <input
            required
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Alex Caregiver"
          />
        </label>
        <label>
          Hamster name
          <input
            required
            name="hamsterName"
            value={details.hamsterName}
            onChange={handleChange}
            placeholder="Peanut"
          />
        </label>
        <label>
          Drop-off date
          <input
            required
            type="date"
            name="dropOff"
            value={details.dropOff}
            onChange={handleChange}
          />
        </label>
        <label>
          Pick-up date
          <input
            required
            type="date"
            name="pickUp"
            value={details.pickUp}
            onChange={handleChange}
          />
        </label>
      </div>
      <label>
        Care notes
        <textarea
          name="notes"
          value={details.notes}
          onChange={handleChange}
          placeholder="Preferred snacks, exercise routines, or medical notes"
          rows={4}
        />
      </label>
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit reservation"}
      </button>
    </form>
  );
}
