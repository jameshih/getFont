import React, { useState, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as analytics from '../../../hooks/analytics';

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
        setInputVal('');
        analytics.sendEvent({
            category: 'User',
            action: 'Clear Search',
            label: inputVal,
        });
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
            <div className='flex w-full px-8 py-4 bg-white border rounded-full justify-evenly'>
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
                <div className='mt-8'>Searching...</div>
            ) : searchResult[0] === 'none' ? (
                <div className='mt-8'>No font found</div>
            ) : searchResult.length > 0 ? (
                <div className='my-8'>
                    {searchResult.map((elm: any, index: number) => (
                        <div className='mt-4' key={elm.name + elm.repository.id + index}>
                            <a
                                onClick={() => {
                                    analytics.sendEvent({
                                        category: 'User',
                                        action: 'Font Click',
                                        label: elm.html_url,
                                    });
                                }}
                                href={`${elm.html_url.replace('/blob/', '/raw/')}`}
                            >
                                {elm.name}
                            </a>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
