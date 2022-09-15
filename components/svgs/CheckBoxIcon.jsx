import React from 'react'

function CheckBoxIcon({isCheck}) {
    return (
        <>
        {
            isCheck? (
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="12" cy="11.5" rx="12" ry="11.5" fill="#ED683C"/>
                    <path d="M16.5 7.90625L10.3125 14.375L7.5 11.4347" stroke="#F7F7FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 11.5C23 17.2593 18.1157 22 12 22C5.88433 22 1 17.2593 1 11.5C1 5.74069 5.88433 1 12 1C18.1157 1 23 5.74069 23 11.5Z" stroke="#ED683C" strokeWidth="2"/>
                </svg>
                )
            }
        </>
	)
}

export default CheckBoxIcon
