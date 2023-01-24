module.exports = {
  format_date: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
  calc_purchase_price: (stockPrice, numShares) => {
    return stockPrice * numShares;
  }
};
