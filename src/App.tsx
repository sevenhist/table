import { useEffect } from 'react';
import 'scss/App.scss';
import { Header } from 'components/Header/index';
import { Main } from 'components/Main/main';
import { Routes, Route, Link } from 'react-router-dom';
import { Catalog } from 'components/Catalog';
import { NotFoundPage } from 'components/NotFoundPage';
import { Login } from 'components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectAuth, selectIsLoading, setAuth, setLodaing, setUser } from 'features/user/userSlice';
import AuthService from 'api/services/AuthService';
import { Registration } from 'components/Registration/Registration';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectAuth)
  const isLoading = useAppSelector(selectIsLoading)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const checkAuth = async() => {
        setLodaing(true)
        try {
            const response = await AuthService.auth()
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
            toast("Success checkAuth", {
                type: "success"
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast(e.response?.data?.message, {
                type: "error"
            });
        } finally {
          setLodaing(false)
        }
    }
      checkAuth()
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (!isAuth) {
  //   return (
  //     <>
  //       <Header />
  //       <Login />
  //       <ToastContainer />
  //     </>
  //   )
  // }
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/login' element={<Login />} />    
        <Route path='/registration' element={<Registration />} />     
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
