import React, { useEffect, useState } from 'react';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Product from '../Product/Product';
import { Spinner } from 'react-bootstrap';

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        displaySpinner(true);
        // fetch('http://localhost:5055/getProducts')
        fetch('https://secure-atoll-57993.herokuapp.com/getProducts')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProducts(data)
            })
        displaySpinner(false);  // to stop the spinner
    }, [])

    // function to display and hide the spinner
    const displaySpinner = (show) => {
        const spinner = document.getElementById("loadingSpinner"); // getting the spinner div
        if (show) {
            spinner.style.display = "block";  // to display
        }
        else {
            spinner.style.display = "none"; // to hide 
        }
    }

    return (
        <div>
            <div className="searchDiv">
                <input className="homeSearch" type="text" placeholder="Search . . ."></input>
                <button className="searchButton"><FontAwesomeIcon icon={faSearch} />&nbsp;Search</button>
            </div>
            <div id="loadingSpinner" className="spinnerDiv">
                <Spinner animation="border" variant="success" />
            </div>
            <div className="homeMainDiv">
                {
                    products.map(product => <Product product={product} key={product._id} />)
                }
            </div>
        </div>
    );
};

export default Home;