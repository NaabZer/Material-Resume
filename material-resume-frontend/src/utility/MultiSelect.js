import React, {useState} from 'react'
import {useCombobox, useMultipleSelection} from 'downshift'

import { ChipSet, Chip } from '@rmwc/chip';
import { Menu, MenuItem, MenuSurfaceAnchor } from '@rmwc/menu';
import { Typography } from "@rmwc/typography";
import { TextField } from "@rmwc/textfield";

import './MultiSelect.scss';

export default function MultiSelect(props) {
  const { items } = props
  const [inputValue, setInputValue] = useState('')
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: props.initalItems,
    stateReducer
  })
  const getFilteredItems = (items) =>{
    return items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 && (
          item.text.toLowerCase().startsWith(inputValue.toLowerCase())
          || item.subtitle.toLowerCase().startsWith(inputValue.toLowerCase())
        )
          ,
    )}
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    itemToString: item => (item ? item.text: ''),
    items: getFilteredItems(items).slice(0,9),
    defaultHighlightedIndex: 0,
    onStateChange: ({inputValue, type, selectedItem}) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('');
            addSelectedItem(selectedItem);
            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
  })
  function stateReducer(state, actionAndChanges) {
    const {type, changes} = actionAndChanges
    //Callback on change
    if(props.selectedItemsChangeCallback !== null && state.selectedItems !== changes.selectedItems){
      console.log(changes.selectedItems);
      props.selectedItemsChangeCallback(changes.selectedItems);
    }
    if(
      props.min &&
      state.selectedItems.length === props.min &&
      (type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete ||
        type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace ||
        type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace ||
        type === useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem
      )
    ){
      return state;
    } else{
      return changes;
    }

  }
  return (
    <div>
      <div>
        <div 
          {...getComboboxProps()}
          style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}
        >
          <ChipSet
            style={{padding: '0px'}}
          >
            {selectedItems.map((selectedItem, index) => (
              <Chip
                key={`selected-item-${selectedItem.abrv}`}
                trailingIcon={selectedItems.length <= props.min ? null :'close'}
                onTrailingIconInteraction={() => removeSelectedItem(selectedItem)}
                trailingIconRemovesChip={false}
                {...getSelectedItemProps({selectedItem, index})}
              >
                <div
                  style={{display: 'flex', alignItems: 'center'}}
                >
                  {selectedItem.icon}
                  <Typography use='button' style={{paddingLeft: '8px'}}>
                    {selectedItem.text}
                  </Typography>
                </div>
              </Chip>
            ))}
          </ChipSet>
          <TextField
            {...getInputProps(getDropdownProps({preventKeyAction: isOpen}))}
            label={props.title}
            name={props.title}
            style={{flexGrow: 1, flexBasis: '200px'}}
          >
          </TextField>
        </div>
      </div>
      <MenuSurfaceAnchor>
        <Menu
          open={isOpen}
          focusOnOpen={false}
          {...getMenuProps()}
        >
          {getFilteredItems(items).slice(0,9).map((item, index) => (
            <MenuItem
              selected={highlightedIndex === index}
              key={'menu-item-' + item.abrv}
              {...getItemProps({item, index})}
            >
              <div style={{display: 'flex', alignItems: 'center'}}>
                {item.icon}
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <Typography use='button' style={{marginLeft: '8px'}}>
                    {item.text}
                  </Typography>
                  <Typography use='caption' style={{marginLeft: '8px', marginTop: '-16px'}}>
                    {item.subtitle}
                  </Typography>
                </div>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </MenuSurfaceAnchor>
    </div>
  )
}
