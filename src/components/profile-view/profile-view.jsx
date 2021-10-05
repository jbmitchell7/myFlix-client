import React from "react";
import { Button, Card } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
    render() {
        const { profileData, onBackClick } = this.props;
        return (
            <Card>
                <Card.Body className="user-view">
                    <Card.Title className="user-name">{profileData.user}</Card.Title>
                    <Card.Text className="user-description">Email Address: {profileData.email}</Card.Text>
                    <Card.Text className="user-birthday">Birthday: {profileData.birthday}</Card.Text>
                    <Card.Text className="user-favorites">Favorite Movies: {profileData.favorites}</Card.Text>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}