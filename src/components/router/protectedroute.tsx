// Represents the Protected route
import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export interface ProtectedRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
const Protectedroute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const twitterUserId = useSelector((state: any) => state.twitterUserId);

  const isLoggedInUser = useMemo(() => {
    return twitterUserId != null && twitterUserId.length > 0;
  }, [twitterUserId]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedInUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default Protectedroute;
