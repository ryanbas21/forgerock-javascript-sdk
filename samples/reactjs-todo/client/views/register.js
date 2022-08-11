/*
 * forgerock-sample-web-react
 *
 * register.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../global-state';
import { AM_URL, WEB_OAUTH_CLIENT } from '../constants';
import InlineWidget, { form, journey } from 'forgerock-web-login-widget/inline';
import BackHome from '../components/utilities/back-home';
import NewUserIcon from '../components/icons/new-user-icon';
import Card from '../components/layout/card';
/**
 * @function Register - React view for Register
 * @returns {Object} - React component object
 */
export default function Register() {
  const history = useHistory();
  const [, { setAuth, setInfo }] = useContext(AppContext);
  useEffect(() => {
    new InlineWidget({
      target: document.getElementById('inline-form'),
      props: {
        config: {
          clientId: WEB_OAUTH_CLIENT,
          redirectUri: `${window.location.origin}/callback`,
          scope: 'openid profile email',
          serverConfig: {
            baseUrl: AM_URL,
            timeout: '5000',
          },
          realmPath: 'alpha',
          tree: 'Registration',
        },
      },
    });

    journey.start();
    journey.onSuccess((res) => {
      setAuth(true);
      setInfo(res.user.response);
      history.replace('/');
    });
    form.onMount((formElement) => {
      console.log(formElement); /* Run anything you want */
    });
  }, []);
  return (
    <div className="cstm_container_v-centered container-fluid d-flex align-items-center">
      <div className="w-100">
        <BackHome />
        <Card>
          <div className="cstm_form-icon align-self-center mb-3">
            <NewUserIcon size="72px" />
          </div>
          <div id="inline-form"></div>
        </Card>
      </div>
    </div>
  );
}
