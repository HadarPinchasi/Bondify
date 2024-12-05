#pragma once
#ifndef BLOOM_FILTER_H
#define BLOOM_FILTER_H
#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>
#include <cstddef>
#include "IHash.h"
#include "H1.h"
#include "H2.h"

class BloomFilter {
private:
    int* bloomArray; // Array to represent the filter
    int size;
    std::map<std::string, IHash*> hashes; // Map to store hash functions
    std::vector<std::string> indexHashing;
    std::map<std::string, int> myMap; // Map for checking false positive

public:
    // Constructor
    BloomFilter(int size);
    // Create and set hash functions of the BloomFilter
    void createHashes();
    // Check if provided input of hash functions exist
    bool checkHashes(std::vector<std::string> members);
    void setIndexHashes(std::vector<std::string> members);
    // Get index hashes
    std::vector<std::string> getIndexHashes();
    // Get hash functions
    std::map<std::string, IHash*> getHashes();
    // Get the BloomArray
    int* getBloom() const;
    // Get the size of the filter
    int getSize();
    std::map<std::string, int> getMyMap() const;
    // Check if url exist in map and print the answer
    bool checkInMap(std::string line);
    // Insert the url into the urls map
    void inserToMap(std::string line);
    // Destructor
    ~BloomFilter();
    // Flip a bit in the BloomArray
    void flipBit(int placeInArray);
    // Check if a bit is flipped in the BloomArray
    bool isFlip(int PlaceInArray);


};
#endif // BLOOM_FILTER_H