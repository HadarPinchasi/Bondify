#pragma once
#ifndef APP_H
#define App_H


#include "ICommand.h"

#include "BloomFilter.h"
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <cstddef>

// Main application class
class App {
private:
    BloomFilter* bloomArray;
    std::map<std::string, ICommand*> commands;// Map to store commands
public:
    // Constructor
    App(std::map<std::string, ICommand*> commands1);
    // Get the BloomFilter instance
    BloomFilter* getBloomFilter() const;
    // Destructor
    ~App();
    void deleteBloom();
    // Check if a string represents a positive integer- for valid input
    bool isPositiveInteger(const std::string& s);
    // Check if all strings in a vector are positive integers-for valid input
    bool isAllNumbers(std::vector<std::string> members);
    void setBloom(int size);
    // run the application
    void run();

};
#endif // APP_H