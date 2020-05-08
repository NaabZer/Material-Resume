import CardComponent from './CardComponent';

export const COMPONENT_CARD = "C_CARD"

export const componentList = [
  COMPONENT_CARD
]

export const containerList = [
]

export function getComponentFromType(type){
  switch(type){
    case COMPONENT_CARD:
      return CardComponent;
    default:
      return null;
  }
}
