import React, { useState, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as analytics from '../../../hooks/analytics';
import Gif from '../../../assets/searching.gif';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<any>([]);
    const [inputVal, setInputVal] = useState('');
    const [checked, setChecked] = useState<any>({
        otf: true,
        ttf: false,
        woff: false,
        woff2: false,
        eot: false,
    });
    function handleChange(e: any) {
        setInputVal(e.target.value);
    }

    function handleCheck(e: any) {
        const key = e.target.value;
        setChecked((prev: any) => Object.assign(prev, { [key]: !checked[key] }));
    }

    function handleSearchClick(e: any) {
        e.preventDefault();
        search(inputVal);
        analytics.sendEvent({
            category: 'User',
            action: 'Search Icon Click',
            label: inputVal,
        });
    }

    function handleOnClick(e: any) {
        e.preventDefault();
        analytics.sendEvent({
            category: 'User',
            action: 'Clear Search',
            label: `[clear] ${inputVal}`,
        });
        setInputVal('');
    }

    function search(filename: string) {
        const extensions = Object.keys(checked).filter((key) => checked[key]);
        filename = filename.toLowerCase().replace('font', '').trim();
        if (filename.length && extensions.length) {
            setLoading(true);
            const extensionsString = extensions.length
                ? `+extension:${extensions.join('+extension:')}`
                : '';

            const query = `https://api.github.com/search/code?q=+filename:${filename}${extensionsString}&page=1`;
            const headers = new Headers({
                Authorization: 'Token ' + process.env.REACT_APP_ACCESS_TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded',
            });

            fetch(query, {
                headers,
                method: 'GET',
            })
                .then((res) => res.json())
                .then(({ items }) => {
                    items.length ? setSearchResult(items) : setSearchResult(['none']);
                    console.log(items);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });

            analytics.sendEvent({
                category: 'User',
                action: 'Search',
                label: `${filename}${extensionsString}`,
            });
        }
    }

    const debouncedSearchTerm = useDebounce(inputVal, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            search(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <div className='px-4 pt-4 lg:pt-24 lg:px-0 lg:w-1/2 lg:mx-auto'>
            <div className='flex w-full px-8 py-4 bg-white rounded-full shadow-md justify-evenly'>
                <div className='w-2/3'>
                    <input
                        className='w-full focus:outline-none'
                        type='text'
                        value={inputVal}
                        onChange={handleChange}
                        onClick={() => {
                            analytics.sendEvent({
                                category: 'User',
                                action: 'Search Bar Click',
                            });
                        }}
                        placeholder='Search Font Name'
                    />
                </div>

                <div className='w-1/3 text-right'>
                    {inputVal && (
                        <span className='text-gray-500 ' onClick={handleOnClick}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    )}
                    <span
                        className='pl-8 ml-8 border-l-2 cursor-pointer'
                        onClick={handleSearchClick}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>
            </div>
            <div className='flex mt-4 text-xl justify-evenly'>
                {Object.keys(checked).map((elm, index) => (
                    <div key={index}>
                        <input
                            type='checkbox'
                            id={`${elm}_checkbox`}
                            value={elm}
                            onChange={handleCheck}
                            defaultChecked={checked[elm]}
                        />
                        <label className='ml-2' htmlFor={`${elm}_checkbox`}>
                            {elm}
                        </label>
                    </div>
                ))}
            </div>
            {loading ? (
                <div className='flex items-center justify-center h-64 mt-8'>
                    <div className='text-center'>
                        <img src={Gif} className='w-32 rounded-full' alt='Searching icon' />
                        <i className='block mt-2'>Searching...</i>
                    </div>
                </div>
            ) : searchResult[0] === 'none' ? (
                <div className='flex items-center justify-center h-64 mt-8'>
                    <div className='text-center'>No font found</div>
                </div>
            ) : searchResult.length > 0 ? (
                <div className='my-8'>
                    {searchResult.map((elm: any, index: number) => (
                        <a
                            key={elm.name + elm.repository.id + index}
                            className='flex items-center justify-between p-4 mt-4 border rounded-lg shadow-md'
                            onClick={() => {
                                analytics.sendEvent({
                                    category: 'User',
                                    action: 'Font Click',
                                    label: elm.html_url,
                                });
                            }}
                            href={`${elm.html_url.replace('/blob/', '/raw/')}`}
                        >
                            <div className='w-12 h-12'>
                                <img
                                    src={elm.repository.owner.avatar_url}
                                    alt='Owner Profile'
                                    className='rounded-full'
                                />
                            </div>
                            <span className='w-4/5 text-lg font-medium'>{elm.name}</span>
                        </a>
                    ))}
                    <i className='block mt-8 text-sm text-center font-light'>
                        {'Dev by '}
                        <a href='https://jameshih.com' className='underline'>
                            James
                        </a>
                        . {'Art by '}
                        <a href='https://www.instagram.com/kkmura_dot_net/' className='underline'>
                            Kenta
                        </a>
                        .
                    </i>
                </div>
            ) : null}
        </div>
    );
}
