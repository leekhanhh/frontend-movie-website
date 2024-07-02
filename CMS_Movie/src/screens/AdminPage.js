import React, { useEffect, useState } from "react";

import Movie from "./movies/movie";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

  UserOutlined,
  VideoCameraOutlined,
  ProfileOutlined,} from "@ant-design/icons";
import { Button, Layout, Menu, Spin, theme } from "antd";
const { Header, Sider, Content } = Layout;

import MovieCategory from "./movies/movie_category";
import MovieGenre from "./movies/movie_genre";
import Account from "./account/account";


const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMoviePage, setMoviePage] = useState(true);
  const [isCategoryPage, setCategoryPage] = useState(false);
  const [isGenrePage, setGenrePage] = useState(false);
  const [isAccountPage, setAccountPage] = useState(false);


  const [isLoading, setIsLoading] = useState(false);

  const toggleMoviePage = () => {
    setIsLoading(true);
    setMoviePage(true);
    setCategoryPage(false);
    setGenrePage(false);
    setAccountPage(false);

  };

  const toggleCategoryPage = () => {
    setIsLoading(true);
    setMoviePage(false);
    setCategoryPage(true);
    setGenrePage(false)
    setAccountPage(false);

  };

  const toggleGenrePage = () => {
    setIsLoading(true);
    setMoviePage(false);
    setCategoryPage(false);
    setGenrePage(true)
    setAccountPage(false);
  };

  const toggleAccountPage = () => {
    setIsLoading(true);
    setMoviePage(false);
    setCategoryPage(false);
    setGenrePage(false)
    setAccountPage(true);
  }


  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="w-full h-20 flex justify-center items-center">
          {!collapsed && (
            <h1 className="font-AlfaSlabOne text-white text-3xl ">eMovie</h1>
          )}
        </div>
        <Menu
          className="font-MonaSans"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <VideoCameraOutlined />,
              label: "Movie",
              onClick: toggleMoviePage,
            },
            {
              key: "2",
              icon: <ProfileOutlined />,
              label: "Movie Category",
              onClick: toggleCategoryPage,
            },
            {
              key: "3",
              icon: <ProfileOutlined />,
              label: "Movie Genre",
              onClick: toggleGenrePage,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Account",
              onClick: toggleAccountPage
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            paddingTop: 12,
            paddingRight: 16,
            paddingLeft: 16,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {isMoviePage && <Movie />}
              {isCategoryPage && <MovieCategory />}
              {isGenrePage && <MovieGenre/>}
              {isAccountPage && <Account/>}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;