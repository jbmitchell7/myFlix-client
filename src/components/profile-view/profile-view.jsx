import React from "react";
import { Button, Card } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {

    dateConvert(dateInput) {
        let year = dateInput.substr(0, 4);
        let month = dateInput.substr(5, 2);
        let day = dateInput.substr(8, 2);
        let date = day + "/" + month + "/" + year;
        return date
    }

    render() {
        const { profileData, onBackClick } = this.props;
        return (
            <Card>
                <Card.Body className="user-view">
                    <Card.Title className="user-name">Username: {profileData.Username}</Card.Title>
                    <Card.Text className="user-description">Email Address: {profileData.Email}</Card.Text>
                    <Card.Text className="user-birthday">Birthday: {this.dateConvert(profileData.Birthday)}</Card.Text>
                    <Card.Text className="user-favorites">Favorite Movies: {profileData.FavoriteMovies}</Card.Text>
                    <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}