import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useCart } from './ContextRed';

export default function Card(props) {
    let options = props.options;
    let priceOpt = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let dispatch = useDispatch();
    let data = useCart();

    const handleAddToCart = () => {
        try {
            // Update the cart
            let food = data.find(item => item.id === props.foodItem._id);
            if (food && food.size === size) {
                dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                return;
            }
            // Add item to the cart
            else{
            dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
            return;
        };
        } catch (err) {
            console.log(err);
        }
    }
    

    let finalPrice = qty * parseInt(options[size]);
    let priceRef = useRef();

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded text-white'
                            onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}> {i + 1} </option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded text-white'
                            onChange={(e) => setSize(e.target.value)} ref={priceRef}>
                            {priceOpt.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className='d-inline h-100 fs-5 ms-4'>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
