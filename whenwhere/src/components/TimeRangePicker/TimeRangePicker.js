import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormContext } from 'react-hook-form';

export const TimeRangePicker = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Form.Group className="d-flex flex-row">
      <Form.Label htmlFor="timeFrom" className="m-2">
        From
      </Form.Label>
      <Form.Control
        type="time"
        id="timeFrom"
        {...register('timeFrom', { required: 'Time From is required' })}
      />
      {errors.timeFrom && (
        <Form.Text className="text-danger">{errors.timeFrom.message}</Form.Text>
      )}
      <Form.Label htmlFor="timeTo" className="m-2">
        To
      </Form.Label>
      <Form.Control
        type="time"
        id="timeTo"
        {...register('timeTo', { required: 'Time To is required' })}
      />
      {errors.timeTo && (
        <Form.Text className="text-danger">{errors.timeTo.message}</Form.Text>
      )}
    </Form.Group>
  );
};
