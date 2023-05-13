import React, { useContext, useEffect, useState } from "react";
import { Product } from "../../components/product/Product";
import { api } from "../../utils/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const res = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  console.log({ location });

  useEffect(() => {
    if (id) {
      api.getProductById(id).then((data) => setProduct(data));
    }
  }, [id]);

  // useEffect(() => {
  //     if (location.pathname.includes('product')) {
  //         navigate('/')
  //     }
  // }, [location, navigate]);

  const onProductLike = (item, isLikedProduct) => {
    const wasLiked = handleLike(item, isLikedProduct);
    if (wasLiked) {
      const filteredLikes = item.likes.filter((e) => e !== user?._id);
      setProduct((s) => ({ ...s, likes: filteredLikes }));
    } else {
      const addLikes = [...item.likes, user?._id];
      setProduct((s) => ({ ...s, likes: addLikes }));
    }
  };

  return (
    <>
      {!!Object.keys(product).length ? (
        <Product product={product} onProductLike={onProductLike} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};



    //     if (location.pathname.includes('product')) {
    //         navigate('/')
    //     }
    // }, [location, navigate]);







    // ways to check if object is empty
    // lodash
    // !!Object.keys(product).length
    // JSON.stringify(product) === '{}' 