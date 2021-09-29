
    (function(_window) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(
                            cookie.substring(name.length + 1)
                        );
                        break;
                    }
                }
            }
            return cookieValue;
        }

        var csrftoken = getCookie('csrftoken');
        _window._apollo_frame = {};
        _apollo_frame = {};

        let TYPE_OF_NPS = 'square';
        var json = {"pages": [{"name": "p\u00e1gina1", "title": "hola **daniel**", "elements": [{"name": "b_nps", "type": "rating", "title": "[NPS rating] Ingresa el texto **requerido** haciendo click aqu\u00ed", "rateMax": 10, "rateMin": 0, "isRequired": true, "requiredErrorText": {"es": "Debe ingresar una calificaci\u00f3n"}}, {"name": "b_verbatim-1", "type": "comment", "title": "[NPS entre 0 y 6] Escribe el texto para cuando b_nps sea menor a 6", "visibleIf": "{b_nps} <= 6", "isRequired": true, "placeHolder": {"es": "Comente"}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-2", "type": "comment", "title": "[NPS entre 7 y 8] Escribe el texto para cuando b_nps est\u00e9 entre 7 y 8", "visibleIf": "{b_nps} = 7 or {b_nps} = 8", "isRequired": true, "placeHolder": {"es": "Comente"}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-3", "type": "comment", "title": "[NPS entre 9 y 10] Escribe el texto para cuando b_nps est\u00e9 entre 9 y 10", "visibleIf": "{b_nps} >= 9", "isRequired": true, "placeHolder": {"es": "Comente"}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"html": "[Texto inferior] este es un _texto_ de **ejemplo**", "name": "pregunta1", "type": "html", "visible": false}], "description": "texto _cursiva_ y este en **negrita**"}], "mainSurveyColor": "#11CEEB", "sideButtonColor": "#99FF00", "buttonTextNotNow": "Ahora no", "surveyFontFamily": "PFBeauSansPro", "surveyTitleColor": "#F2C110", "surveyQuestionColor": "#1B0303", "surveyDisclaimerColor": "#040000"};
        json = {"pages": [{"name": "página1", "title": "**¡Cuéntanos como te fue!**", "elements": [{"name": "b_nps", "type": "rating", "title": "¿Qué tanto recomendarías Banco Falabella a un familiar o amigo?", "rateMax": 10, "rateMin": 0, "isRequired": true, "requiredErrorText": {"es": "Debe ingresar una calificación"}, "maxRateDescription": "Lo recomendaría", "minRateDescription": "No lo recomendaría"}, {"name": "b_verbatim-1", "type": "comment", "title": "¿Qué es lo que valoras de Banco Falabella? I", "visibleIf": "{b_nps} <= 6", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opinión es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-2", "type": "comment", "title": "¿Qué es lo que valoras de Banco Falabella? II", "visibleIf": "{b_nps} = 7 or {b_nps} = 8", "isRequired": true, "placeHolder": {"es": "Comente"}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-3", "type": "comment", "title": "¿Qué es lo que valoras de Banco Falabella? III", "visibleIf": "{b_nps} >= 9", "isRequired": true, "placeHolder": {"es": "Comente"}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"html": "[Texto inferior] este es un _texto_ de **ejemplo**", "name": "pregunta1", "type": "html", "visible": false}], "description": "Basado en tu experiencia."}], "completeText": "Enviar", "completedHtml": "<div class='custom-final-message-class'><h1>¡Gracias por ayudarnos a ser mejores!</h1>\n<p>Estamos constantemente trabajando para mejorar tu experiencia y tus\ncomentarios siempre son de gran ayuda. ¡Gracias por preferirnos!</p></div>", "mainSurveyColor": "#F88509", "sideButtonColor": "#0E166A", "buttonTextNotNow": "Ahora no", "surveyFontFamily": "PFBeauSansPro", "surveyTitleColor": "#42955F", "showQuestionNumbers": "off", "surveyQuestionColor": "#2F2E1A", "surveyDisclaimerColor": "#2A3731", "surveyQuestionNpsShape": TYPE_OF_NPS};
        json = {"pages": [{"name": "p\u00e1gina1", "title": "\u00a1Cu\u00e9ntanos c\u00f3mo te fue!", "elements": [{"name": "b_nps", "type": "rating", "title": "En base a la experiencia de subir un auto a la web de Autopia. \u00bfQu\u00e9 tan probable es que recomiendes publicar un auto en nuestra web a un familiar o amigo?", "rateMax": 10, "rateMin": 0, "isRequired": true, "requiredErrorText": {"es": "Debe ingresar una calificaci\u00f3n"}, "maxRateDescription": "S\u00ed recomendar\u00edas", "minRateDescription": "No recomendar\u00edas en absoluto"}, {"name": "b_verbatim-1", "type": "comment", "title": "Por favor, com\u00e9ntanos sobre qu\u00e9 debemos mejorar en nuestro flujo de publicaci\u00f3n de auto.", "visibleIf": "{b_nps} <= 6", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opini\u00f3n es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-2", "type": "comment", "title": "\u00bfQu\u00e9 tendr\u00edamos que mejorar en nuestro flujo de publicaci\u00f3n de auto para lograr la nota m\u00e1xima?", "visibleIf": "{b_nps} = 7 or {b_nps} = 8", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opini\u00f3n es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-3", "type": "comment", "title": "Com\u00e9ntanos por qu\u00e9 fue muy buena tu experiencia con la carga del auto en nuestra web.", "visibleIf": "{b_nps} >= 9", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opini\u00f3n es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}]}], "completeText": "Enviar", "completedHtml": "<div class=\"container\" style=\"margin-top:40px;\">\n\t<div id=\"rootwizard\" class=\"row col-md-offset-3 col-md-6 coll-off\">\n\t\t<div class=\"panel panel-default\" style=\"border-color: #ffffff; border: 2px solid #ffffff;font-family: Helvetica, Sans-Serif;\">\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t<p class=\"text-center\"></p>\n\t\t\t\t\t<h3 class=\"text-center\">Muchas gracias por tu tiempo.</h3>\n\t\t\t\t\t<h5 class=\"text-center\">Tu opini\u00f3n es muy importante para nosotros.</h5>\n\t\t\t\t<p></p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>", "mainSurveyColor": "#1CCFC9", "buttonTextNotNow": "Ahora no", "surveyFontFamily": "Helvetica", "surveyTitleColor": "#1CCFC9", "showQuestionNumbers": "off", "surveyQuestionNpsShape": "circle"};
        json = {"pages": [{"name": "p\u00e1gina1", "title": "Queremos conocer tu opini\u00f3n:", "elements": [{"name": "b_nps", "type": "rating", "title": "En base a la experiencia de compra en Dercoparts.cl \u00bfQu\u00e9 tan probable es que recomiendes comprar en esta p\u00e1gina a un familiar o amigo?", "rateMax": 10, "rateMin": 0, "isRequired": true, "requiredErrorText": {"es": "Debe ingresar una calificaci\u00f3n"}, "maxRateDescription": "S\u00ed recomendar\u00edas", "minRateDescription": "No recomendar\u00edas en absoluto"}, {"name": "b_verbatim-1", "type": "comment", "title": "Por favor, com\u00e9ntanos sobre qu\u00e9 debemos mejorar en nuestra p\u00e1gina web.", "visibleIf": "{b_nps} <= 6", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opini\u00f3n es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-2", "type": "comment", "title": "\u00bfQu\u00e9 tendr\u00edamos que mejorar en nuestro sitio para lograr la nota m\u00e1xima?", "visibleIf": "{b_nps} = 7 or {b_nps} = 8", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opini\u00f3n es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}, {"name": "b_verbatim-3", "type": "comment", "title": "Com\u00e9ntanos por qu\u00e9 fue muy buena tu experiencia en nuestro sitio.", "visibleIf": "{b_nps} >= 9", "isRequired": true, "placeHolder": {"es": "Comente", "default": "Tu opini\u00f3n es muy importante para nosotros."}, "requiredErrorText": {"es": "Debe ingresar una respuesta"}}]}], "completeText": "Enviar", "completedHtml": "<div class=\"container\">\n\t<div id=\"rootwizard\" class=\"row col-md-offset-3 col-md-6 coll-off\">\n\t\t<div class=\"panel panel-default\" style=\"border-color: #ffffff; border: 2px solid #ffffff;font-family: Helvetica, Sans-Serif;\">\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t<p class=\"text-center\"></p>\n\t\t\t\t\t<h3 class=\"text-center\">\u00a1Gracias por tu tiempo!</h3>\n\t\t\t\t\t<h5 class=\"text-center\">Tu respuesta nos ayuda a mejorar d\u00eda a d\u00eda el funcionamiento del sitio</h5>\n\t\t\t\t<p></p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>", "mainSurveyColor": "#E30022", "buttonTextNotNow": "Ahora no", "surveyFontFamily": "Helvetica", "surveyTitleColor": "#E30022", "showQuestionNumbers": "off", "surveyQuestionColor": "#000000", "surveyQuestionNpsShape": "circle"};
        json = {"pages":[{"name":"página1","elements":[{"type":"rating","name":"b_nps","title":"[NPS rating] Ingresa el texto requerido haciendo click aquí","isRequired":true,"requiredErrorText":{"es":"Debe ingresar una calificación"},"rateMin":0,"rateMax":10,"minRateDescription":"valor minimo","maxRateDescription":"valor maximo"},{"type":"comment","name":"b_verbatim-1","visibleIf":"{b_nps} <= 6","title":"[NPS entre 0 y 6] Escribe el texto para cuando b_nps sea menor a 6","isRequired":true,"requiredErrorText":{"es":"Debe ingresar una respuesta"},"placeHolder":{"es":"Comente"}},{"type":"comment","name":"b_verbatim-2","visibleIf":"{b_nps} = 7 or {b_nps} = 8","title":"[NPS entre 7 y 8] Escribe el texto para cuando b_nps esté entre 7 y 8","isRequired":true,"requiredErrorText":{"es":"Debe ingresar una respuesta"},"placeHolder":{"es":"Comente"}},{"type":"comment","name":"b_verbatim-3","visibleIf":"{b_nps} >= 9","title":"[NPS entre 9 y 10] Escribe el texto para cuando b_nps esté entre 9 y 10","isRequired":true,"requiredErrorText":{"es":"Debe ingresar una respuesta"},"placeHolder":{"es":"Comente"}},{"type":"text","name":"pregunta1"},{"type":"text","name":"pregunta2"},{"type":"rating","name":"pregunta3","title":"Considerando una escala de 0 a 10, ¿qué tan probable es que recomiendes a xyz a un familiar o amigo?","isRequired":true,"requiredErrorText":{"es":"Debe ingresar una calificación"},"rateMin":0,"rateMax":10},{"type":"rating","name":"pregunta4","minRateDescription":"valorrr minimooo","maxRateDescription":"valorrrtt maximo"},{"type":"text","name":"pregunta5"},{"type":"html","name":"pregunta6","visible":false,"html":"[Texto inferior] este es un _texto_ de **ejemplo**"}],"title":"Main Title","description":"Survey description"}],"mainSurveyColor":"#A55FE3","buttonTextNotNow":"Ahora no","surveyFontFamily":"PFBeauSansPro","surveyTitleColor":"#00AAFF","surveyQuestionColor":"#000000","surveyDisclaimerColor":"#FF0000","surveyQuestionNpsShape":"square"};
        var extras = {"b_algo": "HOLA"};
        var defaultThemeColors = {};

        defaultThemeColors["$main-color"] = json.mainSurveyColor;
        defaultThemeColors["$main-hover-color"] = json.mainSurveyColor;
        defaultThemeColors["$header-color"] = json.mainSurveyColor;
        defaultThemeColors["$text-color"] = (json.surveyQuestionColor === undefined ? 'black' : json.surveyQuestionColor);
        Survey.StylesManager.ThemeColors["new_theme"] = defaultThemeColors;
        Survey.StylesManager.applyTheme("new_theme");

        _apollo_frame.script = new Survey.Model(json);

        _apollo_frame
            .script
            .onComplete
            .add(function(result) {
                if(extras === null) {
                    extras = {};
                }
                axios({
                    method: 'post',
                    headers: {
                        'X-CSRFToken': csrftoken
                    },
                    url: '/save_survey/YWxjby90ZXN0LWRhbmllbA==',
                    data: {
                        answer: result.data,
                        extras: extras
                    }
                })
                .then(function (response) {
                })
                .catch(function (error) {
                });
            });

        console.log("*****");
        _apollo_frame.script.onAfterRenderSurvey.add(function() {
            let newNpsShapeValue = json.surveyQuestionNpsShape;
            let css = '';
            let responsiveCss = '';
            let style = document.createElement('style');

            let currentUserAgent = navigator.userAgent.toLowerCase();
            let isSafariBrowser = false;

            if (currentUserAgent.indexOf('safari') != -1) { 
                isSafariBrowser = ( currentUserAgent.indexOf('chrome') > -1 ? false : true);
            }

            let npsElements = document.getElementsByClassName('sv_q_rating_item_text');

            for(let i = 0; i < npsElements.length; i++) {
                let currentElement = npsElements[i];

                if(currentElement.classList.contains('sv_q_rating_item_text')) {
                    if(newNpsShapeValue === 'square') {
                        currentElement.classList.add('local-square-nps');
                    }

                    if(newNpsShapeValue === 'circle') {
                        currentElement.classList.add('local-circle-nps');
                    }
                }
            }

            if(newNpsShapeValue === undefined || newNpsShapeValue === 'circle') {
                if (isSafariBrowser) {
                    css = '@media screen and (min-width:300px) and (max-width:319px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:22px}span.sv_q_rating_item_text.local-circle-nps{width:19px;height:19px;border-radius:50%}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating{line-height:1.5em}}@media screen and (min-width:320px) and (max-width:357px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:23px}span.sv_q_rating_item_text.local-circle-nps{width:20px;height:20px;border-radius:50%}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating{line-height:1.5em}}@media screen and (min-width:358px) and (max-width:374px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:23px}span.sv_q_rating_item_text.local-circle-nps{width:24px;height:24px;border-radius:50%}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating{line-height:1.5em}}@media screen and (min-width:375px) and (max-width:413px){.sv_q_rating_min_text{margin-top:24px}span.sv_q_rating_item_text.local-circle-nps{width:27px;height:27px;border-radius:50%;box-sizing:border-box;margin-right:1px}}@media screen and (min-width:414px) and (max-width:518px){.sv_q_rating_min_text{margin-top:37px}.sv_q_rating{width:100%;margin:20px 0 20px 0}span.sv_q_rating_item_text.local-circle-nps{width:30px;height:30px;border-radius:50%;box-sizing:border-box;margin-right:1.5px;padding:4px}}@media screen and (min-width:519px) and (max-width:1920px){.sv_q_rating_min_text{margin-top:40px}.sv_q_rating{width:100%;margin:20px 0 20px 0}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_max_text{position:absolute;float:right;right:20px}span.sv_q_rating_item_text.local-circle-nps{width:40px;height:40px;border-radius:50%;box-sizing:border-box;margin-right:1px;padding:6px}}';
                } else {
                    css = '@media screen and (max-width:335px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:30px}span.sv_q_rating_item_text.local-circle-nps{width:25px;height:25px;border-radius:50%;box-sizing:border-box;padding:0;margin-right:0}}@media screen and (min-width:336px) and (max-width:357px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:28px}span.sv_q_rating_item_text.local-circle-nps{width:28px;height:28px;border-radius:50%;box-sizing:border-box;padding:0;margin-right:0}}@media screen and (min-width:358px) and (max-width:374px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:30px}span.sv_q_rating_item_text.local-circle-nps{width:30px;height:30px;border-radius:50%;box-sizing:border-box;padding:0;margin-right:0}}@media screen and (min-width:375px) and (max-width:401px){.sv_q_rating_min_text{margin-top:32px}span.sv_q_rating_item_text.local-circle-nps{width:30px;height:30px;border-radius:50%;box-sizing:border-box;margin-right:1.5px}}@media screen and (min-width:402px) and (max-width:429px){.sv_q_rating_min_text{margin-top:35px}span.sv_q_rating_item_text.local-circle-nps{width:32.5px;height:32.5px;border-radius:50%;box-sizing:border-box;margin-right:1.5px;padding:2px}}@media screen and (min-width:430px) and (max-width:480px){.sv_q_rating_min_text{margin-top:37px}.sv_q_rating{width:100%;margin:20px 0 20px 0}span.sv_q_rating_item_text.local-circle-nps{width:35px;height:35px;border-radius:50%;box-sizing:border-box;margin-right:1.5px;padding:4px}}@media screen and (min-width:481px) and (max-width:758px){.sv_q_rating_min_text{margin-top:40px}.sv_q_rating{width:100%;margin:20px 0 20px 0}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_max_text{position:absolute;float:right;right:20px}span.sv_q_rating_item_text.local-circle-nps{width:40px;height:40px;border-radius:50%;box-sizing:border-box;margin-right:1px;padding:6px}}@media screen and (min-width:759px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:0;display:inline;float:none;position:static;font-size:12px;color:#585b5d}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:0;display:inline;float:none;position:static}span.sv_q_rating_max_text{margin-left:0;display:inline;float:none;font-size:12px;color:#585b5d}span.sv_q_rating_item_text{padding:5px}span.sv_q_rating_item_text.local-circle-nps{width:40px;height:40px;border-radius:50%;box-sizing:border-box;margin-right:1px;padding:6px}}';
                }
                if(style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                document.getElementsByTagName('head')[0].appendChild(style);            
                return;
            };

            if(newNpsShapeValue === 'square') {
                responsiveCss = '.sv_main .sv_q_rating_item.active .sv_q_rating_item_text{border:1px solid ' + json.mainSurveyColor + ' !important;z-index:900000000}' + ' @media screen and (max-width:335px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:30px}.local-square-nps{width:24px;border-radius:0;margin-right:0}}@media screen and (min-width:336px) and (max-width:357px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:28px}.local-square-nps{width:26px;border-radius:0;margin-right:0}}@media screen and (min-width:358px) and (max-width:374px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:.5em;display:block;float:right;position:absolute;margin-top:30px}.local-square-nps{width:28px;border-radius:0;margin-right:0}}@media screen and (min-width:375px) and (max-width:401px){.sv_q_rating_min_text{margin-top:32px}.local-square-nps{width:29px;border-radius:0;margin-right:0}}@media screen and (min-width:402px) and (max-width:429px){.sv_q_rating_min_text{margin-top:35px}.local-square-nps{width:32px;border-radius:0;margin-right:0}}@media screen and (min-width:430px) and (max-width:480px){.sv_q_rating_min_text{margin-top:32.5px}.sv_q_rating{width:100%;margin:20px 0 20px 0}.local-square-nps{width:34.5px;border-radius:0;margin-right:0}}@media screen and (min-width:481px) and (max-width:758px){.sv_q_rating_min_text{margin-top:30px}.sv_q_rating{width:100%;margin:20px 0 20px 0}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_max_text{position:absolute;float:right;right:20px}.local-square-nps{width:38px;border-radius:0;margin-right:0}}@media screen and (min-width:759px){.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:0;display:inline;float:none;position:static;font-size:12px;color:#585b5d}.sv_main .sv_container .sv_body .sv_p_root .sv_q_rating .sv_q_rating_min_text{margin-right:0;display:inline;float:none;position:static}span.sv_q_rating_max_text{margin-left:0;display:inline;float:none;font-size:12px;color:#585b5d}span.sv_q_rating_item_text{padding:5px}.local-square-nps{width:30px;border-radius:0;margin-right:0}}';
                css += responsiveCss;                
            }

            if(style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
        });
        console.log("*****");

        var converter = new showdown.Converter();
        _apollo_frame.script.onTextMarkdown.add(function (survey, options) {
                var str = converter.makeHtml(options.text);
                str = str.substring(3);
                str = str.substring(0, str.length - 4);
                options.html = str;
            });

        var notNowButtonAdded = false;
        _apollo_frame.script.onAfterRenderSurvey.add(function() {
            if(notNowButtonAdded) return;
            var notNowButton = document.createElement("button");

            notNowButton.id = 'close-modal-survey-button';
            notNowButton.type = "button";
            notNowButton.className = "btn btn-info btn-xs close-modal not-now-button";
            notNowButton.innerHTML = (json.buttonTextNotNow || 'Ahora no');

            document.querySelector('.sv_nav').appendChild(notNowButton);

            notNowButtonAdded = true;
            var surveyTitleElement = document.getElementsByClassName('sv_page_title')[0];
            if(surveyTitleElement !== undefined) {
                surveyTitleElement.style.color = json.surveyTitleColor;
            }

            var surveyBody = document.getElementsByClassName('sv_main');
            if(surveyBody.length > 0) {
                surveyBody[0].style.fontFamily = json.surveyFontFamily;
            }

            //Cambiar de posición el "minRateDescription"
            console.log("json.elements.minRateDescription: ");
            var minRateDescription = json.pages[0].elements[0].minRateDescription;
            if(minRateDescription !== null && minRateDescription !== undefined) {
                //document.getElementsByClassName('sv_q_rating_max_text').style.display = 'none';
            }
            
        });

        var newModalFooter = json.pages[0].elements[json.pages[0].elements.length - 1].html;
        if(newModalFooter !== undefined) {
            newModalFooter = converter.makeHtml(newModalFooter);
            var disclaimerElement = document.createElement('div');

            disclaimerElement.id = 'survey-footer';
            disclaimerElement.innerHTML = '<div class="modal-footer-dynamic-content" ' + 'style="color: ' + json.surveyDisclaimerColor + "; font-family: " + json.surveyFontFamily + ';">' + newModalFooter + '</div>';
            document.getElementsByTagName('body')[0].appendChild(disclaimerElement);
        }

        _apollo_frame.element = new Vue({
            el: '#surveyElement',
            data: {
                survey: _apollo_frame.script
            }
        });

        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        const targetSurveyDOM = document.getElementById('surveyElement');
        const config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        };

        const observer = new MutationObserver(function(mutations) {
            parent.window.postMessage({
                eventId: 'resizeModalHeight-YWxjby90ZXN0LWRhbmllbA==',
                data: {
                    realIframeFullHeight: getRealIframeFullHeight(0, 0)
                }
            }, '*');

            let elementWithFinalMessage = document.getElementsByClassName('sv_completed_page');
            if(elementWithFinalMessage.length > 0) {
                parent.window.postMessage({
                    eventId: 'resizeModalHeight-YWxjby90ZXN0LWRhbmllbA==',
                    data: {
                        realIframeFullHeight: getRealIframeFullHeight(46 * 2, 0)
                    }
                }, '*');
                observer.disconnect();                
            }

        });

        observer.observe(targetSurveyDOM, config);

        function getRealIframeFullHeight(increment, decrement) {
            var disclaimerElementHeight = (document.getElementById('survey-footer') === null ? 0 : document.getElementById('survey-footer').offsetHeight);
            var realIframeFullHeight = document.body.children[0].offsetHeight + disclaimerElementHeight;

            return realIframeFullHeight + increment - decrement;
        }

        window._apollo_frame.script.onComplete.add(function (result) {
            let surveyFooter = document.getElementById('survey-footer');
            if(surveyFooter !== null) {
                surveyFooter.style.display = 'none';
            }
            parent.window.postMessage({
                eventId: 'showCloseModalButton-YWxjby90ZXN0LWRhbmllbA=='
            }, '*');
        });

        window.onmessage = function(e){
            if(e.data == 'addEventListenerToCloseButton') {
                document.getElementById('close-modal-survey-button').addEventListener('click', function() {
                    parent.window.postMessage('apolloCloseSurvey-YWxjby90ZXN0LWRhbmllbA==', '*');
                });
            }

            if(e.data == 'getFullIframeHeight') {
                parent.window.postMessage({
                    eventId: 'resizeModalHeight-YWxjby90ZXN0LWRhbmllbA==',
                    data: {
                        realIframeFullHeight: getRealIframeFullHeight(0, 0)
                    }
                }, '*');
            }
        };

    })(window);