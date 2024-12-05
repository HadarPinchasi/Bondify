#include "AddUrl.h"
#include <iostream>
#include <string>
#include <typeinfo>
#include <map>
#include <sstream>
#include <vector>
#include <iterator>
bool AddUrl::execute(std::string line, BloomFilter* bloomArray) {
        unsigned long hashRes;
        int placeInAarray;
        for (const std::string& item : bloomArray->getIndexHashes()) {
            // Calculate hash value using the specified hash function
            hashRes = bloomArray->getHashes()[item]->hashing(line);
            placeInAarray = hashRes % bloomArray->getSize();//convert to string
            // Flip the bit at the calculated position in the BloomArray
            bloomArray->flipBit(placeInAarray);
        }
        bloomArray->inserToMap(line);
        return true;
        
    }

