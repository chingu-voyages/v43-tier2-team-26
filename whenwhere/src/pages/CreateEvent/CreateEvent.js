import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DateRangePicker } from '../../components/DateRangePicker/DateRangePicker';
import { Input } from '../../components/Input/Input';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { TimeRangePicker } from '../../components/TimeRangePicker/TimeRangePicker';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './CreateEvent.styles.css';
import { convertDate } from '../../utils/covertDate';
import { useNavigate } from 'react-router-dom';

export const CreateEvent = () => {
  const [message, setMessage] = useState('');
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async data => {
    const dateFrom = convertDate(data.dateRange[0]);
    const dateTo = convertDate(data.dateRange[1]);

    try {
      const response = await fetch('/w/createevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: {
            meeting_title: data.eventName,
            time_from: data.timeFrom,
            time_to: data.timeTo,
            date_from: dateFrom,
            date_to: dateTo,
            time_zone: 'Eroupe/Sweeden (GMT+2)',
          },
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        setMessage('Could not create your event');
      }

      setMessage('Your Event has been sucessfully created');
      navigate(`/${responseData._id}/login`);
    } catch (error) {
      setMessage('Could not create your event');
    }
  };

  return (
    <FormProvider {...methods}>
      {message}
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Row className="min-vh-100">
          <Col
            md={6}
            className="p-5 form-calendar d-flex flex-column text-white"
          >
            <p className="fs-3">Select dates range for your meeting</p>
            <DateRangePicker />
          </Col>
          <Col
            xs={10}
            sm={6}
            md={5}
            xl={3}
            className="d-flex flex-column justify-content-center mx-auto"
          >
            <h2 className="text-center form-header my-3 d-none d-md-block">
              Create the meeting for your team
            </h2>
            <Input />
            <p className="fw-bold text-muted">What times might work?</p>
            <TimeRangePicker />
            <SubmitButton>Create Event</SubmitButton>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};
