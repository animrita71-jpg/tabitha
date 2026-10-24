import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { CURRENCIES, formatMoney } from '../data/catalog.js';

const STORAGE_KEY = 'tabitha_beads_cart_v2';

const CartContext = createContext(null);

const initialState = {
  items: [],
  currency: 'NGN',
  isCartOpen: false,
  appliedPromo: null,
  promoError: '',
};

function initCartState(defaultState) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      currency: parsed.currency === 'USD' ? 'USD' : 'NGN',
      appliedPromo: typeof parsed.appliedPromo === 'string' ? parsed.appliedPromo : null,
    };
  } catch {
    return defaultState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity } = action.payload;
      const selectedVariant = variant || (product.variants && product.variants[0]) || 'Standard';
      const qtyToAdd = Math.max(1, Number(quantity) || 1);
      const cartKey = `${product.id}::${selectedVariant}`;

      const existingIndex = state.items.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const nextItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
        return { ...state, items: nextItems };
      }

      const newItem = {
        cartKey,
        id: product.id,
        name: product.name,
        categoryLabel: product.categoryLabel,
        priceNgn: product.priceNgn,
        image: product.image,
        imageAlt: product.imageAlt,
        variant: selectedVariant,
        quantity: qtyToAdd,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case 'UPDATE_QUANTITY': {
      const { cartKey, quantity } = action.payload;
      const nextQty = Number(quantity);
      if (nextQty <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.cartKey !== cartKey),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: nextQty } : item
        ),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.cartKey !== action.payload),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        appliedPromo: null,
        promoError: '',
      };
    }

    case 'SET_CURRENCY': {
      return {
        ...state,
        currency: action.payload === 'USD' ? 'USD' : 'NGN',
      };
    }

    case 'OPEN_CART':
      return { ...state, isCartOpen: true };

    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };

    case 'APPLY_PROMO': {
      const code = String(action.payload || '').trim().toUpperCase();
      if (code === 'TABITHA10' || code === 'ASO-EBI10') {
        return { ...state, appliedPromo: code, promoError: '' };
      }
      return {
        ...state,
        promoError: 'Enter TABITHA10 for 10% bridal & Aso-Ebi privilege.',
      };
    }

    case 'REMOVE_PROMO':
      return { ...state, appliedPromo: null, promoError: '' };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, initCartState);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: state.items,
          currency: state.currency,
          appliedPromo: state.appliedPromo,
        })
      );
    } catch {
      // Ignore storage quota errors in restricted browsing modes
    }
  }, [state.items, state.currency, state.appliedPromo]);

  const addItem = useCallback((product, variant, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
  }, []);

  const updateQuantity = useCallback((cartKey, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartKey, quantity } });
  }, []);

  const removeItem = useCallback((cartKey) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const setCurrency = useCallback((currencyCode) => {
    dispatch({ type: 'SET_CURRENCY', payload: currencyCode });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const applyPromo = useCallback((code) => {
    dispatch({ type: 'APPLY_PROMO', payload: code });
  }, []);

  const removePromo = useCallback(() => {
    dispatch({ type: 'REMOVE_PROMO' });
  }, []);

  const formatPrice = useCallback(
    (amountInNgn) => formatMoney(amountInNgn, state.currency),
    [state.currency]
  );

  const getProductQuantity = useCallback(
    (productId) =>
      state.items
        .filter((item) => item.id === productId)
        .reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totals = useMemo(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const uniqueCount = state.items.length;
    const subtotalNgn = state.items.reduce(
      (sum, item) => sum + item.priceNgn * item.quantity,
      0
    );
    const discountNgn = state.appliedPromo ? Math.round(subtotalNgn * 0.1) : 0;
    const freeShipThresholdNgn = CURRENCIES.NGN.freeShippingThresholdNgn;
    const flatShippingNgn = CURRENCIES.NGN.flatShippingNgn;
    const shippingNgn =
      subtotalNgn === 0 || subtotalNgn >= freeShipThresholdNgn ? 0 : flatShippingNgn;
    const totalNgn = Math.max(0, subtotalNgn - discountNgn + shippingNgn);
    const remainingForFreeShippingNgn = Math.max(0, freeShipThresholdNgn - subtotalNgn);

    return {
      itemCount,
      uniqueCount,
      subtotalNgn,
      discountNgn,
      shippingNgn,
      totalNgn,
      remainingForFreeShippingNgn,
    };
  }, [state.items, state.appliedPromo]);

  const value = useMemo(
    () => ({
      items: state.items,
      currency: state.currency,
      isCartOpen: state.isCartOpen,
      appliedPromo: state.appliedPromo,
      promoError: state.promoError,
      ...totals,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      setCurrency,
      openCart,
      closeCart,
      toggleCart,
      applyPromo,
      removePromo,
      formatPrice,
      getProductQuantity,
    }),
    [
      state.items,
      state.currency,
      state.isCartOpen,
      state.appliedPromo,
      state.promoError,
      totals,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      setCurrency,
      openCart,
      closeCart,
      toggleCart,
      applyPromo,
      removePromo,
      formatPrice,
      getProductQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
