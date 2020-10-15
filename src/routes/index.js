import React from 'react'
import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit
} from './../views'

import {DashboardOutlined ,UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';

export const mainRoutes = [{
  pathname: '/login',
  component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    isNav: true,
    icon:<DashboardOutlined />
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    title: '文章管理',
    isNav: true,
    icon:<UnorderedListOutlined />
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
  }, 
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true,
    icon:<SettingOutlined />,
  }
]