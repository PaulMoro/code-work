export const conditionsAndFunctions = {
  'bath-bundles': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/bath-one.svg',
      svgTwo: '/svgs/bundles/bath-two.svg',
      svgThree: '/svgs/bundles/bath-three.svg',
      packOne: 'Single 2 Pack',
      packTwo: 'Double 2 Pack',
      packThree: 'Triple 2 Pack',
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 3}`,
      priceThree: `${Number(product?.compareAtPrice) - 8}`,
      saveTwo: 'Save $6',
      saveThree: 'Save $24',
      quantityTwo: 2,
      quantityThree: 3,
    };
    return dataBoxes;
  },
  'sunscreen': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/suncreen-one.svg',
      svgTwo: '/svgs/bundles/suncreen-two.svg',
      svgThree: '/svgs/bundles/suncreen-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 1}`,
      priceThree: `${Number(product?.compareAtPrice) - 3}`,
      saveTwo: 'Save $2',
      saveThree: 'Save $12',
    };
    return dataBoxes;
  },
  'hair-towels': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 1}`,
      priceThree: `${Number(product?.compareAtPrice) - 3}`,
      saveTwo: 'Save $2',
      saveThree: 'Save $12',
    };
    return dataBoxes;
  },
  'party-blankets': (product) => {
    const priceProduct = Number(product?.compareAtPrice);
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: 0,
      priceTwo: 0,
      priceThree: 0,
      saveTwo: '',
      saveThree: '',
    };
    if (priceProduct === 148) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 6}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 15}`;
      dataBoxes.saveTwo = 'Save $12';
      dataBoxes.saveThree = 'Save $60';
    } else if (priceProduct === 58) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 6}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 15}`;
      dataBoxes.saveTwo = 'Save $12';
      dataBoxes.saveThree = 'Save $60';
    } else if (priceProduct === 168) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 7}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 17}`;
      dataBoxes.saveTwo = 'Save $14';
      dataBoxes.saveThree = 'Save $68';
    }
    return dataBoxes;
  },
  'towels': (product) => {
    const priceProduct = Number(product?.compareAtPrice);
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: 0,
      priceTwo: 0,
      priceThree: 4,
      saveTwo: '',
      saveThree: '',
    };
    if (priceProduct === 48) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 2}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 5}`;
      dataBoxes.saveTwo = 'Save $4';
      dataBoxes.saveThree = 'Save $20';
    } else if (priceProduct === 68) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 3}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 8}`;
      dataBoxes.saveTwo = 'Save $6';
      dataBoxes.saveThree = 'Save $32';
    }
    return dataBoxes;
  },
  'xl-towels': (product) => {
    const priceProduct = Number(product?.compareAtPrice);
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: 0,
      priceTwo: 0,
      priceThree: 0,
      saveTwo: '',
      saveThree: '',
    };
    if (priceProduct === 78) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 3}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 8}`;
      dataBoxes.saveTwo = 'Save $6';
      dataBoxes.saveThree = 'Save $32';
    } else if (priceProduct === 68) {
      dataBoxes.price = `$${Number(product?.compareAtPrice)}`;
      dataBoxes.priceTwo = `${Number(product?.compareAtPrice) - 3}`;
      dataBoxes.priceThree = `${Number(product?.compareAtPrice) - 8}`;
      dataBoxes.saveTwo = 'Save $6';
      dataBoxes.saveThree = 'Save $32';
    }
    return dataBoxes;
  },
  'xl-towels-one': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 3}`,
      priceThree: `${Number(product?.compareAtPrice) - 8}`,
      saveTwo: 'Save $6',
      saveThree: 'Save $32',
    };
    return dataBoxes;
  },
  'towels-one': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 2}`,
      priceThree: `${Number(product?.compareAtPrice) - 5}`,
      saveTwo: 'Save $4',
      saveThree: 'Save $20',
    };
    return dataBoxes;
  },
  'towels-two': (product) => {
    const priceProduct = Number(product?.compareAtPrice);
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 3}`,
      priceThree: `${Number(product?.compareAtPrice) - 8}`,
      saveTwo: 'Save $6',
      saveThree: 'Save $32',
    };
    return dataBoxes;
  },
  'party-blankets-one': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 6}`,
      priceThree: `${Number(product?.compareAtPrice) - 15}`,
      saveTwo: 'Save $12',
      saveThree: 'Save $60',
    };
    return dataBoxes;
  },
  'party-blankets-two': (product) => {
    const dataBoxes = {
      svgOne: '/svgs/bundles/blankets-one.svg',
      svgTwo: '/svgs/bundles/blankets-two.svg',
      svgThree: '/svgs/bundles/blankets-three.svg',
      packOne: '1 Pack',
      packTwo: '2 Pack',
      packThree: '4 Pack',
      quantityTwo: 2,
      quantityThree: 4,
      price: `$${Number(product?.compareAtPrice)}`,
      priceTwo: `${Number(product?.compareAtPrice) - 7}`,
      priceThree: `${Number(product?.compareAtPrice) - 17}`,
      saveTwo: 'Save $14',
      saveThree: 'Save $68',
    };
    return dataBoxes;
  },
};
