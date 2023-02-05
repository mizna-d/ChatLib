"use strict";

const cl = new ChatLib()

// Set Up
cl.setTheme("businessTheme")
cl.createChatWindow()
cl.setBotIcon('./assets/botIcon.jpg')
cl.setUserIcon('./assets/businessIcon.jpg')


// Chatting Script
    cl.addBotMessage('Welcome to Verve',
        
    cl.addBotMessage.bind(cl, "To get a sense of your needs, please categorize these accordingly",

    cl.addDragDropQuestion.bind(cl, "Drag the input to the options below", ["Interested", "Uninterested", "Unfamiliar"], ["Stocks", "Crypto", "Bonds"],

    cl.addBotMessage.bind(cl, 'Thank you for your response', 

    cl.addMultipleChoiceQuestion.bind(cl, "Are you interested in talking to one of our professionals? ", ['Yes', 'No'], [], ["Please call our number to make an appointment with us", "Ok, if you need any information, it can be found on our website"],

    cl.addTextQuestion.bind(cl, "If you have an questions or concerns please submit your feedback below, we wil get back to you shortly", "Type here...",
                        
    cl.addBotMessage.bind(cl, "Thank you for your time.")))))))