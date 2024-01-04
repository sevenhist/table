import { useState, useEffect } from 'react';
import 'scss/App.scss';
import { Main } from 'pages/Main/main';
import { Routes, Route, Navigate, } from 'react-router-dom';
import { Catalog } from 'pages/Catalog';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Login } from 'pages/Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from 'app/hooks';
import { setAuth, setUser } from 'features/user/userSlice';
import AuthService from 'api/services/AuthService';
import { Registration } from 'pages/Registration/Registration';
import { PrivateLayout } from 'layouts/PrivateLayout';
import { Cabinet} from 'pages/Cabinet';
import { AuthLayout } from 'layouts/AuthLayout';
import { PageLoader } from 'components/Loader';
import { MainLayout } from 'layouts/MainLayout';
import { ROUTES } from 'app/routes';
import { UserComponent } from 'pages/Cabinet/components/Content/MainCabinet/components/UserComponent/UserComponents';
import { DealerComponent } from 'pages/Cabinet/components/Content/MainCabinet/components/DealerComponent/DealerComponent';


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
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<Main />} />
          <Route path={ROUTES.catalog} element={<Catalog />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.AUTH.login} element={<Login />} />
          <Route path={ROUTES.AUTH.registration} element={<Registration />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path={ROUTES.PRIVATE.cabinet} element={<Cabinet />}>
              <Route index element={<Navigate to={ROUTES.PRIVATE.personalInformation} />} />
              <Route path={ROUTES.PRIVATE.personalInformation} element={<UserComponent />} />
              <Route path={ROUTES.PRIVATE.orders} element={<p>content 1</p>} />
              <Route path={ROUTES.PRIVATE.dealership} element={<DealerComponent />} />
              <Route path={ROUTES.PRIVATE.conditions} element={<p>content 3</p>} />
              <Route path={ROUTES.PRIVATE.applications} element={<p>content 4</p>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
