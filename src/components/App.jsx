import { Component } from "react";
import './App.css';
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Searchbar from 'components/Searchbar/Searchbar'

export class App extends Component {
  state = {
    searchImage: '',
  };

  hangleFormSubmit = (searchImage) => {
    this.setState({ searchImage })
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.hangleFormSubmit} />
        <ImageGallery  searchImage={this.state.searchImage} />
      </div>
    );
  }
};