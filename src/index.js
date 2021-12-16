import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import { client } from "./graphql/ApolloClient.js";

console.log("Conectandose a Apollo");


ReactDOM.render(

<Auth0Provider
    domain="dev-grrrr64v.us.auth0.com"
    clientId="eipt2t0elCGzl25tXqqRzVyWCdUxJUAA"
    redirectUri={window.location.origin} //Este toma para ir a la url que le dejamos en la plataforma localhost etc
  >
  
 
  <React.StrictMode>
  <ApolloProvider client={client}>
  <App />
  </ApolloProvider>
  </React.StrictMode>


  </Auth0Provider>,
document.getElementById('root')
);


