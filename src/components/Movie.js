import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({id, year, title, genres, runtime, rating, likes, summary, background}) {
  return (
    <div className="movie_detail">
      <div className="back_image">
        <img src={background}></img>
      </div>
      <div className="info_box">
        <div className="movie_title">
          <h3>{title}</h3>
          <p>{genres}</p>
        </div> 
        <div className="movie_info">
          <h3>영화 정보</h3>
          <div className="infos">
            <p className="runtime">{runtime}분</p>
            <p className="rating">평점: {rating}</p>
            <p className="like">좋아요: {likes}</p>
          </div>
        </div>
        <div className="summary_box">
          <h3>줄거리</h3>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  )
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  runtime: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

export default Movie;
