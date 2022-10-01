import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';


export default function Button({ onClick }) {
  return (
      <div>
          <button type='button' className='Button' onClick={() => onClick()}>Load more</button>
      </div>
  )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}