import React from "react";
import { Button, Card } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
    render() {
        const { profileData, onBackClick } = this.props;
        return (
            <Card>
                <Card.Body className="user-view">
                    <Card.Title className="user-name">{profileData.Username}</Card.Title>
                    <Card.Text className="user-description">Email Address: {profileData.Email}</Card.Text>
                    <Card.Text className="user-birthday">Birthday: {profileData.Birthday}</Card.Text>
                    <Card.Text className="user-favorites">Favorite Movies: {profileData.FavoriteMovies}</Card.Text>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}