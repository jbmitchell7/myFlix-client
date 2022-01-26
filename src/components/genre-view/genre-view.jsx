import React from "react";
import { Button, Card } from "react-bootstrap";
import "./genre-view.scss";

export function GenreView(props) {
    return (
        <Card>
            <Card.Body className="genre-view">
                <Card.Title className="genre-name">{props.genreData.Name}</Card.Title>
                <Card.Text className="genre-description">Description: {props.genreData.Description}</Card.Text>
                <Button variant="secondary" onClick={() => { props.onBackClick(null); }}>Back</Button>
            </Card.Body>
        </Card>
    );
}