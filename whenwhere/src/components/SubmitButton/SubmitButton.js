import React from "react";
import Button from "react-bootstrap/Button";
import "./SubmitButton.styles.css";

export const SubmitButton = ({ children, ...props }) => {
  return (
    <Button className="btn-primary my-5" type="submit" {...props}>
      {children}
    </Button>
  );
};
