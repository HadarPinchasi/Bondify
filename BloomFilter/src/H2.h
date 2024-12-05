#pragma once
#ifndef H2_H
#define H2_H
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include "IHash.h"
#include <cstddef>

class H2 : public IHash {
public:
    unsigned long hashing(const std::string& line);
};
#endif // H2_H