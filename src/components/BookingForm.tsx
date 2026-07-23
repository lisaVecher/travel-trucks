"use client";

import { useState, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { createBookingRequest } from "@/lib/api";
import type { BookingRequest } from "@/types/camper";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

type FormErrors = Partial<Record<keyof BookingRequest, string>>;

const INITIAL_VALUES: BookingRequest = {
  name: "",
  email: "",
};

export default function BookingForm({ camperId }: BookingFormProps) {
  const [values, setValues] = useState<BookingRequest>({
    ...INITIAL_VALUES,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const bookingMutation = useMutation({
    mutationFn: (data: BookingRequest) => createBookingRequest(camperId, data),

    onSuccess: (response) => {
      toast.success(response.message);

      setValues({
        ...INITIAL_VALUES,
      });

      setErrors({});
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Booking request could not be sent.",
      );
    },
  });

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();

    const namePattern = /^[\p{L}][\p{L}\s'-]{1,}$/u;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!namePattern.test(trimmedName)) {
      nextErrors.name = "Please enter your name.";
    }

    if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = "Please enter your email.";
    }

    return nextErrors;
  }

  function handleChange(field: keyof BookingRequest, value: string) {
    setValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));

    if (bookingMutation.isError) {
      bookingMutation.reset();
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    bookingMutation.mutate({
      name: values.name.trim(),
      email: values.email.trim(),
    });
  }

  return (
    <section className={styles.wrapper}>
      <h2>Book your campervan now</h2>

      <p>Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <div className={styles.inputControl}>
            <label
              htmlFor="booking-name"
              className={
                errors.name ? styles.visibleLabel : styles.visuallyHidden
              }
            >
              Name*
            </label>

            <input
              id="booking-name"
              name="name"
              type="text"
              value={values.name}
              placeholder="Name*"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "booking-name-error" : undefined}
              onChange={(event) => handleChange("name", event.target.value)}
            />

            {errors.name && (
              <FiAlertCircle className={styles.errorIcon} aria-hidden="true" />
            )}
          </div>

          {errors.name && (
            <span id="booking-name-error" className={styles.error} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <div className={styles.inputControl}>
            <label
              htmlFor="booking-email"
              className={
                errors.email ? styles.visibleLabel : styles.visuallyHidden
              }
            >
              Email*
            </label>

            <input
              id="booking-email"
              name="email"
              type="email"
              value={values.email}
              placeholder="Email*"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "booking-email-error" : undefined
              }
              onChange={(event) => handleChange("email", event.target.value)}
            />

            {errors.email && (
              <FiAlertCircle className={styles.errorIcon} aria-hidden="true" />
            )}
          </div>

          {errors.email && (
            <span
              id="booking-email-error"
              className={styles.error}
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>

        <button type="submit" disabled={bookingMutation.isPending}>
          {bookingMutation.isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
