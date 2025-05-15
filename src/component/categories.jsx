import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router";

import CATEGORIES from "./grapQL/categories-list";

const CategoryCard = ({ item }) => {
  try {
    const { label, url } = item?.[0]?.content || {};
    const redirectTo = url
      ?.replaceAll("{{config path=web/secure/base_url}}", "/")
      ?.replaceAll(`{{config path="web/unsecure/base_url"}}`, "/");

    return (
      <Link to={redirectTo}>
        <p>{label}</p>
      </Link>
    );
  } catch (error) {
    return "";
  }
};

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const { loading, error, data } = useQuery(CATEGORIES);

  useEffect(() => {
    if (data) {
      const newArr = [];
      setCategoryList(
        JSON?.parse(data?.megamenu?.content)?.map((e) => {
          if (e.depth === 0) {
            newArr.push([e]);
          } else {
            newArr[newArr.length - 1].push(e);
          }
          return newArr;
        })
      );
    }
  }, [data]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Categories List</h1>
      {categoryList?.[0]?.length
        ? categoryList?.[0]?.map((item) => <CategoryCard item={item} />)
        : "No Data"}
    </div>
  );
}
