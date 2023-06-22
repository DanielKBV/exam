import { useEffect } from 'react'
import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../store/product/product.thunk'
import { ActionsType } from '../store/product/product.slice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
    onIncrementHandler,
    onDecrementHandler,
}) => {
    const enabledInc = orderedQuantity !== availableCount
    const enabledDec = orderedQuantity !== 0

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <button
                    className={styles.actionButton}
                    onClick={() => onIncrementHandler(id)}
                    disabled={!enabledInc}
                >
                    +
                </button>
                <button
                    className={styles.actionButton}
                    onClick={() => onDecrementHandler(id)}
                    disabled={!enabledDec}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()
    const { productData, isError, isLoading } = useSelector(
        (state) => state.product
    )

    const onIncrementHandler = (id) => {
        dispatch(ActionsType.increment(id))
    }

    const onDecrementHandler = (id) => {
        dispatch(ActionsType.decrement(id))
    }

    const totalPrice = productData.reduce(
        (sum, product) => sum + product.total,
        0
    )

    const totalDiscount = totalPrice - (totalPrice * 10) / 100

    const discount = totalPrice * 0.1

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (
        <>
            <div>
                <header className={styles.header}>
                    <h1>Electro World</h1>
                </header>
                <main>
                    {isLoading && <LoadingIcon />}
                    {isError && (
                        <h4 style={{ color: 'red' }}>Some thing went wrong</h4>
                    )}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th># Available</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.map((item) => (
                                <Product
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    availableCount={item.availableCount}
                                    price={item.price}
                                    orderedQuantity={item.orderQuantity}
                                    total={item.total}
                                    onIncrementHandler={onIncrementHandler}
                                    onDecrementHandler={onDecrementHandler}
                                />
                            ))}
                        </tbody>
                    </table>
                    <h2>Order summary</h2>
                    {totalPrice >= 1000 ? (
                        <p>Discount: {discount.toFixed(2)}$ </p>
                    ) : null}
                    {totalPrice >= 1000 ? (
                        <p>TotalDiscount: {totalDiscount.toFixed(2)} $ </p>
                    ) : null}
                    <p>Total: {totalPrice.toFixed(2)} $ </p>
                </main>
            </div>
        </>
    )
}

export default Checkout
