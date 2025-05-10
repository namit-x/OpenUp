import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Therapist {
    id: ID!
  name: String!
  profilePic: String
  experience: String
  price: String
  specializations: [String!]!
  languages: [String!]!
  availableVia: [String!]!
  nextSlot: String
  role:String!
  }

  type Query {
    getTherapists(role: String): [Therapist!]!
  }
`;
