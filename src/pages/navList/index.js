import React from "react";
import { NavLink } from "react-router-dom";
const list = [
  '/login',
  '/stock',
  '/stock/detail',
  '/stock/create',
  '/order',
  '/order/detail',
  '/order/create',
  '/member',
  '/member/detail',
  '/member/create',
]

const NavList = () => {
  return (
    <ul>
      {list.map((path, index) =>  <li key={index}> <NavLink to={path}>{path}</NavLink></li>) }
    </ul>
  )
}

export default NavList;


