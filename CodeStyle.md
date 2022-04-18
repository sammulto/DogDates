
# Code Style
This document outlines the code style and naming conventions for this project.

## Naming Convensions
* lowerCaseCamel for variables and functions. Example: getMatchedUserInfo
* UpperCaseCamel for components (MatchList.js)
* Meaninfgul and understandable variables
* No digits in variable names

## Code style
* All component start as follows:
```javascript
export default function componentName(props) {
    code
}
```
* Use space between operators and parameters: 
```javascript
if (response.data.length === 0)
```
* Comment is above the line of code: 
```javascript
   //if no matched users, set matched users to undefined
   if (response.data.length === 0)
```
* Use double quotation
* Use then-catch blocks with new lines:
```javascript
.then(() => {
})
.catch(() => {
}
```
## Branches
* Main branch is the production branch and only fully tested features shall be pushed to the main branch (code review is required).
* FullStack is the testing branch where developers push their changes.
* Development branch - all pull requestes must be from the FullStack, needs to be tested and code reviewed. 
* Once the features for sprint x are finished and tested, open a pull request from development to main branch.


