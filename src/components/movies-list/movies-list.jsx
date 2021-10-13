import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <Col>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map(m => (
            <Col lg={4} md={6} key={m._id}>
                <MovieCard movieData={m} />
                {/* <MovieCard profileData={JSON.parse(localStorage.getItem('userData'))} /> */}
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(MoviesList);