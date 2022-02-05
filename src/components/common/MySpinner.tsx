import {Spinner} from "react-bootstrap";
import React from "react";

export function MySpinner() {
    return <Spinner
        as="span"
        variant="dark"
        size="sm"
        role="status"
        aria-hidden="true"
        animation="border"/>
}
