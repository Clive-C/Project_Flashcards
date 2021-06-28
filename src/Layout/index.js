import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import DeckCreate from "./DeckCreate";
import Deck from "./Deck";
import DeckEdit from "./DeckEdit";
import CardAdd from "./CardAdd";
import CardEdit from "./CardEdit";


function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home /> 
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardAdd />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
     
      </div>
    </div>
  );
}

export default Layout;
