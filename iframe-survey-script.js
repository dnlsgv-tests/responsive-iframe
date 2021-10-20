
    (function(_window) {

        // BEGIN SURVEY HELPERS

        function preprocessSurveyJSON(surveyJson) {
            console.log('[preprocessSurveyJSON]');
            let surveyPages = surveyJson.pages;
            let pagesLength = surveyPages.length;
            let convertedMatrixObjects = [];
        
            for (let i = 0; i < pagesLength; i++) {
        
                let pageQuestions = surveyPages[i].elements;
                let pageQuestionsLength = pageQuestions.length;
                
                //iterate through page questions
                for (let j = 0; j < pageQuestionsLength; j++) {
                    let currentQuestion = pageQuestions[j];
        
                    if (currentQuestion.type !== null && currentQuestion.type !== undefined) {
        
                        if (currentQuestion.type === "matrix") {
        
                            let newMatrixDropDownQuestion = {
                                type: "matrixdropdown",
                                name: currentQuestion.name,
                                title: currentQuestion.title,
                                columns: null,
                                choices: currentQuestion.columns,
                                rows: currentQuestion.rows
                            };
        
                            let concatenatedColumns = "";
        
                            for (let k = 0; k < currentQuestion.columns.length; k++) {
                                if (currentQuestion.columns[k].text === undefined) {
                                    concatenatedColumns += (currentQuestion.columns[k] + "/");
                                } else {
                                    concatenatedColumns += (currentQuestion.columns[k].text.es + "/");
                                }
                            }
        
                            newMatrixDropDownQuestion.columns = [{
                                "name": concatenatedColumns,
                                "title": {
                                    "es": concatenatedColumns
                                }
                            }];
                            
                            currentQuestion.type = "matrixdropdown"
                            currentQuestion.title = newMatrixDropDownQuestion.title;
                            currentQuestion.columns = newMatrixDropDownQuestion.columns;
                            currentQuestion.choices = newMatrixDropDownQuestion.choices;
                            currentQuestion.rows = newMatrixDropDownQuestion.rows;
        
                            convertedMatrixObjects[currentQuestion.name] = {
                                questionName: currentQuestion.name,
                                columnName: concatenatedColumns,
                                rowName: newMatrixDropDownQuestion.rows
                            };
                        }
                    }            
                }
            }
        
            for (let i = 0; i < pagesLength; i++) {
        
                let pageQuestions = surveyPages[i].elements;
                let pageQuestionsLength = pageQuestions.length;
                
                //iterate through page questions
                for (let j = 0; j < pageQuestionsLength; j++) {
                    let currentQuestion = pageQuestions[j];
        
                    transformLogicalIfPropertyTrigger(currentQuestion, convertedMatrixObjects);
        
                    if (currentQuestion.type === "matrixdropdown") {
                        // iterar sobre filas
                        if (currentQuestion.rows === null || currentQuestion.rows === undefined) {
                            continue;
                        }
        
                        let matrixRows = currentQuestion.rows;
        
                        for (let i = 0; i < matrixRows.length; i++) {
                            let currentRow = matrixRows[i];
        
                            transformLogicalIfPropertyTrigger(currentRow, convertedMatrixObjects);
                        }
                    }
                }
            }
        
            return surveyJson;
        }
        
        function detectIfBrowserIsOnMobileDevice() {
            console.log('[detectIfBrowserIsOnMobileDevice]');
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                //document.write("desde un dispositivo mobil");
                return true;
            }
            //document.write("desde un navegador de PC<br>");
            return false;
        }
        
        function sendDataToServer(survey) {
            /*
                Hacer post de survey.data a algun endpoint.
        
                Usar la funcion getDiffBetweenSurveyDataJSON() para ver las diferencias entre el json de respuesta normal y final.
            */
           console.log('response:');
           console.log(survey.data);
        }
        
        function addHtmlNpsEmoticonBar(options) {
            options.htmlElement.classList.add('no-padding-bottom');
            $('<div class="sv_qstn" style="padding-top: 0;"><img src="https://s3.amazonaws.com/s3-loyalink/barra_caras.png" alt="" title="" width="100%" style="display: block;" border="0"></div>').insertAfter($(options.htmlElement));    
        }
        
        function drawNpsQuestionWithBorderBottomColor(npsHtmlElement, typeOfNpsQuestion, npsColors) {
        
            if (typeOfNpsQuestion !== "1" && typeOfNpsQuestion !== "2" && typeOfNpsQuestion !== "3") {
                return;
            }
            //NPS 0-10
            if (typeOfNpsQuestion === "1") {
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(-n+7)").css("border-bottom", "2px solid " + npsColors.detractorColor);
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(8), .custom-rating > .btn:nth-child(9)").css("border-bottom", "2px solid " + npsColors.passiveColor);
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(10), .custom-rating > .btn:nth-child(11)").css("border-bottom", "2px solid " + npsColors.promotorColor);
            }
            //NPS 1-5
            if (typeOfNpsQuestion === "2") {
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(-n+3)").css("border-bottom", "2px solid " + npsColors.detractorColor);
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(4)").css("border-bottom", "2px solid " + npsColors.passiveColor);
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(5)").css("border-bottom", "2px solid " + npsColors.promotorColor);
            }
            //NPS 1-7
            if (typeOfNpsQuestion === "3") {
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(-n+5)").css("border-bottom", "2px solid " + npsColors.detractorColor);
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(6)").css("border-bottom", "2px solid " + npsColors.passiveColor);
                $(npsHtmlElement).find(".custom-rating > .btn:nth-child(7)").css("border-bottom", "2px solid " + npsColors.promotorColor);                        
            }
        }  
        
        function transformLogicalIfPropertyTrigger(questionObject, convertedMatrixObjects) {
            if (questionObject.visibleIf !== null && questionObject.visibleIf !== undefined) {
                questionObject.visibleIf = transformLogicalIfPropertyToMatrixDropdownMode(questionObject.visibleIf, convertedMatrixObjects);
            }
        
            if (questionObject.requiredIf !== null && questionObject.requiredIf !== undefined) {
                questionObject.requiredIf = transformLogicalIfPropertyToMatrixDropdownMode(questionObject.requiredIf, convertedMatrixObjects);
            }
        
            if (questionObject.enableIf !== null && questionObject.enableIf !== undefined) {
                questionObject.enableIf = transformLogicalIfPropertyToMatrixDropdownMode(questionObject.enableIf, convertedMatrixObjects);
            }
        }
        
        function transformLogicalIfPropertyToMatrixDropdownMode(propertyValue, convertedMatrixObjects) {
        
            let splitByLeftBracket = propertyValue.split("{");
            let splitByRightBracket =  splitByLeftBracket.map(function(element) {
                return element.split("}");
            });
        
            splitByRightBracket = [].concat.apply([], splitByRightBracket);
        
            let filteredMatrixConditions = splitByRightBracket.filter(function(element) {
                return element.includes(".");
            });
            
            let newCondition = '';
        
            for (let i = 0; i < filteredMatrixConditions.length; i++) {
                let oldCondition = filteredMatrixConditions[i];
                let possibleMatrixConvertedName = filteredMatrixConditions[i].split(".")[0];
                let possibleMatrixConvertedRow = filteredMatrixConditions[i].split(".")[1];
        
                if (convertedMatrixObjects[possibleMatrixConvertedName] !== undefined) {
                    let currentMatrixColumnName = convertedMatrixObjects[possibleMatrixConvertedName].columnName;
                    
                    newCondition = possibleMatrixConvertedName + "." + possibleMatrixConvertedRow + "." + currentMatrixColumnName;
        
                    propertyValue = propertyValue.replace(oldCondition, newCondition);
                }
            }
        
            return propertyValue;
        }
        
        function parseResponseJSON(responseJSON) {
            let output = {};
            let globalFields = {};
        
            for (let key in responseJSON) {
                if (responseJSON.hasOwnProperty(key)) {
                    let currentSurveyQuestion = _apollo_frame.script.getQuestionByName(key);
        
                    if (currentSurveyQuestion === null || currentSurveyQuestion === undefined) {
                        continue;
                    }
        
                    let currentQuestionType = currentSurveyQuestion.getType(),
                        currentQuestionComment = (currentQuestionType === "radiogroup" || currentQuestionType === "checkbox" ? responseJSON[currentSurveyQuestion.name + "-Comment"] : null),
                        currentSurveyQuestionParsedName = (currentSurveyQuestion.parsedName === undefined ? currentSurveyQuestion.name : currentSurveyQuestion.parsedName),
                        currentSurveyQuestionResultIndex = (currentSurveyQuestion.belongsToIndexResult === undefined ? "1" : currentSurveyQuestion.belongsToIndexResult);
        
                    let formattedQuestionValue = formatQuestionValue(currentSurveyQuestion, currentQuestionComment);
        
                    if (currentSurveyQuestionResultIndex === "all") {
                        if (currentQuestionType === "matrix" || currentQuestionType === "matrixdropdown") {
                            globalFields = Object.assign(globalFields, formattedQuestionValue);
                        } else {
                            globalFields[currentSurveyQuestionParsedName] = formattedQuestionValue;
                        }
                        continue;
                    }
                    if (output["result-" + currentSurveyQuestionResultIndex] === undefined) {
                        output["result-" + currentSurveyQuestionResultIndex] = {};
                    }
        
                    if (currentQuestionType === "matrixdropdown" && currentSurveyQuestionParsedName === "b_drivers") {
                        if (currentSurveyQuestion.addExtraLeverCheckbox) {
                            if (TRACKING_B_DRIVERS_CHECKBOXES[currentSurveyQuestion.name]) {
                                continue;
                            }
                        }
                    }
        
                    if (currentQuestionType === "matrix" || currentQuestionType === "matrixdropdown") {
                        // hacer merge
                        output["result-" + currentSurveyQuestionResultIndex] = Object.assign(output["result-" + currentSurveyQuestionResultIndex], formattedQuestionValue);
                    } else {
                        output["result-" + currentSurveyQuestionResultIndex][currentSurveyQuestionParsedName] = formattedQuestionValue;
                    }
                }
            }
            // add global fields
            output = mergeGlobalFieldsWithEachResult(globalFields, output);
            return output;
        }
        
        function mergeGlobalFieldsWithEachResult(globalFields, surveyJSON) {
            for (let key in surveyJSON) {
                if (surveyJSON.hasOwnProperty(key)) {
                    surveyJSON[key] = Object.assign(surveyJSON[key], globalFields);
                }
            }
            return surveyJSON;
        }
        
        function formatQuestionValue(questionObject, questionComment) {
            if (questionObject.getType() === "radiogroup" && surveyWithLoyalinkOldCss) {
                let radiogroupQuestionFormatted = questionObject.value;
        
                if (radiogroupQuestionFormatted != null && radiogroupQuestionFormatted.includes('other')) {
                    radiogroupQuestionFormatted = radiogroupQuestionFormatted.replace("other", "Otros|" + questionComment);
                }
                return radiogroupQuestionFormatted;
            }
        
            if (questionObject.getType() === "checkbox" && surveyWithLoyalinkOldCss) {
                let includeOthers = questionObject.value.includes("other");
                let checkboxValueFormatted = '';
        
                if (includeOthers) {
                    let tempCheckboxValues = [];
                    for(let i = 0; i < questionObject.value.length; i++) {
                        if (questionObject.value[i] !== "other") {
                            tempCheckboxValues.push(questionObject.value[i]);
                        }
                    }
        
                    tempCheckboxValues.push("other");
        
                    checkboxValueFormatted = tempCheckboxValues.join('|');
                    checkboxValueFormatted = checkboxValueFormatted.replace("other", "Otros|" + questionComment);
                } else {
                    checkboxValueFormatted = questionObject.value.join('|');
                }
        
                return checkboxValueFormatted;
            }
        
            let matrixPlainValues = {};
        
            if (questionObject.getType() === "matrix" && surveyWithLoyalinkOldCss) {
                //Subir un nivel
                for(let matrixKey in questionObject.value) {
                    matrixPlainValues[matrixKey] = questionObject.value[matrixKey];
                }
                return matrixPlainValues;
            }
            
            if (questionObject.getType() === "matrixdropdown" && surveyWithLoyalinkOldCss && questionObject.isLeversSelector && questionObject.name.includes("b_drivers")) {
                let leversCodes = [];
        
                for(let matrixDropdownKey in questionObject.value) {
                    let neutralColumnIndex = (questionObject.monoLeversSelector ? 0 : 1);
                    let matrixDropdownLastLevelKey = Object.keys(questionObject.value[matrixDropdownKey])[neutralColumnIndex];
                    let questionCellCode = questionObject.value[matrixDropdownKey][matrixDropdownLastLevelKey];
                    
                    if (questionCellCode !== undefined) {
                        leversCodes.push(questionCellCode);
                    }
                }
        
                matrixPlainValues[questionObject.name] = leversCodes.join();
        
                return matrixPlainValues;
            }
        
            if (questionObject.getType() === "matrixdropdown" && surveyWithLoyalinkOldCss) {
                //Subir un nivel
                for(let matrixDropdownKey in questionObject.value) {
                    let matrixDropdownLastLevelKey = Object.keys(questionObject.value[matrixDropdownKey])[0];
        
                    matrixPlainValues[matrixDropdownKey] = questionObject.value[matrixDropdownKey][matrixDropdownLastLevelKey];
                }
                return matrixPlainValues;
            }
        
            return questionObject.value;
        }
        
        function getDiffBetweenSurveyDataJSON() {
            console.log('JSON inicial:');
            console.log(BEGIN_JSON);
            console.log('JSON final: ');
            console.log(END_JSON);
        }
        
        function validateUniqueValuesInNeutralColumn(options) {
            if (!checkIfCurrentColumnIsNeutral(options)) {
                return false;
            }
        
            return checkIfMatrixCellHasAnyError(options);
        }
        
        function checkIfCurrentColumnIsNeutral(options) {
            if (options.question.columns.length === 1) {
                return false;
            }
        
            let currentColumnTitle = options.columnName;
            let neutralColumnTitle = options.question.columns[1].title;
        
            if (currentColumnTitle === neutralColumnTitle) {
                return true;
            }
        
            return false;
        }
        
        function checkIfCurrentColumnIsMonoNeutral(options) {
            if (options.question.columns.length === 2) {
                return false;
            }
        
            let currentColumnTitle = options.columnName;
            let neutralColumnTitle = options.question.columns[0].title;
        
            if (currentColumnTitle === neutralColumnTitle) {
                return true;
            }
        
            return false;
        }
        
        function validateUniqueValuesInNeutralColumnMonoSelector(options) {
            if (!checkIfCurrentColumnIsMonoNeutral(options)) {
                return false;
            }
        
            return checkIfMatrixCellHasAnyError(options);
        }
        
        function checkIfMatrixCellHasAnyError(options) {
            let matrixCellHasErrors = false;
            let rows = options.question.visibleRows;
        
            for (let i = 0; i < rows.length; i++) {
                if (rows[i] === options.row) {
                    continue;
                }
        
                if (rows[i].value && rows[i].value[options.columnName] == options.value) {
                    matrixCellHasErrors = true;
                }
            }
        
            return matrixCellHasErrors;    
        }
        
        function verifyVerbatimExistenceOfEveryResult(responseJSON) {
            for (let key in responseJSON) {
                if (responseJSON.hasOwnProperty(key)) {
                    let resultIndex = key.split('-')[1];
                    let currentResult = responseJSON[key];
                    let verbatimKeyExists = currentResult.hasOwnProperty("b_verbatim");
                    let driversKeyExists = currentResult.hasOwnProperty("b_drivers-" + resultIndex);
        
                    if (verbatimKeyExists) {
                        if (driversKeyExists) {
                            let currentVerbatimValue = responseJSON[key]["b_verbatim"];
        
                            if (currentVerbatimValue.length <= 3) {
                                responseJSON[key]["b_verbatim"] = currentVerbatimValue + "____";
                            }
                        }
                    } else {
                        if (driversKeyExists) {
                            responseJSON[key]["b_verbatim"] = "____";
                        }
                    }
                }
            }
            return responseJSON;
        }

        // END SURVEY HELPERS
        
        // BEGIN SURVEY CONFIGURATIONS

        Survey.StylesManager.applyTheme("bootstrap");

        //Definicion de nuevas propiedades soportadas en el JSON de la encuesta
        Survey.JsonObject.metaData.addProperty("survey", {
            name: "loyalinkOldCss:switch",
            category: "general",
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("survey", {
            name: "hideHeaderAndFooterAfterResponse:switch",
            category: "general",
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("survey", {
            name: "transformMatrixToMatrixDropdownOnMobileDevices:switch",
            category: "general",
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "hasExtraQuestion:switch",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "extraQuestionText",
            category: "general",
            maxLength: 15,
            readOnly: false,
            default: "NS/NR"
            // ,
            // dependsOn: ["hasExtraQuestion"],
            // visibleIf: function(obj) {
            //     return obj.hasExtraQuestion;
            // }    
        });
        
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "typeOfNps:string",
            displayName: "Tipo de NPS",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "showNpsEmoticonBar:switch",
            category: "general",
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "showBottomBorderColors:switch",
            category: "general",
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "detractorColor:color",
            displayName: "Color detractor",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "passiveColor:color",
            displayName: "Color pasivo",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("rating", {
            name: "promotorColor:color",
            displayName: "Color promotor",
            category: "general",
            default: "#53770E"
        });
        
        Survey.JsonObject.metaData.addProperty("text", {
            name: "useExternalService",
            displayName: "Usar servicio externo",
            category: "general",
            choices: function() {
                return ["salcobrand-products"];
            },    
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("survey", {
            name: "consumeExternalServices:switch",
            displayName: "Consumir servicios externos",
            category: "general",
            default: false
        });
        
        Survey.JsonObject.metaData.addProperty("question", {
            name: "belongsToIndexResult",
            category: "general"
        });
        Survey.JsonObject.metaData.addProperty("question", {
            name: "parsedName",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("matrixdropdown", {
            name: "leversEntered",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("matrixdropdown", {
            name: "isLeversSelector:switch",
            category: "general"
        });
        
        Survey.JsonObject.metaData.addProperty("matrixdropdown", {
            name: "monoLeversSelector:switch",
            category: "Opciones de palancas"
        });
        
        Survey.JsonObject.metaData.addProperty("matrixdropdown", {
            name: "addExtraLeverCheckbox:switch",
            category: "Opciones de palancas"
        });
        
        Survey.JsonObject.metaData.addProperty("matrixdropdown", {
            name: "extraLeverCheckboxText",
            category: "Opciones de palancas"
        });
        //Fin definicion de nuevas propiedades soportadas en el JSON de la encuesta
        
        let DEFAULT_SURVEY_PROPERTIES = {
            DETRACTOR_COLOR: "#B9001C",
            PASSIVE_COLOR: "#D39E10",
            PROMOTOR_COLOR: "#53770E",
            TYPE_OF_NPS: "1",
            HAS_EXTRA_QUESTION: false,
            SHOW_NPS_EMOTICON_BAR: false,
            SHOW_BOTTOM_BORDER_COLORS: false,
            MIN_RATE_DESCRIPTION: "",
            MAX_RATE_DESCRIPTION: ""
        };        

        // END SURVEY CONFIGURATIONS

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

        json = {"pages":[{"name":"página1","elements":[{"type":"radiogroup","name":"pregunta1-1","belongsToIndexResult":"1","parsedName":"pregunta1","customNameSelected":"pregunta1","choices":["item1","item2","item3"]},{"type":"checkbox","name":"pregunta2-1","belongsToIndexResult":"1","parsedName":"pregunta2","customNameSelected":"pregunta2","choices":["item1","item2","item3"],"hasOther":true},{"type":"matrix","name":"pregunta3-1","belongsToIndexResult":"1","parsedName":"pregunta3","customNameSelected":"pregunta3","columns":["Column 1","Column 2","Column 3"],"rows":["Row 1","Row 2"]}]}],"mainSurveyColor":"#8622E1","buttonTextNotNow":"Ahora no","surveyFontFamily":"PFBeauSansPro","surveyTitleColor":"#2998CF","surveyQuestionColor":"#000000","surveyDisclaimerColor":"#FF0000","surveyQuestionNpsShape":"circle","transformMatrixToMatrixDropdownOnMobileDevices":true};
        json = {
            "completedHtml": "<div class=\"container\" style=\"margin-top:40px;\">\n\t<div id=\"rootwizard\" class=\"row col-md-offset-3 col-md-6 coll-off\">\n\t\t<div class=\"panel panel-default\" style=\"border-color: #ffffff; border: 2px solid #ffffff;font-family: Helvetica, Sans-Serif;\">\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t<p class=\"text-center\"></p>\n\t\t\t\t\t<h3 class=\"text-center\">Muchas gracias por tu tiempo.</h3>\n\t\t\t\t\t<h5 class=\"text-center\">Tu opinión es muy importante para nosotros.</h5>\n\t\t\t\t<p></p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>",
            "pages": [
             {
              "name": "página1",
              "elements": [
               {
                "type": "rating",
                "name": "b_nps",
                "title": "En base a la experiencia de navegación y compra en nuestra página web. ¿Qué tan probable es que recomiendes comprar en esta página a un familiar o amigo?",
                "isRequired": true,
                "requiredErrorText": {
                 "es": "Debe ingresar una calificación"
                },
                "rateMin": 0,
                "rateMax": 10,
                "minRateDescription": "No recomendarías en absoluto",
                "maxRateDescription": "Sí recomendarías"
               },
               {
                "type": "comment",
                "name": "b_verbatim-1",
                "visibleIf": "{b_nps} <= 6",
                "title": "Por favor, coméntanos sobre qué debemos mejorar en nuestra página web.",
                "isRequired": true,
                "requiredErrorText": {
                 "es": "Debe ingresar una respuesta"
                },
                "placeHolder": {
                 "es": "Comente",
                 "default": "Tu opinión es muy importante para nosotros."
                }
               },
               {
                "type": "comment",
                "name": "b_verbatim-2",
                "visibleIf": "{b_nps} = 7 or {b_nps} = 8",
                "title": "¿Qué tendríamos que mejorar en nuestro sitio para lograr la nota máxima?",
                "isRequired": true,
                "requiredErrorText": {
                 "es": "Debe ingresar una respuesta"
                },
                "placeHolder": {
                 "es": "Comente",
                 "default": "Tu opinión es muy importante para nosotros."
                }
               },
               {
                "type": "comment",
                "name": "b_verbatim-3",
                "visibleIf": "{b_nps} >= 9",
                "title": "Coméntanos por qué fue muy buena tu experiencia en nuestro sitio.",
                "isRequired": true,
                "requiredErrorText": {
                 "es": "Debe ingresar una respuesta"
                },
                "placeHolder": {
                 "es": "Comente",
                 "default": "Tu opinión es muy importante para nosotros."
                }
               }
              ],
              "title": "¡Cuéntanos cómo te fue!"
             },
             {
              "name": "página2",
              "elements": [
               {
                "type": "text",
                "name": "o_112-1",
                "title": "o_112 title",
                "belongsToIndexResult": "1",
                "parsedName": "o_112",
                "customNameSelected": "o_112"
               },
               {
                "type": "checkbox",
                "name": "o_113-1",
                "title": "o_113 title",
                "belongsToIndexResult": "1",
                "parsedName": "o_113",
                "customNameSelected": "o_113",
                "choices": [
                 {
                  "value": "valor1",
                  "text": "texto1"
                 },
                 {
                  "value": "valor2",
                  "text": "texto2"
                 },
                 {
                  "value": "valor3",
                  "text": "texto3"
                 }
                ],
                "hasOther": true,
                "otherPlaceHolder": "asdf",
                "otherText": "Otro escriba"
               }
              ]
             },
             {
              "name": "página3",
              "elements": [
               {
                "type": "radiogroup",
                "name": "o_114-1",
                "title": "o_114 title",
                "belongsToIndexResult": "1",
                "parsedName": "o_114",
                "customNameSelected": "o_114",
                "choices": [
                 "item1",
                 "item2",
                 "item3"
                ],
                "hasOther": true,
                "otherPlaceHolder": "zxcv",
                "otherText": "Otro escriba"
               },
               {
                "type": "dropdown",
                "name": "o_115-1",
                "title": "o_115 title",
                "belongsToIndexResult": "1",
                "parsedName": "o_115",
                "customNameSelected": "o_115",
                "choices": [
                 {
                  "value": "valor1",
                  "text": "texto1"
                 },
                 {
                  "value": "valor2",
                  "text": "texto2"
                 },
                 {
                  "value": "valor3",
                  "text": "texto3"
                 }
                ]
               }
              ]
             },
             {
              "name": "página4",
              "elements": [
               {
                "type": "comment",
                "name": "o_116-1",
                "title": "o_116 title",
                "belongsToIndexResult": "1",
                "parsedName": "o_116",
                "customNameSelected": "o_116"
               },
               {
                "type": "rating",
                "name": "o_117-1",
                "title": "o_117 title",
                "belongsToIndexResult": "1",
                "parsedName": "o_117",
                "customNameSelected": "o_117",
                "rateValues": [
                 {
                  "value": "1",
                  "text": "1"
                 },
                 {
                  "value": "2",
                  "text": "2"
                 },
                 {
                  "value": "3",
                  "text": "3"
                 },
                 {
                  "value": "4",
                  "text": "4"
                 },
                 {
                  "value": "5",
                  "text": "5"
                 },
                 {
                  "value": "6",
                  "text": "6"
                 },
                 {
                  "value": "7",
                  "text": "7"
                 }
                ],
                "rateMax": 7,
                "typeOfNps": "3",
                "showBottomBorderColors": true
               }
              ]
             },
             {
              "name": "página5",
              "elements": [
               {
                "type": "matrix",
                "name": "x_118_119-1",
                "title": "x_118_119 title",
                "belongsToIndexResult": "1",
                "parsedName": "x_118_119",
                "customNameSelected": "x_118_119",
                "columns": [
                 {
                  "value": "1",
                  "text": "1"
                 },
                 {
                  "value": "2",
                  "text": "2"
                 },
                 {
                  "value": "3",
                  "text": "3"
                 },
                 {
                  "value": "4",
                  "text": "4"
                 },
                 {
                  "value": "5",
                  "text": "5"
                 },
                 {
                  "value": "NS/NR",
                  "text": "NS/NR"
                 }
                ],
                "rows": [
                 {
                  "value": "o_118",
                  "text": "o_118 fila"
                 },
                 {
                  "value": "o_119",
                  "text": "o_119 fila"
                 }
                ]
               }
              ]
             }
            ],
            "showQuestionNumbers": "off",
            "completeText": "Enviar",
            "mainSurveyColor": "#FC6502",
            "sideButtonColor": "#000000",
            "buttonTextNotNow": "Ahora no",
            "surveyFontFamily": "Helvetica",
            "surveyTitleColor": "#FC6502",
            "surveyQuestionColor": "#665353",
            "surveyDisclaimerColor": "#040000",
            "surveyQuestionNpsShape": "circle",
            "transformMatrixToMatrixDropdownOnMobileDevices": true
           };
        var extras = {"b_algo": "HOLA"};
        var defaultThemeColors = {};

        defaultThemeColors["$main-color"] = json.mainSurveyColor;
        defaultThemeColors["$main-hover-color"] = json.mainSurveyColor;
        defaultThemeColors["$header-color"] = json.mainSurveyColor;
        defaultThemeColors["$text-color"] = (json.surveyQuestionColor === undefined ? 'black' : json.surveyQuestionColor);
        Survey.StylesManager.ThemeColors["new_theme"] = defaultThemeColors;
        Survey.StylesManager.applyTheme("new_theme");

        // BEGIN PRE PROCESS SURVEY JSON
        let transformMatrixToMatrixDropdownOnMobileDevices = (json.transformMatrixToMatrixDropdownOnMobileDevices ? true : false);
        let surveyWithLoyalinkOldCss = true; // (json.loyalinkOldCss ? true : false);
        
        if (transformMatrixToMatrixDropdownOnMobileDevices && detectIfBrowserIsOnMobileDevice()) {
            json = preprocessSurveyJSON(json);
        }

        // END PRE PROCESS SURVEY JSON

        _apollo_frame.script = new Survey.Model(json);

        // BEGIN RUNTIME VARS
        let BEGIN_JSON = null;
        let END_JSON = null;
        let TRACKING_B_DRIVERS_CHECKBOXES = {};
        
        _apollo_frame.script.setValue("TRACKING_B_DRIVERS_CHECKBOXES", TRACKING_B_DRIVERS_CHECKBOXES);
        // END RUNTIME VARS

        // BEGIN LOYALINK EVENTS
        _apollo_frame.script.onAfterRenderQuestion.add(function(survey, options) {
            let typeOfCurrentQuestion = options.question.getType();
        
            if (typeOfCurrentQuestion === "matrixdropdown" && options.question.name.includes('b_drivers-')) {
                if (options.question.addExtraLeverCheckbox && options.question.extraLeverCheckboxText !== "") {
                    let uniqueCheckboxName = options.question.name + "-optional-checkbox";
        
                    $("<div style='margin-left: 10px'><input type='checkbox' id='" + uniqueCheckboxName + "' > " + options.question.extraLeverCheckboxText + "</div>").insertAfter($(options.htmlElement).children().eq(1));
        
                    $('#' + uniqueCheckboxName).change(function() {
                        let questionName = this.id.split("-optional-checkbox")[0];
                        let currentMatrixDropdownQuestion = survey.getQuestionByName(questionName); 
        
                        TRACKING_B_DRIVERS_CHECKBOXES[questionName] = this.checked;
        
                        if (currentMatrixDropdownQuestion !== null) {
                            currentMatrixDropdownQuestion.isRequired = !this.checked;
                        }
        
                        survey.setValue("TRACKING_B_DRIVERS_CHECKBOXES", TRACKING_B_DRIVERS_CHECKBOXES);
                    });            
                }
            }
            // if (typeOfCurrentQuestion === "rating") {
            //     let typeOfNpsQuestion       = options.question.typeOfNps                    || DEFAULT_SURVEY_PROPERTIES.TYPE_OF_NPS,
            //         detractorColor          = options.question.detractorColor               || DEFAULT_SURVEY_PROPERTIES.DETRACTOR_COLOR,
            //         passiveColor            = options.question.passiveColor                 || DEFAULT_SURVEY_PROPERTIES.PASSIVE_COLOR,
            //         promotorColor           = options.question.promotorColor                || DEFAULT_SURVEY_PROPERTIES.PROMOTOR_COLOR,
            //         hasExtraQuestion        = options.question.hasExtraQuestion             || DEFAULT_SURVEY_PROPERTIES.HAS_EXTRA_QUESTION,
            //         showNpsEmoticonBar      = options.question.showNpsEmoticonBar           || DEFAULT_SURVEY_PROPERTIES.SHOW_NPS_EMOTICON_BAR,
            //         showBottomBorderColors  = options.question.showBottomBorderColors       || DEFAULT_SURVEY_PROPERTIES.SHOW_BOTTOM_BORDER_COLORS,
            //         minRateDescription      = options.question.minRateDescription.trim()    || DEFAULT_SURVEY_PROPERTIES.MIN_RATE_DESCRIPTION,
            //         maxRateDescription      = options.question.maxRateDescription.trim()    || DEFAULT_SURVEY_PROPERTIES.MAX_RATE_DESCRIPTION;
        
            //     // console.log('**********');
            //     // console.log('name: ' + options.question.name);
            //     // console.log('typeOfNpsQuestion: ' + typeOfNpsQuestion + `.${typeof typeOfNpsQuestion}`);
            //     // console.log('detractorColor: ' + detractorColor);
            //     // console.log('passiveColor: ' + passiveColor);
            //     // console.log('promotorColor: ' + promotorColor);
            //     // console.log('hasExtraQuestion: ' + hasExtraQuestion);
            //     // console.log('showNpsEmoticonBar: ' + showNpsEmoticonBar);
            //     // console.log('showBottomBorderColors: ' + showBottomBorderColors);
            //     // console.log('minRateDescription: ' + minRateDescription);
            //     // console.log('maxRateDescription: ' + maxRateDescription);
            //     // console.log('**********');
                
            //     //Caritas disponibles
            //     if (typeOfNpsQuestion === "1" && !hasExtraQuestion && showNpsEmoticonBar) {
            //         addHtmlNpsEmoticonBar(options);
            //     }
        
            //     //Mostrar borde inferior de colores
            //     if (showBottomBorderColors) {
            //         let npsHtmlElement = options.htmlElement;
            //         let npsColors = {
            //             detractorColor: detractorColor,
            //             passiveColor: passiveColor,
            //             promotorColor: promotorColor
            //         };
        
            //         drawNpsQuestionWithBorderBottomColor(npsHtmlElement, typeOfNpsQuestion, npsColors);
            //     }
        
            //     options.question.minRateDescription = '';
            //     options.question.maxRateDescription = '';
        
            //     if (minRateDescription !== "" && maxRateDescription !== "") {
            //         let questionHtmlElement = options.htmlElement;
        
            //         let npsBar = '<div><div><span style="font-size: 80%; margin-bottom: 10px; display: inline-block;">' + minRateDescription + '</span><span style="font-size: 80%; text-align: right; float: right">' + maxRateDescription + '</span></div></div>';
                    
            //         $(npsBar).insertBefore($(questionHtmlElement).find(".custom-rating"));
            //     }
            // }
        });

        _apollo_frame.script.onAfterRenderSurvey.add(function(survey, options) {

            /*  
                Obtener todas las preguntas b_drivers
            */
        
            let allLeversMatrixIds = [];
            let associativeLeversMatrix = [];
        
            for (let i = 1; i < 4; i++) {
                let b_drivers_question = survey.getQuestionByName('b_drivers-' + i);
        
                if (b_drivers_question === null) {
                    continue;
                }
                allLeversMatrixIds.push(b_drivers_question.id);
            }
        
            for (let i = 0; i < allLeversMatrixIds.length; i++) {
                let currentLeversMatrixId = allLeversMatrixIds[i];
                let matrixColumnsCount = $("#" + currentLeversMatrixId + " table > tbody > tr:first > td").length - 1; 
                let interOptions = [];
                let neutralOptions = [];
                let monoLeversSelector = (matrixColumnsCount === 1 ? true : false);
        
                if (!monoLeversSelector) {
                    interOptions = $('#' + currentLeversMatrixId + ' table tbody tr td:first-child').next().find('select');
                    neutralOptions = $('#' + currentLeversMatrixId + ' table tbody tr td:first-child').next().next().find('select');
                } else {
                    neutralOptions = $('#' + currentLeversMatrixId + ' table tbody tr td:first-child').next().find('select');
                }
        
                associativeLeversMatrix.push({
                    id: '#' + currentLeversMatrixId,
                    columnsCount: matrixColumnsCount,
                    monoLeversSelector: monoLeversSelector,
                    interOptions: interOptions,
                    neutralOptions: neutralOptions
                });
            }
        
            // hacer disasabled las palancas neutras
            for (let i = 0; i < associativeLeversMatrix.length; i++) {
                let currentMatrixLever = associativeLeversMatrix[i];
        
                if (!currentMatrixLever.monoLeversSelector) {
        
                    for (let j = 0; j < currentMatrixLever.neutralOptions.length; j++) {
                        let currentNeutralSelector = currentMatrixLever.neutralOptions[j];
                        $(currentNeutralSelector).prop('disabled', 'disabled')
                    }
        
                    for (let j = 0; j < currentMatrixLever.interOptions.length; j++) {
                        let currentInterSelector = currentMatrixLever.interOptions[j];
        
                        $(currentInterSelector).change(function(event) {
                            let currentSelectorValue = $(event.target).val();
                            let currentSelectorId = $(event.target).attr('id');
                            let siblingSelectorId = '#sq_' + (parseInt(currentSelectorId.split('_')[1]) + 1) + 'i';
                            let disabledSiblingSelector = (currentSelectorValue === "" ? 'disabled' : false);
        
                            $(siblingSelectorId).prop('disabled', disabledSiblingSelector);
                        });
                    }
                }
            }    
        });
        
        _apollo_frame.script.onMatrixCellValueChanged.add(function(survey, options) {    
            if (options.question.name.includes('b_drivers-')) {
                options.getCellQuestion(options.columnName).hasErrors(true);
            }
        });
        
        _apollo_frame.script.onMatrixCellValidate.add(function(survey, options) {
            if (options.question.name.includes('b_drivers-') && options.question.monoLeversSelector === undefined && Object.keys(options.rowValue).length === 2) {
                if (validateUniqueValuesInNeutralColumn(options)) {
                    options.error = "Ya has seleccionado este valor";
                } else {
                    options.question.clearErrors();
                }
            }
        
        
            if (options.question.name.includes('b_drivers-') && options.question.monoLeversSelector !== undefined && Object.keys(options.rowValue).length === 1) {
                if (validateUniqueValuesInNeutralColumnMonoSelector(options)) {
                    options.error = "Ya has seleccionado este valor";
                } else {
                    options.question.clearErrors();
                }
            }
        });
        
        _apollo_frame.script.onValidateQuestion.add(function(survey, options) {
            let currentQuestion = options.question;
            let typeOfCurrentQuestion = currentQuestion.getType();
        
            if (typeOfCurrentQuestion === "matrixdropdown" && currentQuestion.isRequired && surveyWithLoyalinkOldCss && detectIfBrowserIsOnMobileDevice()) {
                if(!currentQuestion.rows.every(function(row){if(!row.isVisible) return true;return(options.value || {})[row.itemValue]!==undefined;})){
                    options.error = "Por favor responda todas las preguntas";
                    return;
                }
            }
        
            if (typeOfCurrentQuestion === "matrixdropdown" && currentQuestion.isRequired && surveyWithLoyalinkOldCss && options.name.includes('b_drivers-') && currentQuestion.monoLeversSelector === undefined){
                let atLeastOneFullRow = false;
        
                for (var rowText in options.value) {
                    let numberOfColumnsWithValues = Object.keys(options.value[rowText]).length;
        
                    if (numberOfColumnsWithValues === 2) {
                        atLeastOneFullRow = true;
                        break;
                    }
                }
        
                if (!atLeastOneFullRow) {
                    options.error = "Debes responder al menos una fila completa.";
                    return;
                }
            }    
        });
        
        _apollo_frame.script.onCompleting.add(function(survey, options) {
            BEGIN_JSON = survey.data;
            // onCompleting add hidden inputs
            survey.data = parseResponseJSON(survey.data);
            survey.data = verifyVerbatimExistenceOfEveryResult(survey.data);
            END_JSON = survey.data;
        });

        // END LOYALINK EVENTS

        _apollo_frame
            .script
            .onComplete
            .add(function(result) {

                console.log('result.data: ');
                console.log(result.data);

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