#include "H2.h"
#include <iostream>
#include <string>
#include <typeinfo>
#include <map>
#include <sstream>
#include <vector>
#include <iterator>
unsigned long H2::hashing(const std::string& line) {
        // Use two rounds of std::hash to generate hash value twice
        std::size_t resHash = std::hash<std::string>{}(line);
        std::size_t res2Hash = std::hash<std::string>{}(std::to_string(resHash));
        return res2Hash;
 };