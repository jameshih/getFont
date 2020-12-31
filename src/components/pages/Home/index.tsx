import React, { useState } from 'react';

export default function Home() {
    const [options] = useState(['otf', 'ttf', 'woff', 'woff2', 'eot']);
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
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

    function handleClick(e: any) {
        e.preventDefault();
        const extensions = Object.keys(checked).filter((key) => checked[key]);

        if (inputVal.trim().length > 0 && extensions.length > 0)
            search({ filename: inputVal.trim(), extensions });
    }

    function handleCheck(e: any) {
        const key = e.target.value;
        setChecked((prev: any) => Object.assign(prev, { [key]: !checked[key] }));
    }

    function search(params: { filename: string; extensions: any }) {
        setLoading(true);
        const extensionsString =
            params.extensions.length > 0
                ? `+extension:${params.extensions.join('+extension:')}`
                : '';
        const query = `https://api.github.com/search/code?q=+filename:${params.filename}${extensionsString}&page=1`;
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
                setSearchResult(items);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='pt-24 lg:w-1/2 lg:mx-auto'>
            <div className='flex justify-between'>
                <input
                    className='w-3/5 pl-4 border border-gray-700'
                    type='text'
                    value={inputVal}
                    onChange={handleChange}
                    placeholder='font name'
                />
                <button className='w-1/3 border border-gray-800' onClick={handleClick}>
                    Search
                </button>
            </div>
            <div className='flex mt-4 bg-gray-100 justify-evenly'>
                {options.map((elm, index) => (
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
            {loading && <div className='mt-8'>Searching...</div>}
            {searchResult.length > 0 && (
                <div className='mt-8'>
                    {searchResult.map((elm: any, index: number) => (
                        <div className='mt-4' key={elm.name + elm.repository.id + index}>
                            <a href={`${elm.html_url.replace('/blob/', '/raw/')}`}>{elm.name}</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
