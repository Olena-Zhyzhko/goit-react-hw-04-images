import { Component } from 'react'
import './ImageGallery.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import { fetchImages } from 'components/fetchImages'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import Modal from 'components/Modal/Modal'
import PropTypes from 'prop-types';


export default class ImageGallery extends Component {
    state = {
        images: [],
        loading: false,
        currentPage: 1,
        error: null,
        modalOpen: false,
        modalContent: {
            largeImage: "",
            tags: "",
        }
    }

    async fetchImagesResult(currentPage, searchImage) {
            this.setState({ loading: true })

            try {
                const responseData = await fetchImages(currentPage, searchImage);

                const imageInfo = responseData.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({id, webformatURL, largeImageURL, tags,}))

                this.setState((prevState) => {
                    return {
                        images: [...prevState.images, ...imageInfo]
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
    
    componentDidUpdate(prevProps, prevState) {
        const { searchImage } = this.props;
        const { currentPage } = this.state;
        
        if (searchImage !== prevProps.searchImage) {
            this.setState({
                images: [],
                currentPage: 1,
            })
            this.fetchImagesResult(1, searchImage);
        }

        if (currentPage !== prevState.currentPage &&
            currentPage !== 1) {
            this.fetchImagesResult(currentPage, searchImage);
        }
    }
    
    changeCurrentPage = () => {
        this.setState((prevState) => {
             console.log(prevState.currentPage);

            return {
                currentPage: prevState.currentPage + 1,
            }
        });
    }

    openModal = (modalContent) => {
        return (this.setState({
            modalOpen: true,
            modalContent,
        }))
}

    closeModal = () => {
        return (this.setState({
            modalOpen: false,
            modalContent: {
                largeImage: '',
                tags: '',
            }
        })) 
    }

  render() {
      return (
          <>
              {this.state.modalOpen && <Modal modalContent={this.state.modalContent} onClose={this.closeModal} />}
              {this.state.loading && <Loader>Загружаем</Loader>}
                <ul className="ImageGallery">
                  <ImageGalleryItem images={this.state.images} onClick={this.openModal} />
              </ul>
              {this.state.images.length > 0 && <Button onClick={this.changeCurrentPage} /> }
            </>
        )
    }
}

ImageGallery.propTypes = {
        searchImage: PropTypes.string.isRequired, 
}
