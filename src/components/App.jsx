import { Component } from "react";
// import PropTypes from 'prop-types';
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Searchbar from 'components/Searchbar/Searchbar'


export class App extends Component {
  state = {
    images: [],
    searchImage: '',
    loading: false,
    currentPage: 1,
  };

  

  hangleFormSubmit = (searchImage) => {
    this.setState({ searchImage })
}

  // postImages = async () => {
  //   // try {
  //     const { currentPage, searchImage } = this.state;
  //   // const currentPage = 1;
  //   // console.log(searchImage, this.state.currentPage)
  //   this.setState({ loading: true, })
  //   try {
  //     const responseData = await fetchImages(currentPage, searchImage);
  //     console.log(responseData.hits);
     
  //     // const newImeges = responseData.hits.map(({ id, webformatURL, largeImageURL }) => {
  //     //   return { id, webformatURL, largeImageURL }
  //     // })
  //     // console.log(newImeges);
    
  //     this.setState((prevState) => {
  //       console.log(prevState.images);
  //     return {
  //       images: [...prevState.images, ...responseData]
  //     }
  //     })
  //           console.log(this.state.image);

  //     // this.addImages(responseData);

  //     // handleResult(responseData);
  //   }
  //   catch {
  //     // error => {
  //     //   console.log(error)
  //     // }
  //   }
  // }


  render() {
    // console.log(Number.isNaN(this.state.currentPage));

    return (
      <div>
        {/* <Loader></Loader> */}
        <Searchbar onSubmit={this.hangleFormSubmit} />
        <ImageGallery searchImage={this.state.searchImage}></ImageGallery>
        {/* <Button></Button> */}
      </div>
    );
  }
};

