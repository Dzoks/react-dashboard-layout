import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout } from "antd";
import BasicHeader from "../BasicHeader";
import SideMenu from "../SideMenu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Page from "../../core/router/Page";
const { Content, Footer } = Layout;

function ForbiddenComponent(props) {
  return <div>Acces denied.</div>;
}

function NotFoundComponent(props) {
  return <div>Page not found.</div>;
}

class BasicLayout extends React.Component {
  showAvailableRoutes = () => {
    const { menuItems } = this.props;
    const routes = [];
    const store = {};
    menuItems.forEach(el => {
      if (el.component) {
        routes.push(el);
        store[el.key] = el.rules || {};
      } else if (el.subItems && el.subItems.length > 0)
        el.subItems.forEach(sub => {
          if (sub.component) {
            routes.push(sub);
            store[sub.key] = sub.rules || {};
          }
        });
    });
    let firstItem = true;
    return routes.map(el => {
      const path = [`/${el.key}`];
      if (firstItem) {
        firstItem = false;
        path.push("/");
      }
      return (
        <Page
          key={el.key}
          exact
          component={el.component}
          path={path}
          id={el.key}
          store={store}
          redirectUrl={`/403`}
          {...el.componentProps}
        />
      );
    });
  };

  render() {
    const {
      logo,
      dropdownItems,
      applicationName,
      menuItems,
      user,
      footerStyle,
      footer,
      notFound,
      forbidden
    } = this.props;
    const forbiddenPage = forbidden || ForbiddenComponent;
    const notFoundPage = notFound || NotFoundComponent;
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <SideMenu logo={logo} menuItems={menuItems} />
          <Layout>
            <BasicHeader
              user={user}
              applicationName={applicationName}
              menuItems={dropdownItems}
            />
            <Content style={{ margin: "0 16px" }}>
              <Switch>
                <Route path="/403" exact component={forbiddenPage} />
                {this.showAvailableRoutes()}
                <Route component={notFoundPage} />
              </Switch>
            </Content>
            <Footer style={footerStyle || { textAlign: "center" }}>
              {footer}
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default BasicLayout;