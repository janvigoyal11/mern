import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// {} means using javascript
export default function Home() {

    const [search,setSearch] = useState('');

    // if i write useState({}) ... it forms an oblject, but we can't use MAP in object
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let resp = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        resp = await resp.json();
        // resp[0] = food_items and resp[1] = foodCategory
        // console.log(resp[0],resp[1]);

        setfoodItem(resp[0]);
        setfoodCat(resp[1]);
    }

    useEffect(() => {
        loadData()
    }, [])  // in [] we write the dependency, if [] is empty means there is no dependency
    // and it will execute on 1st load meaning all function will be called

    return (
        <div className='bg-black'>
            <div><Navbar /> </div>
{/* ------------------------------------------------------------------------------------ */}
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel"
                    style={{ objectFit: "obtain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} 
                                onChange={(e)=>{ setSearch(e.target.value)}} />
                            </div>
                        </div>

                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(40%) " }} alt='..' />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(40%) " }} alt='..' />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?biryani" className="d-block w-100" style={{ filter: "brightness(40%) " }} alt='..' />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

 {/* ------------------------------------------------------------------------------------- */}
            <div className='container'>
                {
                    foodCat.length === 0
                        ? ""
                        : foodCat.map((data) => {
                            return (
                                <div className='row mb-3 text-white'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem.length === 0 ? <div>Emppty</div>
                                        : foodItem.filter((item) => (item.CategoryName === data.CategoryName) 
                                        && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 text-black'>
                                                        <Card foodItem = {filterItems}
                                                            options={filterItems.options[0]}
                                                        ></Card>
                                                    </div>
                                                )
                                            })
                                    }

                                </div>
                            );
                        })
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}
