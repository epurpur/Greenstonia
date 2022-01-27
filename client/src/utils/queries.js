import { gql } from '@apollo/client';

// query data for all areas
export const QUERY_AREAS = gql`
query areas{
  areas {
    _id
    areaName
    areaDescription
    parkingDescription
    approachDescription
  }
}
`;