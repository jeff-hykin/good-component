// put this in <body>
`
<div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
    <div style="width: 50px;height: 50px;border: 10px solid #dddddd;border-top-color: #009579;border-radius: 50%;transform: rotate(0.16turn);" id="good-component--initial-loader">
    </div>
</div>
`

const animateLoader = ()=>{
    const element = document.getElementById("good-component--initial-loader")
    element && element.animate(
        [
            { transform: 'rotate(0turn)' },
            { transform: 'rotate(1turn)' },
        ],
        {
            duration: 1000,
            iterations: Infinity,
            easing: 'ease',
        },
    )
}
document.body ? animateLoader() : document.addEventListener("DOMContentLoaded", animateLoader)