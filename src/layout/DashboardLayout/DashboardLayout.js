import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../../components/shared/Header/Header';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Header></Header>
            <div style={{ borderTop: '1px solid #000' }} className="row mx-0">
                <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }} className="col-12 col-md-2">
                    <div style={{}}>
                        {user && <h1 className='mt-3' style={{ color: '#D4A977', fontWeight: '300', letterSpacing: '2px' }}>{user?.displayName}</h1>}
                        <NavLink to="/dashboard" style={{ textDecoration: 'none' }}><div  className='nav-style px-2 py-2 mt-4 text-white mb-2'>My Profile</div></NavLink>
                        <NavLink to="/dashboard/mycomments" style={{ textDecoration: 'none' }}><div  className='nav-style px-2 py-2 text-white mb-2'>My Comments</div></NavLink>
                        {
                            isAdmin &&
                            <>
                                <NavLink to="/dashboard/allUsers" style={{ textDecoration: 'none' }}><div className='px-2 py-2 mt-2 text-white mb-2 nav-style'>All User</div></NavLink>
                                <NavLink to="/dashboard/allAdmin" style={{ textDecoration: 'none' }}><div className='nav-style px-2 py-2 text-white mb-2'>All Admin</div></NavLink>
                                <NavLink to="/dashboard/allBlogs" style={{ textDecoration: 'none' }}><div className='nav-style px-2 py-2 text-white mb-2'>All Blogs</div></NavLink>
                                <NavLink to="/dashboard/addBlogs" style={{ textDecoration: 'none' }}><div className='nav-style px-2 py-2 text-white'>Add Blogs</div></NavLink>
                            </>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-10">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;