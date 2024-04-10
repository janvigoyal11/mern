import React from 'react'
// import trash from "../trash.svg";
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatch } from '../components/ContextRed';

export default function Cart() {
    const data=useCart();
    const dispatch=useDispatch();

    if (data.length === 0)
    return (
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!!</div>
    );

    let totalPrice = data.reduce((total,food)=>total+ food.price,0);

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log("email: ",userEmail);

        let response = await fetch("http://localhost:5000/api/orderData", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
            order_data: data,
            order_date: new Date().toDateString()  // inbuilt func, current date with time is sent
          })
        });

        console.log("respp: ",response);
        if (response.ok) {
          dispatch({ type: "DROP" });
        }
        else {
          console.error("error in checkout!");
        }
      }
      
  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        < table className='table text-white'>
        <thead className='text-success fs-4'>
            <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
            </tr>
        </thead>
        <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 text-white"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                </tr>
            ))}
          </tbody>
        </table>
            <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/- </h1></div>
            <div><button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button></div>
        </div>
    </div>
  )
}
