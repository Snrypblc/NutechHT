import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
  updateProduct,
} from "../features/productSlice";

function ModalEditProduct({ show, showEditProduct, id }) {
  const handleClose = () => showEditProduct(false);

  const dispatch = useDispatch();

  const product = useSelector((state) => productSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(getProducts());
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    selling_price: "",
    purchase_price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    setForm({
        ...form,
        name: product?.name,
        selling_price: product?.selling_price,
        purchase_price: product?.purchase_price,
        stock: product?.stock,
        image: product?.image
    })
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleUpdate = async (e) => {
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
    if (form.image) {
      formData.set("image", form?.image, form?.image?.name);
    }
    await dispatch(updateProduct({ id, formData, config }));
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <h1 className="text-center">Update Product</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name Product</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form?.name}
                onChange={handleChange}
                placeholder="Name Product"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                name="selling_price"
                value={form?.selling_price}
                onChange={handleChange}
                placeholder="Selling Price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="number"
                name="purchase_price"
                value={form?.purchase_price}
                onChange={handleChange}
                placeholder="Purchase Price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={form?.stock} onChange={handleChange} placeholder="Stock" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image Product</Form.Label>
              <Form.Control type="file" onChange={handleChange} name="image" />
            </Form.Group>
            <Button variant="danger" type="submit" className="w-100">
              Update Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalEditProduct;
