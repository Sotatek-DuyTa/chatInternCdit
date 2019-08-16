import Loadable from 'react-loadable';
import Loading from '../components/loading';

const loadBase = {
    loader: null,
    loading: Loading,
    // delay: 3000,
}

export const Home = Loadable(
    {
        loader: () => import('./Home'),
        loading: Loading,
        // delay: 3000,
    }
)

export const Login = Loadable(
    {
        loader: () => import('./Login'),
        loading: Loading,
        // delay: 3000,
    }
    // { ...loadBase, ...{ loader: () => import('./Login') } }
)

export const NotFound = Loadable(
    {
        loader: () => import('./NotFound'),
        loading: Loading,
        // delay: 3000,
    }
    // { ...loadBase, ...{ loader: () => import('./NotFound') } }
)

export const Chat = Loadable(
    {
        loader: () => import('./Chat'),
        loading: Loading,
        // delay: 3000,
    }
    // { ...loadBase, ...{ loader: () => import('./NotFound') } }
)