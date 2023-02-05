"use strict";

const cl = new ChatLib()

// Set Up
cl.setTheme("coffeeTheme")
cl.createChatWindow()
cl.setBotIcon('./assets/catBotIcon.jpg')
cl.setUserIcon('./assets/userIcon.jpg')


// Chatting Script
    cl.addBotMessage("Hi!👋😸",
        
    cl.addBotMessage.bind(cl ,'Welcome to our Cat Cafe!', 

    cl.addBotMessage.bind(cl ,"Before anything, I just have to know...", 

    cl.addDragDropQuestion.bind(cl, "Which category would you put yourself under? (Drag your input into one of the options)", ["Cat Expert 😻", "New Cat Owner 🐈", "Just Interested 😽"], ["Me!"],

    cl.addBotMessage.bind(cl ,"Nice!", 
    
    cl.addMultipleChoiceQuestion.bind(cl, "Is this your first time here?", ['yeah!', 'nope'], [], ["It's so nice to meet you!🤗", "In that case, welcome back! 😊"],

    cl.addTextQuestion.bind(cl, "Could I get your name?", "Type your name here...",

    cl.addBotMessage.bind(cl, 'Thanks!', 

    cl.addBotMessage.bind(cl ,'How about we test your cat cafe knowledge? 😼', 

    cl.addMultipleChoiceQuestion.bind(cl, 'Do we hold meetings once a month? (No cheating! 😂)',  ['True', 'False'], ["True"], ["Wrong, we actually hold them biweekly!", "Correct! Feel free to join anytime!"],

    cl.addBotMessage.bind(cl ,"Okay last question!!", 

    cl.addSelectQuestion.bind(cl, "Favourite type of cat! (Dw you can choose multiple!)", ["Persian", "British Shorthair", "Siamese", "None of these 😅"],

    cl.addTextQuestion.bind(cl, "Before you go, leave us your email so we can add you to the newsletter!", "Type your email here...",

    cl.addBotMessage.bind(cl ,"Thanks so much and have a great day!!"
    ))))))))))))))





