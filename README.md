### ⚒️Tooling

📌 VS Code as the preferred code editor.

📌 NPM to manage pacakges and dependencies

📌 Prettier for code formatting.

📌 JSON Server server running on localhost at PORT 3000

## 💻 Setup the Project

The following steps will get you up and running to contribute to Taghash:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/Bismay5467/Assignment.git))

2. Clone your fork locally

```sh
git clone https://github.com/<your github username>/Assignment.git
```

3. Setup all the dependencies and packages by running: 

```sh
npm run dev
npm run server
```
Note : Run these cmds in two different terminal instance (Git Bash is preferred).

Note : Don't forget to change the env variables meant for mysql database. 

For testing this api key can be used :

```
VITE_OPEN_WEATHER_APP_API_KEY=c5c3f539d98056d41b62fefe066a8e30
```

Now you are good to go!! Client would be running on PORT 5173 and Server would be running on PORT 3000! 🚀✨

## 🤖 Commands

🌐 **`npm run dev`**: starts the development server.

🌐 **`npm run server`**: starts the mock json server.

## 🧑‍💻 Demo





## 💬 Comments

1. Minute details have been taken into consideration while working on this assignment.
   
2. The icons would change depending on if it is day or night (sun/moon) for better UX. The bg-image will change depending on the weather.
   
3. Recent searches will be stored in localstorage which forms in the autocomplete list. Most 10 recent searches are stored at every instance.
   
4. The 5 day forecast list is a vetically scrollable list forecasting what the weather would be for the next 5 days at THIS CURRENT MOMENT.
   
5. The heart icon on the top left corner is used to add a serached location to the list of favourite cities. 
   
6. Toggling this icon will first add the location to the list and would then remove from the list if clicked again.
   
7. Clicking on any of the 4 hours step forecast will display what the weather would be at that hour. 
   
8. We can see what the weather is like at the current moment of our favourite cities by ckicking on any of the favourite cities card.
   
9.  We can remove a favourite city from the list by clicking on the cross at the top right corner of the card.

10. Highly maintainable code following industry standard.