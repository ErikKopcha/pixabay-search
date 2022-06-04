import axios from 'axios';

class Api {
  constructor() {}

  static async getGalleryData({ sQuery = '', pageIndex = 1, onSuccess, onError }) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=16107743-d1c42da392e2fe6cc2ebf6afe&q=${sQuery}&image_type=photo&orientation=horizontal&page=${pageIndex}&per_page=20`,
      );
      
      typeof onSuccess === 'function' && onSuccess(response.data, pageIndex);
    } catch (error) {
      typeof onError === 'function' && onError(error);
    }
  }
}

export default Api;
