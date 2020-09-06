import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ProductList from '../components/ProductList';

export default function Home() {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
  });
  return (
    <ApolloProvider client={client} >
      <ProductList />
    </ApolloProvider>
  )
}
