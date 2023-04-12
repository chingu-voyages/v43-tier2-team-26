import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormContext } from 'react-hook-form';

export const Input = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Form.Group className="my-5">
      <Form.Label htmlFor="eventName">Event Name</Form.Label>
      <Form.Control
        type="text"
        id="eventName"
        {...register('eventName', {
          required: 'Event Name is required',
        })}
      />
      {errors.eventName && (
        <Form.Text className="text-danger">
          {errors.eventName.message}
        </Form.Text>
      )}
    </Form.Group>
  );
};
