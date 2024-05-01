import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  quantityUpdate,
  removeFromCart,
} from "../redux/reducer/cartSlice";

export default function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartSample = {
    items: [
      {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        quantity: 1,
        thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      },
      {
        id: 2,
        title: "iPhone X",
        description:
          "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: 899,
        thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        quantity: 1,
      },
      {
        id: 3,
        title: "Samsung Universe 9",
        description:
          "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: 1249,
        thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
        quantity: 1,
      },
      {
        id: 4,
        title: "OPPOF19",
        description: "OPPO F19 is officially announced on April 2021.",
        price: 280,
        thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
        quantity: 1,
      },
      {
        id: 5,
        title: "Huawei P30",
        description:
          "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
        price: 499,
        thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
        quantity: 1,
      },
    ],
    subTotal: 0,
    shipping: 0,
    total: 0,
  };

  const getTotals = (cCart) => {
    cCart.subTotal = cCart?.items?.reduce((a, v) => {
      return a + v.price * v.quantity;
    }, 0);
    cCart.total = cCart?.subTotal + cCart.shipping;
    return cCart;
  };

  useEffect(() => {
    let cCart = {
      items: cartSample.items,
      shipping: 0,
    };
    getTotals(cCart);
    dispatch(addToCart(cCart));
  }, []);

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const handleRemove = (index) => {
    dispatch(removeFromCart({ index }));
  };

  const handleQuantityChange = (e, index) => {
    dispatch(quantityUpdate({ index, quantity: Number(e.target.value) }));
  };

  return (
    <div className="container">
      {cart?.items?.map((product, index) => {
        return (
          <div key={index} className="row mt-1">
            <div className="col-md-7 d-flex  px-3">
              <div className="col-md-4 px-2 text-center ">
                <img width={"200px"} src={product.thumbnail} alt="..." />
              </div>
              <div className="col-md-8 px-2">
                <h3>{product.title}</h3>
                <div>{product.description}</div>
              </div>
            </div>
            <div className="col-md-1 align-items-center d-flex px-2">
              <select
                value={product.quantity}
                onChange={(e) => {
                  handleQuantityChange(e, index);
                }}
                className="form-select"
                aria-label="Default select example"
              >
                {arrayRange(1, 10, 1).map((q) => {
                  return (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-3 d-flex gap-5 align-items-center">
              <div> ${product.quantity * product.price}</div>

              <button
                onClick={(e) => handleRemove(index)}
                className=" btn btn-danger rounded-1 p-2 "
              >
                {"Remove"}
              </button>
            </div>
          </div>
        );
      })}

      <hr />

      <div className="row">
        <div className="col-md-8 text-end">Sub Total:</div>
        <div className="col-md-4"> ${cart?.subTotal} </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-md-8 text-end">Shipping:</div>
        <div className="col-md-4"> ${cart?.shipping} </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-md-8 text-end ">
          <strong>Total:</strong>
        </div>
        <div className="col-md-4"> ${cart?.total} </div>
      </div>
      <hr />
    </div>
  );
}
