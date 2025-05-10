import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Therapist {
    id: ID!
    name: String!
    image: String
    experience: String
    price: String
    expertise: [String!]!
    languages: [String!]!
    availableVia: [String!]!
    nextSlot: String
  }

  type Query {
    therapists: [Therapist!]!
  }
`;
