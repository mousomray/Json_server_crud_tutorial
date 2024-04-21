import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <div class="hero_area">
                {/* <!-- header section strats --> */}
                <header class="header_section">
                    <div class="header_top">
                        <div class="container-fluid">
                            <div class="contact_nav">
                                <a href="">
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    <span>
                                        Call : 9903419235
                                    </span>
                                </a>
                                <a href="">
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                    <span>
                                        Email : crud@gmail.com
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="header_bottom">
                        <div class="container-fluid">
                            <nav class="navbar navbar-expand-lg custom_nav-container ">
                                <a class="navbar-brand" href="index.html">
                                    <span>
                                        CRUD
                                    </span>
                                </a>

                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class=""> </span>
                                </button>

                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav ">
                                        <li class="nav-item">
                                            <Link class="nav-link" to='/'>Add User</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link class="nav-link" to='/showuser'> Show User</Link>
                                        </li>
                                        
                                        
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
                {/* <!-- end header section --> */}
            </div>
        </>
    )
}

export default Nav
