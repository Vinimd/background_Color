export default function FadeOut(color1, color2, graus) {
    const body = document.querySelector('body')
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
    let fRgbColor = RGB(color1).join(',');
    let sRgbColor = RGB(color2).join(',');

    let fColor = fRgbColor + `,${opacity}`;
    let sColor = sRgbColor + `,${opacity}`;
    body.style.background = `linear-gradient(${graus}deg,rgb(${fColor}),rgb(${sColor}))`;
    const timer = setInterval(() => {
        if (opacity >= 0) {
            opacity -= 0.0009;
            fColor = fRgbColor + `,${opacity}`;
            sColor = sRgbColor + `,${opacity}`;
            body.style.background = `linear-gradient(${graus}deg,rgb(${fColor}),rgb(${sColor}))`;
        } else {
            clearInterval(timer)
            opacity = 0;
            fColor = fRgbColor + `,${opacity}`;
            sColor = sRgbColor + `,${opacity}`;
            body.style.background = `linear-gradient(${graus}deg,rgb(${fColor}),rgb(${sColor}))`;
        }
    }, 1);
}