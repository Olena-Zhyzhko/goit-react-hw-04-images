import React from 'react'

export default function ImageGalleryItem({ images }) {
    console.log(images);
    return (
        <>
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <li key={id} className="gallery-item">
                    <img src={webformatURL} alt="" />
                </li>
            ))}
        </>
    )
}

// {contacts.map(({ id, name, number }) => (
//                 <Item key={id}>{name}: {number}
//                     <BtnDelete type='button' onClick={() => removeContact(id)}>Delete</BtnDelete>
//                 </Item>
//             ))}