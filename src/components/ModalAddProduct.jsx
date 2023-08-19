import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { addProduct } from "../features/ProductSlice";
import { useDispatch } from "react-redux";

function ModalAddProduct({ show, showAddProduct }) {
  const handleClose = () => showAddProduct(false);

  const [form, setForm] = useState({
    name: "",
    selling_price: "",
    purchase_price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  }

  const dispatch = useDispatch();

  const createProduct = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("selling_price", form.selling_price);
    formData.set("purchase_price", form.purchase_price);
    formData.set("stock", form.stock);
    formData.set("image", form.image[0], form.image[0].name);

    await dispatch(
      addProduct({ formData, config })
    );
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={createProduct}>
            <h1 className="text-center">Add Product</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name Product</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name Product"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                name="selling_price"
                onChange={handleChange}
                placeholder="Selling Price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="number"
                name="purchase_price"
                onChange={handleChange}
                placeholder="Purchase Price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                onChange={handleChange}
                placeholder="Stock"
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image Product</Form.Label>
              <Form.Control
                type="file"
                onChange={handleChange}
                name="image"
              />
            </Form.Group>
            <Button variant="danger" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalAddProduct;
