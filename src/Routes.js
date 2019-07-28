import { 
    Home, 
    Login,
    NotFound, 
} from './pages/Loadable';

// import Login from './pages/Login';
// import Home from './pages/Home';
// import NotFound from './pages/NotFound';

export const homeRoutes = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: Home,
        requireAuth: true,
    },
    {
        name: 'Login',
        path: '/login',
        exact: true,
        component: Login,
        requireGuest: true,
    },
    {
        name: '404',
        component: NotFound,
        requireAuth: false,
    }
];
