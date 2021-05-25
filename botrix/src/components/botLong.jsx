import React, {useEffect, useRef} from 'react'
import sanitize from 'sanitize-html-react';
import BotSidebar from './botSidebar';
import showdown from 'showdown';

function BotDescription(props) {
    
    let converter = new showdown.Converter()

    let botLong = useRef(null);


    let cleanHtml = sanitize(props.bot.long);

    let html = converter.makeHtml(props.bot.long);

    useEffect(() => {
        botLong.innerHTML = html;
    }, botLong);
    
    return (
        <div>
            <BotSidebar setDeleteModelActive={props.setDeleteModelActive} setModalActive={props.setModalActive} bot={props.bot} key="sidebar"></BotSidebar>
            <div className="bot-long" ref={el => {botLong = el}}>
                {cleanHtml}
            </div>
            <br></br>
        </div>
    );
}

export default BotDescription;