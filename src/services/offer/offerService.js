import http from '../../http-common';

const addOffer = async ({ token, productId, offerPrice }) => {
  return await http.post('offer/add-offer', {
    productId: productId,
    offerPrice: offerPrice
  }, {
    headers: {
      "accept": "*/*",
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    }
  });
};

const getOfferBySeller = async (id) => {
  return await http.get(`offer/get-offer-user/${id}`);
};

const getOffers = async () => {
  return await http.get('offer/get-all-offer');
};

const offerService = {
  addOffer, getOfferBySeller, getOffers
};

export default offerService;