import { useCallback, useMemo, useState } from 'react';
import store, { useRecoilCallback, useGotoRecoilSnapshot } from '@store';

import {
  useCartAddItems,
  useCartUpdateItem,
  useProductInventoryByHandle,
} from '@backpackjs/storefront';

import { useSelectedPlan, useIntelligems } from '@hooks';

export const useProductBundle = ({
  selectedVariant,
  product,
  productAlreadyInCart,
}) => {
  const gotoSnapshot = useGotoRecoilSnapshot();
  const { testGroup } = useIntelligems();
  const [selectedPlan] = useSelectedPlan();
  const [isAddStarted, setIsAddStarted] = useState(false);
  const { cartAddItems, ...addItemStatus } = useCartAddItems();
  const { cartUpdateItem, ...updateItemStatus } = useCartUpdateItem();
  const { inventory, ...inventoryStatus } = useProductInventoryByHandle({
    handle: selectedVariant?.product?.handle,
    withQuantity: true,
  });

  const isGiftCard = selectedVariant?.sku === 'GIFTCARD';

  // use live inventory data
  const variantInventory = inventory
    ? inventory?.variants?.[selectedVariant?.storefrontId] ||
      inventory?.variants?.[selectedVariant?.id]
    : null;

  const isSoldOut = variantInventory
    ? variantInventory.quantityAvailable <= 0 && !isGiftCard
    : false;

  const isPreOrder =
    isSoldOut && selectedVariant?.inventoryPolicy === 'CONTINUE';

  const toggleCartSidebar = useRecoilCallback(({ snapshot }) => async () => {
    const release = snapshot.retain();
    try {
      const updatedState = snapshot
        .map(({ set }) => set(store.modal, null))
        .map(({ set }) => set(store.overlay, true))
        .map(({ set }) => set(store.sidebar, 'cart'));

      // update state
      gotoSnapshot(updatedState);
    } finally {
      release();
    }
  });

  // add oneTime and subs
  const productBundle = useCallback(async () => {
    if (!selectedVariant || isSoldOut) return;
    let cart;
    setIsAddStarted(true);
    if (productAlreadyInCart) {
      const { id, quantity } = productAlreadyInCart;
      let updatedItem;
      if(isNaN(store.quantity)){
        store.quantity = 1;
      }
      if (store.quantity === 1) {
        updatedItem = {
          lineId: id,
          quantity: quantity + 1,
          attributes: [{ key: '_item', value: 'most-popular-best-value' }],
          properties: {
            '`_item`': 'most-popular-best-value',
          },
        };
      } else {
        updatedItem = {
          lineId: id,
          quantity: quantity + store.quantity,
          attributes: [{ key: '_item', value: 'most-popular-best-value' }],
          properties: {
            '`_item`': 'most-popular-best-value',
          },
        };
      }
      if (testGroup?.id) {
        updatedItem.attributes = [{ key: '_igTestGroup', value: testGroup.id }];
      }
      cart = await cartUpdateItem(updatedItem);
    } else {
      let item;
      if (store.quantity === 1) {
        item = {
          merchandiseId: selectedVariant.storefrontId,
          quantity: 1,
          attributes: [{ key: '_item', value: 'most-popular-best-value' }],
          properties: {
            '`_item`': 'most-popular-best-value',
          },
        };
      } else {
        item = {
          merchandiseId: selectedVariant.storefrontId,
          quantity: store.quantity,
          attributes: [{ key: '_item', value: 'most-popular-best-value' }],
          properties: {
            '`_item`': 'most-popular-best-value',
          },
        };
      }

      if (testGroup?.id) {
        item.attributes = [{ key: '_igTestGroup', value: testGroup.id }];
      }

      // if selling plan is selected we the subscription
      if (selectedPlan) {
        item.sellingPlanId = selectedPlan.id;
      }
      cart = await cartAddItems([item]);
    }

    setIsAddStarted(false);
    if (cart) {
      toggleCartSidebar();
    }
    // store.quantity = 1;
  }, [
    selectedVariant?.id,
    isSoldOut,
    selectedPlan?.id,
    productAlreadyInCart,
    testGroup,
  ]);

  const addItemStatusByProduct = useMemo(() => {
    const defaultStatus = productAlreadyInCart
      ? updateItemStatus
      : addItemStatus;
    return isAddStarted
      ? defaultStatus
      : {
          ...defaultStatus,
          started: false,
          success: false,
          finished: false,
        };
  }, [addItemStatus, updateItemStatus, isAddStarted, productAlreadyInCart]);

  return [
    {
      isPreOrder,
      isSoldOut,
      selectedPlan,
      status: {
        addItem: addItemStatusByProduct,
        inventory: inventoryStatus,
      },
    },
    {
      productBundle,
      toggleCartSidebar,
    },
  ];
};
