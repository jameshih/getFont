import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faKiwiBird } from '@fortawesome/free-solid-svg-icons';

function Nav() {
    return (
        <div className='absolute bottom-0 left-0 z-10 w-full h-auto pb-4 overflow-hidden bg-app_dark'>
            <nav className='flex items-center justify-between px-8 pt-2 pb-5 text-2xl bg-app_dark text-app_ivory rounded-md'>
                <NavLink exact to='/'>
                    <FontAwesomeIcon icon={faDog} />
                </NavLink>
                <NavLink exact to='/about'>
                    <FontAwesomeIcon icon={faCat} />
                </NavLink>
                <NavLink exact to='/contact'>
                    <FontAwesomeIcon icon={faKiwiBird} />
                </NavLink>
            </nav>
        </div>
    );
}

export default Nav;
