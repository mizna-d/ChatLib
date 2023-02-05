# ChatLib

#### The landing page for ChatLib can be found using this link :  <a href="https://quiet-dusk-02249.herokuapp.com/">ChatLib Landing Page</a> <br>
#### The full documentation for ChatLib can be found here: <a href="https://quiet-dusk-02249.herokuapp.com/documentation">ChatLib Documentation</a><br>

## Getting Started

ChatLib is a very easy to use front-end library and only requires a few dependencies before we can get started. ChatLib uses jQuery so it is necessary for you to include jQuery as a script in the head of your HTML like so: 
<br>

```
<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

<br>
ChatLib also requires certain fonts which must also be imported as well. The code below should be added to the head of your HTML to import this dependency: <br><br>

```
<link rel="preconnect" href="https://fonts.googleapis.com">

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Comforter+Brush&family=Cookie&family=Satisfy&family=Varela+Round&display=swap"rel="stylesheet">
```
<br>
Lastly, we must import the ChatLib Library itself. You can download the code from this github. Importing the library can be done by including this following script in the head of your HTML like so: <br>

```
<script defer type="text/javascript" src="ChatLib.js"></script>
```

Now we have finished setting up and we start creating chat interfaces right away! 


## Basic Implementation

Starting a project is very simple with ChatLib! We see  at first theres the basic set up code which is simply initializing the chat window. Afterwards, it is simply calling the functions which easily creates an interactive conversation between the user and the bot! Congratulations you are all set to use ChatLib.

```
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
    cl.addBotMessage.bind(cl, 'Enjoy Exporing ChatLib!'))))))
```
