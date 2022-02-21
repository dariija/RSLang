import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import './header.scss';
import LoginPopup from './login-popap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/button';
import NavItem from './nav-item';

type UserData = {
  token: string;
  id: string;
};
type Props = {
  userData: {
    value: UserData;
    setValue: React.Dispatch<UserData>;
  };
};
interface RootState {
  gameWordPage: {
    gameWordPage: number;
  };
  gameDifficulty: {
    gameDifficulty: number;
  };
  selectedGame: {
    selectedGame: string;
  };
  from: {
    from: string;
  };
  seria: {
    seria: number;
  };
  title: {
    title: string;
  };
}

const Header: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const headerTitle = useSelector((state: RootState) => state.title.title);

  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const [authorization, setAuthorizations] = useState<boolean>(() => {
    const saved = localStorage.getItem('userData');
    const initialValue = saved === 'true' ? true : undefined;
    return initialValue || false;
  });

  useEffect(() => {
    localStorage.setItem('headerTitle', headerTitle);
  }, [headerTitle]);
  useEffect(() => {
    const burger = document.getElementById('burger');
    burger.classList.remove('active');
    setIsOverlay(false);
  }, [headerTitle]);
  const allPages = {
    pages: ['home', 'textbook/A1/1', 'textbook/difficult-words/1', 'game-difficulty', 'statistics', 'home/team'],
    pagesRu: ['главная', 'учебник', 'сложные слова', 'миниигры', 'статистика', 'команда'],
  };

  const handlerChange = ({ currentTarget }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const burger = document.getElementById('burger');
    if (burger.classList.contains('active')) {
      setLoginIsOpen(false);
      setIsOverlay(false);
    } else {
      setLoginIsOpen(false);
      setIsOverlay(true);
    }
    burger.classList.toggle('active');
  };

  const getLoginPopup = () => {
    const burger = document.getElementById('burger');
    burger.classList.remove('active');
    setLoginIsOpen(true);
    setIsOverlay(true);
  };

  const hiddenOverlay = () => {
    const burger = document.getElementById('burger');
    burger.classList.remove('active');
    setLoginIsOpen(false);
    setIsOverlay(false);
  };
  const deleteLocalStorage = () => {
    localStorage.removeItem('userData');
    props.userData.setValue({
      token: '',
      id: '',
    });
    // location.reload();
  };

  useEffect(() => {
    if (props.userData.value.token !== '') {
      localStorage.setItem('userData', JSON.stringify(props.userData.value));
      setAuthorizations(true);
    } else setAuthorizations(false);
  }, [props.userData]);

  function fullscreenHandler(e: React.MouseEvent<Element, MouseEvent>) {
    if (document.fullscreenElement) {
      e.currentTarget.classList.remove('active');
      document.exitFullscreen();
    } else {
      e.currentTarget.classList.add('active');
      document.documentElement.requestFullscreen();
    }
  }
  return (
    <div className="header-wrap">
      <header id="Top" className="header">
        <div onClick={(e) => handlerChange(e)} id="burger" className="burger-wrap">
          <div className="burger"></div>
          {/* <div className="burger-close-top"></div>
          <div className="burger-close-bottom"></div> */}
        </div>
        <ul id="nav" className="nav">
          <div className="nav-title-wrap">
            <div className="nav-aside-earth">
              <div className="nav-aside-earth-container"></div>
            </div>
            <h2 className="nav-title">RSLang</h2>
            <div onClick={handlerChange} className="burger-wrap active black">
              <div className="burger"></div>
              <div className="burger-close-top"></div>
              <div className="burger-close-bottom"></div>
            </div>
          </div>
          {allPages.pages.map((pageName, index) => (
            <NavItem i={index} pagesRu={allPages.pagesRu} pageName={pageName} key={index} />
          ))}
        </ul>
        <h2 className="header__title">
          {headerTitle !== 'команда' ? headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1) : 'Главная'}
        </h2>
        <div className="login-container">
          {!authorization ? (
            <button onClick={() => getLoginPopup()} className={loginIsOpen ? ' btn-2 small active' : ' btn-2 small'}>
              Войти
            </button>
          ) : (
            <button
              onClick={() => {
                deleteLocalStorage();
              }}
              className={loginIsOpen ? ' btn-2 small active' : ' btn-2 small'}
            >
              Выйти
            </button>
          )}
          <Button class="fullscreen-button" onClick={fullscreenHandler} />

        </div>
        {loginIsOpen && (
          <LoginPopup hiddenOverlay={hiddenOverlay} loginIsOpen={loginIsOpen} userData={props.userData} />
        )}
        <div onClick={hiddenOverlay} className={!isOverlay ? 'background-overlay' : 'background-overlay active'}></div>
      </header>
    </div>
  );
};

export default Header;
