import React from 'react';
import './ImageGalleryItem.css'
import PropTypes from 'prop-types';


export default function ImageGalleryItem({ images, onClick }) {
    return (
        <>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <li key={id} className="ImageGalleryItem">
                    <img src={webformatURL} alt={tags} onClick={() => onClick({largeImageURL, tags})} className='ImageGalleryItem-image'/>
                </li>
            ))}
        </>
    )
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.exact({ 
        id: PropTypes.number.isRequired, 
        webformatURL: PropTypes.string.isRequired, 
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        } )),
    onClick: PropTypes.func.isRequired,
}