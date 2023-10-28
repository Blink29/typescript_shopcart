import { ChangeEvent, ReactElement, memo } from "react"
import { CartItemType, ReducerAction, ReducerActionType } from "../context/CartProvider"

type PropTypes = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropTypes ) => {
    
    const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

    const lineTotal: number = (item.qty * item.price)

    const highestQty: number = 20 > item.qty ? 20 : item.qty

    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1) 

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    console.log(options)

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUATITY,
            payload: { ...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item
    })
    
    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item name">{item.name}</div>
            <div aria-label="Price per item">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}</div>
            
            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select 
                name="itemQty" 
                id="itemQty" 
                className="cart__select"
                value={item.qty}
                aria-label="Item quantity"
                onChange={onChangeQty}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label="Line item subtotal">
                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)}
            </div>

            <button 
                className="cart__button"
                aria-label="Remove item from cart"
                title="Remove item from cart"
                onClick={onRemoveFromCart}
            >Delete</button>
        </li>
    )

  return content
}

function areItemsEqual({item: prevItem}: PropTypes, {item: nextItem}: PropTypes){
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemorizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemorizedCartLineItem