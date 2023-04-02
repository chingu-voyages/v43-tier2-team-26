import React from "react";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";
import "./DateRangePicker.styles.css";
import Form from "react-bootstrap/Form";

export const DateRangePicker = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name="dateRange"
        rules={{
          required: "Date Range is required",
        }}
        render={({ field }) => (
          <div className="calendar-wrapper">
            <Calendar
              className="purple custom-calendar custom-container"
              onChange={(dateRange) => {
                field.onChange(dateRange);
              }}
              range
            />
          </div>
        )}
      />
      {errors.dateRange && (
        <Form.Text className="text-danger">
          {errors.dateRange.message}
        </Form.Text>
      )}
    </>
  );
};
