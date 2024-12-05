cmake_minimum_required(VERSION 3.14)
project(FOOBAR) # Replace “MyCalc” with your repo name

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_COMPILER "/usr/bin/g++")
include(FetchContent)
FetchContent_Declare(
    googletest
    URL
    https://github.com/google/googletest/archive/03597a01ee50ed
    33e9dfd640b249b4be3799d395.zip
)

set(FetchContent_DOWNLOAD_EXTRACT_TIMESAMP true)
include_directories(src)
enable_testing()

set(SOURCE_FILES
src/BloomFilter.cpp
src/AddUrl.cpp # this is where the code we want to test
src/App.cpp
src/CheckUrl.cpp
src/H1.cpp
src/H2.cpp
src/IHash.cpp
)

set(TEST_FILES
tests/test_main.cpp # this is the main for tests
tests/test1.cpp # this file contain the tests
)

add_executable(ProjectTests ${TEST_FILES})

# Link Google Test and pthread
target_link_libraries(ProjectTests PRIVATE gtest gtest_main pthread)


# Include the source directory for tests
target_include_directories(ProjectTests PRIVATE src)

include(GoogleTest)
add_test(NAME ProjectTests COMMAND ProjectTests)
include_directories(${GTEST_INCLUDE_DIRS})