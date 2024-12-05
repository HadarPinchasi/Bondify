#pragma once
#ifndef CHECK_URL_H
#define CHECK_URL_H
#include "ICommand.h"
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <cstddef>

class CheckUrl : public ICommand {
public:
    bool execute(std::string line, BloomFilter* bloomArray);
};
#endif // CHECK_URL_H