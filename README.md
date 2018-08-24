# MyCheck menu

A mobx + react + react-bootstrap + ajax example of showing a tree menu json

# How to open?
Open index.html file 

# Important Note!!
This is only a production mode of the repo,
To run dev mode  change index.html "/dist/bundle.js" to "/static/bundle.js".

# Dev-mode:
simply change in index.html the line:
```
    <script src="dist/bundle.js"></script>
```
to the line
```   
 <script src="/static/bundle.js"></script>
```
and then 
```
npm install
```
Run the application
```
npm start
```


### Bugs/not prepared features
1. React virtualize- to keep the components size small using this technique.
2. When item isn't collapsed- remove from DOM for improvement if needed.
3. Less files are ready and empty- need to add preffered CSS for each component.



### Features
1. deep search over the tree using normalize method (converting to array and search) to prevent max stack error.
2. shallow filtering search.
3. Click on item to see collapsed information on it's children components.
3. The search is case-sensitive


