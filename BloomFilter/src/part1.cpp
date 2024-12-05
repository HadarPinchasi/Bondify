#include <string>
#include <typeinfo>
#include <map>
#include <iostream>
#include <sstream>
#include <vector>
#include <iterator>

  

class App {
private:
    std::map<std::string, IHash*> hashes;
    std::map<std::string, int> myMap;
    BloomFilter* bloomArray;
    //std::map<std::string, Icommand*> commands;
    std::vector<std::string> InsexHashing;
    
public:
    std::map<std::string, int> getMyMap() const {
        return myMap;
    }
    BloomFilter* getBloomFilter() const {
        return bloomArray;
    }
    
    ~App() {
        // Release memory for hashes
        for (const auto& entry : hashes) {
            delete entry.second;
        }       
        // Release memory for BloomFilter
        delete bloomArray;
    }
    bool isPositiveInteger(const std::string& s) {
        for (char c : s) {
            if (!std::isdigit(c)) {
                return false;
            }
        }

        int num = std::stoi(s);
        return num > 0;
    }
    bool isAllNumbers(std::vector<std::string> members) {
        for (const auto& member : members) {
            if (!isPositiveInteger(member)) {
                return false; 
            }
        }
        return true;    
    }
    void SetBloom(int size) {
        this->bloomArray = new BloomFilter(size);
    }
    void EnterToBloom(std::string line) {
        unsigned long HashRes;
        int PlaceInAarray;
        for (const std::string& item : InsexHashing){
            HashRes = hashes[item]->hashing(line);
            PlaceInAarray = HashRes % this->bloomArray->getSize();//convert to string
            this->bloomArray->FlipBit(PlaceInAarray);
    }
        this->myMap.insert({ line, 1 });
    }
        
    void CheckInBloom(std::string line) {
        unsigned long HashRes;
        int PlaceInAarray;
        bool flag = false;
        for (const std::string& item : InsexHashing) {
            HashRes = hashes[item]->hashing(line);
            PlaceInAarray = HashRes % this->bloomArray->getSize();
            flag = this->bloomArray->IsFlip(PlaceInAarray);
            if (flag == false) {
                std::cout << "i am here" << std::endl;
                std::cout << "false" << std::endl;
                return;
            }
        }
        if (flag == true) {
        std::cout << "true" << std::endl;
        auto iter = this->myMap.find(line);
        if (iter != this->myMap.end()) {
            std::cout << "true" << std::endl;
        }
        else {
            //std::cout << "maybe maybe" << std::endl;
            std::cout << "false" << std::endl;
        }
    }
            
     
        
    }
    void CreateHashes() 
    {
        IHash* h1 = new H1();
        IHash* h2 = new H2();
        hashes["1"] = h1;
        hashes["2"] = h2;
    }
    bool CheckHashes(std::vector<std::string> members) {
        for (auto it = members.begin() + 1; it != members.end(); ++it) {
            if (this->hashes.find(*it) == this->hashes.end()) {
                return false;
            }
        }
        return true;
    }
    
    void run() {
        bool bloomArrayCreated = false;
        CreateHashes();
        while (true) {
            std::string line;
            std::getline(std::cin, line);
            std::istringstream iss(line);
            std::vector<std::string> members(
                std::istream_iterator<std::string>{iss},
                std::istream_iterator<std::string>());
            if (this->isAllNumbers(members) && this->CheckHashes(members)) {
                if (!bloomArrayCreated) {
                    this->bloomArray = new BloomFilter(8);
                    bloomArrayCreated = true;
                    this->InsexHashing.assign(members.begin() + 1, members.end());
                }
            }
            if (bloomArrayCreated == true&& (members.size() == 2)) {
            if (members[0] == "1") {
                EnterToBloom(members[1]);
            }
            else if (members[0] == "2") {
                CheckInBloom(members[1]);
            }
            }
            else
                {
                    continue;
                }
            }

        }
    };


    

