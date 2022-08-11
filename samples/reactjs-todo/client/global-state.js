/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';
import { useAuthorized, useUserInfo } from './hooks/user';
/**
 * @function useStateMgmt - The global state/store for managing user authentication and page
 * @param {Object} props - The object representing React's props
 * @param {Object} props.email - User's email
 * @param {Object} props.isAuthenticated - Boolean value of user's auth status
 * @param {Object} props.prefersDarkTheme - User theme setting
 * @param {Object} props.username - User's username
 * @returns {Array} - Global state values and state methods
 */
export function useGlobalStateMgmt({ prefersDarkTheme }) {
  let theme;
  const [auth, setAuth] = useAuthorized();
  const [info, setInfo] = useUserInfo();

  if (prefersDarkTheme) {
    theme = {
      mode: 'dark',
      // CSS Classes
      bgClass: 'bg-dark',
      borderClass: 'border-dark',
      borderHighContrastClass: 'cstm_border_black',
      cardBgClass: 'cstm_card-dark',
      dropdownClass: 'dropdown-menu-dark',
      listGroupClass: 'cstm_list-group_dark',
      navbarClass: 'cstm_navbar-dark navbar-dark bg-dark text-white',
      textClass: 'text-white',
      textMutedClass: 'text-white-50',
    };
  } else {
    theme = {
      mode: 'light',
      // CSS Classes
      bgClass: '',
      borderClass: '',
      borderHighContrastClass: '',
      cardBgClass: '',
      dropdownClass: '',
      listGroupClass: '',
      navbarClass: 'navbar-light bg-white',
      textClass: '',
      textMutedClass: 'text-muted',
    };
  }

  /**
   * returns an array with state object as index zero and setters as index one
   */
  return [
    {
      auth,
      info,
      theme,
    },
    {
      setInfo,
      setAuth,
    },
  ];
}

/**
 * @constant AppContext - Creates React Context API
 * This provides the capability to set a global state in React
 * without having to pass the state as props through parent-child components.
 */
export const AppContext = React.createContext([{}, {}]);
