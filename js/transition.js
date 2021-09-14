export default function Transition(obj1, obj2, obj3) {
    const body = document.querySelector('body');
    const span = document.querySelector('span');

    let opacity = 1;

    function RGB(color) {
        let tColor = color.replace('#', '').trim();
        let aRgbHex = tColor.match(/.{1,2}/g);
        let aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return aRgb
    }

    function FadeIn() {

        let fRgbColor = RGB(obj2.afc).join(',');
        let sRgbColor = RGB(obj2.asc).join(',');

        let fColor = fRgbColor + `,${opacity}`;
        let sColor = sRgbColor + `,${opacity}`;
        body.style.background = `linear-gradient(${obj2.ag}deg,rgb(${fColor}),rgb(${sColor}))`;
        const timer = setInterval(() => {
            if (opacity <= 1) {
                opacity += 0.0009;
                fColor = fRgbColor + `,${opacity}`;
                sColor = sRgbColor + `,${opacity}`;
                body.style.background = `linear-gradient(${obj2.ag}deg,rgb(${fColor}),rgb(${sColor}))`;
                span.style.opacity = opacity;
            } else {
                clearInterval(timer)
                opacity = 1;
                fColor = fRgbColor + `,${opacity}`;
                sColor = sRgbColor + `,${opacity}`;
                body.style.background = `linear-gradient(${obj2.ag}deg,rgb(${fColor}),rgb(${sColor}))`;
                span.style.opacity = opacity;
            }
        }, 1);
    }

    function FadeOut() {
        let fRgbColor = RGB(obj1.fc).join(',');
        let sRgbColor = RGB(obj1.sc).join(',');

        if (fRgbColor !== '255,255,255' || fRgbColor !== '255,255,255') {

            let fColor = fRgbColor + `,${opacity}`;
            let sColor = sRgbColor + `,${opacity}`;

            body.style.background = `linear-gradient(${obj1.g}deg,rgb(${fColor}),rgb(${sColor}))`;
            const timer = setInterval(() => {
                if (opacity >= 0) {
                    opacity -= 0.0009;
                    fColor = fRgbColor + `,${opacity}`;
                    sColor = sRgbColor + `,${opacity}`;
                    body.style.background = `linear-gradient(${obj1.g}deg,rgb(${fColor}),rgb(${sColor}))`;
                    span.style.opacity = opacity;
                } else {
                    clearInterval(timer)
                    opacity = 0;
                    fColor = fRgbColor + `,${opacity}`;
                    sColor = sRgbColor + `,${opacity}`;
                    body.style.background = `linear-gradient(${obj1.g}deg,rgb(${fColor}),rgb(${sColor}))`;
                    span.style.opacity = opacity;
                    span.innerText = obj3.text;
                    span.style.fontSize = obj3.fontSize + 'px';
                    span.style.color = obj3.color;
                    FadeIn();
                }
            }, 1);
        } else {
            opacity = 0;
            span.style.opacity = opacity;
            span.innerText = obj3.text;
            span.style.fontSize = obj3.fontSize + 'px';
            span.style.color = obj3.color;
            FadeIn();
        }
    }
    FadeOut();
}