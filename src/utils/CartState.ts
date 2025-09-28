import {create} from 'zustand';
import { LSManager } from "./LSManager";
export interface CartData{
	pid: string,
	color: string
}
export interface Cart extends CartData{
	quantity: number,
}
interface CartState{
	cart: Cart[],
	push: (cart: CartData) => void,
	pull: (cart: CartData) => void,
	remove: (cart: CartData) => void,
}

function updateLS(total: Cart[]){
	LSManager.db('cart').change('cart', total);
	return;
}
function findCartItemIndex(state: Cart[], toFind: Cart | CartData){
	let index: number | undefined = undefined;
	for(let i = 0; i < state.length; i++){
		if(state[i].pid === toFind.pid && state[i].color === toFind.color){index = i; break;}
	}
	return index
}
export const useCartState = create<CartState>((set) => ({
	cart: LSManager.db('cart').find('cart') || [],
	push: (cart) => set((state) => {
		
		const index = findCartItemIndex(state.cart, cart);
		let newCart: Cart[];
		
		if(index !== undefined){
			newCart = state.cart.map((cartItem: Cart, i: number) => {
				return i===index ? {...cartItem, quantity: cartItem.quantity+1} : cartItem
			})
		}
		else{
			newCart = [...state.cart, {...cart, quantity: 1}]
		}
		updateLS(newCart);
		return {cart: newCart};
	}),
	pull: (cart) => set((state) => {
		const index = findCartItemIndex(state.cart, cart);
		if(index === undefined){return state}
		const newCart = state.cart.map((cartItem: Cart, i: number) => {
			return index === i ? {...cartItem, quantity: cartItem.quantity-1} : cartItem
		}).filter(cartItem => cartItem.quantity > 0);
		updateLS(newCart);
		return {cart: newCart};
	}),
	remove: (cart) => set((state) => {
		const newCart = state.cart.filter((cartItem) => {
			return (cartItem.pid !== cart.pid && cartItem.color !== cart.color)
		})
		updateLS(newCart);
		return {cart: newCart};
	}),
}))