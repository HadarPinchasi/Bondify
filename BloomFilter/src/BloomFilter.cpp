#ifndef BLOOM_FILTER_CPP
#define BLOOM_FILTER_CPP
#include "BloomFilter.h"
#include <iostream>
#include <string>
#include <typeinfo>
#include <map>
#include <sstream>
#include <vector>
#include <iterator>
BloomFilter::BloomFilter(int size) {
    bloomArray = new int[size] {0};
    this->size = size;

}
// Create and set hash functions of the BloomFilter
void BloomFilter::createHashes()
{// Create instances of hash functions H1 and H2
    IHash* h1 = new H1();
    IHash* h2 = new H2();
    // Store hash functions in the 'hashes' map
    hashes["1"] = h1;
    hashes["2"] = h2;
}
// Check if provided input of hash functions exist
bool BloomFilter::checkHashes(std::vector<std::string> members) {
    // Iterate through provided hash function identifiers
    for (auto it = members.begin() + 1; it != members.end(); ++it) {
        if (this->hashes.find(*it) == this->hashes.end()) {
            return false;
        }
    }
    return true;
}
void BloomFilter::setIndexHashes(std::vector<std::string> members) {
    // Assign the provided hash function identifiers to the 'IndexHashing' vector
    this->indexHashing.assign(members.begin() + 1, members.end());
}
// Get index hashes
std::vector<std::string> BloomFilter::getIndexHashes() {
    return this->indexHashing;
}
// Get hash functions
std::map<std::string, IHash*> BloomFilter::getHashes() {
    return this->hashes;
}
// Get the BloomArray
int* BloomFilter::getBloom() const {
    return this->bloomArray;
}
// Get the size of the filter
int BloomFilter::getSize() {
    return this->size;
}
std::map<std::string, int> BloomFilter::getMyMap() const {
    return myMap;
}
// Check if url exist in map and print the answer
bool BloomFilter::checkInMap(std::string line) {
    auto iter = this->getMyMap().find(line);
    if (iter != this->getMyMap().end()) {
      //  std::cout << "true" << std::endl;
        return true;
    }
    else {
        return false;
       // std::cout << "false" << std::endl;
    }

}
// Insert the url into the urls map
void BloomFilter::inserToMap(std::string line) {
    this->myMap.insert({ line, 1 });
}
// Destructor
BloomFilter::~BloomFilter() {
    delete[] bloomArray;
    for (const auto& entry : hashes) {
        delete entry.second;
    }
}
// Flip a bit in the BloomArray
void BloomFilter::flipBit(int placeInArray) {
    // Check if the bit is not already flipped
    if (this->getBloom()[placeInArray] == 0)
        this->bloomArray[placeInArray] = 1;
}

// Check if a bit is flipped in the BloomArray
bool BloomFilter::isFlip(int PlaceInArray) {
    // Check if the bit at the specified position is 1 (flipped)
    if (this->bloomArray[PlaceInArray] == 1) {
        return true;
    }
    return false;

}
#endif // BLOOM_FILTER_CPP