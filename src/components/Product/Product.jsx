import React, { useEffect } from 'react'
import s from './index.module.css'
import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BackNavigate } from '../BackNavigate/BackNavigate';

export const Product = ({ product }) => {

    const navigate = useNavigate();


    const goBack = () => {
        // navigate(-2);
        // navigate(`/product/${product._id}`);
        navigate('/');
        // window.history
    }

    const location = useLocation();

    return (<div className={`${s.product} container`}>
        <div className={s.titleWrapper}>

        <BackNavigate />

            <span className={s.productTitle}>{product.name}</span>
            <div className={s.rating}>
                <span>Artikul</span>
                <span>Rate</span>
            </div>
        </div>
        <div className={s.imgWrapper}>
            <img className={s.img} src={product.pictures} alt="" />

        </div>

        <div className={s.desc}>
            <span className={s.price}>{product.price}&nbsp;p</span>
        </div>
        <div className={s.desc}>
            <NavLink className={(res) =>
                res.isPending ? "pending" : res.isActive ? s.link : ""
            }>

                <span className={s.price}>Описание</span>
            </NavLink>
            <span>{product.description}</span>
        </div>
    </div>)
}