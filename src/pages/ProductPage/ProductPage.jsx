import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Product } from "../../components/product/Product";
import { api } from "../../utils/api";
import { useParams } from "react-router-dom";
import { CardsContext } from '../../context/cardContext'

export const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const res = useParams();

  const { productRating, user, handleLike } = useContext(CardsContext);
  
  /* const navigate = useNavigate();
  const location = useLocation();
console.log({ location }); */
  
console.log({productRating});

    useEffect(() => {
        if (id) {
            api.getProductById(id).then((data) => setProduct(data))
        }
    }, [id])

  // useEffect(() => {
  //     if (location.pathname.includes('product')) {
  //         navigate('/')
  //     }
  // }, [location, navigate]);

    const onProductLike = useCallback(async (item, isLikedProduct) => {//пессимистичный сценарий :
        const wasLiked = await handleLike(item, isLikedProduct);
        if (wasLiked) {
            const filteredLikes = item.likes.filter(e => e !== user?._id);//если фильтруем, то е не должен равен  юзер_айди
            setProduct((s) => ({ ...s, likes: filteredLikes }))//вернуть предыдущее состояние и обновить
        } else {
            const addLikes = [...item.likes, user?._id];//иначе спред.массив и добавить юзер_айди
            setProduct((s) => ({ ...s, likes: addLikes }))
        }
    }, [handleLike, user?._id]) 

    const sendReview = useCallback(async data => { /* отзывы */
        const result = await api.addProductReview(product._id, data);
        setProduct(() => ({ ...result }))
    }, [product._id])


    const onDeleteReview = useCallback(async id => {
        api.deleteProductReview(product._id, id)
            .then(data => setProduct(() => ({ ...data })))
            .catch(() => console.log('err'))    
    }, [product._id])


    return (
        <>
            {!!Object.keys(product).length ?
                <Product product={product} onProductLike={onProductLike} sendReview={sendReview} onDeleteReview={onDeleteReview} />
                :
                <div>Loading...</div>}
        </>
    )
}


    //     if (location.pathname.includes('product')) {
    //         navigate('/')
    //     }
    // }, [location, navigate]);

 //   ВОПРОСЫ С
// {!!Object.keys(product).length ?  -- проверка пустой ли объект
// JSON.stringify(product) === '{}' ? -- то же самое 2й вариант


    // ways to check if object is empty
    // lodash
    // !!Object.keys(product).length
    // JSON.stringify(product) === '{}' 