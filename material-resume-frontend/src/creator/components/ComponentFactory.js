import CardComponent, { CardComponentSettingsForm } from './CardComponent';
import ColoredArea, { ColoredAreaSettingsForm } from './ColoredArea';

export const COMPONENT_CARD = "C_CARD"
export const COMPONENT_COLORED_AREA = "C_COL_A"

export const componentList = [
  COMPONENT_CARD,
  COMPONENT_COLORED_AREA
]

export const containerList = [
]

export function getComponentFromType(type){
  switch(type){
    case COMPONENT_CARD:
      return CardComponent;
    case COMPONENT_COLORED_AREA:
      return ColoredArea;
    default:
      return null;
  }
}

export function getIsGridFromType(type){
  switch(type){
    case COMPONENT_COLORED_AREA:
      return true;
    default:
      return false;
  }
}

export function getSettingsFormFromType(type){
  switch(type){
    case COMPONENT_CARD:
      return CardComponentSettingsForm;
    case COMPONENT_COLORED_AREA:
      return ColoredAreaSettingsForm;
    default:
      return null;
  }

}
