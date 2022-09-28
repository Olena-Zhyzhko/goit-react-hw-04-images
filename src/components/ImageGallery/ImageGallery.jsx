// import React from 'react'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import { fetchImages } from 'components/fetchImages'

import { Component } from 'react'

export default class ImageGallery extends Component {
    state = {
        images: [],
        loading: false,
        currentPage: 1,
        error: null,
    }

    async componentDidUpdate(prevPros) {
        if (this.props.searchImage !== prevPros.searchImage) {
            const { searchImage } = this.props;
            const { currentPage } = this.state;

            this.setState({ loading: true })

            try {
                const responseData = await fetchImages(currentPage, searchImage);
                console.log(responseData.hits);

                this.setState((prevState) => {
                    console.log(prevState.images);
                    return {
                        images: [...prevState.images, ...responseData.hits]
                    }
                });
            }
            catch (error) {
                    this.setState({ error })
            }
            finally {
               this.setState({ loading: false }) 
            }
        }
    }
    

  render() {
      return (
            <>
              {/* {this.state.loading && <Loader>Загружаем</Loader>} */}
                <ul className="gallery">
                   <ImageGalleryItem images={this.state.images} />
              </ul>
              {/* {this.state.images.length && <Button>Load more</Button> } */}
            </>
        )
    }
}

{/* <Loader></Loader> */ }
{/* <Button></Button> */}