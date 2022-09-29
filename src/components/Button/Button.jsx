// import { Component } from 'react'

// export default class Button extends Component {
// //     handleBtnLoadMore() {
// //         console.log('клик лоад мо')
// //         this.props.onClick();
// // }

//   render() {
//     return (
//       <div>
//           <button type='button' onClick={this.handleBtnLoadMore}>Load more</button>
//       </div>
//     )
//   }
// }

import React from 'react'

export default function Button({ onClick }) {
  return (
      <div>
          <button type='button' onClick={() => onClick()}>Load more</button>
      </div>
  )
}
