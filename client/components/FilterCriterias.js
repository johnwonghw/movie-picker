import React from 'react';
import axios from 'axios';

class FilterCriterias extends React.Component {
  constructor() {
    super();

    this.state = {
      genre: '',
      genreList: [],
      currMovieList : [],
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.getGenreList = this.getGenreList.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentWillMount () {
    this.getGenreList()
  }
 

  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
}

handleSelectChange(e) {
  this.setState({genre: e.target.value})
}

  onSubmit(e) {
    e.preventDefault();
  console.log(this.state)
  // get our form data out of state
  const { genre } = this.state;

  axios.post('/filter', this.state)
    .then((res) => {
      var movieList = JSON.parse(res.data)
      this.setState({currMovieList: movieList['results']})
      console.log(this.state.currMovieList)
    });
  }

  getGenreList() {
    axios({
      method:'get',
      url:'https://api.themoviedb.org/3/genre/movie/list?api_key=e4e82c1a96616751394b36fcb138e94a&language=en-US',
    })
      .then((response) => {
        this.setState({genreList: response.data.genres})
    });
  }


  render() {
    const { genre } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {/* <input type="text" value={genre} name="genre" onChange={this.onChange} /> */}
          <select onChange={this.handleSelectChange}>
            {this.state.genreList.map((genre, i) => {
              return(<option key={i} value={genre.id} name="genre">{genre.name}</option>)
            })}
          </select>
          <button type="submit" onClick={this.onSubmit}>Submit</button>
        </form>
        <div>
          
            {this.state.currMovieList.map((movie, i) => {
              return (<div key={i}>{movie.title}</div>)
            })}
          
        </div>
      </div>
    );
  }
}


export default FilterCriterias;