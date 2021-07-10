import React from 'react';
import "./Search.css";
import Movie from './Movie';
import {naverMoviesApi} from '../api';

class Search extends React.Component {
  state = {
    isLoading: false,
    isSearched: false,
    movies: [],
    idx: null,
    movie_id: null,
    likecount: null
  };

  getSearchMovie = async () => {
    console.log('search Movie');
    const search = this.state.value;

    try {
      if (search === "") {
        this.setState({movies: [], isLoading: false, isClicked: false})
      } else {
        this.setState({movies: [], isLoading: true})
        const searchData = String(search);
        const searchArr =  searchData.split(" ");
        const {data: {
            data : { movies }
          }} = await naverMoviesApi.search(searchArr[0], searchArr[1]);
        //alert("(Loading 메시지 확인중...)");
        this.setState({movies: movies, isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getSearchMovie();
  };

  handleChange = (e : any) => {
    this.setState({value: e.target.value});
  };

  handleSubmit = (e : any) => {
    e.preventDefault();
    this.getSearchMovie();
    this.setState({isClicked: true});
  };

  buttonClicked = (e, i) => {
    this.setState({idx: e});
    this.getLikecount(i);
  };

  getLikecount = async (i) => {
    const {data: { data : { movie : { like_count }
      }}} = await naverMoviesApi.search_like(i);
    this.setState({likecount: like_count});
  }

  render() {
    const { movies, isLoading, isClicked, idx, likecount } = this.state;
    const buttons = movies.map((movie, index) => <img key={movie.id} id={movie.id} src={movie.medium_cover_image} onClick={() => this.buttonClicked(index, movie.id)}/>);
    const movie_detail = movies.map((movie, index) => {
      return (
        <Movie key={movie.id} id={movie.id} year={movie.year} title={movie.title} genres={movie.genres} runtime={movie.runtime} rating={movie.rating} likes={likecount} summary={movie.summary} background={movie.large_cover_image} index={index}/>
      )
    });
  
    return (<section className="container">
      {
        isLoading
          ? (<div className="loader">
            <span className="loader__text">({this.state.name}) Loading... {this.state.value}</span>
          </div>)
          : (<form onSubmit={this.handleSubmit}>
              <div className="input_div">
                <h1 className="title">yts.mx 영화 정보</h1>
                <div className="search_div">
                  <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="입력포맷:<정렬기준><검색개수> 예:like 5"/><button className="addButton">+</button>
                </div>
              </div>
              <div className="buttons_div" style={isClicked ? {display:'flex'} : {display:'none'}}>
                {buttons}
              </div>
              <div className="movie_div">
                {movie_detail[idx]}
              </div>
          </form>)
      }
    </section>);
  }
}

export default Search;
