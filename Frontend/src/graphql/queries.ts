import { gql } from '@apollo/client';

export const GET_THERAPISTS = gql`
  query GetTherapists ($role: String) {
    getTherapists(role: $role) {
      id
      name
      profilePic
      experience
      price
      specializations
      languages
      availableVia
      nextSlot
      role
    }
  }
`;
