import { user } from 'forgerock-web-login-widget/modal';
import { useEffect, useState } from 'react';

export function useAuthorized() {
  const [auth, setAuth] = useState(false);
  async function isAuthorized() {
    const authorized = await user.authorized();
    setAuth(authorized);
  }
  useEffect(() => {
    isAuthorized();
  }, [auth]);
  return [auth, setAuth];
}

export function useUserInfo() {
  const [info, setInfo] = useState({});
  const [auth] = useAuthorized();

  async function getUser() {
    const userInfo = await user.info();
    setInfo(userInfo);

    // if (userInfo === null && auth) {
    //   const remoteInfo = await user.info();
    //   setInfo(remoteInfo);
    //   console.log(info);
    // }
  }
  useEffect(() => {
    if (auth) getUser();
  }, [info, auth]);

  return [info, setInfo];
}
