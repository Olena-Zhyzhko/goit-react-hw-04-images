import './Modal.css'
import { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');


export default class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown', this.closeModal);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.onClose();
        };
    }

    render() {
        const { modalContent } = this.props;
        const { largeImageURL, tags } = modalContent;
        return createPortal(
            <div className='Overlay' onClick={this.closeModal} >
                <div className='Modal'>
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    modalContent: PropTypes.exact({ 
        largeImage: PropTypes.string.isRequired, 
        tags: PropTypes.string.isRequired, 
        } ),
    onClose: PropTypes.func.isRequired,
}