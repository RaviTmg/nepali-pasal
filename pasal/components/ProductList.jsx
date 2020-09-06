import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";

const GET_ALL_PRODUCTS = gql`
  query {
    products {
      name
      description
    }
  }
`;
const ProductList = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  console.log("ProductList -> data", data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.products.map((product) => (
        <div>
          <h6>{product.name}</h6>
          <div>{product.description}</div>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {};

export default ProductList;
