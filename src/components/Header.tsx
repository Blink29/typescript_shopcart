import useCart from "../hooks/useCart"
import Nav from "./Nav"

type PropTypes = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({viewCart, setViewCart}: PropTypes) => {
    const { totalItems, totalPrice} = useCart()
    const content = (
        <>
            <header className="header">
                <div className="header__title-bar">
                    <h1>Acme Co.</h1>
                    <div className="header__price-box">
                        <p>Totel Items:{totalItems}</p>
                        <p>Total Price:{totalPrice}</p>
                    </div>
                    <Nav viewCart={viewCart} setViewCart={setViewCart} />
                </div>
            </header>
        </>
    )

  return content
}

export default Header