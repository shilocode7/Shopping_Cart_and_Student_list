import React, { useEffect, useState } from 'react'

const Shop = () => {
    const [refresh, setrefresh] = useState(false)
    const [totalCart, settotalCart] = useState(0)

    const products = [
        { id: 1, desc: 'pizza', price: 20 },
        { id: 2, desc: 'pasta', price: 15 },
        { id: 3, desc: 'Beer', price: 10 },
    ]
    const [myCart, setmyCart] = useState([])
    const Buy = (prod, delta) => {
        const temp = myCart.filter(p => p.id === prod.id)[0]
        if (temp) {
            if (delta === -1 && temp.amount === 1) (
                setmyCart(myCart.filter(p => p.id !== prod.id)))
            temp.amount += delta
            setrefresh(!refresh) // לא כלכך מבין מה זה עושה
        } else {
            console.log('first')
            prod.amount = 1
            setmyCart((myCart) => {
                return [...myCart, prod]
            })
        }
        console.table(myCart)

    }
    useEffect(() => {
        setmyCart(myCart)
        let total = 0
        myCart.forEach(prod=> total+=(prod.price * prod.amount))
        settotalCart(total)   
    }, [refresh])
    
    useEffect(() => {
        let total = 0
        myCart.forEach(prod=> total+=(prod.price * prod.amount))
        settotalCart(total)
    }, [myCart])
    
    return (
        <div>
            <h2>Proudct List</h2><hr></hr>
            {products.map((prod, i) => <div key={i}>
                <button onClick={() => Buy(prod, 1)} style={{ backgroundColor: 'rgb(145, 248, 131)' }}>Buy</button>&nbsp;
                Id: {prod.id}&nbsp;
                Descriptin: {prod.desc}&nbsp;
                Price: {prod.price}&nbsp;<br /><br />
            </div>)}<hr></hr>

            {/* {condition && true} */}
            {/* {myCart.length > 0 && <h2>My Cart - {myCart.length} items in cart</h2>} */}

            {/* {constion ? ture : false} */}
            {myCart.length ? <h2>My Cart - {myCart.length} items in cart</h2> : <h2>No items in the cart</h2>}

            {myCart.map((prod, i) => <div key={i}>
                <button onClick={() => Buy(prod, 1)} style={{ backgroundColor: 'rgb(145, 248, 131)' }}>Add</button>&nbsp;
                Id: {prod.id}&nbsp;
                Descriptin: {prod.desc}&nbsp;
                Price: {prod.price}&nbsp;
                Amount: {prod.amount}&nbsp;
                <button onClick={() => Buy(prod, -1)} style={{ backgroundColor: 'rgb(248, 120, 120)' }}>Remov</button>&nbsp;<br /><br /> 
            </div>)}
<h3>Total Price: {totalCart}</h3> 
        </div>
    )
}


export default Shop