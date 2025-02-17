// store/cartSlice.test.ts
import reducer, {
    addToCart,
    incrementItem,
    decrementItem,
    calculateTotalPrice,
    clearCart,
    setCart,
    ItemCard,
  } from './cartSlice';

  
  describe('cartSlice reducer', () => {
    const initialState = {
      items: [],
      quantities: {},
      totalPrice: 0,
    };
  
    // it('should return the initial state', () => {
    //   expect(reducer(undefined,{})).toEqual(initialState);
    // });
  
    it('should add item to cart', () => {
      const item: ItemCard = {
        title: 'Test item',
        newPrice: '10.99',
        description: 'Test item description',
        imageUrl: 'https://example.com/image.jpg',
        img: 'https://example.com/image.jpg',
        prevPrice: '12.99',
        company: 'Test company',
        color: 'Test color',
        size: 'Test size',
      };
  
      const action = addToCart(item);
      const state = reducer(initialState, action);
  
      expect(state.items.length).toBe(1);
      expect(state.items[0].title).toBe(item.title);
      expect(state.quantities[item.title]).toBe(1);
      expect(state.totalPrice).toBe(parseFloat(item.newPrice));
    });
  
    it('should increment item quantity', () => {
      const item: ItemCard = {
        title: 'Test item',
        newPrice: '10.99',
        description: 'Test item description',
        imageUrl: 'https://example.com/image.jpg',
        img: 'https://example.com/image.jpg',
        prevPrice: '12.99',
        company: 'Test company',
        color: 'Test color',
        size: 'Test size',
      };
  
      const action = addToCart(item);
      const state = reducer(initialState, action);
  
      const incrementAction = incrementItem(item.title);
      const newState = reducer(state, incrementAction);
  
      expect(newState.items[0].quantity).toBe(2);
      expect(newState.quantities[item.title]).toBe(2);
      expect(newState.totalPrice).toBe(parseFloat(item.newPrice) * 2);
    });
  
    it('should decrement item quantity', () => {
      const item: ItemCard = {
        title: 'Test item',
        newPrice: '10.99',
        description: 'Test item description',
        imageUrl: 'https://example.com/image.jpg',
        img: 'https://example.com/image.jpg',
        prevPrice: '12.99',
        company: 'Test company',
        color: 'Test color',
        size: 'Test size',
      };
  
      const action = addToCart(item);
      const state = reducer(initialState, action);
  
      const incrementAction = incrementItem(item.title);
      const newState = reducer(state, incrementAction);
  
      const decrementAction = decrementItem(item.title);
      const finalState = reducer(newState, decrementAction);
  
      expect(finalState.items[0].quantity).toBe(1);
      expect(finalState.quantities[item.title]).toBe(1);
      expect(finalState.totalPrice).toBe(parseFloat(item.newPrice));
    });
  
    it('should calculate total price', () => {
      const item: ItemCard = {
        title: 'Test item',
        newPrice: '10.99',
        description: 'Test item description',
        imageUrl: 'https://example.com/image.jpg',
        img: 'https://example.com/image.jpg',
        prevPrice: '12.99',
        company: 'Test company',
        color: 'Test color',
        size: 'Test size',
      };
  
      const action = addToCart(item);
      const state = reducer(initialState, action);
  
      const incrementAction = incrementItem(item.title);
      const newState = reducer(state, incrementAction);
  
      const calculateAction = calculateTotalPrice();
      const finalState = reducer(newState, calculateAction);
  
      expect(finalState.totalPrice).toBe(parseFloat(item.newPrice) * 2);
    });
  
    it('should clear cart', () => {
      const item: ItemCard = {
        title: 'Test item',
        newPrice: '10.99',
        description: 'Test item description',
        imageUrl: 'https://example.com/image.jpg',
        img: 'https://example.com/image.jpg',
        prevPrice: '12.99',
        company: 'Test company',
        color: 'Test color',
        size: 'Test size',
      };
  
      const action = addToCart(item);
      const state = reducer(initialState, action);
  
      const clearAction = clearCart();
      const finalState = reducer(state, clearAction);
  
      expect(finalState.items.length).toBe(0);
      expect(finalState.quantities).toEqual({});
      expect(finalState.totalPrice).toBe(0);
    });
  
    it('should set cart', () => {
      const item: ItemCard = {
        title: 'Test item',
        newPrice: '10.99',
        description: 'Test item description',
        imageUrl: 'https://example.com/image.jpg',
        img: 'https://example.com/image.jpg',
        prevPrice: '12.99',
        company: 'Test company',
        color: 'Test color',
        size: 'Test size',
      };
  
      const action = addToCart(item);
      const state = reducer(initialState, action);
  
      const setAction = setCart(state);
      const finalState = reducer(initialState, setAction);
  
      expect(finalState.items.length).toBe(1);
      expect(finalState.items[0].title).toBe(item.title);
      expect(finalState.quantities[item.title]).toBe(1);
      expect(finalState.totalPrice).toBe(parseFloat(item.newPrice));
    });
  });