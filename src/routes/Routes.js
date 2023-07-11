import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Main from "../layout/MainLayout/Main";
import AboutComponents from "../pages/About/AboutComponents/AboutComponents";
import AllAdmins from "../pages/Dashboard/AllAdmins/AllAdmins";
import ContactComponents from "../pages/Contact/ContactComponents/ContactComponents";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import HomeComponents from "../pages/Home/HomeComponents/HomeComponents";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import AddBlogs from "../pages/Dashboard/Add Blogs/AddBlogs";
import AllRegisteredUser from "../pages/Dashboard/AllRegisteredUser/AllRegisteredUser";
import BlogComponent from "../pages/Blogs/BlogsComponent/BlogComponent";
import AllBlogs from "../pages/Dashboard/AllBlogs/AllBlogs";
import BlogDetails from "../pages/Blogs/BlogDetails/BlogDetails";
import MyComments from "../pages/Dashboard/MyComments/MyComments";
import ShopComponents from "../pages/Shop/ShopComponents/ShopComponents";
import CartComponents from "../pages/Cart/Cart Components/CartComponents";
import CheckoutComponents from "../pages/Checkout/CheckoutComponents/CheckoutComponents";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <HomeComponents></HomeComponents>,
            },
            {
                path: "/about",
                element: <AboutComponents></AboutComponents>,
            },
            {
                path: "/shop",
                element: <PrivateRoutes><ShopComponents></ShopComponents></PrivateRoutes>
            },
            {
                path: "/cart",
                element: <CartComponents></CartComponents>
            },
            {
                path: "/checkout",
                element: <CheckoutComponents></CheckoutComponents>
            },
            {
                path: "/blogs",
                element: <BlogComponent></BlogComponent>
            },
            {
                path: "/blogs/:id",
                loader: ({ params }) => {
                    return fetch(`http://localhost:5000/blogs/${params.id}`)
                },
                element: <BlogDetails></BlogDetails>
            },
            {
                path: "/contact",
                element: <ContactComponents></ContactComponents>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <MyProfile></MyProfile>
            },
            {
                path: "/dashboard/mycomments",
                element: <MyComments></MyComments>
            },
            {
                path: '/dashboard/allUsers',
                element: <AdminRoute><AllRegisteredUser></AllRegisteredUser></AdminRoute>
            },
            {
                path: '/dashboard/allAdmin',
                element: <AdminRoute><AllAdmins></AllAdmins></AdminRoute>
            },
            {
                path: '/dashboard/allBlogs',
                element: <AdminRoute><AllBlogs></AllBlogs></AdminRoute>
            },
            {
                path: '/dashboard/addBlogs',
                element: <AdminRoute><AddBlogs></AddBlogs></AdminRoute>
            },
        ]
    }
])

export default routes;