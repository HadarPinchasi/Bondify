#pragma once
#ifndef H1_H
#define H1_H
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include "IHash.h"
#include <cstddef>

class H1 : public IHash {
public:
    unsigned long hashing(const std::string& line);
};
#endif // H1_H