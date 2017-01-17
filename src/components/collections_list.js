import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFavorites } from '../actions/index';
import { bindActionCreators } from 'redux';

class CollectionList extends Component {

  componentWillMount() {
    this.props.getFavorites();
  }

  renderList() {
    return this.props.favorites.all.map((movie) => {
      return (
        <li
          key={movie.imdbID}
          className="list-group-item">
          {movie.Title}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group col-md-2">
        Favorites
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { favorites: state.favorites };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFavorites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);