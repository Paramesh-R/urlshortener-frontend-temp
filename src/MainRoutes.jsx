import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ChangePassword from './pages/Auth/ChangePassword'
import ResetPassword from './pages/Auth/ResetPassword'
import AuthMsg from './pages/Auth/AuthMsg'
import ActivateAccount from './pages/Auth/ActivateAccount'
import Error404 from './pages/Home/Error404'
import ThanksPage from './pages/Auth/ThanksPage'
import ProtectedRoutes from './components/RouteRestriction/PrivateRoutes'
import RedirectShortUrl from './pages/shortenedUrl/RedirectShortUrl'

const MainRoutes = () => {
    return (
        <Routes>


            {/* Authentication */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* ---------------------------------------------------- */}


            {/* Reset Password Fields Page */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/resetpassword/:resetToken" element={<ChangePassword />} />
            <Route path="/auth-message" element={<AuthMsg title={"Test Title"} message={"Test Message"} />} />
            <Route path="/activate-account/:activationToken" element={<ActivateAccount />} />
            <Route path="/:shortUrl" element={<RedirectShortUrl />} />
            <Route path="/success" element={<ThanksPage />} />
            {/* ---------------------------------------------------- */}


            {/* Protected Route */}
            <Route path="/" element=< ProtectedRoutes /> >
                <Route path="/" element={<Dashboard />} />
            </Route>
            {/* ---------------------------------------------------- */}


            {/* Error 404 */}
            <Route path="*" element={<Error404 />} />
            {/* ---------------------------------------------------- */}
        </Routes>
    )
}

export default MainRoutes
