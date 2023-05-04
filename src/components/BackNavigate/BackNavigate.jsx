
import React from 'react'
import './index.css'
import { useNavigate } from 'react-router'

/* хук useNavigate - функция перемещения по страницам вперед 1 / назад -1 */
export const BackNavigate = () => {

    const navigate = useNavigate()
    return (
        <span onClick={() => navigate(-1)} className='navigate-back'> {'<'} Back</span>
    )
}