import React from "react";
import { Link } from "react-router-dom";

export default ({ product }) => {
  const { _id, price, name, description, banner, average } = product;
  return (
    <div className="col-sm-4 mb-2">
      <div className="card">
        <div className="view overlay">
          <img className="card-img-top" src={banner} alt={name} />
          <Link to={{ pathname: `/products/${_id}`, state: { product } }}>
            <div className="mask rgba-white-slight" />
          </Link>
        </div>

        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <hr />
          <p className="card-text">{description}</p>
        </div>
        <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
          <ul className="list-unstyled list-inline font-small">
            <li className="list-inline-item white-text pr-2">
              <i className="fas fa-star pr-1" />
              {average}
            </li>
            <li className="list-inline-item white-text pr-2">
              <i className="fas fa-dollar-sign pr-1" />
              {price}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
