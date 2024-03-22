import React, { useState } from "react";
import { updateProduct } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function EditPopup({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
  });

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateProduct({ _id: product._id, data: formData }));
  };

  return (
    <div className="modal" id="exampleModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Редактирование товара</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Название товара"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Описание товара"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="price" className="form-label">
                  Цена товара:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: Number(e.target.value),
                    })
                  }
                  min={0}
                  name="price"
                  id="price"
                />
              </div>
              <div className="form-group my-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0].name,
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="quantity" className="form-label">
                  Количество товара:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value),
                    })
                  }
                  min={0}
                  name="quantity"
                  id="quantity"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Отмена
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
