import { gql } from '@apollo/client';

export const ADD_AREA = gql`
mutation addArea($areaName:String!, $areaDescription:String!, $parkingDescription:String!, $approachDescription:String!, $latitude:String!, $longitude:String!){
    addArea(areaName:$areaName, areaDescription:$areaDescription, parkingDescription:$parkingDescription, approachDescription:$approachDescription, latitude:$latitude, longitude:$longitude){
      areaName
      areaDescription
      parkingDescription
      approachDescription
      latitude
      longitude
    }
  }
`;

export const ADD_BOULDER = gql`
mutation addBoulder($boulderName:String!, $boulderDescription:String!, $areaID:String!, $latitude:String!, $longitude:String!, $boulderImgURL:String){
    addBoulder(boulderName:$boulderName, boulderDescription:$boulderDescription, areaID:$areaID, latitude:$latitude, longitude:$longitude, boulderImgURL:$boulderImgURL){
      boulderName
      boulderDescription
      latitude
      longitude
      boulderImgURL
    }
  }
`;

export const ADD_ROUTE = gql`
mutation addRoute($routeName:String!, $routeDescription:String!, $firstAscent:String!, $routeGrade:String!, $routeQuality:Int, $routeImgURL:[String!], $routeYoutubeEmbedURL:String, $boulderID:String!){
  addRoute(routeName:$routeName, routeDescription:$routeDescription, firstAscent:$firstAscent, routeGrade:$routeGrade, routeQuality:$routeQuality, routeImgURL:$routeImgURL, routeYoutubeEmbedURL:$routeYoutubeEmbedURL, boulderID:$boulderID){
    routeName
    routeDescription
    firstAscent
    routeGrade
    routeQuality
    routeImgURL
    routeYoutubeEmbedURL
  }
}
`;