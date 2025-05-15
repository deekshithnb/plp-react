import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import PRODUCT_LIST from "../grapQL/plp-list";
import ProductCard from "./product-card";
import Pagination from "./pagination";

export const ProductHeader = ({ categoryName = "" }) => {
  return (
    <>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <h1>{categoryName}</h1>
    </>
  );
};

export default function ProductDemo() {
  // State to store products, pagination info, and total product count
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  // Apollo's useLazyQuery allows us to trigger the query manually
  const [fetchProducts, { data, loading, refetch }] =
    useLazyQuery(PRODUCT_LIST);

  const loadProducts = async () => {
    try {
      const categoryData = await fetchProducts({
        variables: {
          url_key: "brands",
        },
      });
      const category = categoryData?.data?.categoryList?.[0]; // Check if we got category data
      if (category) {
        console.log(category);
        setProducts(category.products.items || []);
        setPageInfo(category.products.page_info || {});
        setTotalCount(category.products.total_count || 0);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  // Fetch the product list when component is first mounted
  useEffect(() => {
    loadProducts();
  }, []);

  // Function to handle pagination and re-fetch products
  const handlePageChange = (page) => {
    refetch({
      variables: {
        url_key: "brands",
        page, // Pass in new page number for pagination
      },
    });
  };

  return (
    <div>
      {/* Show the category name if available */}
      <ProductHeader categoryName={data?.categoryList?.[0]?.name} />

      {/* Show loading state */}
      {loading ? (
        <h2>Loading products...</h2>
      ) : (
        <Pagination
          pageInfo={pageInfo}
          totalProducts={totalCount}
          refetchProductData={handlePageChange}
        />
      )}

      {/* Product List */}
      <div className="product-list" style={loading ? { opacity: 0.5 } : {}}>
        {products.map((product) => (
          <ProductCard
            key={product.url_key}
            name={product.name}
            imageUrl={product.thumbnail?.url}
            price={product.price_range?.maximum_price?.final_price?.value}
            url={product.url_key}
          />
        ))}
      </div>
    </div>
  );
}
