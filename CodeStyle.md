
# Code Style
This document outlines the code style and naming conventions for this project.

## Naming Convensions
* lowerCaseCamel for variables and functions. Example: getMatchedUserInfo
* UpperCaseCamel for components (MatchList.js)

## Code style
* All component start as follows:
`export default function componentName(props) {
    code
}`
* Use space between operators and parameters: `if (response.data.length === 0)`
* Comment is above the line of code: 

      //if no matched users, set matched users to undefined
          if (response.data.length === 0)
