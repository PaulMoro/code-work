/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-nested-ternary */
import { Box, Text } from 'theme-ui';
import { Svg } from '@snippets/Svg';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { StatefulButton } from '@snippets';
import { useProductDetails } from '@templates/product/ProductContext';
import { useProductQuantity } from '@hooks';
import { useCartItems, useCart } from '@backpackjs/storefront';
import store from '@store';
import { useProductBundle } from './useProductBundle';
import { themed } from './ProductBundle.theme';
import { conditionsAndFunctions } from './dataForBoxes';

export const ProductBundle = themed(
  ({
    theme,
    product,
    selectedVariant,
    sxButton,
    sxWrapper,
    variant = 'primary',
    defaultText = 'ADD TO BAG',
    handleSoldOut = () => {},
    soldOutText = 'SOLD OUT',
    showComingSoon,
    showBtn,
    dataBundle,
  }) => {
    const [stateForReadyFunction, UseStateForReadyFunction] = useState(true);

    const cartItems = useCartItems();
    const productAlreadyInCart = cartItems.find(
      (cartItem) => cartItem.variant.id === selectedVariant?.id
    );
    const [{ status, isPreOrder, isSoldOut, selectedPlan }, { productBundle }] =
      useProductBundle({ product, selectedVariant, productAlreadyInCart });
    const [{ changeQuantity, changeQuantitySecond, changeQuantityThird }] =
      useProductQuantity();

    let dataBoxes = {};
    dataBoxes = conditionsAndFunctions[dataBundle?.infoBundle](selectedVariant);

    const [selectBox, setSelectBox] = useState(2);

    const selectOneBox = () => {
      setSelectBox(1);
      changeQuantity();
    };

    const selectTwoBox = (quantity) => {
      setSelectBox(2);
      changeQuantitySecond(quantity);
    };

    const selectThreeBox = (quantity) => {
      setSelectBox(3);
      changeQuantityThird(quantity);
    };

    const titleOne = 'MOST POPULAR';

    const titleTwo = 'BEST VALUE';

    const text = status?.inventory?.success
      ? isPreOrder
        ? 'PREORDER'
        : isSoldOut && showComingSoon
        ? 'COMING SOON'
        : isSoldOut && !showComingSoon
        ? soldOutText
        : selectedPlan
        ? 'SUBSCRIBE'
        : defaultText
      : 'LOADING...';

    const checkShowBTN = () => {
      if (isSoldOut) {
        // If product is Sold Out
        return false;
      }
      if (showBtn) {
        // Validate if the product has the characteristics from ProductContext.jsx
        return false;
      } else {
        return true;
      };
    };

    const cart = useCart();
    const cartRef = useRef();
    useEffect(() => {
      if (cartRef.current) {
        // This will run on updates, as upon initial render cartRef.current should be undefined
        if (cartRef.current.updatedAt !== cart.updatedAt) {
          UseStateForReadyFunction(false);
        }
      }
      cartRef.current = cart; // This will run both on mount and updates, setting the current cart
    }, [cart]);

    useLayoutEffect(() => {
      UseStateForReadyFunction(false);
    }, []);

    if (stateForReadyFunction) {
      store.quantity = dataBoxes.quantityTwo;
    }

    return (
      <Box
        data-boxes
        sx={{
          ...theme.wrapper,
          ...sxWrapper,
          ...(checkShowBTN()
            ? {
                display: 'block',
              }
            : {
                display: 'none',
              }),
        }}
      >
        <Box sx={{ ...theme.box }}>
          <Box
            onClick={() => selectOneBox()}
            sx={{
              ...theme.initPack,
              ...theme.optionOnePack,
              ...(selectBox === 1 || selectBox === null
                ? {
                    ...theme.optionOnePack.select,
                  }
                : {
                    ...theme.optionOnePack,
                  }),
            }}
          >
            {dataBundle?.iconForBundle === 'with-icon' && (
              <Svg
                src={dataBoxes.svgOne}
                alt={dataBoxes.packOne}
                sx={{ ...theme.image }}
                width="25px"
              />
            )}
            <Text sx={{ ...theme.textPack }}>{dataBoxes.packOne}</Text>
            <Text sx={{ ...theme.text }}>{dataBoxes.price}</Text>
          </Box>
          <Box sx={{ ...theme.containerBundle }}>
            <Text sx={{ ...theme.titleOne }}>{titleOne}</Text>
            <Box
              onClick={() => selectTwoBox(dataBoxes.quantityTwo)}
              sx={{
                ...theme.initPack,
                ...theme.containerPack,
                ...theme.optionTwoPack,
                ...(selectBox === 2
                  ? {
                      ...theme.optionTwoPack.select,
                    }
                  : {
                      ...theme.optionTwoPack,
                    }),
              }}
            >
              {dataBundle?.iconForBundle === 'with-icon' && (
                <Svg
                  src={dataBoxes.svgTwo}
                  alt={dataBoxes.packTwo}
                  sx={{ ...theme.image }}
                  width="53px"
                  height="30px"
                />
              )}
              <Text sx={{ ...theme.textPack }}>{dataBoxes.packTwo}</Text>
              <Text sx={{ ...theme.text }}>${dataBoxes.priceTwo} each</Text>
              <Text sx={{ ...theme.textSave }}>{dataBoxes.saveTwo}</Text>
            </Box>
          </Box>
          <Box sx={{ ...theme.containerBundle }}>
            <Text sx={{ ...theme.titleTwo }}>{titleTwo}</Text>
            <Box
              onClick={() => selectThreeBox(dataBoxes.quantityThree)}
              sx={{
                ...theme.initPack,
                ...theme.containerPack,
                ...theme.optionThreePack,
                ...(selectBox === 3
                  ? {
                      ...theme.optionThreePack.select,
                    }
                  : {
                      ...theme.optionThreePack,
                    }),
              }}
            >
              {dataBundle?.iconForBundle === 'with-icon' && (
                <Svg
                  src={dataBoxes.svgThree}
                  alt={dataBoxes.packTwo}
                  sx={{ ...theme.image }}
                  width="83px"
                  height="30px"
                />
              )}
              <Text sx={{ ...theme.textPack }}>{dataBoxes.packThree}</Text>
              <Text sx={{ ...theme.text }}>${dataBoxes.priceThree} each</Text>
              <Text sx={{ ...theme.textSave }}>{dataBoxes.saveThree}</Text>
            </Box>
          </Box>
        </Box>

        <StatefulButton
          variant={variant}
          disabled={isSoldOut}
          sx={{
            width: '100%',
            ...theme.button,
            ...(isSoldOut
              ? {
                  ...theme.button.unavailable,
                  ...(selectedPlan
                    ? theme.button.unavailable.subscribe
                    : theme.button.unavailable.oneTime),
                }
              : {
                  ...theme.button.available,
                  ...(selectedPlan
                    ? theme.button.available.subscribe
                    : theme.button.available.oneTime),
                }),
            ...sxButton,
          }}
          {...status.addItem}
          text={{
            default: text,
            started: 'ADDING',
            success: 'ADDED',
            error: 'FAILED TO ADD',
          }}
          onClick={isSoldOut ? handleSoldOut : productBundle}
        />
      </Box>
    );
  }
);

ProductBundle.displayName = 'productBundle';
