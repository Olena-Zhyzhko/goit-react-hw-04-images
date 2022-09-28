import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { fetchImages } from 'components/fetchImages'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Searchbar from 'components/Searchbar/Searchbar'

export class App extends Component {
  state = {
    images: [],
    // currentPage: 1,
  };
 
  // handleResults = (searchImage) => {
  //   console.log(searchImage)
  //   const currentPage = 1;
  //   const searchResult = fetchImages(currentPage, searchImage);
  //   console.log(searchResult);
  // }

  // addImages = (responseData) => {
  //         console.log(responseData.hits);

  //   const newImeges = responseData.hits.map(({ id, webformatURL, largeImageURL }) => {
  //       return {id, webformatURL, largeImageURL}
  //   })
  //             console.log(newImeges);
    
  //   this.setState((prevState) => {
  //     return {
  //       images: [...prevState.images, ...newImeges]
  //     }
  //   })
  // }



  async searchImages(searchImage) {
    // try {
      // const { currentPage, images } = this.state;
      const currentPage = 1;
    try {
      const responseData = await fetchImages(currentPage, searchImage);
                console.log(responseData.hits);
      const newImeges = responseData.hits.map(({ id, webformatURL, largeImageURL }) => {
        // const { id, webformatURL, largeImageURL } = image;
        return {id, webformatURL, largeImageURL}
    })
      console.log(newImeges);
    
      this.setState(({images}) => {
        // console.log(prevState);
      return {
        images: [...images, ...newImeges]
      }
      })
            console.log(this.state.image);

      // this.addImages(responseData);

      // handleResult(responseData);
    }
    catch {
      // error => {
      //   console.log(error)
      // }
    }
  }


  render() {
                console.log(this.state.image);

    return (
      <div>
        {/* <Loader></Loader> */}
        <Searchbar onSubmit={this.searchImages} />
        <ImageGallery images={this.state.images}></ImageGallery>
        {/* <Button></Button> */}
      </div>
    );
  }
};

