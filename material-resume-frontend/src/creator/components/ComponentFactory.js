import CardComponent, { CardComponentSettingsForm } from './CardComponent';
import ColoredArea, { ColoredAreaSettingsForm } from './ColoredArea';
import ThemedColoredArea, { ThemedColoredAreaSettingsForm } from './ThemedColoredArea';

export const EXPERIENCE_CARD = "E_CARD"
export const CONTAINER_COLORED_AREA = "C_COL_A"
export const CONTAINER_THEMED_COLORED_AREA = "C_T_COL_A"

export const ExperienceList = [
  EXPERIENCE_CARD,
]

export const TextList = [
]

export const ContainerList = [
  CONTAINER_COLORED_AREA,
  CONTAINER_THEMED_COLORED_AREA
]

export function getComponentFromType(type){
  switch(type){
    case EXPERIENCE_CARD:
      return CardComponent;
    case CONTAINER_COLORED_AREA:
      return ColoredArea;
    case CONTAINER_THEMED_COLORED_AREA:
      return ThemedColoredArea;
    default:
      return null;
  }
}

export function getIsGridFromType(type){
  switch(type){
    case CONTAINER_COLORED_AREA:
      return true;
    default:
      return false;
  }
}

export function getSettingsFormFromType(type){
  switch(type){
    case EXPERIENCE_CARD:
      return CardComponentSettingsForm;
    case CONTAINER_COLORED_AREA:
      return ColoredAreaSettingsForm;
    case CONTAINER_THEMED_COLORED_AREA:
      return ThemedColoredAreaSettingsForm;
    default:
      return null;
  }

}
