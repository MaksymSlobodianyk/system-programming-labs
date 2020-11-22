import PropTypes from 'prop-types'
import * as React from "react";
import {Header, Label, Modal, Image} from "semantic-ui-react";


const AnalyzerModal = ({toggleShowInfo, showInfo }) =>
        <Modal
            basic
            closeIcon
            onClose={() => toggleShowInfo()}
            onOpen={() => toggleShowInfo()}
            open={showInfo}
            size='small'
        >
            <Header icon>
                <h1>Привіт, я аналізатор української мови!</h1>
            </Header>
            <Modal.Content>
                <h3>Я поділяю текст на такі класи лексем: </h3>
                <div className={'info-row'}>
                    <Label as='a' color='green' tag>
                        Валідні
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що cкладаються з символів ['c',
                        'л', 'о', 'б',
                        'д', 'я', 'н', 'и', 'к'] </p>
                </div>
                <div className={'info-row'}>
                    <Label as='a' color='blue' tag>
                        Дата
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є датою у форматі
                        dd/mm/yyyy</p>
                </div>
                <div className={'info-row'}>
                    <Label as='a' color='yellow' tag>
                        E-mail
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є валідними адресами
                        електронних скриньок</p>
                </div>
                <div className={'info-row'}>
                    <Label as='a' color='pink' tag>
                        Номер телефону
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є номерами телефонів у форматі
                        999-999-99-99</p>
                </div>
                <div className={'info-row'}>
                    <Label as='a' color='orange' tag>
                        Число
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є числами типу +123, -123,
                        123, +12.4, -12.4, 12.4</p>
                </div>
                <div className={'info-row'}>
                    <Label as='a' color='violet' tag>
                        Роздільник
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що є роздільниками</p>
                </div>
                <div className={'info-row'}>
                    <Label as='a' color='red' tag>
                        Не валідні
                    </Label>
                    <p style={{fontSize: '16px', marginLeft: '25px'}}>всі лексеми, що не увійшли до попередніх
                        класів </p>
                </div>
                <div className={'info-row'}/>
                <div className={'info-row'}>
                    <h3>Щоб знову побачити це вікно, клікни на </h3>
                    <Image className={'header-image'} style={{width: '25px', marginLeft: '10px'}}
                           src='https://www.flaticon.com/svg/static/icons/svg/1265/1265907.svg'/>
                </div>
            </Modal.Content>
        </Modal>

AnalyzerModal.propTypes = {
    showInfo: PropTypes.bool.isRequired,
    toggleShowInfo: PropTypes.func.isRequired,

}


export default AnalyzerModal;
