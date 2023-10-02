# Milestone-3: Grid game

## Learning Competencies
At the end of this milestone you will learn
 - Breaking down the problem
 - Building web pages
 - Creating efficient animations for web games
 - Manipulating the document structure by using Document Object Model (DOM)
 - Storing your application data in the client-side database
 - Working with server and fetching data from it by manipulating it
 - Process of developing a product

## Problem Statement: 
>It's play time, people!    
Many kids initial fascination with computers, like that of nerdy kids, had to do with computer games. They were drawn into the tiny simulated worlds that they could manipulate and in which stories (sort of) unfolded—more, I suppose, because of the way they projected their imagination into them than because of the possibilities they actually offered.  
I don’t wish a career in game programming on anyone. Much like the music industry, the discrepancy between the number of eager young people wanting to work in it and the actual demand for such people creates a rather unhealthy environment. **But writing games for fun is amusing**.  
In this milestone, you are going to create one of the following grid games.  
We will use the browser DOM to display the game, and we’ll read user input by handling key events.
>### 1.Photo Grid Game:
>Image puzzle is a game where you can drag and drop image parts to swap and re-arrange the parts to form the complete image.  
You can play the game online [here](https://codepen.io/mayurbirle/pen/KXOdov)  
The rules of the game is simple. You just need to drag and drop the broken image pieces to swap it. You need to swap them in a way it form the correct image. The number of steps taken to drag and drop the image parts will be counted. So, you may wish to think and try to do it in minimum possible steps. The correct image is provided at right hand side for your reference.  
The screen for the game looks like this:  
![image_puzzle](https://www.codeproject.com/KB/HTML/810978/lotus.jpg)
>### 2.2048
>The objective of this game is to slide numbered tiles on a grid to combine them to create a tile with the number 2048. However, one can continue to play the game after reaching the goal, creating tiles with larger numbers.  
For those of you who are new to 2048, [check it out](https://play2048.co/)

### **Releases**

1. Select the game of your choice. Think about the logic that must be implemented in your game. Writing a game is a lesson in planning for edge cases and all the situations that may arise. We'll take 2048 as an example for now. 
    
    **Ask yourself these questions:**
    
    → What is the gameplay like? What all can we do in the game? What are the things we can't do?
    
    → Is there a pattern to the place where the numbers pop up or are they random? What about the numbers themselves?
    
    → What is the winning condition in my game? (for example when you reach 2048)
    
2. Decide what's your [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product), what are your stretch features, make a list of all features you would like to build
    - Each stage can have certain features
        
        The difficulty level, the colour theme, the swiping speeds → go crazy. 
        
    - Every stage builds upon the features from the previous stage(s). This ensures your game is not just a one off, but has multiple levels to engage users.
    - [Trello](https://trello.com/) can be a brilliant tool to work with for this. You can divide feature by [Day](https://trello.com/b/kZsVVrc8/front-product-roadmap), [progress](https://trello.com/b/0xzkRjTH/scrum-project-management-board) etc. Figure what works for your team
    - Keep the project on track. **Review, revise and reallocate**. Run through these three “Rs” on an ongoing basis.

3. Break your product down. 

1. what Data Structure should be used to represent the grid?
2. Keep the Single Responsibilty Principle in mind. It basically says that one function should do one thing, and do it extremely well.
3. Is my code following DRY principles? Or Is it redundant and repetitive?
1. Start with javascript - adding logic to your game and creating its barebones structure. To show you how to approach building a visual grid based game, here's an example: 
    
    

**For 2048 Game**

Create your playBoard.

1. Create a parent ***playBoard*** div that contains all the 16 smaller boxes for your 2048 game, like shown below:
    ![1](https://user-images.githubusercontent.com/19927261/175973900-dcaacf2d-5cbb-4fd0-8d88-d6607525b21d.png)
    
2. Create an ***initializeBoard*** function that adds the value of the boxes in a separate data structure.
    
    *hint: will you use arrays or objects?*   
    
3. Create a function that generates a 2 at any random position in the grid and append that to an empty cell in the HTML. 
    
    *hint:* *do you know about Math.random()?*  
    
4. Upload and Deploy your game on Github Pages or Heroku. 
*As you make changes and commit them they will be reflected in your deployed version.*     
5. Create a swipe right function, which, when triggered by the right arrow key adds the current element to the element at the right of it.   
    
    *hint: use innerHTML*   
    
6. Similarly, add a swipe left function, which will be triggered by the left arrow key.     
7. Add the Swipe up and down functions, which when triggered by the top and down arrow buttons respectively add the current to the element at the top/down of it.     
*hint: Keep in mind the logic will be different as you will have to work with columns instead of rows.*       
    
    **Checking for Winning and Losing**
    
8. Create a function that goes through the whole array after every key press, and if its finds 2048, stops the game and declares that the player wins.      
9. Similarly, in the above function add a condition that checks if no zeroes remain in the game, and if that is the case, stops the game and declares that he player lost.      
    
    **Styling the game**
    
10. create a container div to contain all your elements, set a maximum width and center it within the body.   
11. make your website responsive using media queries to add breakpoints for smaller screen sizes for your game.   
    
    hint → *make sure you use responsive units like vw,vh, rem and not pixels.*   
    

---

**For Photo Grid Game**

1. create a parent element that will contain N X N boxes that have parts of the image.  
2. Set The background image of each box to display 1/(N X N ) th part of the image only.                  set the position of the background image has been accordingly.
3. now, create a randomize function using Math.random() that arranges all the squares into a random order for the user to solve. 
4. To allow the users to drag and drop, use jquery draggable. Read the documentation carefully to setup a rudimentary drag and drop. 
5. Set up a step counter - each time a user 'drops' a square is counted as a step. 
    
    **Styling the game**
    
6. create a container div to contain all your elements, set a maximum width and center it within the body.  
7. make your website responsive using media queries to add breakpoints for smaller screen sizes for your game. 
    
    hint → *make sure you use responsive units like vw,vh, rem and not pixels.*  
