(function (a, b) {
    a[b] = a[b] || {};
    a[b].active = true;
    a[b].elements = {};
    a[b].elements.modal = document.createElement("div");
    a[b].elements.modal.style.cssText =
        "visibility: hidden;" +
        "position: fixed;" +
        "z-index: 2147483647;" +
        "left: 0;" +
        "top: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "overflow: hidden;" +
        "background-color: rgba(0, 0, 0, 0.6);" +
        "display: -webkit-box;" +
        "display: -ms-flexbox;" +
        "display: flex;" +
        "-webkit-box-pack: center;" +
        "-ms-flex-pack: center;" +
        "justify-content: center;" +
        "-webkit-box-align: center;" +
        "-ms-flex-align: center;" +
        "align-items: center";
    a[b].elements.content = document.createElement("div");
    a[b].elements.content.style.cssText = "overflow:hidden;" + "background-color: #fefefe;" + "margin: 15% auto;" + "padding: 0px;" + "border: 1px solid #888;" + "width: 610px;" + "border-radius: 6px";
    a[b].elements.close = document.createElement("span");
    a[b].elements.close.style.cssText = "color: #000;" + "float: right;" + "font-size: 28px;" + "font-weight: bold;" + "display: none";
    a[b].elements.close.innerHTML = "&times;";
    a[b].elements.close.onclick = function () {
        a[b].elements.modal.style.visibility = "hidden";
    };
    a[b].elements.iframe = document.createElement("iframe");
    a[b].elements.iframe.src = './YWxjby90ZXN0LWRhbmllbA==.html';
    a[b].elements.iframe.style.cssText = "overflow:hidden";
    a[b].elements.iframe.frameBorder = "0";
    a[b].elements.iframe.width = "100%";
    a[b].elements.iframe.scrolling = "no";
    a[b].elements.iframe.onload = function (c) {
        a[b].elements.iframe.height = a[b].elements.content.offsetHeight + "px";
        a[b].elements.iframe.contentWindow.postMessage("addEventListenerToCloseButton", "*");
        a[b].elements.iframe.contentWindow.postMessage("getFullIframeHeight", "*");
    };

    window.onresize = function(event) {
        var realBrowserWidth;
        if(document.body && document.body.offsetWidth) {
            realBrowserWidth = document.body.offsetWidth;
        }
        if(document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) {
            realBrowserWidth = document.documentElement.offsetWidth;
        }
        if(window.innerWidth) {
            realBrowserWidth = window.innerWidth;
        }

        console.log('Fuera del iframe, width: ' + realBrowserWidth)
        // console.log(realBrowserWidth);

        // if(realBrowserWidth < 576 ) {
        //     console.log('XS');
        // }

        // if(realBrowserWidth >= 577 && realBrowserWidth < 1200) {
        //     console.log('MD');
        // }

        // if(realBrowserWidth >= 1200) {
        //     console.log('LG');
        // }
    }

    a[b].functions = {};
    a[b].functions.closeSurvey = function () {
        a[b].elements.modal.style.visibility = "hidden";
    };
    a[b].functions.openSurvey = function () {
        if (a[b].active) a[b].elements.modal.style.visibility = "visible";
    };
    a[b].elements.content.appendChild(a[b].elements.close);
    a[b].elements.content.appendChild(a[b].elements.iframe);
    a[b].elements.modal.appendChild(a[b].elements.content);
    document.body.appendChild(a[b].elements.modal);
    a.onmessage = function (c) {
        if (c.data === "apolloCloseSurvey-YWxjby90ZXN0LWRhbmllbA==") {
            a[b].active = false;
            a[b].functions.closeSurvey();
        }
        if (c.data.eventId === "resizeModalHeight-YWxjby90ZXN0LWRhbmllbA==") {
            var d = c.data.data.realIframeFullHeight;
            a[b].elements.content.style.height = (d + 7) + "px";
            a[b].elements.iframe.style.height = (d + 7) + "px";
        }
        if (c.data.eventId === "showCloseModalButton-YWxjby90ZXN0LWRhbmllbA==") {
            a[b].elements.close.style = "float: right;" + "font-weight: lighter;" + "cursor: pointer;" + "font-size: 40px;" + "margin-right: 15px;" + "color: #4A4E52;";
            a[b].elements.close.style.display = "block";
        }
    };
    document.addEventListener(
        "openApolloModal",
        function (c) {
            var d = 100 - 100;
            var e = (function (a, b) {
                return Math.random() * (b - a) + a;
            })(1, 100);
            if (a[b].active)
                if (e >= d)
                    setTimeout(function () {
                        a[b].elements.modal.style.visibility = "visible";
                    }, 2);
        },
        true
    );
})(window, "apollo-YWxjby90ZXN0LWRhbmllbA==");
