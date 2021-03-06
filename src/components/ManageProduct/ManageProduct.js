import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { Table } from 'react-bootstrap';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // fetch('http://localhost:5055/getProducts')
        fetch('https://secure-atoll-57993.herokuapp.com/getProducts')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProducts(data)
            })
    }, [])

    const deleteProduct = (id) => {
        // const url = `http://localhost:5055/deleteProduct/${id}`;
        const url = `https://secure-atoll-57993.herokuapp.com/deleteProduct/${id}`;
        // console.log(url);

        // fetch for sending new product data to server 
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
            })
        alert('Product Deleted Successfully !')
    }

    return (
        <div>
            <h4>Your Products</h4>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th className="toCenter">Update</th>
                        <th className="toCenter">Delete</th>
                    </tr>
                </thead>
                {
                    products.map(product =>
                        <tbody key={product._id}>
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td className="toCenter"><FontAwesomeIcon icon={faEdit} style={{color: 'green'}}/></td>
                                <td className="toCenter"><FontAwesomeIcon icon={faTrash} style={{color: 'red'}}
                            onClick={() => deleteProduct(product._id)} /></td>
                            </tr>
                        </tbody>
                    )
                }
            </Table>
        </div>
    );
};

export default ManageProduct;