import React from "react";
import { Button, Card } from "react-bootstrap";
import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { directorData, onBackClick } = this.props;
        return (
            <Card>
                <Card.Body className="director-view">
                    <Card.Title className="director-name">{directorData.Name}</Card.Title>
                    <Card.Text className="director-description">Bio: {directorData.Bio}</Card.Text>
                    <Card.Text className="director-birthday">Birthday: {directorData.Birth}</Card.Text>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}