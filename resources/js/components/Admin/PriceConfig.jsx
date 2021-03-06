import React, {
    useEffect, useState, useContext
} from 'react';
import  AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import InterfaceBtnContainer from './InterfaceBtnContainer';
import Api from '../../functions/Api';

function  PriceConfig() {
    const { halls, loadFromServer } = useContext(AdminContext);
    const [activeHall, setActiveHall] = useState(0);
    const [activeHallIndex, setActiveHallIndex] = useState(0);
    const [price, setPrice] = useState(0);
    const [vipPrice, setVipPrice] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        if (halls.length === 0) {
            return;
        }
        setVipPrice(halls[0].vip_price);
        setPrice(halls[0].price);
        setActiveHall(halls[0].id);
        setActiveHallIndex(0);
        setIsLoaded(true);
    }, [halls]);

    const HandleLabelChange = (e) => {
        const { name, value } = e.target;
        if (value === '') {
            if (name === 'standart') {
                setPrice(0);
            } else if (name === 'vip') {
                setVipPrice(0);
            }
            return;
        }
        let number;
        try {
            number = Number.parseInt(value, 10);
        } catch {
            return;
        }
        if (name === 'standart') {
            setPrice(number);
        } else if (name === 'vip') {
            setVipPrice(number);
        }
    };

    const resetChanges = () => {
        setVipPrice(halls[activeHallIndex].vip_price);
        setPrice(halls[activeHall].price);
    };

    const submitChanges = () => {
        Api.updateHallPrice('hall', activeHall, price, vipPrice);
        setIsLoaded(false);
        loadFromServer();
    };

    const handleSetActive = (hallId) => {
        const index = halls.map((hall) => hall.id).indexOf(hallId);
        setVipPrice(halls[index].vip_price);
        setPrice(halls[index].price);
        setActiveHall(hallId);
        setActiveHallIndex(index);
    };

    return (
        <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">???????????????? ?????? ?????? ????????????????????????:</p>
            <HallBtnContainer name="price" active={activeHall} setActive={handleSetActive} />
            <p className="conf-step__paragraph">???????????????????? ???????? ?????? ?????????? ????????????:</p>
            {isLoaded && (
                <div className="conf-step__legend">
                    <label className="conf-step__label" htmlFor="standard">
                        ????????, ????????????
                        <input type="text" name="standard" className="conf-step__input" placeholder="0" value={price} onChange={(e) => handleLabelChange(e)} />
                    </label>
                    ????
                    {' '}
                    <span className="conf-step__chair conf-step__chair_standart" />
                    {' '}
                    ?????????????? ????????????
                </div>
            )}
            {isLoaded && (
                <div className="conf-step__legend">
                    <label className="conf-step__label" htmlFor="vip">
                        ????????, ????????????
                        <input type="text" name="vip" className="conf-step__input" placeholder="0" value={vipPrice} onChange={(e) => handleLabelChange(e)} />
                    </label>
                    ????
                    {' '}
                    <span className="conf-step__chair conf-step__chair_vip" />
                    {' '}
                    VIP ????????????
                </div>
            )}
            {halls[activeHallIndex].is_active === 1 ? <p className="conf-step__paragraph">???????????? ???????????? ???????? ?? ???????? ?? ???????????????? ???????????????? ??????????????, ?????????????? ???????????????? ?????????????? ??????????????</p> : <InterfaceBtnContainer reset={resetChanges} accept={submitChanges} />}
        </div>
    );
}

export default PriceConfig;
