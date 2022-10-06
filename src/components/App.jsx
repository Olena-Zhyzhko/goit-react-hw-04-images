import { useState } from "react";
import './App.css';
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Searchbar from 'components/Searchbar/Searchbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css' ;

export function App() {
  const [searchImage, setSearchImage] = useState('');

  const hangleFormSubmit = (searchImage) => {
    setSearchImage(searchImage);
  }

  return (
      <div>
        <Searchbar onSubmit={hangleFormSubmit} />
      <ImageGallery searchImage={searchImage} />
      <ToastContainer />
      </div>
  )
}


// export class App extends Component {
//   state = {
//     searchImage: '',
//   };

//   hangleFormSubmit = (searchImage) => {
//     this.setState({ searchImage })
//   }

//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.hangleFormSubmit} />
//         <ImageGallery  searchImage={this.state.searchImage} />
//       </div>
//     );
//   }
// };