import CardComponent, { CardComponentSettingsForm } from './CardComponent';
import ColoredArea, { ColoredAreaSettingsForm } from './ColoredArea';
import ThemedColoredArea, { ThemedColoredAreaSettingsForm } from './ThemedColoredArea';

export const COMPONENT_CARD = "C_CARD"
export const COMPONENT_COLORED_AREA = "C_COL_A"
export const COMPONENT_THEMED_COLORED_AREA = "C_T_COL_A"

export const ExperienceList = [
  COMPONENT_CARD,
]

export const TextList = [
]

export const ContainerList = [
  COMPONENT_COLORED_AREA,
  COMPONENT_THEMED_COLORED_AREA
]

export function getComponentFromType(type){
  switch(type){
    case COMPONENT_CARD:
      return CardComponent;
    case COMPONENT_COLORED_AREA:
      return ColoredArea;
    case COMPONENT_THEMED_COLORED_AREA:
      return ThemedColoredArea;
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
    case COMPONENT_THEMED_COLORED_AREA:
      return ThemedColoredAreaSettingsForm;
    default:
      return null;
  }

}
