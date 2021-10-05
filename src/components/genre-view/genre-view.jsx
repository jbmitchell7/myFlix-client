import React from "react";
import { Button, Card } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
    render() {
        const { genreData, onBackClick } = this.props;
        return (
            <Card>
                <Card.Body className="genre-view">
                    <Card.Title className="genre-name">{genreData.Name}</Card.Title>
                    <Card.Text className="genre-description">Description: {genreData.Description}</Card.Text>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}