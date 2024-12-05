#pragma once
#ifndef IHASH_H
#define IHASH_H
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <cstddef>

class IHash {
public:
    virtual unsigned long hashing(const std::string& input) = 0;
    virtual ~IHash() {}
};
#endif // IHASH_H