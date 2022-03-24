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
      latitude
      longitude
      boulders{
        _id
        boulderName
        boulderDescription
        latitude
        longitude
      }
    }
  }
`;

// query data for one area and boulders within that area
export const QUERY_BOULDERSBYAREA = gql`
  query bouldersByArea($areaName:String!){
    bouldersByArea(areaName:$areaName){
      _id
      areaName
      areaDescription
      parkingDescription
      approachDescription
      boulders{
        _id
        boulderName
        boulderDescription
        latitude
        longitude
      }
    }
  }
`

// query data for one boulder and routes within that boulder
export const QUERY_ROUTESBYBOULDER = gql`
  query routesByBoulder($boulderID: ID!){
    routesByBoulder(boulderID:$boulderID){
      _id
      boulderName
      boulderDescription
      routes{
        _id
        routeName
        routeDescription
        firstAscent
        routeGrade
        routeQuality
      }
    }
  }
`