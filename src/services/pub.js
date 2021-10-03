import Api from './api';

const PubService = {
  show: (google_place_id) => Api.get(`/stores/${google_place_id}`),
  index: (latitude, longitude) => Api.get(`/stores`, { params: { latitudoe: latitude, longitude: longitude } }),
}

export default PubService