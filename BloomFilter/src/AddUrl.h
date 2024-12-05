#pragma once
#ifndef ADD_URL_H
#define ADD_URL_H
#include "ICommand.h"
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <cstddef>

class AddUrl : public ICommand {
public:
    bool execute(std::string line, BloomFilter* bloomArray);
};
#endif // ADD_URL_H