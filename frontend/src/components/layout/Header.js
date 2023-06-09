import React, { Fragment, useEffect } from "react";
import { Route, Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import "../../App.css";
import { getCategory } from "../../actions/categoryActions";

import { uid } from "uid";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  const generateKey = () => {
    return uid(16);
  };

  return (
    <Fragment>
      <header
        className="header-1 shadow-lg fixed-top mb-5"
        style={{ backgroundColor: "#e3e1e1", padding: "0" }}
      >
        <div className="container-fluid">
          <div
            className="row"
            style={{ justifyContent: "space-between !important" }}
          >
            <div className=" col-lg-5 col-md-5 col-sm-2 col-8 d-flex align-items-center">
              <nav className="main-nav d-none d-lg-block">
                <ul className="d-flex align-items-center">
                  <li className="menu-item">
                    <Link to="/" className="menu-link">
                      Electronic Mart
                    </Link>
                  </li>
                  {!location.pathname.includes("super-admin") ? (
                    <>
                      <li>
                        <ul className="d-flex">
                          <li>
                            <nav className="main-nav d-none d-lg-block">
                              <ul className="d-flex align-items-center">
                                <li className="menu-item">
                                  <Link to="" className="menu-link ">
                                    Categories
                                  </Link>
                                  <ul className="submenu-home1">
                                    {category?.map((category) => (
                                      <li key={generateKey()}>
                                        <Link to={`/search/${category.name}`}>
                                          {category.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              </ul>
                            </nav>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item">
                        <Link to="/contact" className="menu-link">
                          Contact
                        </Link>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </ul>
              </nav>
              {/* <nav className="main-nav d-block d-lg-none">
                <ul className="d-flex align-items-center">
                  {user ? (
                    <>
                      <li className="menu-item">
                        <a href="#" className="menu-link">
                          Menu
                        </a>
                        <ul className="submenu-home1">
                          {user.role != "admin" ? (
                            <li>
                              <Link to="/orders/me">Orders</Link>
                            </li>
                          ) : (
                            ""
                          )}
                          {user.role == "super-admin" ? (
                            <li>
                              <Link to="/super-admin/dashboard">
                                Super Admin Dashboard
                              </Link>
                            </li>
                          ) : user.role == "admin" ? (
                            <li>
                              <Link to="/dashboard">Dashboard</Link>
                            </li>
                          ) : (
                            ""
                          )}

                          <li>
                            <Link to="/me">Profile</Link>
                          </li>
                          <li>
                            <Link to="/" onClick={logoutHandler}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="menu-item">
                        <Link to="/login">
                          <i className="las la-user"></i>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav> */}
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-4 ">
              {/* <Link to="/" class="header-1-logo text-center  ">
                <img src="/images/header-1-logo.svg" alt="" />
              </Link> */}
            </div>
            <div className=" col-lg-5 col-md-5 col-sm-8 d-sm-block d-none d-flex justify-content-between align-items-center">
              <div className="header-right-area d-flex justify-content-end align-items-center">
                <div className="header-1-icons">
                  <ul className="d-flex flex-direction-row justify-content-between align-items-center">
                    {isAuthenticated ? (
                      <>
                        <li>
                          <nav className="main-nav d-none d-lg-block mt-2">
                            <ul className="d-flex align-items-center">
                              <li className="menu-item">
                                <div className="d-flex align-items-center">
                                  <figure className="avatar avatar-nav">
                                    {user.avatar ? (
                                      <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </figure>
                                  <Link
                                    to=""
                                    className="menu-link d-flex align-items-center mt-2"
                                  >
                                    <h5>{user.name}</h5>

                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="currentColor"
                                      className="bi bi-caret-down-fill ml-2"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                  </Link>
                                </div>
                                <ul className="submenu-home1">
                                  {user &&
                                  user.role !== "admin" &&
                                  user.role != "super-admin" ? (
                                    <li>
                                      <Link to="/orders/me">Orders</Link>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  {user.role == "super-admin" ? (
                                    <li>
                                      <Link to="/super-admin/dashboard">
                                        Super Admin Dashboard
                                      </Link>
                                    </li>
                                  ) : user.role == "admin" ? (
                                    <li>
                                      <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                  ) : (
                                    ""
                                  )}

                                  <li>
                                    <Link to="/me">Profile</Link>
                                  </li>
                                  <Link
                                    to="/"
                                    className="text-danger"
                                    onClick={logoutHandler}
                                  >
                                    Logout
                                  </Link>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </li>
                      </>
                    ) : (
                      <li className="mt-4">
                        <Link to="/login">
                          <button className="primary--btn login-btn mr-3">
                            Vendors Login
                          </button>
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link to="/cart" style={{ textDacoration: "none" }}>
                        <div className="cart-btn position-relative mt-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-minecart mb-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7H1.102z" />
                          </svg>
                          <div className="cart-items-count">
                            {cartItems.length}
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* <div className="header-1-contact d-flex align-items-center">
                  <div className="contact-num">
                    <span>Hot Line Number</span>
                    <p>+92 318 1575228</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
