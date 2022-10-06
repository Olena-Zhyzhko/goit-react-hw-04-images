import { useState, useEffect } from 'react'
import './ImageGallery.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import { fetchImages, PER_PAGE } from 'components/fetchImages'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import Modal from 'components/Modal/Modal'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


export default function ImageGallery({ searchImage }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [largeImage, setLargeImage] = useState('');
    const [tags, setTags] = useState('');
    

    async function fetchImagesResult(currentPage, searchImage) {
        setLoading(true);
            try {
                const responseData = await fetchImages(currentPage, searchImage);
                handleResult(responseData);
            }
            catch (error) {
                setError(error);
            }
            finally {
               setLoading(false) 
            }
    };

function handleResult(responseData) {
        const searchResult = responseData.hits;
        const totalResults = responseData.totalHits;
        const maxPage = Math.ceil(totalResults / PER_PAGE);

        if (searchResult.length === 0) {
            return toast.error("Sorry, there are no images matching your search query. Please try again.");
        } else {
            if (currentPage === 1) {
                toast.success(`Hooray! We found ${totalResults} images.`);
            }

            const imageInfo = responseData.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({id, webformatURL, largeImageURL, tags,}))
            setImages(prevState => [...prevState, ...imageInfo]);

        }
    
        if (maxPage === currentPage) {
           toast.warn("We're sorry, but you've reached the end of search results.");
        }
}

    useEffect(() => {
        if (searchImage === '') {
            return
        }
        setImages([]);
        setCurrentPage(1);
        fetchImagesResult(1, searchImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchImage]);

    useEffect(() => {
        if (currentPage !== 1 && searchImage !== '') {
            fetchImagesResult(currentPage, searchImage);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, searchImage]);
    
    const changeCurrentPage = () => {
        setCurrentPage(prevState => prevState + 1);
    }

    function openModal(largeImageURL, tags) {
        setModalOpen(true);
        setLargeImage(largeImageURL);
        setTags(tags);
    }

    function closeModal() {
        setModalOpen(false);
        setLargeImage('');
        setTags('');
    }

  return (
      <>
             {error && <p>{error.massage}</p>}
              {modalOpen && <Modal largeImage={largeImage} tags={tags} onClose={closeModal} />}
              {loading && <Loader>Загружаем</Loader>}
                <ul className="ImageGallery">
                  <ImageGalleryItem images={images} onClick={openModal} />
              </ul>
              {images.length > 0 && <Button onClick={changeCurrentPage} /> }
            </>  )
}


// export default class ImageGallery extends Component {
    // state = {
    //     images: [],
    //     loading: false,
    //     currentPage: 1,
    //     error: null,
    //     modalOpen: false,
    //     modalContent: {
    //         largeImage: "",
    //         tags: "",
    //     }
    // }

    // async fetchImagesResult(currentPage, searchImage) {
    //         this.setState({ loading: true })

    //         try {
    //             const responseData = await fetchImages(currentPage, searchImage);

    //             const imageInfo = responseData.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({id, webformatURL, largeImageURL, tags,}))

    //             this.setState((prevState) => {
    //                 return {
    //                     images: [...prevState.images, ...imageInfo]
    //                 }
    //             });
    //         }
    //         catch (error) {
    //                 this.setState({ error })
    //         }
    //         finally {
    //            this.setState({ loading: false }) 
    //         }

    // }
    
    // componentDidUpdate(prevProps, prevState) {
    //     const { searchImage } = this.props;
    //     const { currentPage } = this.state;
        
    //     if (searchImage !== prevProps.searchImage) {
    //         this.setState({
    //             images: [],
    //             currentPage: 1,
    //         })
    //         this.fetchImagesResult(1, searchImage);
    //     }

    //     if (currentPage !== prevState.currentPage &&
    //         currentPage !== 1) {
    //         this.fetchImagesResult(currentPage, searchImage);
    //     }
    // }
    
//     changeCurrentPage = () => {
//         this.setState((prevState) => {
//              console.log(prevState.currentPage);

//             return {
//                 currentPage: prevState.currentPage + 1,
//             }
//         });
//     }

//     openModal = (modalContent) => {
//         return (this.setState({
//             modalOpen: true,
//             modalContent,
//         }))
// }

//     closeModal = () => {
//         return (this.setState({
//             modalOpen: false,
//             modalContent: {
//                 largeImage: '',
//                 tags: '',
//             }
//         })) 
//     }

//     render() {
//         const { modalOpen, modalContent, loading, images } = this.state;
//         const { closeModal, openModal, changeCurrentPage } = this;
//       return (
//           <>
//               {modalOpen && <Modal modalContent={modalContent} onClose={closeModal} />}
//               {loading && <Loader>Загружаем</Loader>}
//                 <ul className="ImageGallery">
//                   <ImageGalleryItem images={images} onClick={openModal} />
//               </ul>
//               {images.length > 0 && <Button onClick={changeCurrentPage} /> }
//             </>
//         )
//     }
// }

ImageGallery.propTypes = {
        searchImage: PropTypes.string.isRequired, 
}
