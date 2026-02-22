


## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
## Answer: getElementById represent as selects on element by its id
## getElementsByClassName represent as selects all element by its given class name
## querySelector  represent as first matching element using css name
## querySelectorAll represent as all matching element using css name


### 2. How do you create and insert a new element into the DOM?
## Answer: At first use document.createElement() to create the element and parent.appendChild() to insert it to the DOM.


### 3. What is Event Bubbling? And how does it work?
## Answer: Event Bubbling is a process where the event starts from the main target element and then goto upward to its parent node element in terms of hierarchy process.


### 4. What is Event Delegation in JavaScript? Why is it useful?
## Answer: Event Delegation is a formate of code where a parent element handles events for its child elements using hierchy method and its useful as it makes code more efficient and scalable.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
## Answer: stopPropagation() basically stop it to go to the parent node through hierchy method it stop the event, and preventDefault() tops the browser default action