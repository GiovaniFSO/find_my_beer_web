import Api from "./api";

const PubService = {
  index: (latitude, longitude) => Api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`)
}

export default PubService;