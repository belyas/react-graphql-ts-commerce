import React, { Component, Suspense, lazy } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { connect } from 'react-redux';

import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';
import { IAuthReducerInitialState } from './store/reducers/auth';

const Logout = lazy(() => import('./containers/Auth/Logout'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Home = lazy(() => import('./containers/Home/Home'));
const CategoryProducts = lazy(() =>
  import('./containers/Products/CategoryProducts/CategoryProducts')
);
const ProductDetail = lazy(() =>
  import('./containers/Products/ProductDetail/ProductDetait')
);
const Cart = lazy(() => import('./containers/Cart/Cart'));

interface IProps extends RouteComponentProps<any> {
  isAuthenticated?: boolean;
}

class App extends Component<IProps> {
  componentDidMount() {
    // this.props.authCheckState();
  }

  render() {
    return (
      <div className="container-fluid">
        <ErrorBoundary>
          <Header />
          <Menu />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/category/:category_id"
                component={CategoryProducts}
              />
              <Route path="/product/:product_id" component={ProductDetail} />
              <Route
                path="/login"
                render={() =>
                  this.props.isAuthenticated ? <Redirect to="/" /> : <Auth />
                }
              />
              <Route path="/logout" component={Logout} />
              <Route path="/cart" component={Cart} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }: { auth: IAuthReducerInitialState }) => ({
  isAuthenticated: auth.isAuthenicated,
});

export default withRouter(connect(mapStateToProps)(App));
