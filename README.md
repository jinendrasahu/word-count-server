# word-count-server (https://word-counts.herokuapp.com/5)   (5 could be any numberic parameter)

I have created a backend server which fetch data from third party api and after munipulating that data it shows n most frequently occurred words.

(this project could be done by using react only but for better error handling ,data munipulating and for better performance I created this backend server.)

I have created this project by CLI using
npm init -y(-y for default configuration)

installed some external dependencies like
express-  for better and fast request,response and error handling
dotnet -  to set up environment variable like PORT ,HOST and database strings
node-fetch-   for api data fetching
cors-(Cross origin resource sharing) used as middleware for allowing cross origin HTTP request which browser restricts

I have created an express server and home route as /:id which accept a number as url parameter
I have created a fetch function using node-fetch to call the api provided by company. which calls the api
and response data in asynchronous way I have used proper data binding and error handling for this using then 
and catch function.
data we are getting is a string so we are traversing the string and storing all the words with their occurrece
and increasing their occurrece when the word is repeating which creates a key :value pairs using Map.
after that we are sorting most frequently occurred  N words here N is a number getting from url parameter
after that we are storing all N element in the form of object and then converting to JSON format and sending
response in JSON format.

the best case complexity of this approach is n and worst case complexity is n(power 2)
there is an another approach where we storing the data in the map and side by side maintaining the sorted
list of most occurred word but this can give exponential complexity.
here could be another greate approach but in javascript we don't have much data structure element which
could help us to reduce the complexity of this task.
this is all about my approach but if there is another good approach then I would like to learn it.

Test Cases:

1. user can pass numeric,special charecter,alphabet as url parameter so I am checking if the url parameter is numeric 
then fetch the data otherwise respond an error
2. we could have special charecter inside the responded data so while storing word I am also checking if word is made
from alphabet or numbers.
3. the passed parameter number could be greater than the number of words in the responded data so I am returning all 
   data.if we do not handle this then it will create empty data for remaining inputs.

