#include "App.h"
#include <iostream>
#include <string>
#include <typeinfo>
#include <map>
#include <sstream>
#include <vector>
#include <iterator>


// Implementation of member functions for App class

	// Constructor
App::App(std::map<std::string, ICommand*> commands1) {
	this->commands = commands1;
}
// Get the BloomFilter instance
BloomFilter* App::getBloomFilter() const {
	return bloomArray;
}
// Destructor
App::~App() {
	// Release memory for commands
	for (const auto& entry : commands) {
		if (entry.second) {
			delete entry.second;
		}
	}
	// Release memory for BloomFilter
	if (bloomArray) {
		delete bloomArray;
	}
}
void App::deleteBloom() {
	if (bloomArray) {
		delete this->bloomArray;
	}

}
// Check if a string represents a positive integer- for valid input
bool App::isPositiveInteger(const std::string& s) {
	for (char c : s) {
		if (!std::isdigit(c)) {
			return false;
		}
	}
	// Convert the string to an integer and check if it's positive
	int num = std::stoi(s);
	return num > 0;
}
// Check if all strings in a vector are positive integers-for valid input
bool App::isAllNumbers(std::vector<std::string> members) {
	for (const auto& member : members) {
		if (!isPositiveInteger(member)) {
			return false;
		}
	}
	return true;
}
//std::map<std::string, ICommand*> App::getCommands() const {
//	return this->commands;
//}

void App::setBloom(int size) {
	this->bloomArray = new BloomFilter(size);
}
// run the application
void App::run() {
	bool bloomArrayCreated = false;
	while (true) {
		//getting input
		std::string line;
		std::getline(std::cin, line);
		std::istringstream iss(line);
		std::vector<std::string> members(std::istream_iterator<std::string>{iss}, std::istream_iterator<std::string>());
		// Check if all provided arguments are positive integers- if so, open bloom filter and set hash functions
		if (this->isAllNumbers(members)) {
			// If the BloomFilter is not created, create it and set up hash functions
			if (!bloomArrayCreated) {
				this->bloomArray = new BloomFilter(std::stoi(members[0]));
				this->bloomArray->createHashes();
				// If the provided hash functions are invalid, delete the BloomFilter and continue
				if (this->bloomArray->checkHashes(members) == false) {
					delete this->bloomArray;
					continue;
				}
				bloomArrayCreated = true;
				this->bloomArray->setIndexHashes(members);
			}
		}
		if (bloomArrayCreated == true && (members.size() == 2) && ((members[0] == "1") || members[0] == "2")) {
			commands[members[0]]->execute(members[1], this->bloomArray);
		}
		else
		{
			continue;
		}
	}

};