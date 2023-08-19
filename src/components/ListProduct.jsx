import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  productSelectors,
  deleteProduct,
} from "../features/productSlice";
import Edit from "../assets/img/edit.png";
import Trash from "../assets/img/trash.png";
import ModalAddProduct from "./ModalAddProduct";
import ModalEditProduct from "./ModalEditProduct";
import ModalDelete from "./ModalDelete";

function ListProduct() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [idProduct, setIdProduct] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const dispatch = useDispatch();
  const products = useSelector(productSelectors.selectAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfrimDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      dispatch(deleteProduct(idDelete));
      setConfrimDelete(null);
    }
  }, [confirmDelete]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Container>
        <h1 className="text-center my-3">Nutech Integrasi (Home Test)</h1>
        <Button
          variant="success"
          onClick={() => {
            setShowAddProduct(true);
          }}
          className="mb-2"
        >
          Add Product +
        </Button>
        <Form.Group className="my-3 shadow p-3 mb-5 bg-body rounded">
          <Form.Control
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Table
          striped
          bordered
          hover
          className="shadow p-3 mb-5 bg-body rounded"
        >
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Product Name</th>
              <th>Selling Price</th>
              <th>Purchase Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.selling_price}</td>
                <td>{product.purchase_price}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={product.image}
                    alt="product"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>
                  <img
                    src={Edit}
                    className="me-3"
                    alt="edit"
                    onClick={() => {
                      setShowEditProduct(true);
                      setIdProduct(product.id);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={Trash}
                    className="me-3"
                    alt="edit"
                    onClick={() => handleDelete(product.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="mt-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>

      <ModalAddProduct
        show={showAddProduct}
        showAddProduct={setShowAddProduct}
      />
      <ModalEditProduct
        id={idProduct}
        show={showEditProduct}
        showEditProduct={setShowEditProduct}
      />
      <ModalDelete
        setConfirmDelete={setConfrimDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default ListProduct;
