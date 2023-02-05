"use strict";

(function(global, document, $) { 

function ChatLib() {
        
    // Access
    this.themeSets = [defaultTheme, businessTheme, coffeeTheme, customTheme]


    // Storage
    this.userMessages = []

     // Settings
    this.botIcon = ''
    this.userIcon = ''
    this.currentTheme = defaultTheme
    this.botDelay = 1.5
    this.userDelay = 0.5


}


ChatLib.prototype = { 

    createChatWindow: function () {
        const theme = this.currentTheme.window
        const chatWindowDiv = document.createElement('div')
            
            chatWindowDiv.style = `
                margin: `+ theme.margin +`;
                background-color: `+theme.backgroundColor+`;
                width: ` + theme.width + `;
                height: ` + theme.height + `;
                position: ` + theme.position + `; 
                bottom: ` + theme.bottom + `; 
                right: ` + theme.right + `;
                transition: ` + theme.transition + `;
                border-radius: 0.8rem 0.8rem 0 0;`

        chatWindowDiv.id = 'window'

        const themeChatHeader = this.currentTheme.chatHeader
        const chatHead = document.createElement('div')
        chatHead.style = `
                background-color: `+themeChatHeader.colour+`;
                height: `+themeChatHeader.height+`;
                padding: `+themeChatHeader.padding+`;
                border: `+themeChatHeader.border+`;
                display: flex;
                justify-content: `+themeChatHeader.minimizeButtonLocation+`;
                border-radius: `+themeChatHeader.borderRadius+`;`                

        const button = document.createElement('button')
        button.style.padding = themeChatHeader.minimizeButtonPadding
        button.setAttribute('open', 'open')
        button.innerText = themeChatHeader.minimizeButtonContent

        button.onclick = function () {
            if (button.hasAttribute('open')) {
                if (_minimizationEnabled) {
                    _closeWin(chatWindowDiv, "50px")
                    button.removeAttribute('open')
                    button.setAttribute('close', 'close')
                    button.innerText = themeChatHeader.maximizeButtonContent
                }
                else {
                    alert("Chat window cannot be minimized when input has not been submitted")
                }
            }

            else {
                _openWin(chatWindowDiv, theme.height)
                button.removeAttribute('close')
                button.setAttribute('open', 'open')
                button.innerText = themeChatHeader.minimizeButtonContent
            }

        }
        button.setAttribute('id', 'minimizeButton')

        chatHead.appendChild(button)
        chatWindowDiv.appendChild(chatHead)

        const convoWrapper = document.createElement('div')
        convoWrapper.style = `
                display: table-cell;
                vertical-align: bottom;
                width: `+theme.width+ `;
                height: '400px';
                `
                // height: 400%;


        const convoArea = document.createElement('div')
        convoArea.style = `
                    padding-left: `+theme.convoAreaPadding+`;
                    padding-right: `+theme.convoAreaPadding+`;
                    max-height: `+theme.convoAreaHeight+`;
                    overflow: auto;
                    `
        convoArea.id = 'chatArea'

        convoWrapper.appendChild(convoArea)
        _chatArea = convoArea

        chatWindowDiv.appendChild(convoWrapper)

        const body = document.querySelector('body')
        body.append(chatWindowDiv)

        if(_minimizedOnLoad) {
            _closeWin(chatWindowDiv, "50px")
            button.removeAttribute('open')
            button.setAttribute('close', 'close')
            button.innerText = themeChatHeader.maximizeButtonContent
        } 

        _chatWindow = chatWindowDiv
    },

    addBotMessage: function (text, nextFunction) {
        const theme = this.currentTheme.messages
        const paddingAnimation = document.createElement('div')
            paddingAnimation.style = `
                height: 0px;
                padding-bottom: 10px;`
                
        const area = document.createElement('div')
        area.style = `
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
            `
        area.id = 'chatMessage'

        const profilePic = document.createElement('img')
        profilePic.src = this.botIcon
        profilePic.style = `
                margin-right: `+theme.botProfileMarginRight+`;
                border-radius: `+theme.profileBorderRadius+`;
                width: `+theme.profileWidth+`;
                `
        
        const message = document.createElement('p')
        message.innerText = text

        const bubble = document.createElement('div').appendChild(message)
        bubble.style = `
                background-color: `+theme.botBubbleColour+`; 
                color: `+theme.botBubbleTextColour+`; 
                padding: `+theme.botBubblePadding+`;
                width: `+theme.botBubbleWidth+`;
                border-radius:`+theme.botBubbleBorderRadius+`;
                display: inline-block;
                overflow: hidden;
                `

        area.append(profilePic)
        area.append(bubble)

        setTimeout(function () {            
            _chatArea.appendChild(paddingAnimation)
            _chatArea.appendChild(area)
            $(paddingAnimation).animate({
                    "padding-bottom": "0px"
                }, {
                    duration: cl.botDelay*1000/2,
                    })  
                let scroll = _chatArea.scrollHeight - 415
                _chatArea.scrollTop = scroll
                if(nextFunction) {
                    nextFunction()
                }
        
          }, this.botDelay*1000)  
    },

    addUserMessage: function(text, nextFunction) {
        const theme = this.currentTheme.messages
        const paddingAnimationUser = document.createElement('div')
            paddingAnimationUser.style = `
            height: 0px;
            padding-bottom: 10px;
        `
        const areaUser = document.createElement('div')
        areaUser.style = `
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            justify-content: flex-end;
            `

        const profilePic = document.createElement('img')
        profilePic.src = this.userIcon
        profilePic.style = `
            margin-left: `+theme.userProfileMarginLeft+`;
            border-radius: `+theme.profileBorderRadius+`;
            width: `+theme.profileWidth+`;`


        const message = document.createElement('p')
        message.innerText = text
        message.style = `
            font:
        `

        const bubble = document.createElement('div').appendChild(message)
        bubble.style = `
            display: table;
            background-color: `+theme.userBubbleColour+`; 
            color: `+theme.userBubbleTextColour+`; 
            padding: `+theme.userBubblePadding+`;
            border-radius: `+theme.userBubbleBorderRadius+`;
            width:`+theme.userBubbleWidth+`;
            display: inline-block;
            overflow: hidden
            `
        areaUser.append(bubble)
        areaUser.append(profilePic)

        this.userMessages.push(text)

        setTimeout(function () {            
            _chatArea.appendChild(paddingAnimationUser)
            _chatArea.appendChild(areaUser)
            $(paddingAnimationUser).animate({
                    "padding-bottom": "0px"
                }, {
                    duration: cl.userDelay*1000/2,
                    })  
                let scroll = _chatArea.scrollHeight - 415
                _chatArea.scrollTop = scroll
                if(nextFunction) {
                    nextFunction()
                }
        
          }, this.userDelay*1000)

        
    },

    setTheme: function(theme) {
        const themeIndex = _themeSetStrings.indexOf(theme)
        if (themeIndex !== -1) {
            this.currentTheme  = this.themeSets[themeIndex]
        }
        else {
            console.log("Invalid Theme Set : Theme not Set")
        }

    },

    setMinimizeOnLoad: function(boolean) {
        if (boolean == true || boolean == false) {
        _minimizedOnLoad = boolean}

        else {
            console.log("Invalid Parameter Passed: Parameter Must be Boolean")
        }
    },

    setCustomTheme: function(windowStylesInput, messageStylesInput, chatHeaderStylesInput, questionsStylesInput) {
        if(windowTheme != null) {
            customTheme.windowStyles = windowStylesInput
        }
        if(messageStylesInput != null) {
            customTheme.messagesStyles = messageStylesInput
        }

        if(chatHeaderStylesInput != null) {
            customTheme.chatHeaderStyles = chatHeaderStylesInput
        }

        if(questionsStylesInput != null) {
            customTheme.questionsStyles = questionsStylesInput
        }
    },

    setBotIcon: function (imgSrc) {
        this.botIcon = imgSrc
    },

    setUserIcon: function (imgSrc) {
        this.userIcon = imgSrc
    },

    setBotMessageDelay: function(delaySecs) {
        this.botDelay = delaySecs
    },

    addTextQuestion: function (question, placeholder, nextFunction) {
        const theme = this.currentTheme.questions
        _minimizationEnabled = false
        this.addBotMessage(question)

        setTimeout(function() {
        const inputArea = document.createElement('div')
        inputArea.style = `
                background-color: `+theme.textInputBackgroundColour+`;
                padding: 10px;
                border: 0.05px solid;`

        const input = document.createElement('input')
        input.style = `
                padding: 10px;
                width: `+theme.textInputWidth+`;
                margin-left: 2%;
                border-radius: `+theme.textInputBorderRadius+`;;
                border: `+theme.textInputBorder+`;`

        input.placeholder = placeholder
        inputArea.id = 'inputArea'
        inputArea.appendChild(input)

        const send = document.createElement('button')
        send.style.padding = '5px'
        send.style.marginLeft = '2%'
        send.innerText = 'Send'
        send.style.color = theme.buttonColor
        send.style.border = theme.buttonBorder
        send.style.borderRadius = theme.buttonBorderRadius
        send.style.font = theme.buttonFont
        send.style.backgroundColor = theme.dragDropInputAreaBackgroundColor        

        inputArea.appendChild(send)

        _chatWindow.appendChild(inputArea)



        input.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                if (input.value != '') {
                    cl.addUserMessage(input.value)
                    inputArea.remove()
                    _minimizationEnabled = true

                    if(nextFunction) {
                        nextFunction()
                    }
                    
                }}})
                

            send.onclick = function () {
                if (input.value != '') {
                    cl.addUserMessage(input.value)
                    inputArea.remove()
                    _minimizationEnabled = true


                    if(nextFunction) {
                        nextFunction()
                    }}}
                
        

        }, this.botDelay*1500)},

    addDragDropQuestion: function (question, choices = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"], items = ["item1", 'item2', 'item3', 'item4'],  nextFunction) {
        const theme = this.currentTheme.questions
        _minimizationEnabled = false
        this.addBotMessage(question)

        if (nextFunction) {
            _nextFunction = nextFunction;
        }

        setTimeout(function() {
        const area = document.createElement('div')
        area.id = "optionsWrapper"

        const optionArea = document.createElement('div')
        optionArea.style = `
            margin-left: `+theme.OptionAreaMargins+`;
            margin-right: `+theme.OptionAreaMargins+`;
            background-color: `+theme.OptionAreaContainerColor+`;
            padding: `+theme.OptionAreaPadding+`;
            border-radius: `+theme.OptionAreaBorderRadius+`;
            opacity: 0;
        `
        optionArea.id = "optionArea"
    
        var htmlElements = "";
        for (var i = 0; i < choices.length; i++) {
            htmlElements += `<div 
            id = "dropzone`+i+`"
            class= "dropzone"
            ondragover = "_onDragOver(event)"
            ondrop = "_onDrop(event, `+choices.length+`)"
            style = "
                background-color: `+theme.OptionColor+`;
                width:`+theme.OptionWidth+`;
                color: `+theme.OptionTextColor+`;; 
                padding: `+theme.OptionPadding+`;
                margin: `+theme.OptionMargin+`;
                border-radius: `+theme.OptionBorderRadius+`;"
            >`+ choices[i] + `</div>`
        }
        optionArea.innerHTML = htmlElements;
        area.appendChild(optionArea)
        _chatArea.appendChild(area)
        
        const inputAreaHeight = items.length * 46
        const inputArea = document.createElement('div')
        inputArea.style = `
            background-color: `+theme.dragDropInputAreaBackgroundColor+`;
            height: `+inputAreaHeight+`px;
            padding: 10px;
            position: absolute;
            bottom: 0;
            width: 100%;
            border: 0.05px solid;
            opacity: 0;
            `
        inputArea.id = 'inputArea'

        var htmlElementsDraggable = "";
        for (var i = 0; i < items.length; i++) {
            htmlElementsDraggable += `<div 
            id= "draggable`+i+`"
            class = "draggable"
            draggable = "true"
            ondragstart = "_onDragStart(event)"
            style = "
                background-color: `+theme.dragDropInputColor+`;
                width:`+theme.dragDropInputWidth+`;
                color: `+theme.dragDropInputTextColor+`;
                padding: `+theme.dragDropInputPadding+`;
                margin-top: `+theme.dragDropInputMarginTop+`;
                border: `+theme.dragDropInputBorder+`;
                border-radius: `+theme.dragDropInputBorderRadius+`;
                text-align: center;
                cursor: grab;
            "
            >`+ items[i] + `</div>`
        }

        inputArea.innerHTML = htmlElementsDraggable

        const spaceDiv = document.createElement('div')
        spaceDiv.style.height = inputAreaHeight+'px'
        spaceDiv.id = "spaceDiv"
        _chatArea.appendChild(spaceDiv)
        
        _chatWindow.appendChild(inputArea)
        setTimeout(function() {
        $(optionArea).animate({ opacity: 1 },{duration: cl.botDelay*1000})
        $(inputArea).animate({ opacity: 1 },{duration: cl.botDelay*1000})
        _chatArea.scrollTop = _chatArea.scrollHeight}, 1000) 

    }, this.botDelay*1000)},

    addMultipleChoiceQuestion: function (question, choices = ["Choice1", "Choice2"], correct=[], feedbackMessages= [], nextFunction) {
        const theme = this.currentTheme.questions
        _minimizationEnabled = true
        this.addBotMessage(question)

        setTimeout(function() {
        const optionArea = document.createElement('div')
        optionArea.style = `
            margin-left: `+theme.OptionAreaMargins+`;
            margin-right: `+theme.OptionAreaMargins+`;
            background-color: `+theme.OptionAreaContainerColor+`;
            padding: `+theme.OptionAreaPadding+`;
            border-radius: `+theme.OptionAreaBorderRadius+`;
            opacity: 0;
        `
        optionArea.id = "optionArea"
    
        var htmlElements = "";
        for (var i = 0; i < choices.length; i++) {
            htmlElements += `<div 
            id = "multiChoice`+i+`"
            class= "multiChoice"
            style = "
                background-color: `+theme.OptionColor+`;
                width:`+theme.OptionWidth+`;
                color: `+theme.OptionTextColor+`;; 
                padding: `+theme.OptionPadding+`;
                margin: `+theme.OptionMargin+`;
                border-radius: `+theme.OptionBorderRadius+`;"
            >`+ choices[i] + `</div>`
        }

        optionArea.innerHTML = htmlElements;
        _chatArea.appendChild(optionArea)
        setTimeout(function() {
            $(optionArea).animate({ opacity: 1 },{duration: cl.botDelay*1000})
            _chatArea.scrollTop = _chatArea.scrollHeight}, 1000) 

        let answered = false

        $('.multiChoice').one("click")
        .css('cursor', 'pointer')
        .click(function() {
            if (!answered) {
                answered = true
                const selected = this.innerText
                if(correct.length > 0) {
                    if (correct.includes(this.innerText)) {
                        this.style.backgroundColor = theme.correctColor
                    }
                    else {
                        this.style.backgroundColor = theme.incorrectColor
                    }
                }   
                else {
                    this.style.backgroundColor = theme.selectColor
                }
                $(".multiChoice").css('cursor', 'not-allowed')

                if (feedbackMessages.length > 0) {
                    cl.addBotMessage(feedbackMessages[choices.indexOf(selected)])}

                if (nextFunction) {
                    nextFunction()
                }  
            }
        })

    }, this.botDelay*1500)},

    addSelectQuestion: function (question, choices = ["Choice1", "Choice2"], nextFunction) {
        const theme = this.currentTheme.questions
        this.addBotMessage(question)

        setTimeout(function() {
        const optionArea = document.createElement('div')
        optionArea.style = `
            margin-left: `+theme.OptionAreaMargins+`;
            margin-right: `+theme.OptionAreaMargins+`;
            background-color: `+theme.OptionAreaContainerColor+`;
            padding: `+theme.OptionAreaPadding+`;
            border-radius: `+theme.OptionAreaBorderRadius+`;
            opacity: 0;
        `
        optionArea.id = "optionArea"
    
        var htmlElements = "";
        for (var i = 0; i < choices.length; i++) {
            htmlElements += `<div 
            id = "selectChoice`+i+`"
            class= "selectChoice"
            style = "
                background-color: `+theme.OptionColor+`;
                width:`+theme.OptionWidth+`;
                color: `+theme.OptionTextColor+`;; 
                padding: `+theme.OptionPadding+`;
                margin: `+theme.OptionMargin+`;
                border-radius: `+theme.OptionBorderRadius+`;"
            >`+ choices[i] + `</div>`
        }

        optionArea.innerHTML = htmlElements;

        const submit = document.createElement("button")
        submit.style = `
            color: `+theme.buttonColor+`;
            border:`+theme.buttonBorder+`;
            padding:10px 20px;
            border-radius:`+theme.buttonBorderRadius+`;
            margin-top:20px;
            font-family: `+theme.buttonFont+`;
            font-weight: bold;
            float: right;
            `
        submit.textContent = theme.selectSubmitText
        submit.id = "selectSubmit"
        submit.style.cursor = 'not-allowed'


        optionArea.appendChild(submit)
        _chatArea.appendChild(optionArea)
        setTimeout(function() {
            $(optionArea).animate({ opacity: 1 },{duration: cl.botDelay*1000})
            _chatArea.scrollTop = _chatArea.scrollHeight}, 1000) 


        $('.selectChoice')
        .css('cursor', 'pointer')
        .click(function() {
            if (!$(".selectChoice").data('submitted')){
                this.style.backgroundColor = theme.selectColor
                submit.style.cursor = 'pointer'
                $(".selectChoice").data('clicked', true)
            }
        })
        $('#selectSubmit').click(function(){
            if (!$(".selectChoice").data('submitted') && $(".selectChoice").data('clicked') ){
                $(".selectChoice").css('cursor', 'not-allowed')
                $(".selectChoice").data('submitted', true);
                this.remove()
                if  (nextFunction) {
                    nextFunction()
                }
            }
        })
    }, this.botDelay*1000)},

    
    // could not confidently add did not get to test

    correctAnimation: function (nextFunction) {
        const theme = this.currentTheme
        const animation = document.createElement('div')
        animation.style = `
        background-colour: `+theme.questions.correctColor+`;
        width: `+theme.window.width+`;
        `
        _chatWindow.appendChild(animation)
        $(animation).animate({ height: theme.window.height },{duration: 1000})
        $(animation).animate({ height: "0px" },{duration: 1000})

        if(nextFunction) {
            nextFunction()
        }
    },

    
    // could not confidently add did not get to test

    addRatingQuestion: function(question, ratingNumber, nextFunction) {
        const theme = this.currentTheme.questions
        _minimizationEnabled = true
        this.addBotMessage(question)

        setTimeout(function() {
        const optionArea = document.createElement('div')
        optionArea.style = `
            margin-left: `+theme.OptionAreaMargins+`;
            margin-right: `+theme.OptionAreaMargins+`;
            background-color: `+theme.OptionAreaContainerColor+`;
            padding: `+theme.OptionAreaPadding+`;
            border-radius: `+theme.OptionAreaBorderRadius+`;
            opacity: 0;
        `
        optionArea.id = "optionArea"
    
        var htmlElements = "";
        for (var i = 0; i < choices.length; i++) {
            htmlElements += `<div 
            id = "choice`+i+`"
            class= "choice"
            style = "
                background-color: `+theme.OptionColor+`;
                width: 20%;
                color: `+theme.OptionTextColor+`;; 
                padding: `+theme.OptionPadding+`;
                margin: `+theme.OptionMargin+`;
                border-radius: 3rem;"
            ></div>`
        }

        optionArea.innerHTML = htmlElements;
        _chatArea.appendChild(optionArea)
        setTimeout(function() {
            $(optionArea).animate({ opacity: 1 },{duration: cl.botDelay*1000})
            _chatArea.scrollTop = _chatArea.scrollHeight}, 1000) 
        }, this.botDelay*1000)
    
        if (nextFunction) {
            nextFunction()
        }},
    
    // could not confidently add did not get to test
    addMatchingQuestion: function(question, nextFunction) {
        this.addBotMessage(question)

        setTimeout(function() {
            const area = document.createElement('div')
            area.id = "optionsWrapper"
    
            const optionArea = document.createElement('div')
            optionArea.style = `
                margin-left: 10%;
                margin-right: 10%;
                background-color: white;
                padding: 10px;
                border-radius: 10%;
                opacity: 0;
            `
            optionArea.id = "optionArea"
        
            var htmlElements = "";
            for (var i = 0; i < choices.length; i++) {
                htmlElements += `<div 
                id = "matching`+i+`"
                class= "matching"
                style = "
                    border-radius: 15%; 
                    background-color: #8fdddf; 
                    width: 45%;
                    color: #fff; 
                    padding: 20px;
                    margin: 10px;
                    border-radius: 2rem;"
                >`+ choices[i] + `</div>`
            }
            optionArea.innerHTML = htmlElements;
            area.appendChild(optionArea)
            this.chatArea.appendChild(area)

        }, this.botDelay*2000)}
    } 

 // addOrderingQuestion: function (question, nextFunction) {
    //     this.addBotMessage(question)
    //     setTimeout(function() {

    //     }, this.botDelay*2000)}}



    

    global.ChatLib = global.ChatLib || ChatLib

})(window, window.document, $); // pass the global window object and jquery to the anonymous function. They will now be locally scoped inside of the function.
    

// PRIVATE VARIABLES
const _themeSetStrings = ["defaultTheme", "businessTheme", "coffeeTheme", "customTheme"]
let _minimizationEnabled = true
let _chatWindow = null
let _chatArea = null
let _nextFunction = null
var _minimizedOnLoad = false



// PRIVATE HELPER FUNCTIONS
function _openWin(window, fullHeight = '500px') {
    window.style.height = fullHeight
}

function _closeWin(window, minHeight = '40px') {
    window.style.height = minHeight
}

function _onDragStart(e) {
    e.dataTransfer.setData('text/plain', e.currentTarget.id);
}

function _onDragOver(e) {
    e.preventDefault();
}

function _onDrop(e, choiceNumber) {
    const theme = cl.currentTheme.questions
    $('.draggable').css('cursor', 'grab')
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);  
    draggableElement.style.backgroundColor = 'white';
    draggableElement.style.color = 'black'
    draggableElement.style.border = 'none'
    const dropzone = e.currentTarget;
    const inputField = document.getElementById("inputArea")
    dropzone.append(draggableElement);
    const spaceDiv = document.getElementById("spaceDiv")

    if (inputField.children.length == 0) {
        inputField.style.height = '40px'
        const submit = document.createElement('button')
        submit.style.color = theme.buttonColor
        submit.style.border = theme.buttonBorder
        submit.style.borderRadius = theme.buttonBorderRadius
        submit.style.font = theme.buttonFont
        submit.style.backgroundColor = theme.dragDropInputAreaBackgroundColor
        submit.style.padding = '5px'
        submit.style.marginLeft = '45%'
        submit.style.marginTop = '50%'
        submit.innerText = 'Submit'
        submit.style.marginTop = '1%'
        inputField.appendChild(submit)


        submit.onclick = function () {
            const optionArea = document.getElementById("optionArea") 

            const dropzones = []
            for (var i = 0; i < parseInt(choiceNumber); i++) {
                const dropzoneContent = document.getElementById("dropzone"+i)
                console.log(dropzoneContent)
                if (dropzoneContent.childElementCount != 0) {
                    dropzones.push(dropzoneContent)
                }
            }
            $(optionArea).empty()
            for (var i = 0; i < dropzones.length; i++) {
                    optionArea.append(dropzones[i])
                }
            
            spaceDiv.remove()
            inputField.remove()

            e.dataTransfer.clearData();
            _minimizationEnabled = true
            if (_nextFunction != null) {
                const nextFunc = _nextFunction
                _nextFunction = null
                nextFunc()
            }
        }
    }

    e.dataTransfer.clearData();

}

// THEMES
const defaultTheme = {
    window: { 
        margin: "10", 
        backgroundColor: 'hsla(193, 14%, 89%, 0.99)', 
        width: "500px", 
        height: "500px",
        position: "fixed",
        bottom: "0",
        right: "0",
        transition: "0.5s",
        convoAreaHeight: "400px",
        convoAreaPadding: "5%"}, 

    messages: {
        botProfileMarginRight: "10px",
        userProfileMarginLeft: "10px",
        profileBorderRadius: "50%",
        profileWidth: "10%",

        botBubbleColour: "#0088ff",
        botBubbleBorderRadius: "2rem",
        botBubbleTextColour: "#fff",
        botBubblePadding: "20px",
        botBubbleWidth: "55%",

        userBubbleColour: "#5ccad7",
        userBubbleBorderRadius: "2rem",
        userBubbleTextColour: "#fff",
        userBubblePadding: "20px",
        userBubbleWidth: "55%",

        },
    
    chatHeader: {
        colour: "black",
        height: "30px",
        padding: "10px",
        minimizeButtonLocation: "flex-end",
        border:"1px solid white",
        borderRadius: "0.8rem 0.8rem 0 0",
        minimizeButtonPadding: "5px",
        minimizeButtonContent: "_",
        maximizeButtonContent: "+"},
    
    questions: {
        textInputBackgroundColour: "white",
        textInputWidth: "80%",
        textInputBorderRadius: "2rem",
        textInputBorder: "1px solid #5ccae9",
        textInputSendButtonText: "Send",

        buttonColor: "#77B9F1",
        buttonBorder: "#77B9F1 1.5px solid",
        buttonBorderRadius: "10px",
        buttonFont: "'Varela Round', sans-serif",


        OptionAreaMargins: "15%",
        OptionAreaContainerColor: "white",
        OptionAreaPadding: "10px",
        OptionAreaBorderRadius: "10%",

        OptionColor: "#77B9F1",
        OptionTextColor: "#fff",
        OptionWidth: "75%",
        OptionPadding: "20px",
        OptionMargin:"10px",
        OptionBorderRadius: "2rem",
        
        dragDropInputAreaBackgroundColor: "white",

        dragDropInputColor: "#77B9F1",
        dragDropInputTextColor: "#fff",
        dragDropInputWidth: "95%",
        dragDropInputPadding: "5px",
        dragDropInputMarginTop:"5px",
        dragDropInputBorder: "1px solid #a5a5a5",
        dragDropInputBorderRadius: "2rem",


        correctColor: "hsla(110, 79%, 45%, 0.86)",
        incorrectColor: "hsla(0, 79%, 45%, 0.86)",
        selectColor: "hsla(208, 81%, 46%, 1)",

        selectSubmitText: "Done" }};

const coffeeTheme = {
    window: { 
        margin: "10", 
        backgroundColor: 'hsla(28, 76%, 87%, 0.96)', 
        width: "500px", 
        height: "500px",
        position: "fixed",
        bottom: "0",
        right: "0",
        transition: "0.5s",
        convoAreaHeight: "400px",
        convoAreaPadding: "5%"}, 

    messages: {
        botProfileMarginRight: "10px",
        userProfileMarginLeft: "10px",
        profileBorderRadius: "50%",
        profileWidth: "10%",

        botBubbleColour: "hsla(28, 47%, 47%, 0.96)",
        botBubbleBorderRadius: "2rem",
        botBubbleTextColour: "#fff",
        botBubblePadding: "20px",
        botBubbleWidth: "55%",

        userBubbleColour: "hsla(28, 69%, 28%, 1)",
        userBubbleBorderRadius: "2rem",
        userBubbleTextColour: "#fff",
        userBubblePadding: "20px",
        userBubbleWidth: "55%",

        },
    
    chatHeader: {
        colour: "#6f3f16",
        height: "30px",
        padding: "10px",
        border: "1px solid white",
        minimizeButtonLocation: "flex-end",
        borderRadius: "0.8rem 0.8rem 0 0",
        minimizeButtonPadding: "5px",
        minimizeButtonContent: "_",
        maximizeButtonContent: "+"},
    
    questions: {
        textInputBackgroundColour: "white",
        textInputWidth: "80%",
        textInputBorderRadius: "2rem",
        textInputBorder: "1px solid #d98868",
        textInputSendButtonText: "Send",

        buttonColor: "hsla(28, 47%, 47%, 0.96)",
        buttonBorder: "hsla(28, 47%, 47%, 0.96) 1.5px solid",
        buttonBorderRadius: "10px",
        buttonFont: "'Varela Round', sans-serif",


        OptionAreaMargins: "15%",
        OptionAreaContainerColor: "white",
        OptionAreaPadding: "10px",
        OptionAreaBorderRadius: "10%",

        OptionColor: "#d98868",
        OptionTextColor: "#fff",
        OptionWidth: "75%",
        OptionPadding: "20px",
        OptionMargin:"10px",
        OptionBorderRadius: "2rem",
        
        dragDropInputAreaBackgroundColor: "white",

        dragDropInputColor: "#8A2D1C",
        dragDropInputTextColor: "#fff",
        dragDropInputWidth: "95%",
        dragDropInputPadding: "5px",
        dragDropInputMarginTop:"5px",
        dragDropInputBorder: "1px solid #a5a5a5",
        dragDropInputBorderRadius: "2rem",


        correctColor: "#A5D74D",
        incorrectColor: "#d52607",
        selectColor: "hsla(28, 100%, 22%, 1)",

        selectSubmitText: "Done",
   }

    };

const businessTheme = {
    window: { 
        margin: "10", 
        backgroundColor: 'hsla(193, 14%, 89%, 0.99)', 
        width: "500px", 
        height: "500px",
        position: "fixed",
        bottom: "0",
        right: "0",
        transition: "0.5s",
        convoAreaHeight: "400px",
        convoAreaPadding: "5%"}, 

    messages: {
        botProfileMarginRight: "10px",
        userProfileMarginLeft: "10px",
        profileBorderRadius: "50%",
        profileWidth: "10%",

        botBubbleColour: "#05537f",
        botBubbleBorderRadius: "2rem",
        botBubbleTextColour: "#fff",
        botBubblePadding: "20px",
        botBubbleWidth: "55%",

        userBubbleColour: "hsla(186, 53%, 54%, 1)",
        userBubbleBorderRadius: "2rem",
        userBubbleTextColour: "#fff",
        userBubblePadding: "20px",
        userBubbleWidth: "55%",

        },
    
    chatHeader: {
        colour: "#05537f",
        height: "30px",
        padding: "10px",
        minimizeButtonLocation: "flex-end",
        border:"1px solid white",
        borderRadius: "0.8rem 0.8rem 0 0",
        minimizeButtonPadding: "5px",
        minimizeButtonContent: "_",
        maximizeButtonContent: "+"},
    
    questions: {
        textInputBackgroundColour: "white",
        textInputWidth: "80%",
        textInputBorderRadius: "2rem",
        textInputBorder: "1px solid #5ccae9",
        textInputSendButtonText: "Send",

        buttonColor: "#77B9F1",
        buttonBorder: "#77B9F1 1.5px solid",
        buttonBorderRadius: "10px",
        buttonFont: "'Varela Round', sans-serif",


        OptionAreaMargins: "15%",
        OptionAreaContainerColor: "white",
        OptionAreaPadding: "10px",
        OptionAreaBorderRadius: "10%",

        OptionColor: "#77B9F1",
        OptionTextColor: "#fff",
        OptionWidth: "75%",
        OptionPadding: "20px",
        OptionMargin:"10px",
        OptionBorderRadius: "2rem",
        
        dragDropInputAreaBackgroundColor: "white",

        dragDropInputColor: "#105b9d",
        dragDropInputTextColor: "#fff",
        dragDropInputWidth: "95%",
        dragDropInputPadding: "5px",
        dragDropInputMarginTop:"5px",
        dragDropInputBorder: "1px solid #a5a5a5",
        dragDropInputBorderRadius: "2rem",


        correctColor: "hsla(110, 79%, 45%, 0.86)",
        incorrectColor: "hsla(0, 79%, 45%, 0.86)",
        selectColor: "hsla(208, 81%, 40%, 1)",

        selectSubmitText: "Done" }};


    
// THEME STYLES
let windowStyles = { 
        margin: "10", 
        backgroundColor: 'hsla(193, 14%, 89%, 0.99)', 
        width: "500px", 
        height: "500px",
        position: "fixed",
        bottom: "0",
        right: "0",
        transition: "0.5s",
        convoAreaHeight: "400px",
        convoAreaPadding: "5%"}

let messagesStyles= {
        botProfileMarginRight: "10px",
        userProfileMarginLeft: "10px",
        profileBorderRadius: "50%",
        profileWidth: "10%",

        botBubbleColour: "#0088ff",
        botBubbleBorderRadius: "2rem",
        botBubbleTextColour: "#fff",
        botBubblePadding: "20px",
        botBubbleWidth: "55%",

        userBubbleColour: "#5ccad7",
        userBubbleBorderRadius: "2rem",
        userBubbleTextColour: "#fff",
        userBubblePadding: "20px",
        userBubbleWidth: "55%",
}

let chatHeaderStyles = {
        colour: "black",
        height: "30px",
        padding: "10px",
        minimizeButtonLocation: "flex-end",
        border:"1px solid white",
        borderRadius: "0.8rem 0.8rem 0 0",
        minimizeButtonPadding: "5px",
        minimizeButtonContent: "_",
        maximizeButtonContent: "+"}

let questionsStyles = {
        textInputBackgroundColour: "white",
        textInputWidth: "80%",
        textInputBorderRadius: "2rem",
        textInputBorder: "1px solid #5ccae9",
        textInputSendButtonText: "Send",

        buttonColor: "#77B9F1",
        buttonBorder: "#77B9F1 1.5px solid",
        buttonBorderRadius: "10px",
        buttonFont: "'Varela Round', sans-serif",


        OptionAreaMargins: "15%",
        OptionAreaContainerColor: "white",
        OptionAreaPadding: "10px",
        OptionAreaBorderRadius: "10%",

        OptionColor: "#77B9F1",
        OptionTextColor: "#fff",
        OptionWidth: "75%",
        OptionPadding: "20px",
        OptionMargin:"10px",
        OptionBorderRadius: "2rem",
        
        dragDropInputAreaBackgroundColor: "white",

        dragDropInputColor: "#77B9F1",
        dragDropInputTextColor: "#fff",
        dragDropInputWidth: "95%",
        dragDropInputPadding: "5px",
        dragDropInputMarginTop:"5px",
        dragDropInputBorder: "1px solid #a5a5a5",
        dragDropInputBorderRadius: "2rem",


        correctColor: "hsla(110, 79%, 45%, 0.86)",
        incorrectColor: "hsla(0, 79%, 45%, 0.86)",
        selectColor: "hsla(208, 81%, 46%, 1)",

        selectSubmitText: "Done",
}

let customTheme = {windowStyles, messagesStyles, chatHeaderStyles, questionsStyles}





