import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';
import './movies-list.scss';

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (!movies) return <div className="main-view" />;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    return <>
        <Col lg={9} md={8} className="search-input">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>

        {filteredMovies.map(m => (
            <Col lg={4} md={6} key={m._id}>
                <MovieCard movieData={m} getUser={props.getUser} />
            </Col>
        ))}
    </>;
}

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);