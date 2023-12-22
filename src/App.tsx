import { useState, useEffect } from 'react';
import 'scss/App.scss';
import { Header } from 'components/Header/index';
import { Main } from 'components/Main/main';
import { Routes, Route, } from 'react-router-dom';
import { Catalog } from 'components/Catalog';
import { NotFoundPage } from 'components/NotFoundPage';
import { Login } from 'components/Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from 'app/hooks';
import { setAuth, setUser } from 'features/user/userSlice';
import AuthService from 'api/services/AuthService';
import { Registration } from 'components/Registration/Registration';
import { PrivateLayout } from 'layouts/PrivateLayout';
import { Profile } from 'pages/Profile';
import { AuthLayout } from 'layouts/AuthLayout';
import { PageLoader } from 'components/Loader';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoading(true)

      const checkAuth = async () => {
        try {
          const response = await AuthService.auth()
          console.log(response)
          localStorage.setItem('token', response.data.accessToken)
          dispatch(setAuth(true))
          dispatch(setUser(response.data.user))
          toast("Authorized", {
            type: "success"
          });
        } catch (e: any) {
          console.log(e.response?.data?.message)
        } finally {
          setIsLoading(false)
        }
      }

      checkAuth()
    }
  }, [])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/cabinet" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
