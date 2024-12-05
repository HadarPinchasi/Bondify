#include "CheckUrl.h"
#include <iostream>
#include <string>
#include <typeinfo>
#include <map>
#include <sstream>
#include <vector>
#include <iterator>

bool  CheckUrl::execute(std::string line, BloomFilter* bloomArray) {
    unsigned long hashRes;
    int placeInAarray;
    bool flag = false;
    for (const std::string& item : bloomArray->getIndexHashes()) {
        // Calculate hash value using the specified hash function
        hashRes = bloomArray->getHashes()[item]->hashing(line);
        placeInAarray = hashRes % bloomArray->getSize();
        // Check if the bit at the calculated position is flipped (1)
        flag = bloomArray->isFlip(placeInAarray);
        if (flag == false) {
           // std::cout << "false" << std::endl;
            return false;
        }
    }
    if (flag == true) {
        bool fl;
        //std::cout << "true ";
        // for checking false positive
        fl=bloomArray->checkInMap(line);
        return fl;
    }
    return false;

}