#pragma once
#ifndef ICOMMAND_H
#define ICOMMAND_H
#include "BloomFilter.h"
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <cstddef>

// Interface for commands
class ICommand {
public:
    virtual bool execute(std::string line, BloomFilter* bloomArray) = 0;
    virtual ~ICommand() {}
};
#endif // ICOMMAND_H