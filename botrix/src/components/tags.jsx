import React from 'react';

function Tag(props) {
    return (
        <div className="tag">
            <div className="text-container">
                <p>{props.name}</p>
            </div>
        </div>
    )
}


export default Tag;