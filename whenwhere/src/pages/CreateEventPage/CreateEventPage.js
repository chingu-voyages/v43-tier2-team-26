import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./CreateEvent.styles.css";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";

export const CreateEventPage = () => {
  const initState = {
    eventName: "",
    timeFrom: "",
    timeTo: "",
    dateRange: [],
  };

  const [initialValues] = React.useState(initState);

  const onSubmit = (values) => {
    console.log("ValuesJson", JSON.stringify(values));
  };

  const onError = (error) => {
    console.log("ERROR", error);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initialValues,
  });

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Row className="min-vh-100">
          <Col
            xl={6}
            className="p-5 form-calendar d-flex flex-column text-white"
          >
            <p>Select dates range for your meeting</p>
            <Controller
              control={control}
              name="dateRange"
              render={({ field }) => (
                <div className="calendar-wrapper">
                  <Calendar
                    className="purple custom-calendar custom-container"
                    onChange={(dateRange) => {
                      field.onChange(dateRange);
                    }}
                    range
                    rangeHover
                  />
                </div>
              )}
            />
          </Col>
          <Col
            xl={3}
            className="d-flex flex-column justify-content-center mx-auto"
          >
            <h2 className="align-self-start text-center form-header">
              Create the metting for you team
            </h2>
            <Form.Group className="my-5">
              <Form.Label htmlFor="eventName">Event Name</Form.Label>
              <Form.Control
                type="text"
                id="eventName"
                {...register("eventName", {
                  required: "Event Name is required",
                })}
              />
              {errors.eventName && (
                <Form.Text className="text-danger">
                  {errors.eventName.message}
                </Form.Text>
              )}
            </Form.Group>
            <p className="">What times might work?</p>
            <Form.Group className="d-flex flex-row" controlId="timeSelector">
              <Form.Label className="m-3">From</Form.Label>
              <Form.Control
                type="time"
                name="timeFrom"
                {...register("timeFrom")}
              />
              <Form.Label className="m-3">To</Form.Label>
              <Form.Control type="time" name="timeTo" {...register("timeTo")} />
            </Form.Group>
            <Button className="btn-primary my-5" type="submit">
              Create Event
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
