import React from "react";
import { Button, Card } from "react-bootstrap";
import "./director-view.scss";

export function DirectorView(props) {
    return (
        <Card>
            <Card.Body className="director-view">
                <Card.Title className="director-name">{props.directorData.Name}</Card.Title>
                <Card.Text className="director-description">Bio: {props.directorData.Bio}</Card.Text>
                <Card.Text className="director-birthday">Born: {props.directorData.Birth}</Card.Text>
                <Card.Text className="director-birthday">Died: {props.directorData.Death}</Card.Text>
                <Button variant="secondary" onClick={() => { props.onBackClick(null); }}>Back</Button>
            </Card.Body>
        </Card>
    );
}
