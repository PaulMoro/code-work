import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Box, Paragraph, Progress, Flex } from 'theme-ui';
import {
  useSettings,
  useCart,
  useCartRemoveItem,
  useCartAddItems,
} from '@backpackjs/storefront';
import { Svg } from '@snippets/Svg';
import { themed } from './SidecartGamification.theme';

export const SidecartGamification = themed(({ theme }) => {
  const { cartAddItems, ...addItemStatus } = useCartAddItems();
  const { cartRemoveItem, ...removeStatus } = useCartRemoveItem({
    autoReset: 100,
  });

  const [stateForReadyFunction, UseStateForReadyFunction] = useState(false);
  const [avoidProductOne, UseAvoidProductOne] = useState(true);
  const [avoidProductTwo, UseAvoidProductTwo] = useState(true);

  const settings = useSettings();
  const { sidecartGamification } = { ...settings?.cart };

  const productOne =
    Number(sidecartGamification?.productGiftOneId) || 13591169499211;
  const productTwo =
    Number(sidecartGamification?.productGiftTwoId) || 40024739512395;

  const cart = useCart();
  const cartRef = useRef();

  useEffect(() => {
    if (cartRef.current) {
      // This will run on updates, as upon initial render cartRef.current should be undefined
      if (cartRef.current.updatedAt !== cart.updatedAt) {
        UseStateForReadyFunction(true);
        if (cartRef.current.lines.length > cart.lines.length) {
          const objectMissing = cartRef.current.lines.find(
            (objeto) => !cart.lines.some((obj) => obj.id === objeto.id)
          );
          if (
            objectMissing.variant.id ===
            `gid://shopify/ProductVariant/${productOne}`
          ) {
            UseAvoidProductOne(false);
          } else if (
            objectMissing.variant.id ===
            `gid://shopify/ProductVariant/${productTwo}`
          ) {
            UseAvoidProductTwo(false);
          }
        }
      }
    }
    cartRef.current = cart; // This will run both on mount and updates, setting the current cart
  }, [cart]);

  useLayoutEffect(() => {
    UseStateForReadyFunction(true);
  }, []);

  if (!cart || !sidecartGamification?.progressEnabled) return null;

  const valueOne = sidecartGamification?.valueOne;
  const headingOne = sidecartGamification?.headingOne;
  const porcentOne = sidecartGamification?.porcentOne;
  const valueTwo = sidecartGamification?.valueTwo;
  const headingTwo = sidecartGamification?.headingTwo;
  const porcentTwo = sidecartGamification?.porcentTwo;
  const valueThree = sidecartGamification?.valueThree;
  const headingThree = sidecartGamification?.headingThree;
  const porcentThree = sidecartGamification?.porcentThree;
  const goalText = sidecartGamification?.complete;

  const productGiftOne = {
    selectedVariant: `gid://shopify/ProductVariant/${productOne}`,
  };
  const productGiftTwo = {
    selectedVariant: `gid://shopify/ProductVariant/${productTwo}`,
  };

  let text;
  let textBold;
  let textLight;
  let porcentBar;

  const addToCart = async (product, position) => {
    // add oneTime
    if (!product) return;

    let attributeDiscount;
    let propertiesDiscount;
    if (position === 1) {
      attributeDiscount = '_gamification_with_gift_first';
      propertiesDiscount = '_gamification_with_gift_first';
    } else if (position === 2) {
      attributeDiscount = '_gamification_with_gift_second';
      propertiesDiscount = '_gamification_with_gift_second';
    }

    const item = {
      merchandiseId: product.selectedVariant,
      quantity: 1,
      attributes: [
        { key: attributeDiscount, value: 'true' },
        { key: '_gamification_with_gift', value: 'true' },
      ],
      properties: {
        propertiesDiscount: 'true',
        _gamification_with_gift: 'true',
      },
    };
    await cartAddItems([item]);
  };

  const checkPositionGamification = async (position) => {
    if (stateForReadyFunction) {
      UseStateForReadyFunction(false);
      const productAlreadyInCartGiftOne = cart?.lines.find(
        (cartItem) => cartItem.variant.id === productGiftOne?.selectedVariant
      );
      const productAlreadyInCartGiftTwo = cart?.lines.find(
        (cartItem) => cartItem.variant.id === productGiftTwo?.selectedVariant
      );
      if (position === 3) {
        if (
          productAlreadyInCartGiftOne === undefined &&
          stateForReadyFunction &&
          avoidProductOne
        ) {
          await addToCart(productGiftOne, 1);
        }
        if (
          productAlreadyInCartGiftTwo === undefined &&
          stateForReadyFunction &&
          avoidProductTwo
        ) {
          await addToCart(productGiftTwo, 2);
        }
      } else if (position === 2 || position === 1) {
        if (
          productAlreadyInCartGiftOne === undefined &&
          stateForReadyFunction &&
          avoidProductOne
        ) {
          await addToCart(productGiftOne, 1);
        }
        if (
          productAlreadyInCartGiftTwo !== undefined &&
          avoidProductTwo &&
          Number(cart?.estimatedCost?.subtotalAmount?.amount) >= valueThree
        ) {
          await cartRemoveItem({ lineId: productAlreadyInCartGiftTwo.id });
        }
      } else if (position === 0) {
        if (
          productAlreadyInCartGiftOne !== undefined &&
          avoidProductOne &&
          Number(cart?.estimatedCost?.subtotalAmount?.amount) >= valueOne
        ) {
          await cartRemoveItem({ lineId: productAlreadyInCartGiftOne.id });
        }
        if (
          productAlreadyInCartGiftTwo !== undefined &&
          avoidProductTwo &&
          Number(cart?.estimatedCost?.subtotalAmount?.amount) >= valueThree
        ) {
          await cartRemoveItem({ lineId: productAlreadyInCartGiftTwo.id });
        }
      }
    }
  };

  const checkText = (stg) => {
    const content = stg.split('**');
    const contentLight = content[0];
    const contentBold = content[1].replace('**', '');

    textBold = contentBold;
    textLight = contentLight;
  };

  const checkAllData = () => {
    const valueCart = cart?.estimatedCost?.subtotalAmount?.amount;

    if (valueCart >= valueThree) {
      text = goalText;
      porcentBar = 100;
      checkPositionGamification(3);
    } else if (valueCart >= valueTwo) {
      const textPre = headingThree;
      const missingAmount = valueThree - valueCart;
      text = textPre.replace('$$$', `$${missingAmount.toFixed(2)}`);
      porcentBar = (valueCart * porcentThree) / valueThree;
      checkPositionGamification(2);
    } else if (valueCart >= valueOne) {
      const textPre = headingTwo;
      const missingAmount = valueTwo - valueCart;
      text = textPre.replace('$$$', `$${missingAmount.toFixed(2)}`);
      porcentBar = (valueCart * porcentTwo) / valueTwo;
      checkPositionGamification(1);
    } else {
      const textPre = headingOne;
      const missingAmount = valueOne - valueCart;
      text = textPre.replace('$$$', `$${missingAmount.toFixed(2)}`);
      porcentBar = (valueCart * porcentOne) / valueOne;
      checkPositionGamification(0);
    }
    checkText(text);
  };

  checkAllData();

  return (
    <Box sx={theme.wrap}>
      <Flex sx={theme.heading}>
        <Paragraph sx={theme.heading.light}>
          {textLight}
          <Paragraph sx={theme.heading.bold}>{textBold}</Paragraph>
        </Paragraph>
      </Flex>

      <Box sx={theme.container}>
        <Progress
          max={100}
          value={porcentBar}
          sx={{
            ...theme.progress,
          }}
        />
        <Box sx={theme.content}>
          <Svg
            sx={{
              ...theme.icon,
              left: `${porcentOne}%`,
            }}
            src="/svgs/free_gift.svg"
            alt="free gift"
            viewBox="0 0 34 34"
          />
          <Svg
            sx={{
              ...theme.icon,
              left: `${porcentTwo}%`,
            }}
            src="/svgs/free_shipping.svg"
            alt="free shipping"
            viewBox="0 0 34 34"
          />
          <Svg
            sx={{
              ...theme.icon,
              left: `${porcentThree}%`,
            }}
            src="/svgs/free_gift.svg"
            alt="free gift"
            viewBox="0 0 34 34"
          />
        </Box>
      </Box>
    </Box>
  );
});
