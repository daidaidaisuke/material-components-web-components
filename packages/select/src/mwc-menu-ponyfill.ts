/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import MDCMenuSurfaceFoundation from '@material/menu-surface/foundation';
import { getTransformPropertyName } from '@material/menu-surface/util';
import { Corner } from '@material/menu-surface/constants';

export const open = (foundation: MDCMenuSurfaceFoundation) => {
  foundation.open();
}

export const close = (foundation: MDCMenuSurfaceFoundation) => {
  foundation.close();
}

export const anchorElement = (menu: Element) => {
  const menuAnchorable = menu as AnchorableElement;

  return menuAnchorable.anchorElement;
}


const assignedElements = (menu: Element): Element[] => {
  const slot = menu.querySelector('slot');

  if (slot) {
    return slot.assignedNodes({flatten: true}).filter(node => (node instanceof Element)) as Element[];
  }

  return [];
}

export const isElementInMenu = (menu: Element, element: Element): boolean => {
  const assigned = assignedElements(menu);

  return assigned.reduce((isContained: boolean, assigned) => {
    return isContained || assigned === element || assigned.contains(element);
  }, false);
}

export const setTransformOrigin = (menu: HTMLElement, origin: string) => {
  const propertyName = `${getTransformPropertyName(window)}-origin`;
  menu.style.setProperty(propertyName, origin);
}

export const mdcRoot = (menu: Element) => {
  return menu.querySelector('.mdc-menu');
}

export const getDeepFocus = () => {
  let activeElement = document.activeElement;

  if (!activeElement) {
    return null;
  }

  while (activeElement) {
    if (activeElement.shadowRoot) {
      activeElement = activeElement.shadowRoot.activeElement;
    } else {
      break;
    }
  }

  return activeElement;
}

export const setPreviousFocus = (menu: Element, previouslyFocused: Element|null) => {
  (menu as Element & {_previousFocus: HTMLElement | Element | null})._previousFocus = previouslyFocused;
}

export const getPreviousFocus = (menu: Element) => {
  return (menu as Element & {_previousFocus: HTMLElement | Element | null})._previousFocus;
}

export const shadowRoot = (menu: Element) => menu.getRootNode() as ShadowRoot | Document;

export type AnchorableElement = HTMLElement & {anchorElement: Element | null};

export const setAnchorCorner = (foundation: MDCMenuSurfaceFoundation, corner: Corner) => {
  foundation.setAnchorCorner(corner);
}