function getRangeValues(price) {
  let minValue = Infinity;
  let maxValue = 0;
  for (let i = 0; i < price.length; i++) {
    let [min, max] = price[i].split("-").map(Number);
    minValue = Math.min(minValue, min);
    maxValue = Math.max(maxValue, max);
  }
  return { min: minValue, max: maxValue };
}

const filteredItems = (filterArr, product) => {
  let filterProducts = product;

  if (filterArr.color.length > 0) {
    filterProducts = filterProducts.filter((item) =>
      filterArr.color.includes(item.color)
    );
  }

  if (filterArr.gender.length > 0) {
    filterProducts = filterProducts.filter((item) =>
      filterArr.gender.includes(item.gender)
    );
  }

  if (filterArr.type.length > 0) {
    filterProducts = filterProducts.filter((item) =>
      filterArr.type.includes(item.type)
    );
  }

  if (filterArr.price.length > 0) {
    const { min, max } = getRangeValues(filterArr.price);
    filterProducts = filterProducts.filter(
      (item) => item.price >= min && item.price <= max
    );
  }

  return filterProducts;
};

export default filteredItems;
