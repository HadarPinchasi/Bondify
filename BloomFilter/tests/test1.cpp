#include <gtest/gtest.h>
#include "part1.cpp"


bool areArraysEqual(int* array1, int* array2, int size) {
    for (int i = 0; i < size; ++i) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}
TEST(BloomFilterTest, BasicTest) {
    BloomFilter myBloom(128);
    EXPECT_EQ(myBloom.getSize(), 128);
    int stackArray[128] = { 0 };
    EXPECT_TRUE(areArraysEqual(stackArray, myBloom.getBloom(), 128));
}

TEST(FlippedTest, BasicTest) {
    BloomFilter myBloom(128);
    myBloom.flipBit(5);
    EXPECT_EQ(myBloom.isFlip(5), true);
}

TEST(Hash1Test, BasicTest) {
    IHash* h1 = new H1();
    //BloomFilter MyBloom(8);
    std::string url = "www.example.com1";
    EXPECT_EQ(h1->hashing(url), 4367201660043770659);
    delete h1;
}

TEST(Hash2Test, BasicTest) {
    IHash* h2 = new H2();
    //BloomFilter MyBloom(8);
    std::string url = "www.example.com1";
    EXPECT_EQ(h2->hashing(url), 6440496568229539108);
    delete h2;
}

TEST(IsPositiveTest, SanityTest) {
    std::map<std::string, ICommand*> commands;
    ICommand* addurl = new AddUrl();
    commands["1"] = addurl;
    ICommand* checkurl = new CheckUrl();
    commands["2"] = checkurl;
    App* myApp = new App(commands);
    std::string str = "542";
    EXPECT_TRUE(myApp->isPositiveInteger(str));
    // delete myApp*********************************
}

TEST(IsPositiveTest2, NegativeTest) {
    std::map<std::string, ICommand*> commands;
    ICommand* addurl = new AddUrl();
    commands["1"] = addurl;
    ICommand* checkurl = new CheckUrl();
    commands["2"] = checkurl;
    App* myApp = new App(commands);    //App myApp;
    std::string str = "ab";
    EXPECT_FALSE(myApp->isPositiveInteger(str));
    str = "-21";
    EXPECT_FALSE(myApp->isPositiveInteger(str));
    delete myApp;
}

TEST(IsAllNumbers, SanityTest) {
    std::map<std::string, ICommand*> commands;
    ICommand* addurl = new AddUrl();
    commands["1"] = addurl;
    ICommand* checkurl = new CheckUrl();
    commands["2"] = checkurl;
    App* myApp = new App(commands);    std::vector<std::string> members = { "542" };
    //std::string str = "542";
    EXPECT_TRUE(myApp->isAllNumbers(members));
    delete myApp;
}

TEST(IsPositiveInputTest, NegativeTest) {
    std::map<std::string, ICommand*> commands;
    ICommand* addurl = new AddUrl();
    commands["1"] = addurl;
    ICommand* checkurl = new CheckUrl();
    commands["2"] = checkurl;
    App* myApp = new App(commands);    std::vector<std::string> members = { "ab" };
    EXPECT_FALSE(myApp->isAllNumbers(members));
    std::vector<std::string> members1 = { "-21" };
    EXPECT_FALSE(myApp->isAllNumbers(members1));
    delete myApp; 
}

//TEST(CheckInMapTest, SanityTest) {
//    BloomFilter* myBloom = new BloomFilter(128);
//    std::string str = "www.examplle5";
//    std::stringstream capturedOutput;
//    std::streambuf* coutBuffer = std::cout.rdbuf();
//    std::cout.rdbuf(capturedOutput.rdbuf());
//    myBloom->inserToMap(str);
//    myBloom->checkInMap(str);
//    std::cout.rdbuf(coutBuffer);
//    EXPECT_EQ(capturedOutput.str(), "true\n");
//    delete myBloom;
//}

//TEST(CheckInMapTest, NegativeTest) {
//    BloomFilter* myBloom = new BloomFilter(128);
//    std::string str = "www.examplle5";
//    std::stringstream capturedOutput;
//    std::streambuf* coutBuffer = std::cout.rdbuf();
//    std::cout.rdbuf(capturedOutput.rdbuf());
//    myBloom->checkInMap(str);
//    std::cout.rdbuf(coutBuffer);
//    EXPECT_EQ(capturedOutput.str(), "false\n");
//    delete myBloom;
//}
//
