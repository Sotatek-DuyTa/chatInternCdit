import { 
    Home, 
    Login,
    Register,
    NotFound,
    // Chat,
} from './pages/Loadable';

// import Login from './pages/Login';
import Chat from './pages/Chat';
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
        // requireGuest: true,
        requireAuth: false,
    },
    {
        name: 'Register',
        path: '/register',
        exact: true,
        component: Register,
        // requireGuest: false,
        requireAuth: true,
    },
    {
        name: 'chat',
        path: '/chat',
        exact: true,
        component: Chat,
        requireAuth: true,
    },
    {
        name: '404',
        component: NotFound,
        requireAuth: false,
    }
];
