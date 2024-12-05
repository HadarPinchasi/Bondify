# details about the project:

the Foobook project is a Social Network who let friends and people connect with each other around the globe. 

the project have 4 repositories:
1. 'FOOBAR'- the tcp server who working by the bloom filter protocol. the protocol prevent posting(/posting by editing post) malicious link and  by that protecting the users of the app.
2. 'Server' - the server of the app. Provides the data for the website and the Android application and communicates with them continuously, it draws the information from MONGODB. Connects with the TCP server in order to check the integrity of links
3. 'project2' - the web. using the app thorough the browser, communicating with the the server.
4. 'FOOBAR.Part2' - the android app ,communicating with the the server.


## Table of Contents
1. [before running](#before running)
2. [How to make it work](#How to make it work) 

## before running
1. make sure you have MONGODB compass in your system.
2. clone the repositories in the 'details.txt' txt to your enviroment.
make sure to clone the suitable branch for each repository:
* TCP server- the branch 'part4Main' in the repository 'FOOBAR'
* Server - the branch 'part4_main' in the repository 'Server'
* Web - the branch 'part4' in the repository 'project2'
* android- the branch 'part4_main' in the repository 'FOOBAR.Part2'

you have all the links in the 'details.txt' file

3. init MONGODB- you can populate the database with the .json file we provided in the README of the server ( 'Server' repository) .
the MongoDB server is operating in port 27017

## How to make it work

1. first, make the tcp server work 
navigate to the cloned directory , in the 'FOOBAR' directory navigate to the 'src' directory. open the terminal and open wsl terminal (by writing 'bash').
run the following commands:
for compile : 'g++ tcp.cpp -pthread App.cpp AddUrl.cpp CheckUrl.cpp BloomFilter.cpp H1.cpp H2.cpp IHash.cpp'
for run : './a.out'
as you can see in the photos directory picture 1
![1](Photos/1.png)
2. go to the 'Server' directory. run:'npm install' to install the required dependencies. Configure the essential environment variables by creating a .env file and providing the necessary values.
Initiate the server by running 'npm start'.
as you can see in the photos directory picture 2
![2](Photos/2.png)
3.  Depending on your platform:
For web development, in your browser (no matter if chrome/ any other explorer) write 'localhost12345'.
as you can see in the photos directory picture 2
![3](Photos/3.png)
For the android, see the instructions in 'android.md'


## Unlock new possibilities and enhance your experience with our application! Dive into the details in the files: react.md and android.md.





