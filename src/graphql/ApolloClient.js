import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
//uri: 'https://rickandmortyapi.com/graphql'


uri: 'https://back-mintic-ciclo4.herokuapp.com/' || 'http://localhost:4000/'
//uri: 'https://back-mintic-ciclo4.herokuapp.com/'


})

