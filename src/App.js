import "./App.css";
import React, { useEffect } from "react";
import Header from "./Components/Header";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieBox from "./Components/MovieBox";
import Login from "./Components/Login";
import MovieBoxPage from "./Components/MovieBoxPage";
import {
  loadPopularMoviesAsyncAction,
  loadFavoriteMoviesAsyncAction,
  loadRatedMoviesAsyncAction,
  loginFailed,
  loginSucceed,
} from "./redux/actions";
import store from "./redux/store";
import MovieDetails from "./Components/MovieDetails";

function App() {
  const { logged_in, movielist, favoriteList, ratedList } = useSelector(
    (state) => {
      return state.movieModule;
    }
  );

  useEffect(() => {
    const userDataload = JSON.parse(localStorage.getItem("user"));
    if (userDataload === null || userDataload === {}) {
      store.dispatch(loginFailed());
    } else {
      store.dispatch(loginSucceed(userDataload));
      store.dispatch(
        loadFavoriteMoviesAsyncAction(
          userDataload.accountId,
          userDataload.sessionId
        )
      );
      store.dispatch(
        loadRatedMoviesAsyncAction(
          userDataload.accountId,
          userDataload.sessionId
        )
      );
    }
    store.dispatch(loadPopularMoviesAsyncAction(1));
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route path="/" exact>
          <MovieBoxPage></MovieBoxPage>
          <MovieBox
            movielist={movielist}
            favoriteList={favoriteList}
          ></MovieBox>
        </Route>
        <Route path="/favorite">
          <br />
          <MovieBox
            movielist={favoriteList}
            favoriteList={favoriteList}
          ></MovieBox>
        </Route>
        <Route path="/rated">
          <br />
          <MovieBox
            movielist={ratedList}
            favoriteList={favoriteList}
          ></MovieBox>
        </Route>
        <Route path="/login">
          {logged_in ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/movies/:id">
          <MovieDetails></MovieDetails>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
