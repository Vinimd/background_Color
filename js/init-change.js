import FadeOut from './fadeout.js'
import Transition from './transition.js';

export default function InitChange() {
    const btnMudar = document.querySelector('[data-button="mudar"]');
    const btnReset = document.querySelector('[data-button="reset"]');
    const thereIsEstilo = localStorage['estilo'];
    const body = document.querySelector('body');
    const span = document.querySelector('span');


    function RestoreValue(obj) {
        for (let propertie in obj) {
            const input = document.querySelector(`[name=${propertie}]`);
            input.value = obj[propertie]
        }

    };

    function RestoreInfo() {
        const json = localStorage['estilo']
        const properties = JSON.parse(json);
        const firstColor = properties.fcolor;
        const secondtColor = properties.scolor;
        const graus = properties.graus;
        body.style.background = `linear-gradient(${graus}deg,${firstColor},${secondtColor})`;
        const text = properties.text;
        const fontSize = properties.fontSize;
        const color = properties.fontColor;
        span.innerText = text;
        span.style.fontSize = fontSize + 'px';
        span.style.color = color;
        RestoreValue(properties);
    }
    if (thereIsEstilo !== undefined) {
        RestoreInfo();
    }


    function SaveInfo() {
        const inputs = document.querySelectorAll('input');
        let obj = {};
        let lastLocalStorege = {};
        let lastFirstColor = '';
        let lastSecondColor = '';
        let lastGraus = '';

        if (thereIsEstilo !== undefined) {
            lastLocalStorege = JSON.parse(localStorage['estilo']);
            lastFirstColor = lastLocalStorege.fcolor
            lastSecondColor = lastLocalStorege.scolor
            lastGraus = lastLocalStorege.graus
        } else {
            lastFirstColor = '#ffffff';
            lastSecondColor = '#ffffff';
            lastGraus = 180;
        }

        const lastBackgroundProperties = {
            fc: lastFirstColor,
            sc: lastSecondColor,
            g: lastGraus
        };

        inputs.forEach(input => {
            obj[input.name] = input.value;
        });
        const json = JSON.stringify(obj);
        localStorage['estilo'] = json;
        const properties = JSON.parse(localStorage['estilo']);

        const BackgroundProperties = {
            afc: properties.fcolor,
            asc: properties.scolor,
            ag: properties.graus,
        };
        const spanProperties = {
            text: properties.text,
            fontSize: properties.fontSize,
            color: properties.fontColor
        };
        Transition(lastBackgroundProperties, BackgroundProperties, spanProperties);
    }

    function ResetInfo() {
        const inputs = document.querySelectorAll('input');
        let lastFirstColor = ''
        let lastSecondColor = ''
        let lastgraus = ''
        inputs.forEach(input => {
            if (input.name === 'fcolor') lastFirstColor = input.value
            if (input.name === 'scolor') lastSecondColor = input.value
            if (input.name === 'graus') lastgraus = input.value
        });
        FadeOut(lastFirstColor, lastSecondColor, lastgraus);
        const obj = {
            fcolor: '#ffffff',
            scolor: '#ffffff',
            graus: 180,
            fontColor: '#ffffff',
            text: '',
            fontSize: 18
        }
        const json = JSON.stringify(obj);
        localStorage['estilo'] = json;
        const properties = JSON.parse(localStorage['estilo']);
        const text = properties.text;
        const fontSize = properties.fontSize;
        const color = properties.fontColor;
        span.innerText = text;
        span.style.fontSize = fontSize + 'px';
        span.style.color = color;
        RestoreValue(properties)

    }

    btnReset.addEventListener('click', ResetInfo);
    btnMudar.addEventListener('click', SaveInfo);
}