"use strict";


const cl = new ChatLib()

cl.setMinimizeOnLoad(true)
cl.createChatWindow()
cl.setUserIcon('../../../assets/')
cl.setBotIcon('../../assets/bot-icon.jpg')
cl.setBotMessageDelay(1.5)



// Chatting Script
    cl.addBotMessage("Hello! Welcome to ChatLib!",
                          
    cl.addMultipleChoiceQuestion.bind(cl, "Anything you would like to know about Chatlib?", ['ChatLib? 😬', 'I want to start a project! 😄', "I'm confused 😕"], [], ["Click 'Learn More' to see what ChatLib is all about!" , "Click 'Get Started' to find out how to set up your project", "Click 'Documentation' to see more details in order to help answer your question!"],
        
    cl.addBotMessage.bind(cl, 'This was a short demonstration of what ChatLib can do!',
    cl.correctAnimation.bind(cl,
    cl.addBotMessage.bind(cl, 'Be sure to check out our "Examples" to see the library in action!',
    cl.addBotMessage.bind(cl, 'Enjoy Exporing ChatLib!', 

    )
    )))))
