#include "H1.h"
#include <iostream>
#include <string>
#include <typeinfo>
#include <map>
#include <sstream>
#include <vector>
#include <iterator>
    unsigned long H1::hashing(const std::string& line) {
        // Use std::hash to generate a hash value for the input string
        std::size_t resHash = std::hash<std::string>{}(line);
        return resHash;
    };