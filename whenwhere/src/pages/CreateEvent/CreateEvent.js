import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DateRangePicker } from '../../components/DateRangePicker/DateRangePicker';
import { Input } from '../../components/Input/Input';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { TimeRangePicker } from '../../components/TimeRangePicker/TimeRangePicker';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './CreateEvent.styles.css';

export const CreateEvent = () => {
  const methods = useForm();
  const onSubmit = data => console.log(JSON.stringify(data));

  return (
    <FormProvider {...methods}>
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
              Create the metting for your team
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
