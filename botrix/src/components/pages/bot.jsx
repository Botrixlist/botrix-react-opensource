import React, {useState, useEffect} from 'react'
import useAxios from 'axios-hooks';
import '../../css/bot.scss'
import {Link} from 'react-router-dom';
import Preloader from '../preloader';
import BotHeader from '../botHeader';
import BotLong from '../botLong';
import DeletePopup from '../popups/delete';
import SettingsPopup from '../popups/settings';
import ErrorPage from '../error';
import {config} from '../../config';

function BotPage(props){

    let { id } = props.match.params;

    
    const [{data, loading, error}, refetch] = useAxios({
        url: `${config.backend}/v1/get/bots/${id}`,
        method:"get",
        headers: {
            authorization: `${localStorage.getItem("_dsToken")}`
        }
    });

    const [bot, setBot] = useState(0); 
    const [botError, setError] = useState();
    const [deleteModel, setDelete] = useState(false);
    const [active, setActive] = useState(false);
    
    let setModalActive = () => {
        setActive(!active);
    }

    let setDeleteActive = () => {
        setDelete(!deleteModel);
    }

    useEffect(() => {
        if(data){
            if(!data.error){
                console.log("updated bot");
                setBot(data.bot);
            } else {
                setError(data.error);
            }
        }
    }, [data]);



    if(loading) return <Preloader></Preloader>;
    if(botError) return <ErrorPage type={404}></ErrorPage>;

    if(bot == 0) return <Preloader></Preloader>;

    return (
        <div>
            <DeletePopup bot={bot} active={deleteModel} setModelActive={setDeleteActive}></DeletePopup>
            <SettingsPopup active={active} setModalActive={setModalActive} auth={bot.auth} refetch={refetch} id={bot.botid}></SettingsPopup>
            <div className="bot-page">
                <BotHeader key="bot-header" bot={bot}></BotHeader>
                <div className="bot-spacer"></div>
                <BotLong  setDeleteModelActive={setDeleteActive} setModalActive={setModalActive} key="bot-long" bot={bot}></BotLong>
            </div>
        </div>
    )
}

export default BotPage;