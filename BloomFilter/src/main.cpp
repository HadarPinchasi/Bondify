//#include <iostream>
//#include <string>
//#include <typeinfo>
//#include <vector>
//#include <iterator>
//#include <map>
//#include <sstream>
//#include "App.h"
//#include "ICommand.h"
//#include "AddUrl.h"
//#include "CheckUrl.h"
//#include "BloomFilter.h"
//#include "IHash.h"
//#include "H1.h"
//#include "H2.h"
////Main function
//int main() {
//    std::map<std::string, ICommand*> commands;
//    // Create instances of command objects for adding and checking URLs , Store command objects in the 'commands' map
//    ICommand* addurl = new AddUrl();
//    commands["1"] = addurl;
//    ICommand* checkurl = new CheckUrl();
//    commands["2"] = checkurl;
//    // Create an instance of the application with specified command objects
//    App* app = new App(commands);
//    app->run();
//    return 0;
//}